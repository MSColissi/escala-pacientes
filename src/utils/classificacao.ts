export interface Classificacao {
  texto: string;
  color: string;
  hora?: string;
  proporcao?: string;
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
      texto: "Risco muito alto",
      color: "text-red-700",
    };
  }

  if (total <= 12) {
    return {
      texto: "Risco alto",
      color: "text-orange-600",
    };
  }

  if (total <= 14) {
    return {
      texto: "Risco moderado",
      color: "text-amber-600",
    };
  }

  if (total <= 18) {
    return {
      texto: "Risco baixo",
      color: "text-yellow-600",
    };
  }

  return {
    texto: "Sem risco",
    color: "text-green-600",
  };
}

export function getClassificacaoMorse(total: number): Classificacao {
  if (total === 0) {
    return {
      texto: "Sem avaliação",
      color: "text-muted-foreground",
    };
  }

  if (total <= 24) {
    return {
      texto: "Risco baixo",
      color: "text-green-600",
    };
  }

  if (total <= 44) {
    return {
      texto: "Risco moderado",
      color: "text-yellow-600",
    };
  }

  return {
    texto: "Trauma Elevado",
    color: "text-red-600",
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
      hora: "4h nas 24h",
      proporcao: "1 enf./6 pac.",
    };
  }

  if (total <= 22) {
    return {
      texto: "Cuidado intermediário (necessita de assistência em alguns momentos)",
      color: "text-yellow-600",
      hora: "6h nas 24h",
      proporcao: "1 enf./4 pac.",
    };
  }

  if (total <= 28) {
    return {
      texto: "Alta dependência (dependência maior para atividades diárias)",
      color: "text-amber-600",
      hora: "10h nas 24h",
      proporcao: "1 enf./2,4 pac.",
    };
  }

  if (total <= 34) {
    return {
      texto: "Cuidado semi-intensivo",
      color: "text-orange-600",
      hora: "6h nas 24h",
      proporcao: "1 enf./2,4 pac.",
    };
  }

  return {
    texto: "Cuidado intensivo (pacientes gravemente instáveis)",
    color: "text-red-700",
    hora: "18h nas 24h",
    proporcao: "1 enf./1,33 pac.",
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