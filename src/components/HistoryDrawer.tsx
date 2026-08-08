import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";
import { ClipboardClock, Inbox, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";

import { ItemGroup } from "@/components/ui/item";

import { HistoryItem } from "./HistoryItem";
import { HistoryResume } from "./HistoryResume";
import { DeleteHistoryDialog } from "./DeleteHistoryDialog";
import { DeleteItemDialog } from "./DeleteItemDialog";
import { useState, type ReactNode } from "react";
import type { Historico } from "@/types/historico";
import type { TiposEscala } from "@/types/escala";
import { filtrarHistorico } from "@/pages/Historico/Historico";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "./ui/empty";

interface HistoryDrawerProps {
  escala: TiposEscala;

  children: ReactNode;

  open: boolean;
  onOpenChange: (open: boolean) => void;

  historico: Historico[];

  resumoGlasgow?: {
    leve: number;
    moderado: number;
    grave: number;
  };

  resumoBraden?: {
    muitoAlto: number;
    alto: number;
    moderado: number;
    baixo: number;
    semRisco: number;
  };

  resumoMorse?: {
    baixo: number;
    moderado: number;
    elevado: number;
  };

  resumoFugulin?: {
    minimo: number;
    intermediario: number;
    altaDependencia: number;
    semiIntensivo: number;
    intensivo: number;
  };

  resumoFrail?: {
    robusto: number;
    preFragil: number;
    fragil: number;
  },

  openDeleteHistory: boolean;
  onOpenDeleteHistoryChange: (open: boolean) => void;

  onVisualizar: (item: Historico) => void;
  onCopiar: (item: Historico) => void;

  onDeleteItemConfirm: (item: Historico) => void;
  onDeleteHistoryConfirm: () => void;

  onClearSelection: () => void;
  onClose: () => void;
}

export function HistoryDrawer({
  escala,

  children,

  open,
  onOpenChange,

  historico,
  resumoGlasgow,
  resumoBraden,
  resumoMorse,
  resumoFugulin,
  resumoFrail,

  openDeleteHistory,

  onOpenDeleteHistoryChange,

  onVisualizar,
  onCopiar,

  onDeleteItemConfirm,
  onDeleteHistoryConfirm,

  onClearSelection,

  onClose,
}: HistoryDrawerProps) {

  const [filtro, setFiltro] = useState<{
    escala: string;
    classificacao: string;
  } | null>(null);

  const historicoFiltrado = filtrarHistorico(
    historico,
    escala,
    filtro
  );

  const [openDeleteItem, setOpenDeleteItem] = useState(false);
  const [itemParaExcluir, setItemParaExcluir] =
    useState<Historico | null>(null);

  return (
    <>
      <Drawer 
        autoFocus
        direction="right"
        open={open} 
        onOpenChange={onOpenChange}
      >
        <DrawerTrigger asChild>
          {children}
        </DrawerTrigger>

        <DrawerContent className="data-[vaul-drawer-direction=bottom]:max-h-[50vh] data-[vaul-drawer-direction=top]:max-h-[50vh]">
          <DrawerHeader>
            <DrawerTitle className="flex justify-center gap-2 items-center">
              <ClipboardClock width={16} />
              Histórico
            </DrawerTitle>

            <Separator />

            {
              resumoGlasgow
              ?
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
              : resumoBraden
                ?
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
                : resumoMorse 
                  ?
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
                  : resumoFugulin 
                    ?
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
                    : resumoFrail &&
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
            }

            <Separator />
          </DrawerHeader>

          <div className="no-scrollbar overflow-y-auto px-4 space-y-3">
            {historico.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground py-10">
                Nenhum escore salvo
              </p>
            ) : (
              <ItemGroup className="gap-4">
                {historicoFiltrado.length === 0 &&
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

                {historicoFiltrado.map((item) => (
                  <HistoryItem
                    escala={escala}
                    key={item.id}
                    item={item}
                    onVisualizar={onVisualizar}
                    onCopiar={(item) => {
                      onCopiar(item)
                    }}
                    onRemover={(item) => {
                      setItemParaExcluir(item);
                      setOpenDeleteItem(true);
                    }}
                  />
                ))}
              </ItemGroup>
            )}
          </div>

          <DrawerFooter className="gap-2">
            
            <Button
              disabled={historico.length === 0}
              variant="destructive"
              className="cursor-pointer"
              onClick={() => onOpenDeleteHistoryChange(true)}
            >
              <ClipboardClock />
              Remover histórico
            </Button>

            <DrawerClose asChild>
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={() => {
                  onClearSelection();
                  onClose();
                }}
              >
                <X />
                Fechar
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <DeleteItemDialog
        open={openDeleteItem}
        item={itemParaExcluir}
        onOpenChange={(open) => {
          setOpenDeleteItem(open);

          if (!open) {
            setItemParaExcluir(null);
          }
        }}
        onConfirm={() => {
          if (!itemParaExcluir) return;

          onDeleteItemConfirm(itemParaExcluir);

          setOpenDeleteItem(false);
          setItemParaExcluir(null);
        }}
      />

      <DeleteHistoryDialog
        open={openDeleteHistory}
        quantidade={historico.length}
        onOpenChange={onOpenDeleteHistoryChange}
        onConfirm={onDeleteHistoryConfirm}
      />
    </>
  );
}