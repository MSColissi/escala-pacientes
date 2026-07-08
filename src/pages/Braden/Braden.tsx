import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ClipboardClock } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import type { Historico } from "../../types/historico";
import { escalasBraden } from "@/data/escalas";
import { FormEscala } from "@/components/FormEscala";
import { ScoreSummary } from "@/components/ScoreSummary";
import { HistoryDrawer } from "@/components/HistoryDrawer";
import { useBradenHistory } from "@/hooks/useHistory";
import { getClassificacaoBraden } from "@/utils/classificacao";
import { copiarItemBraden } from "@/utils/clipboard";
import { scrollTop } from "@/utils/utilitarios";
import { calcularResumoBraden } from "@/utils/resumo";

export default function Braden() {
  const {
    historico,
    salvar,
    remover,
    limpar,
  } = useBradenHistory();

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openDeleteHistory, setOpenDeleteHistory] = useState(false);
  const [respostas, setRespostas] = useState<Record<number, number>>({});
  const [itemSelecionado, setItemSelecionado] = useState<Historico | null>();

  const total = Object.values(respostas).reduce((acc, valor) => acc + valor, 0);

  const classificacao = getClassificacaoBraden(total);
  
  const formularioCompleto = escalasBraden.every(
    (escala) => respostas[escala.id] !== undefined,
  );

  const salvarResultado = () => {
    if (!formularioCompleto) {
      return;
    }

    const resultado: Historico = {
      id: itemSelecionado?.id ?? Date.now(),
      data: new Date().toLocaleString("pt-BR"),
      respostas,
      total,
      classificacao: classificacao.texto,
      reavaliacao: classificacao.reavaliacao
    };

    salvar(resultado);

    toast.success(itemSelecionado ? "Escore de Braden atualizado" : "Escore de Braden armazenado", {
      description: itemSelecionado
        ? `${itemSelecionado.id} foi atualizado`
        : "Para visualizar, clique no botão Histórico",
    });

    setRespostas({});
    scrollTop(scrollAreaRef);
  };

  const abrirResultado = (resultado: (typeof historico)[number]) => {
    setRespostas(resultado.respostas);
    setDrawerOpen(false);
    scrollTop(scrollAreaRef);
  };

  const resumo = useMemo(() => calcularResumoBraden(historico), [historico]);

  return (
    <Card size="sm" className="w-full max-w-5xl">
      <CardHeader>
        <CardTitle className="font-bold">
          <div className="flex justify-between">
            <h1>Escala de Braden</h1>
            {itemSelecionado && (
              <span className="font-normal text-right">
                Visualizando item: {itemSelecionado.id}
              </span>
            )}
          </div>
        </CardTitle>
        <CardDescription>
          A Escala de Braden avalia o risco de lesões por pressão. Deve ser aplicada em até 8h da admissão do paciente.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ScrollArea ref={scrollAreaRef} className="h-full sm:h-[62dvh] w-full">
          <FormEscala
            escalas={escalasBraden}
            respostas={respostas}
            onChange={(escalaId, pontos) =>
              setRespostas((prev) => ({
                ...prev,
                [escalaId]: pontos,
              }))
            }
          />
        </ScrollArea>
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between border-t pt-4">
        <ScoreSummary
          classificacao={classificacao}
          formularioCompleto={formularioCompleto}
          onReset={() => {
            setItemSelecionado(null);
            setRespostas({});

            scrollTop(scrollAreaRef);
          }}
          onSave={salvarResultado}
          total={total}
          editando={itemSelecionado ? true : false}
        >
          <HistoryDrawer
            escala="Braden"
            open={drawerOpen}
            onOpenChange={setDrawerOpen}
            historico={historico}
            resumoBraden={resumo}
            openDeleteHistory={openDeleteHistory}
            onOpenDeleteHistoryChange={setOpenDeleteHistory}
            onVisualizar={(item) => {
              setItemSelecionado(item)
              abrirResultado(item)
            }}
            onCopiar={(item) => {
              copiarItemBraden(item)
            }}
            onDeleteItemConfirm={(item) => {
              remover(item.id);

              setRespostas({});
              setItemSelecionado(null);

              toast.success("Escore de Braden removido", {
                description: `Escore ${item.id} removido`,
              });
            }}
            onDeleteHistoryConfirm={() => {
              const size = historico.length;

              setRespostas({});
              limpar();
              setItemSelecionado(null);

              setDrawerOpen(false);

              toast.success("Histórico de Braden removido", {
                description: `${size} registro(s) removido(s)`,
              });

              scrollTop(scrollAreaRef);
            }}
            onClearSelection={() => setItemSelecionado(null)}
            onClose={() => {
              setDrawerOpen(false);
              scrollTop(scrollAreaRef);
            }}
          >
            <Button variant="outline" className="cursor-pointer" disabled={historico.length == 0}>
              <ClipboardClock />
              Histórico
            </Button>
          </HistoryDrawer>
        </ScoreSummary>
      </CardFooter>
    </Card>
  );
}
