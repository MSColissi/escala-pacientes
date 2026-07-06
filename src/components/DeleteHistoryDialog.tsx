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

import { Trash2Icon } from "lucide-react";

interface DeleteHistoryDialogProps {
  open: boolean;
  quantidade: number;

  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function DeleteHistoryDialog({
  open,
  quantidade,
  onOpenChange,
  onConfirm,
}: DeleteHistoryDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent size="sm">

        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>

          <AlertDialogTitle>
            Deseja remover todo o histórico?
          </AlertDialogTitle>

          <AlertDialogDescription>
            Isso irá remover {quantidade} registro(s) do histórico.
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
            Remover tudo
          </AlertDialogAction>
        </AlertDialogFooter>

      </AlertDialogContent>
    </AlertDialog>
  );
}