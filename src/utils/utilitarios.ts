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