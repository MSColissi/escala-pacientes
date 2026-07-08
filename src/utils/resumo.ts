import type { Historico, HistoricoDor } from "@/types/historico";

export const calcularResumoBraden = (historico: Historico[]) => {
  return historico.reduce(
    (acc, item) => {
      if (item.total >= 19) acc.semRisco++;
      else if (item.total >= 15) acc.baixo++;
      else if (item.total >= 13) acc.moderado++;
      else if (item.total >= 10) acc.alto++;
      else acc.muitoAlto++;

      return acc;
    },
    {
      muitoAlto: 0,
      alto: 0,
      moderado: 0,
      baixo: 0,
      semRisco: 0
    },
  );
}

export const calcularResumoDor = (historico: HistoricoDor[]) => {
  return historico.reduce(
    (acc, item) => {
      if (item.valor === 0) acc.semDor++;
      else if (item.valor <= 3) acc.dorLeve++;
      else if (item.valor <= 6) acc.dorModerada++;
      else acc.dorIntensaSevera++;

      return acc;
    },
    {
      semDor: 0,
      dorLeve: 0,
      dorModerada: 0,
      dorIntensaSevera: 0
    },
  );
}

export const calcularResumoFugulin = (historico: Historico[]) => {
  return historico.reduce(
    (acc, item) => {
      if (item.total >= 34) acc.intensivo++;
      else if (item.total >= 29) acc.semiIntensivo++;
      else if (item.total >= 23) acc.altaDependencia++;
      else if (item.total >= 18) acc.intermediario++;
      else acc.minimo++;

      return acc;
    },
    {
      intensivo: 0,
      semiIntensivo: 0,
      altaDependencia: 0,
      intermediario: 0,
      minimo: 0
    },
  );
}

export const calcularResumoGlasgow = (historico: Historico[]) => {
  return historico.reduce(
    (acc, item) => {
      if (item.total > 12) acc.leve++;
      else if (item.total > 8) acc.moderado++;
      else acc.grave++;

      return acc;
    },
    {
      leve: 0,
      moderado: 0,
      grave: 0,
    },
  );
}

export const calcularResumoMorse = (historico: Historico[]) => {
  return historico.reduce(
    (acc, item) => {
      if (item.total >= 45) acc.elevado++;
      else if (item.total >= 25) acc.moderado++;
      else acc.baixo++;

      return acc;
    },
    {
      elevado: 0,
      moderado: 0,
      baixo: 0,
    },
  );
}

export const calcularResumoFrail = (historico: Historico[]) => {
  return historico.reduce(
    (acc, item) => {
      if (item.total === 0) acc.robusto++;
      else if (item.total <= 3) acc.preFragil++;
      else acc.fragil++;

      return acc;
    },
    {
      robusto: 0,
      preFragil: 0,
      fragil: 0
    },
  );
}