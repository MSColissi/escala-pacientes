export interface Classificacao {
  texto: string;
  subtexto?: string;
  color: string;
  proporcao?: string;
  reavaliacao?: number; //horas
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
      reavaliacao: 24
    };
  }

  if (total <= 12) {
    return {
      texto: "Risco elevado",
      color: "text-orange-600",
      reavaliacao: 24
    };
  }

  if (total <= 14) {
    return {
      texto: "Risco moderado",
      color: "text-amber-600",
      reavaliacao: 24
    };
  }

  if (total <= 18) {
    return {
      texto: "Risco baixo",
      color: "text-yellow-600",
      reavaliacao: 72
    };
  }

  return {
    texto: "Sem risco",
    color: "text-green-600",
    reavaliacao: 72
  };
}

export function getOrientacoesBraden(total: number): string[] {
  if (total === 0) {
    return []
  }

  if (total <= 9) {
    return [
      "Paciente com elevado risco para desenvolvimento de lesão por pressão."
    ]
  }

  if (total <= 12) {
    return [
      "Implementar protocolo institucional de prevenção."
    ]
  }

  if (total <= 14) {
    return [
      "Intensificar prevenção de lesão por pressão."
    ]
  }

  if (total <= 18) {
    return [
      "Iniciar medidas preventivas;", 
      "Reavaliar diariamente.",
    ]
  }

  return [
    "Manter cuidados preventivos de rotina;", 
    "Incentivar mobilização frequente;", 
    "Manter pele limpa e hidratada;", 
    "Avaliar diariamente durante a internação."
  ]
}

export function getCuidadosBraden(total: number): string[] {
  if (total === 0) {
    return []
  }

  if (total <= 9) {
    return [
      "Todas as medidas dos níveis anteriores;",
      "Vigilância intensiva da integridade da pele;",
      "Avaliação da pele em cada turno;",
      "Reposicionamento rigoroso;",
      "Controle da umidade (incontinência, suor e secreções);",
      "Utilizar dispositivos de redistribuição de pressão;",
      "Acionar equipe multiprofissional (enfermagem, nutrição e fisioterapia)."
    ]
  }

  if (total <= 12) {
    return [
      "Mudança de decúbito a cada 2 horas ou conforme tolerância;",
      "Colchão pneumático ou de pressão alternada;",
      "Suspender pressão sobre calcâneos;",
      "Monitorar áreas de hiperemia;",
      "Solicitar avaliação nutricional;",
      "Registrar todas as medidas preventivas."
    ]
  }

  if (total <= 14) {
    return [
      "Mudança de decúbito rigorosa;",
      "Utilizar colchão de redistribuição de pressão, quando disponível;",
      "Inspecionar a pele a cada turno;",
      "Utilizar coxins para alívio de pressão;",
      "Avaliar ingestão hídrica e nutricional;",
      "Registrar evolução diariamente."
    ]
  }

  if (total <= 18) {
    return [
      "Mudança de decúbito a cada 2 horas (quando indicado);",
      "Proteger proeminências ósseas;",
      "Reduzir umidade da pele;",
      "Incentivar deambulação;",
      "Avaliar estado nutricional."
    ]
  }

  return [
    "Inspecionar a pele diariament;",
    "Estimular alimentação e hidratação adequadas;",
    "Manter lençóis limpos e sem dobras;",
    "Incentivar mudança espontânea de posição."
  ]
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
      reavaliacao: 72
    };
  }

  if (total <= 44) {
    return {
      texto: "Risco moderado",
      color: "text-yellow-600",
      reavaliacao: 72
    };
  }

  return {
    texto: "Trauma elevado",
    color: "text-red-600",
    reavaliacao: 24
  };
}

export function getOrientacoesMorse(total: number | undefined): string[] {
  if (total === undefined) {
    return []
  }

  if (total <= 24) {
    return ["Manter medidas gerais de segurança."]
  }

  if (total <= 44) {
    return ["Implementar medidas adicionais de prevenção de quedas."]
  }

  return ["Paciente com alto risco para quedas. Aplicar protocolo institucional."]
}

export function getCuidadosMorse(total: number | undefined): string[] {
  if (total === undefined) {
    return []
  }

  if (total <= 24) {
    return [
      "Orientar paciente e acompanhante;",
      "Manter ambiente organizado;",
      "Campainha ao alcance;",
      "Cama em posição baixa;",
      "Rodas da cama travadas;",
      "Calçados antiderrapantes."
    ]
  }

  if (total <= 44) {
    return [
      "Auxiliar nas transferências;",
      "Supervisionar deambulação;",
      "Avaliar necessidade de dispositivos de apoio;",
      "Manter objetos pessoais próximos;",
      "Reforçar orientações ao paciente;",
      "Reavaliar diariamente."
    ]
  }

  return [
    "Identificar paciente com sinalização de risco (pulseira/placa, conforme protocolo);",
    "Não permitir deambulação sem auxílio;",
    "Acompanhar em deslocamentos ao banheiro;",
    "Manter cama baixa e grades elevadas quando indicadas;",
    "Campainha sempre acessível;",
    "Eliminar obstáculos do ambiente;",
    "Avaliar medicamentos que aumentam o risco de queda;",
    "Acionar fisioterapia quando necessário;",
    "Orientar familiares e acompanhantes;",
    "Registrar e reavaliar o risco diariamente ou após qualquer alteração clínica."
  ]
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
      texto: "Cuidado mínimo",
      subtexto: "Paciente estável, autocuidado",
      color: "text-green-600",
      reavaliacao: 4,
      proporcao: "1 para 6",
    };
  }

  if (total <= 22) {
    return {
      texto: "Cuidado intermediário",
      subtexto: "Necessita de assistência em alguns momentos",
      color: "text-yellow-600",
      reavaliacao: 6,
      proporcao: "1 para 4",
    };
  }

  if (total <= 28) {
    return {
      texto: "Alta dependência",
      subtexto: "Dependência maior para atividades diárias",
      color: "text-amber-600",
      reavaliacao: 10,
      proporcao: "1 para 2,4",
    };
  }

  if (total <= 34) {
    return {
      texto: "Cuidado semi-intensivo",
      color: "text-orange-600",
      reavaliacao: 6,
      proporcao: "1 para 2,4",
    };
  }

  return {
    texto: "Cuidado intensivo",
    subtexto: "Pacientes gravemente instáveis",
    color: "text-red-700",
    reavaliacao: 18,
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