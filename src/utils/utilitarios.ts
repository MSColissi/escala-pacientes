import type { RefObject } from "react";

export const scrollTop = (scrollAreaRef: RefObject<HTMLDivElement | null>) => {
  const isMobile = window.matchMedia("(max-width: 639px)").matches;
  
  if (isMobile) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    return;
  }

  const viewport = scrollAreaRef.current?.querySelector(
    "[data-radix-scroll-area-viewport]"
  ) as HTMLDivElement | null;

  viewport?.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export function calcularProximaReavaliacao(
  dataISO: string,
  reavaliacaoHoras: number | undefined
): string {
  if (!reavaliacaoHoras) return ""
  const proxima = new Date(
    new Date(dataISO).getTime() + reavaliacaoHoras * 60 * 60 * 1000
  );

  return proxima.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}