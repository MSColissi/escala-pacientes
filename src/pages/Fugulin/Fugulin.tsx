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
import { FormEscala } from "@/components/FormEscala";
import { ScoreSummary } from "@/components/ScoreSummary";
import { HistoryDrawer } from "@/components/HistoryDrawer";
import { useFugulinHistory } from "@/hooks/useHistory";
import { getClassificacaoFugulin } from "@/utils/classificacao";
import { escalasFugulin } from "@/data/escalas";
import { copiarItemFugulin } from "@/utils/clipboard";
import { scrollTop } from "@/utils/utilitarios";
import { calcularResumoFugulin } from "@/utils/resumo";

export default function Fugulin() {
  const {
    historico,
    salvar,
    remover,
    limpar,
  } = useFugulinHistory();

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openDeleteHistory, setOpenDeleteHistory] = useState(false);
  const [respostas, setRespostas] = useState<Record<number, number>>({});
  const [itemSelecionado, setItemSelecionado] = useState<Historico | null>();

  const total = Object.values(respostas).reduce((acc, valor) => acc + valor, 0);

  const classificacao = getClassificacaoFugulin(total);

  const formularioCompleto = escalasFugulin.every(
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
      hora: classificacao.hora,
      proporcao: classificacao.proporcao,
    };

    salvar(resultado);

    toast.success(itemSelecionado ? "Escore de Fugulin atualizado" : "Escore de Fugulin armazenado", {
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

  const resumo = useMemo(() => calcularResumoFugulin(historico), [historico]);

  return (
    <Card size="sm" className="w-full max-w-5xl">
      <CardHeader>
        <CardTitle className="font-bold">
          <div className="flex justify-between">
            <h1>Escala de Fugulin</h1>
            {itemSelecionado && (
              <span className="font-normal text-right">
                Visualizando item: {itemSelecionado.id}
              </span>
            )}
          </div>
        </CardTitle>
        <CardDescription>
          Classificação do grau de dependência do paciente.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ScrollArea ref={scrollAreaRef} className="h-full sm:h-[60dvh] w-full">
          <FormEscala
            escalas={escalasFugulin}
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
            escala="Fugulin"
            open={drawerOpen}
            onOpenChange={setDrawerOpen}
            historico={historico}
            resumoFugulin={resumo}
            openDeleteHistory={openDeleteHistory}
            onOpenDeleteHistoryChange={setOpenDeleteHistory}
            onVisualizar={(item) => {
              setItemSelecionado(item)
              abrirResultado(item)
            }}
            onCopiar={(item) => {
              copiarItemFugulin(item)
            }}
            onDeleteItemConfirm={(item) => {
              remover(item.id);

              setRespostas({});
              setItemSelecionado(null);

              toast.success("Escore de Fugulin removido", {
                description: `Escore ${item.id} removido`,
              });
            }}
            onDeleteHistoryConfirm={() => {
              const size = historico.length;

              setRespostas({});
              limpar();
              setItemSelecionado(null);

              setDrawerOpen(false);

              toast.success("Histórico de Fuhulin removido", {
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
            <Button variant="outline" size="sm" className="cursor-pointer" disabled={historico.length == 0}>
              <ClipboardClock />
              Histórico
            </Button>
          </HistoryDrawer>
        </ScoreSummary>
      </CardFooter>
    </Card>
  );
}
