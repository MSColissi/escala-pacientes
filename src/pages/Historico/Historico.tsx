import { HistoryItem } from "@/components/HistoryItem";
import { HistoryItemDor } from "@/components/HistoryItemDor";
import { HistoryResume } from "@/components/HistoryResume";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { ItemGroup } from "@/components/ui/item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useBradenHistory, useDorHistory, useFugulinHistory, useGlasgowHistory, useMorseHistory } from "@/hooks/useHistory";
import { copiarItemBraden, copiarItemDor, copiarItemFugulin, copiarItemGlashow, copiarItemMorse } from "@/utils/clipboard";
import { calcularResumoBraden, calcularResumoDor, calcularResumoFugulin, calcularResumoGlasgow, calcularResumoMorse } from "@/utils/resumo";
import { Inbox, Trash } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent
} from "@/components/ui/dialog";

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

  const [mensagem, setMensagem] = useState("");
  const [dialogVisualizar, setDialogVisualizar] = useState(false);

  const isHistoricoVazio = historicoGlasgow.length === 0 && historicoBraden.length === 0 && historicoMorse.length === 0 && historicoFugulin.length === 0 && historicoDor.length === 0;

  return (
    <Card size="sm" className="w-full max-w-5xl">
      <CardHeader>
        <CardTitle className="font-bold">
          <div className="flex justify-between">
            <h1>Histórico</h1>
            <Button 
              disabled={isHistoricoVazio}
              variant="destructive"
              onClick={() => {
                limparGlasgow()
                limparBraden()
                limparMorse()
                limparFugulin()
                limparDor()

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
                <h2 className="scroll-m-20 pb-2 text-xl font-semibold tracking-tight not-first:mt-2">
                  Escala de Glasgow
                </h2>

                <div className="px-2">
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
                  />

                  <ItemGroup className="gap-4 px-2">
                    {historicoBraden.map((item) => (
                      <HistoryItem
                        escala="Glasgow"
                        key={item.id}
                        item={item}
                        onVisualizar={async (item) => {
                          const texto = await copiarItemGlashow(item, false)
                          setMensagem(texto)
                          setDialogVisualizar(true)
                        }}
                        onCopiar={(item) => {
                          copiarItemGlashow(item)
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
                <h2 className="scroll-m-20 pb-2 text-xl font-semibold tracking-tight not-first:mt-4">
                  Escala de Braden
                </h2>

                <div className="px-2">
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
                        label: "Risco alto",
                        value: resumoBraden.alto,
                        color: "bg-orange-600",
                      },
                      {
                        label: "Risco muito alto",
                        value: resumoBraden.muitoAlto,
                        color: "bg-red-700",
                      },
                    ]}
                    showResumo={false}
                  />

                  <ItemGroup className="gap-4 px-2">
                    {historicoBraden.map((item) => (
                      <HistoryItem
                        escala="Braden"
                        key={item.id}
                        item={item}
                        onVisualizar={async (item) => {
                          const texto = await copiarItemBraden(item, false)
                          setMensagem(texto)
                          setDialogVisualizar(true)
                        }}
                        onCopiar={(item) => {
                          copiarItemBraden(item)
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
                <h2 className="scroll-m-20 pb-2 text-xl font-semibold tracking-tight not-first:mt-4">
                  Escala de Morse
                </h2>

                <div className="px-2">
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
                  />

                  <ItemGroup className="gap-4 px-2">
                    {historicoMorse.map((item) => (
                      <HistoryItem
                        escala="Morse"
                        key={item.id}
                        item={item}
                        onVisualizar={async (item) => {
                          const texto = await copiarItemMorse(item, false)
                          setMensagem(texto)
                          setDialogVisualizar(true)
                        }}
                        onCopiar={(item) => {
                          copiarItemMorse(item)
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
                <h2 className="scroll-m-20 pb-2 text-xl font-semibold tracking-tight not-first:mt-4">
                  Escala de Fugulin
                </h2>
                
                <div className="px-2">
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
                  />

                  <ItemGroup className="gap-4 px-2">
                    {historicoFugulin.map((item) => (
                      <HistoryItem
                        escala="Fugulin"
                        key={item.id}
                        item={item}
                        onVisualizar={async (item) => {
                          const texto = await copiarItemFugulin(item, false)
                          setMensagem(texto)
                          setDialogVisualizar(true)
                        }}
                        onCopiar={(item) => {
                          copiarItemFugulin(item)
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
                <h2 className="scroll-m-20 pb-2 text-xl font-semibold tracking-tight not-first:mt-4">
                  Escala de Dor
                </h2>

                <div className="px-2">
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
                  />

                  <ItemGroup className="gap-4 px-2">
                    {historicoDor.map((item) => (
                      <HistoryItemDor
                        key={item.id}
                        item={item}
                        onVisualizar={async (item) => {
                          const texto = await copiarItemDor(item, false)
                          setMensagem(texto)
                          setDialogVisualizar(true)
                        }}
                        onCopiar={(item) => {
                          copiarItemDor(item)
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
          </ScrollArea>
        )}
      </CardContent>

      <Dialog 
        open={dialogVisualizar}
        onOpenChange={setDialogVisualizar}
      >
        <DialogContent showCloseButton={false}>
          <pre className="whitespace-pre-wrap rounded-md bg-muted p-4 text-sm">
            {mensagem || "Nenhum conteúdo encontrado."}
          </pre>
        </DialogContent>
      </Dialog>
    </Card>
  )
}