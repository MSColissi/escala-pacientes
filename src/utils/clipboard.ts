import { escalasDor } from "@/data/escalas";
import type { ConfigEscala, Escala } from "@/types/escala";
import type { Historico, HistoricoBase, HistoricoDor } from "@/types/historico";
import { toast } from "sonner";

export const obterTextoResposta = (escalas: Escala[], escalaId: number, ponto: number) => {
  const escala = escalas.find((e) => e.id === escalaId);
  if (!escala) return "";

  const resposta = escala.itens.find((i) => i.pontos === ponto);
  if (!resposta) return "";

  return `${resposta.item} (${ponto})`;
};

export const gerarTextoHistorico = (
  item: HistoricoBase,
  config: ConfigEscala,
  isDor = false
) => {
  const linhas: string[] = [
    config.titulo,
    "",
    `📅 Data: ${new Date(item.data).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })}`,
  ];

  if (isDor) {
    const escala = escalasDor.find(e => e.max === (item as HistoricoDor).valor);

    linhas.push(
      `🔢 Nível: ${escala?.min} - ${escala?.max}`,
      `📌 Classificação: ${item.classificacao}`
    );
  } else {
    const historico = item as Historico;

    linhas.push(
      `🔢 Pontuação: ${historico.total}`,
      `📌 Classificação: ${historico.classificacao}`,
      "",
      "📋 Respostas:"
    );

    config.perguntas.forEach((pergunta, index) => {
      const numero = index + 1;

      linhas.push(
        `${pergunta}: ${obterTextoResposta(
          config.escalas,
          numero,
          historico.respostas[numero]
        )}`
      );
    });

    if (historico.cuidado?.length) {
      linhas.push(
        "",
        "💡 Cuidados recomendados:"
      );

      historico.cuidado.forEach(cuidado => {
        linhas.push(`• ${cuidado}`);
      });
    }
  }

  return linhas.join("\n");
}

export const copiarHistorico = async (
  item: HistoricoBase,
  config: ConfigEscala,
  {
    areaTransferencia = true,
    isDor = false,
  }: {
    areaTransferencia?: boolean;
    isDor?: boolean;
  } = {}
) => {
  const texto = gerarTextoHistorico(item, config, isDor);

  if (areaTransferencia) {
    await copiarAreaTransferencia(texto, item.id);
  }

  return texto;
}

async function copiarAreaTransferencia(texto: string, id: number) {
  await navigator.clipboard.writeText(texto);

  toast.success("Resultado copiado", {
    description: `Escore ${id} copiado para área de transferência`,
    position: "top-center",
  });
}