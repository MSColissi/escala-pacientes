export interface Historico {
  id: number;
  data: string;
  total: number;
  classificacao: string;
  respostas: Record<number, number>;
  proporcao?: string;
  reavaliacao?: string;
}

export interface HistoricoDor {
  id: number;
  data: string;
  valor: number;
  classificacao: string;
}