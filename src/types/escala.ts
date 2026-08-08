import { escalasBraden, escalasFrail, escalasFugulin, escalasGlasgow, escalasMorse } from "@/data/escalas";
import type { LucideIcon } from "lucide-react";

export interface EscalaItem {
  item: string;
  pontos: number;
}

export interface Escala {
  id: number;
  icon: LucideIcon;
  item: string;
  subItem?: string;
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

export type TiposEscala = "Glasgow" | "Braden" | "Morse" | "Fugulin" | "Dor" | "Frail";

export type ConfigEscala = {
  titulo: string;
  escalas: Escala[];
  perguntas: string[];
};

export const CONFIG_BRADEN: ConfigEscala = {
  titulo: "Escala de Braden",
  escalas: escalasBraden,
  perguntas: [
    "Percepção sensorial",
    "Umidade",
    "Atividade",
    "Mobilidade",
    "Nutrição",
    "Fricção e cisalhamento",
  ],
};

export const CONFIG_FUGULIN: ConfigEscala = {
  titulo: "Escala de Fugulin",
  escalas: escalasFugulin,
  perguntas: [
    "Estado mental",
    "Oxigenação",
    "Sinais vitais",
    "Motilidade",
    "Deambulação",
    "Alimentação",
    "Cuidado corporal",
    "Eliminação",
    "Terapêutica",
    "Integridade cutânea-mucosa",
    "Curativo",
    "Tempo na troca do curativo",
  ],
};

export const CONFIG_GLASGOW: ConfigEscala = {
  titulo: "Escala de Glasgow",
  escalas: escalasGlasgow,
  perguntas: [
    "Ocular",
    "Verbal",
    "Motora",
  ],
};

export const CONFIG_MORSE: ConfigEscala = {
  titulo: "Escala de Morse",
  escalas: escalasMorse,
  perguntas: [
    "Histórico de quedas",
    "Diagnóstico secundário",
    "Auxílio na marcha",
    "Terapia endovenosa",
    "Marcha",
    "Estado mental",
  ],
};

export const CONFIG_FRAIL: ConfigEscala = {
  titulo: "Escala de Frail",
  escalas: escalasFrail,
  perguntas: [
    "Marcha",
    "Força",
    "Fadiga",
    "Perda ponderal",
    "Multimorbidades",
  ],
};

export const CONFIG_DOR: ConfigEscala = {
  titulo: "Escala de Dor",
  escalas: [],
  perguntas: []
}

export const CONFIGS_ESCALAS: Record<TiposEscala, ConfigEscala> = {
  Braden: CONFIG_BRADEN,
  Glasgow: CONFIG_GLASGOW,
  Morse: CONFIG_MORSE,
  Fugulin: CONFIG_FUGULIN,
  Frail: CONFIG_FRAIL,
  Dor: CONFIG_DOR,
};