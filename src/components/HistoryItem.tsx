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
import { Eye, Copy, Menu, Trash2Icon, Timer, Users, CalendarClock, TriangleAlert, CircleAlert, ListTodo, ShieldAlert } from "lucide-react";
import type { Historico } from "@/types/historico";
import { CONFIGS_ESCALAS, type TiposEscala } from "@/types/escala";
import { Badge } from "./ui/badge";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { calcularProximaReavaliacao } from "@/utils/utilitarios";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Separator } from "./ui/separator";
import { obterTextoResposta } from "@/utils/clipboard";

interface HistoryItemProps {
  escala: TiposEscala;
  item: Historico;

  onVisualizar: (item: Historico) => void;
  onCopiar: (item: Historico) => void;
  onRemover: (item: Historico) => void;
}

const MAX_CUIDADOS = 3;

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
    else if (escala === "Frail") {
      if (total <= 0) return "before:bg-green-600";
      if (total <= 3) return "before:bg-yellow-600";
      return "before:bg-red-600";
    }
    // Morse
    if (total <= 24) return "before:bg-green-600";
    if (total <= 44) return "before:bg-yellow-600";
    return "before:bg-red-600";
  }

  const beforeColor = getBeforeColor(escala, item.total);

  const [valueCuidados, setValueCuidados] = useState("");
  const [valueRespostas, setValueRespostas] = useState("");
  const [openTooltip, setOpenTooltip] = useState(false);
  
  const proxima = calcularProximaReavaliacao(
    item.data,
    item.reavaliacao
  );

  const config = CONFIGS_ESCALAS[escala];

  const respostas =
    escala === "Dor"
      ? []
      : Object.entries(item.respostas).map(([id, valor]) => ({
          pergunta: config.perguntas[Number(id) - 1],
          resposta: obterTextoResposta(
            config.escalas,
            Number(id),
            valor
          ),
        })).sort((a, b) =>
    a.pergunta.localeCompare(b.pergunta, "pt-BR", {
      sensitivity: "base",
    })
  );

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
            <span>{escala}</span> • <span className="bg-gray-200 rounded px-1">{item.total} Pontos</span>
          </div>

          <Separator className="my-1" />

          {(item.reavaliacao || item.proporcao || item.observacao) &&
            <div className="text-xs flex flex-wrap gap-2">
              {item.observacao &&
                <Badge className={`mt-1 w-full sm:w-auto flex-wrap h-auto ${beforeColor.replace("before:","")} font-normal`}>
                  <ShieldAlert width={12} strokeWidth={3} data-icon="inline-start" />
                  {item.observacao}
                </Badge>
              }

              {item.reavaliacao && 
                <Tooltip open={openTooltip} onOpenChange={setOpenTooltip}>
                  <TooltipTrigger asChild>
                    <Badge 
                      onClick={() => setOpenTooltip(!openTooltip)}
                      className="mt-1 w-full sm:w-auto flex-wrap h-auto cursor-help font-normal"
                    >
                      <Timer width={12} strokeWidth={3} data-icon="inline-start" />
                      Reavaliar em {item.reavaliacao}h
                    </Badge>
                  </TooltipTrigger>

                  <TooltipContent>
                    <p>Próxima reavaliação: {proxima}</p>
                  </TooltipContent>
                </Tooltip>
              }

              {item.proporcao && 
                <Badge className="mt-1 w-full sm:w-auto flex-wrap h-auto font-normal">
                  <Users width={12} strokeWidth={3} data-icon="inline-start" />
                  <>
                    <span className="sm:hidden">
                      Prop. enf. / pac.: {item.proporcao}
                    </span>
                    <span className="hidden sm:inline">
                      Proporção enfermeiro / paciente: {item.proporcao}
                    </span>
                  </>
                </Badge>
              }
              
              <Separator className="my-1" />
            </div>

          }

          <div className="text-xs">
            {item.orientacao && item.orientacao.length > 0 && 
              <>
                <span className="mt-1 flex gap-1 text-left items-center">
                  <CircleAlert width={12} strokeWidth={3} />
                  <strong>Orientações recomendadas:</strong>
                </span>
                <ul className="text-justify pl-0 sm:pl-2">
                  {item.orientacao.map((orientacao, index) => (
                    <li key={index} className="grid grid-cols-[14px_auto] items-start not-last:mb-1">
                      • <span>{orientacao}</span>
                    </li>
                  ))}
                </ul>
              </>
            }

            {item.cuidado && item.cuidado.length > 0 && (
              <div>
                <span className="mt-1 flex gap-1 text-left items-center">
                  <TriangleAlert width={12} strokeWidth={3} />
                  <strong>Cuidados recomendados:</strong>
                </span>

                <ul className="space-y-1 text-justify sm:pl-2">
                  {item.cuidado.slice(0, MAX_CUIDADOS).map((cuidado, index) => (
                    <li key={index} className="grid grid-cols-[14px_auto] items-start not-last:mb-1">
                      • <span>{cuidado}</span>
                    </li>
                  ))}
                </ul>

                {item.cuidado.length > MAX_CUIDADOS && (
                  <Accordion 
                    type="single" 
                    collapsible 
                    className="mt-2"
                    value={valueCuidados}
                    onValueChange={setValueCuidados}
                  >
                    <AccordionItem value="cuidados" className="border-none">
                      <AccordionTrigger className="w-fit py-0 text-xs text-primary cursor-pointer hover:no-underline">
                        {valueCuidados === "cuidados"
                          ? "Mostrar menos"
                          : `Mostrar +${item.cuidado.length - MAX_CUIDADOS} cuidados`}
                      </AccordionTrigger>

                      <AccordionContent className="h-auto p-0">
                        <ul className="space-y-1 text-justify sm:pl-2 text-xs mt-2">
                          {item.cuidado.slice(MAX_CUIDADOS).map((cuidado, index) => (
                            <li key={index} className="grid grid-cols-[14px_auto] items-start not-last:mb-1">
                              • <span>{cuidado}</span>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}
              </div>
            )}

            <span className="mt-1 flex gap-1 text-left items-center">
              <ListTodo width={12} strokeWidth={3} />
              <strong>Respostas:</strong>
            </span>

            {respostas.slice(0, MAX_CUIDADOS).map(({ pergunta, resposta }) => (
              <div key={pergunta} className="grid grid-cols-1 sm:grid-cols-[200px_1fr] text-xs pl-0 sm:pl-2 not-last:mb-2">
                <span className="font-medium">
                  • {pergunta}:
                </span>
                <span className="break-all">{resposta}</span>
              </div>
            ))}

            {respostas.length > MAX_CUIDADOS && (
              <Accordion 
                type="single" 
                collapsible 
                className="mt-2"
                value={valueRespostas}
                onValueChange={setValueRespostas}
              >
                <AccordionItem value="respostas" className="border-none">
                  <AccordionTrigger className="w-fit py-0 text-xs text-primary cursor-pointer hover:no-underline">
                    {valueRespostas === "respostas"
                      ? "Mostrar menos"
                      : `Mostrar +${respostas.length - MAX_CUIDADOS} respostas`}
                  </AccordionTrigger>

                  <AccordionContent className="h-auto p-0">
                    {respostas.slice(MAX_CUIDADOS).map(({ pergunta, resposta }) => (
                      <div key={pergunta} className="grid grid-cols-1 sm:grid-cols-[200px_1fr] text-xs pl-0 sm:pl-2 not-last:mb-2">
                        <span className="font-medium">
                          • {pergunta}:
                        </span>
                        <span className="break-all">{resposta}</span>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}

            <span className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
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
          </div>

        </ItemContent>
      </div>
    </Item>
  );
}