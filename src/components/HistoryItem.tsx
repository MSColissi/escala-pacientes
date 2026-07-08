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
import { Eye, Copy, Menu, Trash2Icon, Timer, Users } from "lucide-react";
import type { Historico } from "@/types/historico";
import type { TiposEscala } from "@/types/escala";
import { Badge } from "./ui/badge";

interface HistoryItemProps {
  escala: TiposEscala;
  item: Historico;

  onVisualizar: (item: Historico) => void;
  onCopiar: (item: Historico) => void;
  onRemover: (item: Historico) => void;
}

export function HistoryItem({
  escala,
  item,
  onVisualizar,
  onCopiar,
  onRemover,
}: HistoryItemProps) {
  function getBeforeColor(
    escala: TiposEscala,
    total: number
  ): string {
    if (escala === "Glasgow") {
      if (total <= 8) return "before:bg-red-600";
      if (total <= 12) return "before:bg-yellow-600";
      return "before:bg-green-600";
    }
    else if (escala === "Braden") {
      if (total <= 9) return "before:bg-red-700";
      if (total <= 12) return "before:bg-orange-600";
      if (total <= 14) return "before:bg-amber-600";
      if (total <= 18) return "before:bg-yellow-600";
      return "before:bg-green-600";
    }
    else if (escala === "Fugulin") {
      if (total <= 17) return "before:bg-green-600";
      if (total <= 22) return "before:bg-yellow-600";
      if (total <= 28) return "before:bg-amber-600";
      if (total <= 33) return "before:bg-orange-600";
      return "before:bg-red-600";
    }
    // Morse
    if (total <= 24) return "before:bg-green-600";
    if (total <= 44) return "before:bg-yellow-600";
    return "before:bg-red-600";
  }

  const beforeColor = getBeforeColor(escala, item.total);

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
        {item.hora && 
          <div className="pb-2">
            <div className="flex flex-wrap gap-2">
              <Badge variant="default" className="w-full sm:w-auto">
                <Timer />
                {item.hora}
              </Badge>
              <Badge variant="default" className="w-full sm:w-auto">
                <Users />
                {item.proporcao}
              </Badge>  
            </div>
          </div>
        }
        {item.reavaliacao && 
          <div className="pb-2">
            <div className="flex flex-wrap gap-2">
              <Badge variant="default" className="w-full sm:w-auto">
                <Timer />
                Reavaliar em {item.reavaliacao}
              </Badge>
            </div>
          </div>
        }
        <div
          className="flex flex-1 gap-2 items-center text-left"
        >
          <ItemMedia variant="image" className="text-3xl">
            {item.total}
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