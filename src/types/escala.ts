import type { LucideIcon } from "lucide-react";

export interface EscalaItem {
  item: string;
  pontos: number;
}

export interface Escala {
  id: number;
  icon: LucideIcon;
  item: string;
  itens: EscalaItem[];
}

export interface EscalaDor {
  id: number;
  icon: LucideIcon;
  item: string;
  min: number;
  max: number;
  color: string;
}

export type TiposEscala = "Glasgow" | "Braden" | "Morse" | "Fugulin" | "Dor";