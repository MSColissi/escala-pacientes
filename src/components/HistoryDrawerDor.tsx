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

import { HistoryResume } from "./HistoryResume";
import { DeleteHistoryDialog } from "./DeleteHistoryDialog";
import { DeleteItemDialog } from "./DeleteItemDialog";
import { useState, type ReactNode } from "react";
import type { HistoricoDor } from "@/types/historico";
import { HistoryItemDor } from "./HistoryItemDor";

interface HistoryDrawerProps {
  children: ReactNode;

  open: boolean;
  onOpenChange: (open: boolean) => void;

  historico: HistoricoDor[];

  resumo: {
    semDor: number;
    dorLeve: number;
    dorModerada: number;
    dorIntensaSevera: number;
  };

  openDeleteHistory: boolean;
  onOpenDeleteHistoryChange: (open: boolean) => void;

  onVisualizar: (item: HistoricoDor) => void;
  onCopiar: (item: HistoricoDor) => void;

  onDeleteItemConfirm: (item: HistoricoDor) => void;
  onDeleteHistoryConfirm: () => void;

  onClearSelection: () => void;
  onClose: () => void;
}

export function HistoryDrawerDor({
  children,

  open,
  onOpenChange,

  historico,
  resumo,

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
    useState<HistoricoDor | null>(null);

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

            <HistoryResume
              escala="Dor"
              itens={[
                {
                  label: "Sem dor",
                  value: resumo.semDor,
                  color: "bg-green-600",
                },
                {
                  label: "Dor leve",
                  value: resumo.dorLeve,
                  color: "bg-yellow-600",
                },
                {
                  label: "Dor moderada",
                  value: resumo.dorModerada,
                  color: "bg-amber-600",
                },
                {
                  label: "Dor intensa ou severa",
                  value: resumo.dorIntensaSevera,
                  color: "bg-red-600",
                },
              ]}
            />

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
                  <HistoryItemDor
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