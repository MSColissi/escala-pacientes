export interface Historico {
  id: number;
  data: string;
  total: number;
  classificacao: string;
  respostas: Record<number, number>;
  proporcao?: string;
  reavaliacao?: number;
  orientacao?: string[];
  cuidado?: string[];
  observacao?: string;
}

export interface HistoricoDor {
  id: number;
  data: string;
  valor: number;
  classificacao: string;
}

export type HistoricoBase = Historico | HistoricoDor;