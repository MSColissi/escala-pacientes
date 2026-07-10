export interface Classificacao {
  texto: string;
  color: string;
  proporcao?: string;
  reavaliacao?: string;
}

export function getClassificacaoGlasgow(total: number): Classificacao {
  if (total === 0) {
    return {
      texto: "Sem avaliação",
      color: "text-muted-foreground",
    };
  }

  if (total <= 8) {
    return {
      texto: "Trauma grave",
      color: "text-red-600",
    };
  }

  if (total <= 12) {
    return {
      texto: "Trauma moderado",
      color: "text-yellow-600",
    };
  }

  return {
    texto: "Trauma leve",
    color: "text-green-600",
  };
}

export function getClassificacaoBraden(total: number): Classificacao {
  if (total === 0) {
    return {
      texto: "Sem avaliação",
      color: "text-muted-foreground",
    };
  }

  if (total <= 9) {
    return {
      texto: "Risco muito elevado",
      color: "text-red-700",
      reavaliacao: "24h"
    };
  }

  if (total <= 12) {
    return {
      texto: "Risco elevado",
      color: "text-orange-600",
      reavaliacao: "24h"
    };
  }

  if (total <= 14) {
    return {
      texto: "Risco moderado",
      color: "text-amber-600",
      reavaliacao: "24h"
    };
  }

  if (total <= 18) {
    return {
      texto: "Risco baixo",
      color: "text-yellow-600",
      reavaliacao: "72h"
    };
  }

  return {
    texto: "Sem risco",
    color: "text-green-600",
    reavaliacao: "72h"
  };
}

export function getClassificacaoMorse(total: number | undefined): Classificacao {
  if (total == undefined) {
    return {
      texto: "Sem avaliação",
      color: "text-muted-foreground",
    };
  }

  if (total <= 24) {
    return {
      texto: "Risco baixo",
      color: "text-green-600",
      reavaliacao: "72h"
    };
  }

  if (total <= 44) {
    return {
      texto: "Risco moderado",
      color: "text-yellow-600",
      reavaliacao: "72h"
    };
  }

  return {
    texto: "Trauma Elevado",
    color: "text-red-600",
    reavaliacao: "24h"
  };
}

export function getClassificacaoFugulin(total: number): Classificacao {
  if (total === 0) {
    return {
      texto: "Sem avaliação",
      color: "text-muted-foreground",
    };
  }

  if (total <= 17) {
    return {
      texto: "Cuidado mínimo (paciente estável, autocuidado)",
      color: "text-green-600",
      reavaliacao: "4h",
      proporcao: "1 para 6",
    };
  }

  if (total <= 22) {
    return {
      texto: "Cuidado intermediário (necessita de assistência em alguns momentos)",
      color: "text-yellow-600",
      reavaliacao: "6h",
      proporcao: "1 para 4",
    };
  }

  if (total <= 28) {
    return {
      texto: "Alta dependência (dependência maior para atividades diárias)",
      color: "text-amber-600",
      reavaliacao: "10h",
      proporcao: "1 para 2,4",
    };
  }

  if (total <= 34) {
    return {
      texto: "Cuidado semi-intensivo",
      color: "text-orange-600",
      reavaliacao: "6h",
      proporcao: "1 para 2,4",
    };
  }

  return {
    texto: "Cuidado intensivo (pacientes gravemente instáveis)",
    color: "text-red-700",
    reavaliacao: "18h",
    proporcao: "1 para 1,33",
  };
}

export function getClassificacaoDor(total: number | undefined): Classificacao {
  if (total == undefined) {
    return {
      texto: "Sem avaliação",
      color: "text-muted-foreground",
    };
  }

  if (total === 0) {
    return {
      texto: "Sem dor",
      color: "text-green-600",
    };
  }

  if (total <= 3) {
    return {
      texto: "Dor leve",
      color: "text-yellow-600",
    };
  }

  if (total <= 6) {
    return {
      texto: "Dor moderada",
      color: "text-amber-600",
    };
  }

  return {
    texto: "Dor intensa ou severa",
    color: "text-red-600",
  };
}

export function getClassificacaoFrail(total: number | undefined): Classificacao {
  if (total === undefined) {
    return {
      texto: "Sem avaliação",
      color: "text-muted-foreground",
    };
  }

  if (total === 0) {
    return {
      texto: "Robusto",
      color: "text-green-600",
    };
  }

  if (total <= 3) {
    return {
      texto: "Pré-frágil",
      color: "text-yellow-600",
    };
  }

  return {
    texto: "Frágil",
    color: "text-red-600",
  };
}