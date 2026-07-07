import { Button } from "@/components/ui/button";
import { RotateCcw, Save } from "lucide-react";

interface ScoreSummaryProps {
  total: number;
  classificacao: {
    texto: string;
    color: string;
  };

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
    <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between w-full">
      <div className="flex w-full justify-between items-center sm:flex-col sm:items-start">
        <p className="text-sm font-bold">
          Pontuação Total:
          <span className={`text-2xl ml-1 ${classificacao.color}`}>
            {total}
          </span>
        </p>

        <small className={`font-semibold ${classificacao.color}`}>
          {classificacao.texto}
        </small>
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
  );
}