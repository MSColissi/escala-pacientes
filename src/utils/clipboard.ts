import { escalasBraden, escalasDor, escalasFugulin, escalasGlasgow, escalasMorse } from "@/data/escalas";
import type { Escala } from "@/types/escala";
import type { Historico, HistoricoDor } from "@/types/historico";
import { toast } from "sonner";

const obterTextoResposta = (escalas: Escala[], escalaId: number, ponto: number) => {
  const escala = escalas.find((e) => e.id === escalaId);
  if (!escala) return "";

  const resposta = escala.itens.find((i) => i.pontos === ponto);
  if (!resposta) return "";

  return `${resposta.item} (${ponto})`;
};

export const copiarItemBraden = async (item: Historico, areaTransferencia=true) => {
  const texto = `
Escala de Braden

📅 Data: ${item.data}
🔢 Total: ${item.total}
📌 Classificação: ${item.classificacao}

📋 Respostas:
Percepcao sensorial: ${obterTextoResposta(escalasBraden, 1, item.respostas[1])}
Umidade: ${obterTextoResposta(escalasBraden, 2, item.respostas[2])}
Atividade: ${obterTextoResposta(escalasBraden, 3, item.respostas[3])}
Mobilidade: ${obterTextoResposta(escalasBraden, 4, item.respostas[4])}
Nutrição: ${obterTextoResposta(escalasBraden, 5, item.respostas[5])}
Fricção e cisalhamento: ${obterTextoResposta(escalasBraden, 6, item.respostas[6])}
`.trim();

  if (areaTransferencia) await copiarAreaTransferencia(texto, item.id)
  
  return texto
};

export const copiarItemDor = async (item: HistoricoDor, areaTransferencia=true) => {    
  const escala = escalasDor.find(escala => escala.max === item.valor);

  const texto = `
Escala de Dor

📅 Data: ${item.data}
🔢 Nível: ${escala?.min} - ${escala?.max}
📌 Classificação: ${item.classificacao}
`.trim();

  if (areaTransferencia) await copiarAreaTransferencia(texto, item.id)
  
  return texto
};

export const copiarItemFugulin = async (item: Historico, areaTransferencia=true) => {
  const texto = `
Escala de Fugulin

📅 Data: ${item.data}
🔢 Total: ${item.total}
📌 Classificação: ${item.classificacao}

📋 Respostas:
Estado mental: ${obterTextoResposta(escalasFugulin, 1, item.respostas[1])}
Oxigenação: ${obterTextoResposta(escalasFugulin, 2, item.respostas[2])}
Sinais vitais: ${obterTextoResposta(escalasFugulin, 3, item.respostas[3])}
Motilidade: ${obterTextoResposta(escalasFugulin, 4, item.respostas[4])}
Deambulação: ${obterTextoResposta(escalasFugulin, 5, item.respostas[5])}
Alimentação: ${obterTextoResposta(escalasFugulin, 6, item.respostas[6])}
Cuidado corportal: ${obterTextoResposta(escalasFugulin, 7, item.respostas[7])}
Eliminação: ${obterTextoResposta(escalasFugulin, 8, item.respostas[8])}
Terapêutica: ${obterTextoResposta(escalasFugulin, 9, item.respostas[9])}
Integridade cutânea-mucosa: ${obterTextoResposta(escalasFugulin, 10, item.respostas[10])}
Curativo: ${obterTextoResposta(escalasFugulin, 11, item.respostas[11])}
Tempo na troca do curativo: ${obterTextoResposta(escalasFugulin, 12, item.respostas[12])}
`.trim();

  if (areaTransferencia) await copiarAreaTransferencia(texto, item.id)
  
  return texto
};

export const copiarItemGlashow = async (item: Historico, areaTransferencia=true) => {
  const texto = `
Escala de Coma de Glasgow

📅 Data: ${item.data}
🔢 Total: ${item.total}
📌 Classificação: ${item.classificacao}

📋 Respostas:
Ocular: ${obterTextoResposta(escalasGlasgow, 1, item.respostas[1])}
Verbal: ${obterTextoResposta(escalasGlasgow, 2, item.respostas[2])}
Motora: ${obterTextoResposta(escalasGlasgow, 3, item.respostas[3])}
`.trim();

  if (areaTransferencia) await copiarAreaTransferencia(texto, item.id)
  
  return texto
};

export const copiarItemMorse = async (item: Historico, areaTransferencia=true) => {
  const texto = `
Escala de Coma de Morse

📅 Data: ${item.data}
🔢 Total: ${item.total}
📌 Classificação: ${item.classificacao}

📋 Respostas:
Histórico de quedas: ${obterTextoResposta(escalasMorse, 1, item.respostas[1])}
Diagnóstico secundário: ${obterTextoResposta(escalasMorse, 2, item.respostas[2])}
Auxílio na marcha: ${obterTextoResposta(escalasMorse, 3, item.respostas[3])}
Terapia endovenosa: ${obterTextoResposta(escalasMorse, 4, item.respostas[4])}
Marcha: ${obterTextoResposta(escalasMorse, 5, item.respostas[5])}
Estado mental: ${obterTextoResposta(escalasMorse, 6, item.respostas[6])}
`.trim();

  if (areaTransferencia) await copiarAreaTransferencia(texto, item.id)
  
  return texto
};

async function copiarAreaTransferencia(texto: string, id: number) {
  await navigator.clipboard.writeText(texto);

  toast.success("Resultado copiado", {
    description: `Escore ${id} copiado para área de transferência`,
    position: "top-center",
  });
}