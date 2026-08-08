import { Button } from "@/components/ui/button";
import type { Classificacao } from "@/utils/classificacao";
import { RotateCcw, Save } from "lucide-react";

interface ScoreSummaryProps {
  total: number;
  classificacao: Classificacao;

  formularioCompleto: boolean;
  editando?: boolean;

  onReset: () => void;
  onSave: () => void;

  children?: React.ReactNode;
}

export function ScoreSummary({
  total,
  classificacao,
  formularioCompleto,
  editando = false,
  onReset,
  onSave,
  children,
}: ScoreSummaryProps) {
  return (
    <div className="w-full">
      <small className="text-center block text-primary mb-2">Diante de alteração no quadro clínico do paciente a frequência de reavaliação deverá ser alterada pelo profissional de saúde.</small>
      <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between w-full">
        <div className="w-full grid grid-cols-2 sm:grid-cols-1 items-start sm:items-center justify-between gap-2 sm:gap-0"> 
          <p className="text-sm font-bold text-center sm:text-left flex-col flex sm:block">
            Pontuação Total:
            <span className={`text-2xl ml-1 ${classificacao.color}`}>
              {total}
            </span>
          </p>

          <div className="flex flex-col text-center sm:text-left">
            <small className={`font-semibold ${classificacao.color}`}>
              {classificacao.texto} {classificacao.subtexto && "(" + classificacao.subtexto.toLowerCase() + ")"}
            </small>

            { classificacao.reavaliacao &&
              <small className="mt-1">
                Reavaliar em {classificacao.reavaliacao}
              </small>
            }
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 justify-between w-full sm:justify-end">
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={onReset}
          >
            <RotateCcw />
            Reiniciar
          </Button>

          {children}

          <Button
            variant="default"
            className="cursor-pointer"
            onClick={onSave}
            disabled={!formularioCompleto}
          >
            <Save />
            {editando ? "Salvar" : "Armazenar"}
          </Button>
        </div>
      </div>
    </div>
  );
}