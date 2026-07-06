import type { Escala, EscalaDor } from "@/types/escala";
import { Activity, Accessibility, BicepsFlexed, Brain, ClipboardClock, Droplets, FilePenLine, Salad, ShieldAlert, Siren, Speech, SportShoe, Syringe, View, Wind, Footprints, ShowerHead, Toilet, Tablets, Bandage, Blend, Timer, Smile, Laugh, Meh, Frown } from "lucide-react";

export const escalasGlasgow: Escala[] = [
  {
    id: 1,
    icon: View,
    item: "Resposta ocular",
    itens: [
      { item: "Espontânea", pontos: 4 },
      { item: "Ao som", pontos: 3 },
      { item: "À pressão", pontos: 2 },
      { item: "Nenhuma", pontos: 1 },
    ],
  },
  {
    id: 2,
    icon: Speech,
    item: "Resposta verbal",
    itens: [
      { item: "Orientado", pontos: 5 },
      { item: "Confuso", pontos: 4 },
      { item: "Palavras", pontos: 3 },
      { item: "Sons", pontos: 2 },
      { item: "Nenhuma", pontos: 1 },
    ],
  },
  {
    id: 3,
    icon: BicepsFlexed,
    item: "Resposta motora",
    itens: [
      { item: "Obedece a comandos", pontos: 6 },
      { item: "Localiza dor", pontos: 5 },
      { item: "Retirada à dor", pontos: 4 },
      { item: "Flexão anormal", pontos: 3 },
      { item: "Extensão anormal", pontos: 2 },
      { item: "Nenhuma", pontos: 1 },
    ],
  },
];

export const escalasBraden: Escala[] = [
  {
    id: 1,
    icon: Siren,
    item: "Percepcao sensorial",
    itens: [
      { item: "Totalmente limitado", pontos: 1 },
      { item: "Muito limitado", pontos: 2 },
      { item: "Ligeiramente limitado", pontos: 3 },
      { item: "Nenhuma limitação", pontos: 4 },
    ],
  },
  {
    id: 2,
    icon: Droplets,
    item: "Umidade",
    itens: [
      { item: "Constantemente úmida", pontos: 1 },
      { item: "Muito úmida", pontos: 2 },
      { item: "Ocasionalmente úmida", pontos: 3 },
      { item: "Raramente úmida", pontos: 4 },
    ],
  },
  {
    id: 3,
    icon: SportShoe,
    item: "Atividade",
    itens: [
      { item: "Acamado", pontos: 1 },
      { item: "Confinado à cadeira", pontos: 2 },
      { item: "Deambula ocasionalmente", pontos: 3 },
      { item: "Deambula frequentemente", pontos: 4 },
    ],
  },
  {
    id: 4,
    icon: Accessibility,
    item: "Mobilidade",
    itens: [
      { item: "Totalmente imóvel", pontos: 1 },
      { item: "Muito limitada", pontos: 2 },
      { item: "Ligeiramente limitada", pontos: 3 },
      { item: "Nenhuma limitação", pontos: 4 },
    ],
  },
  {
    id: 5,
    icon: Salad,
    item: "Nutricao",
    itens: [
      { item: "Muito pobre", pontos: 1 },
      { item: "Provavelmente inadequada", pontos: 2 },
      { item: "Adequada", pontos: 3 },
      { item: "Excelente", pontos: 4 },
    ],
  },
  {
    id: 6,
    icon: ShieldAlert,
    item: "Fricção e cisalhamento",
    itens: [
      { item: "Problema", pontos: 1 },
      { item: "Problema potencial", pontos: 2 },
      { item: "Nehum problema aparente", pontos: 3 },
    ],
  },
];

export const escalasMorse: Escala[] = [
  {
    id: 1,
    icon: ClipboardClock,
    item: "Histórico de quedas",
    itens: [
      { item: "Não", pontos: 0 },
      { item: "Sim", pontos: 25 },
    ],
  },
  {
    id: 2,
    icon: FilePenLine,
    item: "Diagnóstico secundário",
    itens: [
      { item: "Não", pontos: 0 },
      { item: "Sim", pontos: 15 },
    ],
  },
  {
    id: 3,
    icon: Accessibility,
    item: "Auxílio na marcha",
    itens: [
      { item: "Nenhum/Acamado/Cadeira de rodas", pontos: 0 },
      { item: "Muletas/Bengala/Andador", pontos: 15 },
      { item: "Mobiliário", pontos: 30 },
    ],
  },
  {
    id: 4,
    icon: Syringe,
    item: "Terapia endovenosa",
    itens: [
      { item: "Não", pontos: 0 },
      { item: "Sim", pontos: 20 },
    ],
  },
  {
    id: 5,
    icon: Accessibility,
    item: "Marcha",
    itens: [
      { item: "Normal/Acamado/Cadeira de rodas", pontos: 0 },
      { item: "Fraca", pontos: 10 },
      { item: "Comprometida/Cambaleante", pontos: 20 },
    ],
  },
  {
    id: 6,
    icon: Brain,
    item: "Estado mental",
    itens: [
      { item: "Orientado quanto às suas capacidades/limitações", pontos: 0 },
      { item: "Superestima capacidades/Esquece limitações", pontos: 15 },
    ],
  },
];

