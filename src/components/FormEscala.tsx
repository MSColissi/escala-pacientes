
import type { Escala } from "@/types/escala";
import { RadioScale } from "./RadioScale";

interface FormEscalaProps {
  escalas: Escala[];
  respostas: Record<number, number>;
  onChange: (escalaId: number, pontos: number) => void;
}

export function FormEscala({
  escalas,
  respostas,
  onChange,
}: FormEscalaProps) {
  return (
    <div className="space-y-6">
      {escalas.map((escala) => (
        <RadioScale
          key={escala.id}
          escala={escala}
          value={respostas[escala.id]}
          onChange={(pontos) => onChange(escala.id, pontos)}
        />
      ))}
    </div>
  );
}