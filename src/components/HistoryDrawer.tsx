import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";
import { ClipboardClock, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";

import { ItemGroup } from "@/components/ui/item";

import { HistoryItem } from "./HistoryItem";
import { HistoryResume } from "./HistoryResume";
import { DeleteHistoryDialog } from "./DeleteHistoryDialog";
import { DeleteItemDialog } from "./DeleteItemDialog";
import { useState, type ReactNode } from "react";
import type { Historico } from "@/types/historico";
import type { TiposEscala } from "@/types/escala";

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

  openDeleteHistory,

  onOpenDeleteHistoryChange,

  onVisualizar,
  onCopiar,

  onDeleteItemConfirm,
  onDeleteHistoryConfirm,

  onClearSelection,

  onClose,
}: HistoryDrawerProps) {

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
            <DrawerTitle className="flex items-center gap-2">
              <ClipboardClock />
              Histórico
            </DrawerTitle>

            <DrawerDescription>
              Clique em um item para visualizar os detalhes.
            </DrawerDescription>

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
                  />                
                : resumoFugulin &&
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
                {historico.map((item) => (
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