import type { RefObject } from "react";

export const scrollTop = (scrollAreaRef: RefObject<HTMLDivElement | null>) => {
  const viewport = scrollAreaRef.current?.querySelector(
    "[data-radix-scroll-area-viewport]"
  ) as HTMLDivElement | null;

  viewport?.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};