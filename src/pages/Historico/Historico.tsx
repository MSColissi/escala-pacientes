import { HistoryItem } from "@/components/HistoryItem";
import { HistoryItemDor } from "@/components/HistoryItemDor";
import { HistoryResume } from "@/components/HistoryResume";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { ItemGroup } from "@/components/ui/item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useBradenHistory, useDorHistory, useFrailHistory, useFugulinHistory, useGlasgowHistory, useMorseHistory } from "@/hooks/useHistory";
import { calcularResumoBraden, calcularResumoDor, calcularResumoFrail, calcularResumoFugulin, calcularResumoGlasgow, calcularResumoMorse } from "@/utils/resumo";
import { BoneFracture, Brain, Footprints, HeartPlus, Inbox, SmilePlus, Trash, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent
} from "@/components/ui/dialog";
import { copiarHistorico } from "@/utils/clipboard";
import { CONFIG_BRADEN, CONFIG_DOR, CONFIG_FRAIL, CONFIG_FUGULIN, CONFIG_GLASGOW, CONFIG_MORSE } from "@/types/escala";

export function filtrarHistorico<T extends { classificacao: string }>(
  historico: T[],
  escala: string,
  filtro: { escala: string; classificacao: string } | null
) {
  
  if (!filtro || filtro.escala !== escala) {
    return historico;
  }

  return historico.filter(
    item => item.classificacao === filtro.classificacao
  );
}

