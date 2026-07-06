import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Eye, Copy, Menu, Trash2Icon } from "lucide-react";
import type { HistoricoDor } from "@/types/historico";


interface HistoryItemProps {
  item: HistoricoDor;

  onVisualizar: (item: HistoricoDor) => void;
  onCopiar: (item: HistoricoDor) => void;
  onRemover: (item: HistoricoDor) => void;
}

export function HistoryItemDor({
  item,
  onVisualizar,
  onCopiar,
  onRemover,
}: HistoryItemProps) {
  function getBeforeColor(
    total: number
  ): string {
    if (total <= 0) return "before:bg-green-600";
    if (total <= 3) return "before:bg-yellow-600";
    if (total <= 6) return "before:bg-amber-600";
    return "before:bg-red-600";
  }

  const beforeColor = getBeforeColor(item.valor);

  return (
    <Item
      variant="outline"
      className={`
        relative
        overflow-hidden
        before:absolute
        before:inset-y-0
        before:left-0
        before:w-1
        before:rounded-l-[inherit]
        ${beforeColor}
      `}
    >
      <div className="grid items-center w-full">
        <div
          className="flex flex-1 gap-2 items-center text-left cursor-pointer"
          onClick={() => onVisualizar(item)}
        >
          <ItemMedia variant="image" className="text-3xl">
            {item.valor}
          </ItemMedia>

          <ItemContent>
            <ItemTitle>{item.classificacao}</ItemTitle>
            <ItemDescription className="text-xs">
              {item.data}
            </ItemDescription>
          </ItemContent>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={(e) => e.stopPropagation()}
                onPointerDown={(e) => e.stopPropagation()}
              >
                <Menu />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent side="left" align="start" className="w-auto">

              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => onVisualizar(item)}
              >
                <Eye />
                Visualizar
              </DropdownMenuItem>

              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => onCopiar(item)}
              >
                <Copy />
                Copiar
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="cursor-pointer text-red-600"
                onClick={() => onRemover(item)}
              >
                <Trash2Icon />
                Remover
              </DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Item>
  );
}