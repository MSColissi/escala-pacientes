import { useEffect, useState } from "react";
import type { Historico, HistoricoDor } from "../types/historico";

const GLASGOW_STORAGE_KEY = "historico-glasgow";
const BRADEN_STORAGE_KEY = "historico-braden";
const MORSE_STORAGE_KEY = "historico-morse";
const FUGULIN_STORAGE_KEY = "historico-fugulin";
const DOR_STORAGE_KEY = "historico-dor";
const FRAIL_STORAGE_KEY = "historico-frail";

type ItemComId = {
  id: number;
};

export function useGlasgowHistory() {
  return useHistory<Historico>(GLASGOW_STORAGE_KEY);
}

export function useBradenHistory() {
  return useHistory<Historico>(BRADEN_STORAGE_KEY);
}

export function useMorseHistory() {
  return useHistory<Historico>(MORSE_STORAGE_KEY);
}

export function useFugulinHistory() {
  return useHistory<Historico>(FUGULIN_STORAGE_KEY);
}

export function useDorHistory() {
  return useHistory<HistoricoDor>(DOR_STORAGE_KEY);
}

export function useFrailHistory() {
  return useHistory<Historico>(FRAIL_STORAGE_KEY);
}

function useHistory<T extends ItemComId>(storage: string) {
  const [historico, setHistorico] = useState<T[]>(() => {
    const dados = localStorage.getItem(storage);
    return dados ? JSON.parse(dados) : [];
  });

  useEffect(() => {
    localStorage.setItem(storage, JSON.stringify(historico));
  }, [historico, storage]);

  const salvar = (item: T) => {
    setHistorico((prev) => {
      const existe = prev.some((h) => h.id === item.id);

      return existe
        ? prev.map((h) => (h.id === item.id ? item : h))
        : [item, ...prev];
    });
  };

  const remover = (id: number) => {
    setHistorico((prev) => prev.filter((h) => h.id !== id));
  };

  const limpar = () => {
    setHistorico([]);
  };

  return {
    historico,
    salvar,
    remover,
    limpar,
  };
}