export default function Historico() {
  const {
    historico: historicoGlasgow,
    remover: removerGlasgow,
    limpar: limparGlasgow,
  } = useGlasgowHistory();

  const resumoGlasgow = useMemo(() => calcularResumoGlasgow(historicoGlasgow), [historicoGlasgow]);

  const {
    historico: historicoBraden,
    remover: removerBraden,
    limpar: limparBraden,
  } = useBradenHistory();

  const resumoBraden = useMemo(() => calcularResumoBraden(historicoBraden), [historicoBraden]);

  const {
    historico: historicoMorse,
    remover: removerMorse,
    limpar: limparMorse,
  } = useMorseHistory();

  const resumoMorse = useMemo(() => calcularResumoMorse(historicoMorse), [historicoMorse]);

  const {
    historico: historicoFugulin,
    remover: removerFugulin,
    limpar: limparFugulin,
  } = useFugulinHistory();

  const resumoFugulin = useMemo(() => calcularResumoFugulin(historicoFugulin), [historicoFugulin]);

  const {
    historico: historicoDor,
    remover: removerDor,
    limpar: limparDor,
  } = useDorHistory();

  const resumoDor = useMemo(() => calcularResumoDor(historicoDor), [historicoDor]);

  const {
    historico: historicoFrail,
    remover: removerFrail,
    limpar: limparFrail,
  } = useFrailHistory();

  const resumoFrail = useMemo(() => calcularResumoFrail(historicoFrail), [historicoFrail]);

  const [mensagem, setMensagem] = useState("");
  const [dialogVisualizar, setDialogVisualizar] = useState(false);
  const [filtro, setFiltro] = useState<{
    escala: string;
    classificacao: string;
  } | null>(null);

  const isHistoricoVazio = historicoGlasgow.length === 0 && historicoBraden.length === 0 && historicoMorse.length === 0 && historicoFugulin.length === 0 && historicoDor.length === 0 && historicoFrail.length === 0;

  const historicoGlasgowFiltrado = filtrarHistorico(
    historicoGlasgow,
    "Glasgow",
    filtro
  );

  const historicoBradenFiltrado = filtrarHistorico(
    historicoBraden,
    "Braden",
    filtro
  );

  const historicoMorseFiltrado = filtrarHistorico(
    historicoMorse,
    "Morse",
    filtro
  );

  const historicoFugulinFiltrado = filtrarHistorico(
    historicoFugulin,
    "Fugulin",
    filtro
  );

  const historicoDorFiltrado = filtrarHistorico(
    historicoDor,
    "Dor",
    filtro
  );

  const historicoFrailFiltrado = filtrarHistorico(
    historicoFrail,
    "Frail",
    filtro
  );
  
  return (
    <Card  size="sm" className="w-full max-w-5xl bg-muted">
      <CardHeader>
        <CardTitle className="font-bold">
          <div className="flex justify-between items-center">
            <h1>Histórico</h1>
            <Button 
              disabled={isHistoricoVazio}
              variant="destructive"
              className="cursor-pointer"
              onClick={() => {
                limparGlasgow()
                limparBraden()
                limparMorse()
                limparFugulin()
                limparDor()
                limparFrail()

                toast.success("Histórico de escores removido", {
                  description: `Todos os escores foram removidos`
                });
              }}
            >
              <Trash />
              Limpar Histórico
            </Button>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent>
        { isHistoricoVazio ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Inbox />
              </EmptyMedia>
              <EmptyTitle>Não há escores armazenados</EmptyTitle>
              <EmptyDescription>
                Armazene os scores para visualizar no histórico
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <ScrollArea className="h-full sm:h-[75dvh] w-full">
            {historicoGlasgow.length > 0 &&
              <>
                <h2 className="flex gap-2 scroll-m-20 mb-2 text-lg font-semibold tracking-tight not-first:mt-4 items-center">
                  <Brain className="text-primary" width={18} /> 
                  Escala de Glasgow
                </h2>

                <div>
                  <HistoryResume
                    escala="Glasgow"
                    itens={[
                      {
                        label: "Trauma leve",
                        value: resumoGlasgow.leve,
                        color: "bg-green-600",
                      },
                      {
                        label: "Trauma moderado",
                        value: resumoGlasgow.moderado,
                        color: "bg-yellow-600",
                      },
                      {
                        label: "Trauma grave",
                        value: resumoGlasgow.grave,
                        color: "bg-red-600",
                      },
                    ]}
                    showResumo={false}
                    selected={
                      filtro?.escala === "Glasgow"
                        ? filtro.classificacao
                        : null
                    }
                    onSelect={(item) =>
                      setFiltro((atual) =>
                        atual?.escala === "Glasgow" &&
                        atual.classificacao === item.label
                          ? null
                          : {
                              escala: "Glasgow",
                              classificacao: item.label,
                            }
                      )
                    }
                  />

                  <ItemGroup className="gap-4 px-2">
                    {historicoGlasgowFiltrado.length === 0 &&
                      <Empty>
                        <EmptyHeader>
                          <EmptyMedia variant="icon">
                            <Inbox />
                          </EmptyMedia>
                          <EmptyTitle>Não há escores armazenados para o filtro selecionado.</EmptyTitle>
                          <EmptyDescription>
                            Selecione outro filtro ou desmarque o filtro selecionado.
                          </EmptyDescription>
                        </EmptyHeader>
                      </Empty>
                    }

                    {historicoGlasgowFiltrado.map((item) => (
                      <HistoryItem
                        escala="Glasgow"
                        key={item.id}
                        item={item}
                        onVisualizar={async (item) => {
                          const texto = await copiarHistorico(item, CONFIG_GLASGOW, { areaTransferencia: false })
                          setMensagem(texto)
                          setDialogVisualizar(true)
                        }}
                        onCopiar={(item) => {
                          copiarHistorico(item, CONFIG_GLASGOW)
                        }}
                        onRemover={(item) => {
                          removerGlasgow(item.id);

                          toast.success("Escore de Glasgow removido", {
                            description: `Escore ${item.id} removido`
                          });
                        }}
                      />
                    ))}
                  </ItemGroup>
                </div>
              </>            
            }

            {historicoBraden.length > 0 &&
              <>
                <h2 className="flex gap-2 scroll-m-20 mb-2 text-lg font-semibold tracking-tight not-first:mt-4 items-center">
                  <BoneFracture className="text-primary" width={18} /> 
                  Escala de Braden
                </h2>

                <div>
                  <HistoryResume
                    escala="Braden"
                    itens={[
                      {
                        label: "Sem risco",
                        value: resumoBraden.semRisco,
                        color: "bg-green-600",
                      },
                      {
                        label: "Risco baixo",
                        value: resumoBraden.baixo,
                        color: "bg-yellow-600",
                      },
                      {
                        label: "Risco moderado",
                        value: resumoBraden.moderado,
                        color: "bg-amber-600",
                      },
                      {
                        label: "Risco elevado",
                        value: resumoBraden.alto,
                        color: "bg-orange-600",
                      },
                      {
                        label: "Risco muito elevado",
                        value: resumoBraden.muitoAlto,
                        color: "bg-red-700",
                      },
                    ]}
                    showResumo={false}
                    selected={
                      filtro?.escala === "Braden"
                        ? filtro.classificacao
                        : null
                    }
                    onSelect={(item) =>
                      setFiltro((atual) =>
                        atual?.escala === "Braden" &&
                        atual.classificacao === item.label
                          ? null
                          : {
                              escala: "Braden",
                              classificacao: item.label,
                            }
                      )
                    }
                  />

                  <ItemGroup className="gap-4 px-2">
                    {historicoBradenFiltrado.length === 0 &&
                      <Empty>
                        <EmptyHeader>
                          <EmptyMedia variant="icon">
                            <Inbox />
                          </EmptyMedia>
                          <EmptyTitle>Não há escores armazenados para o filtro selecionado.</EmptyTitle>
                          <EmptyDescription>
                            Selecione outro filtro ou desmarque o filtro selecionado.
                          </EmptyDescription>
                        </EmptyHeader>
                      </Empty>
                    }

                    {historicoBradenFiltrado.map((item) => (
                      <HistoryItem
                        escala="Braden"
                        key={item.id}
                        item={item}
                        onVisualizar={async (item) => {
                          const texto = await copiarHistorico(item, CONFIG_BRADEN, { areaTransferencia: false })
                          setMensagem(texto)
                          setDialogVisualizar(true)
                        }}
                        onCopiar={(item) => {
                          copiarHistorico(item, CONFIG_BRADEN)
                        }}
                        onRemover={(item) => {
                          removerBraden(item.id);

                          toast.success("Escore de Braden removido", {
                            description: `Escore ${item.id} removido`
                          });
                        }}
                      />
                    ))}
                  </ItemGroup>
                </div>
              </>
            }

            {historicoMorse.length > 0 &&
              <>
                <h2 className="flex gap-2 scroll-m-20 mb-2 text-lg font-semibold tracking-tight not-first:mt-4 items-center">
                  <Footprints className="text-primary" width={18} /> 
                  Escala de Morse
                </h2>

                <div>
                  <HistoryResume
                    escala="Morse"
                    itens={[
                      {
                        label: "Risco baixo",
                        value: resumoMorse.baixo,
                        color: "bg-green-600",
                      },
                      {
                        label: "Risco moderado",
                        value: resumoMorse.moderado,
                        color: "bg-yellow-600",
                      },
                      {
                        label: "Trauma elevado",
                        value: resumoMorse.elevado,
                        color: "bg-red-600",
                      },
                    ]}
                    showResumo={false}
                    selected={
                      filtro?.escala === "Morse"
                        ? filtro.classificacao
                        : null
                    }
                    onSelect={(item) =>
                      setFiltro((atual) =>
                        atual?.escala === "Morse" &&
                        atual.classificacao === item.label
                          ? null
                          : {
                              escala: "Morse",
                              classificacao: item.label,
                            }
                      )
                    }
                  />

                  <ItemGroup className="gap-4 px-2">
                    {historicoMorseFiltrado.length === 0 &&
                      <Empty>
                        <EmptyHeader>
                          <EmptyMedia variant="icon">
                            <Inbox />
                          </EmptyMedia>
                          <EmptyTitle>Não há escores armazenados para o filtro selecionado.</EmptyTitle>
                          <EmptyDescription>
                            Selecione outro filtro ou desmarque o filtro selecionado.
                          </EmptyDescription>
                        </EmptyHeader>
                      </Empty>
                    }

                    {historicoMorseFiltrado.map((item) => (
                      <HistoryItem
                        escala="Morse"
                        key={item.id}
                        item={item}
                        onVisualizar={async (item) => {
                          const texto = await copiarHistorico(item, CONFIG_MORSE, { areaTransferencia: false })
                          setMensagem(texto)
                          setDialogVisualizar(true)
                        }}
                        onCopiar={(item) => {
                          copiarHistorico(item, CONFIG_MORSE)
                        }}
                        onRemover={(item) => {
                          removerMorse(item.id);

                          toast.success("Escore de Morse removido", {
                            description: `Escore ${item.id} removido`
                          });
                        }}
                      />
                    ))}
                  </ItemGroup>
                </div>
              </>
            }

            {historicoFugulin.length > 0 &&
              <>
                <h2 className="flex gap-2 scroll-m-20 mb-2 text-lg font-semibold tracking-tight not-first:mt-4 items-center">
                  <Users className="text-primary" width={18} /> 
                  Escala de Fugulin
                </h2>
                
                <div>
                  <HistoryResume
                    escala="Fugulin"
                    itens={[
                      {
                        label: "Cuidado mínimo",
                        value: resumoFugulin.minimo,
                        color: "bg-green-600",
                      },
                      {
                        label: "Cuidado intermediário",
                        value: resumoFugulin.intermediario,
                        color: "bg-yellow-600",
                      },
                      {
                        label: "Alta dependência",
                        value: resumoFugulin.altaDependencia,
                        color: "bg-amber-600",
                      },
                      {
                        label: "Cuidado semi-intensivo",
                        value: resumoFugulin.semiIntensivo,
                        color: "bg-orange-600",
                      },
                      {
                        label: "Cuidado intensivo",
                        value: resumoFugulin.intensivo,
                        color: "bg-red-700",
                      },
                    ]}
                    showResumo={false}
                    selected={
                      filtro?.escala === "Fugulin"
                        ? filtro.classificacao
                        : null
                    }
                    onSelect={(item) =>
                      setFiltro((atual) =>
                        atual?.escala === "Fugulin" &&
                        atual.classificacao === item.label
                          ? null
                          : {
                              escala: "Fugulin",
                              classificacao: item.label,
                            }
                      )
                    }
                  />

                  <ItemGroup className="gap-4 px-2">
                    {historicoFugulinFiltrado.length === 0 &&
                      <Empty>
                        <EmptyHeader>
                          <EmptyMedia variant="icon">
                            <Inbox />
                          </EmptyMedia>
                          <EmptyTitle>Não há escores armazenados para o filtro selecionado.</EmptyTitle>
                          <EmptyDescription>
                            Selecione outro filtro ou desmarque o filtro selecionado.
                          </EmptyDescription>
                        </EmptyHeader>
                      </Empty>
                    }

                    {historicoFugulinFiltrado.map((item) => (
                      <HistoryItem
                        escala="Fugulin"
                        key={item.id}
                        item={item}
                        onVisualizar={async (item) => {
                          const texto = await copiarHistorico(item, CONFIG_FUGULIN, { areaTransferencia: false })
                          setMensagem(texto)
                          setDialogVisualizar(true)
                        }}
                        onCopiar={(item) => {
                          copiarHistorico(item, CONFIG_FUGULIN)
                        }}
                        onRemover={(item) => {
                          removerFugulin(item.id);

                          toast.success("Escore de Fugulin removido", {
                            description: `Escore ${item.id} removido`
                          });
                        }}
                      />
                    ))}
                  </ItemGroup>
                </div>
              </>
            }

            {historicoDor.length > 0 &&
              <>
                <h2 className="flex gap-2 scroll-m-20 mb-2 text-lg font-semibold tracking-tight not-first:mt-4 items-center">
                  <SmilePlus className="text-primary" width={18} /> 
                  Escala de Dor
                </h2>

                <div>
                  <HistoryResume
                    escala="Dor"
                    itens={[
                      {
                        label: "Sem dor",
                        value: resumoDor.semDor,
                        color: "bg-green-600",
                      },
                      {
                        label: "Dor leve",
                        value: resumoDor.dorLeve,
                        color: "bg-yellow-600",
                      },
                      {
                        label: "Dor moderada",
                        value: resumoDor.dorModerada,
                        color: "bg-amber-600",
                      },
                      {
                        label: "Dor intensa ou severa",
                        value: resumoDor.dorIntensaSevera,
                        color: "bg-red-600",
                      },
                    ]}
                    showResumo={false}
                    selected={
                      filtro?.escala === "Dor"
                        ? filtro.classificacao
                        : null
                    }
                    onSelect={(item) =>
                      setFiltro((atual) =>
                        atual?.escala === "Dor" &&
                        atual.classificacao === item.label
                          ? null
                          : {
                              escala: "Dor",
                              classificacao: item.label,
                            }
                      )
                    }
                  />

                  <ItemGroup className="gap-4 px-2">
                    {historicoDorFiltrado.length === 0 &&
                      <Empty>
                        <EmptyHeader>
                          <EmptyMedia variant="icon">
                            <Inbox />
                          </EmptyMedia>
                          <EmptyTitle>Não há escores armazenados para o filtro selecionado.</EmptyTitle>
                          <EmptyDescription>
                            Selecione outro filtro ou desmarque o filtro selecionado.
                          </EmptyDescription>
                        </EmptyHeader>
                      </Empty>
                    }

                    {historicoDorFiltrado.map((item) => (
                      <HistoryItemDor
                        key={item.id}
                        item={item}
                        onVisualizar={async (item) => {
                          const texto = await copiarHistorico(item, CONFIG_DOR, { isDor: true, areaTransferencia: false })
                          setMensagem(texto)
                          setDialogVisualizar(true)
                        }}
                        onCopiar={(item) => {
                          copiarHistorico(item, CONFIG_DOR, { isDor: true })
                        }}
                        onRemover={(item) => {
                          removerDor(item.id);

                          toast.success("Escore de dor removido", {
                            description: `Escore ${item.id} removido`
                          });
                        }}
                      />
                    ))}
                  </ItemGroup>
                </div>
              </>
            }

            {historicoFrail.length > 0 &&
              <>
                <h2 className="flex gap-2 scroll-m-20 mb-2 text-lg font-semibold tracking-tight not-first:mt-4 items-center">
                  <HeartPlus className="text-primary" width={18} /> 
                  Escala de Frail
                </h2>

                <div>
                  <HistoryResume
                    escala="Frail"
                    itens={[
                      {
                        label: "Robusto",
                        value: resumoFrail.robusto,
                        color: "bg-green-600",
                      },
                      {
                        label: "Pré-frágil",
                        value: resumoFrail.preFragil,
                        color: "bg-yellow-600",
                      },
                      {
                        label: "Frágil",
                        value: resumoFrail.fragil,
                        color: "bg-amber-600",
                      }
                    ]}
                    showResumo={false}
                    selected={
                      filtro?.escala === "Frail"
                        ? filtro.classificacao
                        : null
                    }
                    onSelect={(item) =>
                      setFiltro((atual) =>
                        atual?.escala === "Frail" &&
                        atual.classificacao === item.label
                          ? null
                          : {
                              escala: "Frail",
                              classificacao: item.label,
                            }
                      )
                    }
                  />

                  <ItemGroup className="gap-4 px-2">
                    {historicoFrailFiltrado.length === 0 &&
                      <Empty>
                        <EmptyHeader>
                          <EmptyMedia variant="icon">
                            <Inbox />
                          </EmptyMedia>
                          <EmptyTitle>Não há escores armazenados para o filtro selecionado.</EmptyTitle>
                          <EmptyDescription>
                            Selecione outro filtro ou desmarque o filtro selecionado.
                          </EmptyDescription>
                        </EmptyHeader>
                      </Empty>
                    }

                    {historicoFrailFiltrado.map((item) => (
                      <HistoryItem
                        escala="Frail"
                        key={item.id}
                        item={item}
                        onVisualizar={async (item) => {
                          const texto = await copiarHistorico(item, CONFIG_FRAIL, { areaTransferencia: false })
                          setMensagem(texto)
                          setDialogVisualizar(true)
                        }}
                        onCopiar={(item) => {
                          copiarHistorico(item, CONFIG_FRAIL)
                        }}
                        onRemover={(item) => {
                          removerFrail(item.id);

                          toast.success("Escore de Frail removido", {
                            description: `Escore ${item.id} removido`
                          });
                        }}
                      />
                    ))}
                  </ItemGroup>
                </div>
              </>
            }
          </ScrollArea>
        )}
      </CardContent>

      <Dialog 
        open={dialogVisualizar}
        onOpenChange={setDialogVisualizar}
      >
        <DialogContent showCloseButton={false}>
          <ScrollArea className="max-h-[80dvw] w-full">
            <pre className="whitespace-pre-wrap rounded-md bg-muted p-2 text-sm">
              {mensagem || "Nenhum conteúdo encontrado."}
            </pre>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </Card>
  )
}