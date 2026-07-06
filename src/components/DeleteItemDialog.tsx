import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { Historico, HistoricoDor } from "@/types/historico";

import { Trash2Icon } from "lucide-react";


interface DeleteItemDialogProps {
  open: boolean;
  item?: Historico | HistoricoDor | null;

  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function DeleteItemDialog({
  open,
  item,
  onOpenChange,
  onConfirm,
}: DeleteItemDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent size="sm">

        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>

          <AlertDialogTitle>
            Deseja remover o registro {item?.id}?
          </AlertDialogTitle>

          <AlertDialogDescription>
            Isso irá remover o registro selecionado do histórico.
            Essa ação não poderá ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel variant="outline" className="cursor-pointer">
            Cancelar
          </AlertDialogCancel>

          <AlertDialogAction
            variant="destructive"
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onConfirm();
            }}
          >
            Remover
          </AlertDialogAction>
        </AlertDialogFooter>

      </AlertDialogContent>
    </AlertDialog>
  );
}