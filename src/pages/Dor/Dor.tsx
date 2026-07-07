import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useMemo, useState } from "react";
import type { HistoricoDor } from "@/types/historico";
import { escalasDor } from "@/data/escalas";
import { useDorHistory } from "@/hooks/useHistory";
import { getClassificacaoDor } from "@/utils/classificacao";
import { toast } from "sonner";
import { copiarItemDor } from "@/utils/clipboard";
import { ScoreSummary } from "@/components/ScoreSummary";
import { ClipboardClock } from "lucide-react";
import { HistoryDrawerDor } from "@/components/HistoryDrawerDor";
import { calcularResumoDor } from "@/utils/resumo";

export default function Dor() {
  const {
    historico,
    salvar,
    remover,
    limpar,
  } = useDorHistory();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openDeleteHistory, setOpenDeleteHistory] = useState(false);
  const [resposta, setResposta] = useState<number | undefined>();
  const [itemSelecionado, setItemSelecionado] = useState<HistoricoDor | null>();
  
  const classificacao = getClassificacaoDor(resposta);

  const formularioCompleto = resposta !== undefined;

  const salvarResultado = () => {
    if (!formularioCompleto) {
      return;
    }

    const resultado: HistoricoDor = {
      id: itemSelecionado?.id ?? Date.now(),
      data: new Date().toLocaleString("pt-BR"),
      valor: resposta,
      classificacao: classificacao.texto,
    };

    salvar(resultado);

    toast.success(itemSelecionado ? "Escore de Dor atualizado" : "Escore de Dor armazenado", {
      description: itemSelecionado
        ? `${itemSelecionado.id} foi atualizado`
        : "Para visualizar, clique no botão Histórico",
    });

    setResposta(undefined);
  };

  const abrirResultado = (resultado: (typeof historico)[number]) => {
    setResposta(resultado.valor);
    setDrawerOpen(false);
  };

  const resumo = useMemo(() => calcularResumoDor(historico), [historico]);

  return (
    <Card size="sm" className="w-full max-w-5xl">
      <CardHeader>
        <CardTitle className="font-bold">
          <div className="flex justify-between">
            <h1>Escala de Dor (EVA)</h1>
            {itemSelecionado && (
              <span className="font-normal text-right">
                Visualizando item: {itemSelecionado.id}
              </span>
            )}
          </div>
        </CardTitle>
        <CardDescription>
          Avaliação e registro da intensidade da dor.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ToggleGroup
          size="lg"
          spacing={2}
          value={resposta !== undefined ? String(resposta) : ""}
          onValueChange={(value) => {
            setResposta(parseInt(value))
          }}
          type="single"
          variant="outline"
          className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] w-full"
        >
          {escalasDor.map((item, index) => {
            const id = `${item.id}-${index}`;

            const Icon = item.icon;

            return (
              <ToggleGroupItem
                key={id}
                value={String(item.max)}
                aria-label={item.item}
                className="flex h-20 flex-col items-center justify-center rounded-xl"
              >
                <Icon className={`size-5 ${item.color}`} />
                <span className="text-2xl leading-none font-light">
                  {item.min === 0 ? item.min : `${item.min} - ${item.max}`}
                </span>
                <span className="text-xs text-muted-foreground">
                  {item.item}
                </span>
              </ToggleGroupItem>
            )
          })}
        </ToggleGroup>
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between border-t pt-4">
        <ScoreSummary
          classificacao={classificacao}
          formularioCompleto={formularioCompleto}
          onReset={() => {
            setItemSelecionado(null);
            setResposta(undefined);
          }}
          onSave={salvarResultado}
          total={resposta || 0}
          editando={itemSelecionado ? true : false}
        >
          <HistoryDrawerDor
            open={drawerOpen}
            onOpenChange={setDrawerOpen}
            historico={historico}
            resumo={resumo}
            openDeleteHistory={openDeleteHistory}
            onOpenDeleteHistoryChange={setOpenDeleteHistory}
            onVisualizar={(item) => {
              setItemSelecionado(item)
              abrirResultado(item)
            }}
            onCopiar={(item) => {
              copiarItemDor(item)
            }}
            onDeleteItemConfirm={(item) => {
              remover(item.id);

              setResposta(undefined);
              setItemSelecionado(null);

              toast.success("Escore de dor removido", {
                description: `Escore ${item.id} removido`,
              });
            }}
            onDeleteHistoryConfirm={() => {
              const size = historico.length;

              setResposta(undefined);
              limpar();
              setItemSelecionado(null);

              setDrawerOpen(false);

              toast.success("Histórico de dor removido", {
                description: `${size} registro(s) removido(s)`,
              });
            }}
            onClearSelection={() => setItemSelecionado(null)}
            onClose={() => {
              setDrawerOpen(false);
            }}
          >
            <Button variant="outline" className="cursor-pointer" disabled={historico.length == 0}>
              <ClipboardClock />
              Histórico
            </Button>
          </HistoryDrawerDor>
        </ScoreSummary>
      </CardFooter>
    </Card>
  )
}