export const escalasFugulin: Escala[] = [
  {
    id: 1,
    icon: Brain,
    item: "Estado mental",
    itens: [
      { item: "Inconsciente", pontos: 4 },
      { item: "Períodos de iconsciência", pontos: 3 },
      { item: "Períodos de desorientação", pontos: 2 },
      { item: "Orientação no tempo e espaço", pontos: 1 },
    ],
  },
  {
    id: 2,
    icon: Wind,
    item: "Oxigenação",
    itens: [
      { item: "Ventilação mecânica", pontos: 4 },
      { item: "Uso contínuo de máscara ou cat. de O2", pontos: 3 },
      { item: "Uso intermitente de máscara ou cat. de O2", pontos: 2 },
      { item: "Não depende de oxigênio", pontos: 1 },
    ],
  },
  {
    id: 3,
    icon: Activity,
    item: "Sinais Vitais",
    itens: [
      { item: "Controle 2/2h", pontos: 4 },
      { item: "Controle em intervalos de 04 horas", pontos: 3 },
      { item: "Controle em intervalos 06h", pontos: 2 },
      { item: "Controle de rotina (8/8h)", pontos: 1 },
    ],
  },
  {
    id: 4,
    icon: Footprints,
    item: "Motilidade",
    itens: [
      { item: "Incapaz de movimentar qualquer segmento corporal. Necessita da equipe de enfermagem para mudar de decúbito", pontos: 4 },
      { item: "Dificuldade para movimentar segmentos corporais. Mudança de decúbito e movimentação passiva auxiliada pela enfermagem", pontos: 3 },
      { item: "Limitação de movimentos", pontos: 2 },
      { item: "Movimenta todos os segmentos corporais", pontos: 1 },
    ],
  },
  {
    id: 5,
    icon: Accessibility,
    item: "Deambulação",
    itens: [
      { item: "Restrito ao leito", pontos: 4 },
      { item: "Locomoção através de cadeiras de rodas", pontos: 3 },
      { item: "Necessita de auxílio para deambular", pontos: 2 },
      { item: "Deambula sozinho", pontos: 1 },
    ],
  },
  {
    id: 6,
    icon: Salad,
    item: "Alimentação",
    itens: [
      { item: "Através de cateter central", pontos: 4 },
      { item: "Através de catéter enteral", pontos: 3 },
      { item: "Oral com auxílio", pontos: 2 },
      { item: "Autossuficiente", pontos: 1 },
    ],
  },
  {
    id: 7,
    icon: ShowerHead,
    item: "Cuidado corporal",
    itens: [
      { item: "Banho no leito pela equipe de enfermagem", pontos: 4 },
      { item: "Banho no chuveiro e higiene oral pela equipe de enfermagem", pontos: 3 },
      { item: "Banho no chuveiro e higiene oral auxiliados pela equipe de enfermagem", pontos: 2 },
      { item: "Autossuficiente", pontos: 1 },
    ],
  },
  {
    id: 8,
    icon: Toilet,
    item: "Eliminação",
    itens: [
      { item: "Evacuação no leito e uso de cateter vesical de demora", pontos: 4 },
      { item: "Uso de comadre ou eliminação no leito", pontos: 3 },
      { item: "Uso de vaso sanitário com auxílio", pontos: 2 },
      { item: "Autossuficiente", pontos: 1 },
    ],
  },
  {
    id: 9,
    icon: Tablets,
    item: "Terapêutica",
    itens: [
      { item: "Uso de droga vasoativas", pontos: 4 },
      { item: "E.V. contínua ou através de cateter", pontos: 3 },
      { item: "E.V. intermitente", pontos: 2 },
      { item: "I.M. ou V.O.", pontos: 1 },
    ],
  },
  {
    id: 10,
    icon: Blend,
    item: "Integridade cutânea-mucosa",
    itens: [
      { item: "Destruição atinge músculo, tendões", pontos: 4 },
      { item: "Solução de continuidade envolve subcutâneo e músculo, ostomias...", pontos: 3 },
      { item: "Alteração da cor da pele e/ou comp. derme", pontos: 2 },
      { item: "Pele íntegra", pontos: 1 },
    ],
  },
  {
    id: 11,
    icon: Bandage,
    item: "Curativo",
    itens: [
      { item: "Troca de curativo 3x dia", pontos: 4 },
      { item: "Troca de curativo até 2x dia", pontos: 3 },
      { item: "Troca de curativo 1x dia", pontos: 2 },
      { item: "Sem curativo", pontos: 1 },
    ],
  },
  {
    id: 12,
    icon: Timer,
    item: "Tempo na troca do curativo",
    itens: [
      { item: "Tempo de troca > 30min", pontos: 4 },
      { item: "Tempo de troca entre 15 e 30min ", pontos: 3 },
      { item: "Tempo de troca entre 5 e 15min", pontos: 2 },
      { item: "Sem curativo hig, no banho", pontos: 1 },
    ],
  },
];

export const escalasDor: EscalaDor[] = [
  {
    id: 1,
    icon: Laugh,
    item: "Sem dor",
    min: 0,
    max: 0,
    color: "text-green-600"
  },
  {
    id: 2,
    icon: Smile,
    item: "Dor leve",
    min: 1,
    max: 3,
    color: "text-yellow-600"
  },
  {
    id: 3,
    icon: Meh,
    item: "Dor moderada",
    min: 4,
    max: 6,
    color: "text-amber-600"
  },
  {
    id: 4,
    icon: Frown,
    item: "Dor intensa ou severa",
    min: 7,
    max: 10,
    color: "text-red-600"
  },
]