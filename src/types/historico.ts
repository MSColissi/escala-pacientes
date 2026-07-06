export interface Historico {
  id: number;
  data: string;
  total: number;
  classificacao: string;
  hora?: string;
  proporcao?: string;
  respostas: Record<number, number>;
}

export interface HistoricoDor {
  id: number;
  data: string;
  valor: number;
  classificacao: string;
}