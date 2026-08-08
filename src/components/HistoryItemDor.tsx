import {
  Item,
  ItemContent,
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
import { Eye, Copy, Menu, Trash2Icon, CalendarClock } from "lucide-react";
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
      className="bg-white"
    >
      <div className="w-full">
        <ItemContent>
          <div className="flex items-center gap-2 justify-between">
            <ItemTitle className={`
              text-md
              sm:text-xl
              relative
              pl-6
              before:absolute
              before:left-0
              before:top-1/2
              before:-translate-y-1/2
              before:w-3
              before:h-3
              before:rounded-full
              before:content-['']
              ${beforeColor}
            `}
            >
              {item.classificacao.toUpperCase()}
            </ItemTitle>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size={"sm"}
                  variant="ghost"
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

          <div className="flex gap-1 justify-center sm:justify-start items-center text-xs">
            <span>Escala de dor</span> • <span className="bg-gray-200 rounded px-1">{item.valor} Pontos</span>
          </div>

          <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <CalendarClock width={12} strokeWidth={3} />
            <strong>Registrado em:</strong>{new Date(item.data).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
            })}
          </span>
        </ItemContent>
      </div>
    </Item>
  );
}