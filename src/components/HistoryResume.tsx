import type { TiposEscala } from "@/types/escala";

interface ResumeItem {
  label: string;
  value: number;
  color: string;
}

interface HistoryResumeProps {
  escala: TiposEscala;
  itens: ResumeItem[];
  showResumo?: boolean
}

export function HistoryResume({
  escala,
  itens,
  showResumo = true
}: HistoryResumeProps) {
  return (
    <div className="space-y-2">
      {showResumo && (
        <h3 className="text-center font-bold">
          Resumo {escala}
        </h3>
      )}

      <div className="grid grid-cols-[repeat(auto-fit,minmax(80px,1fr))] gap-2 p-2">
        {itens.map((item) => (
          <div
            key={item.label}
            className={`grid flex-1 p-2 rounded text-center text-white ${item.color} h-22 items-center justify-center`}
          >
            <span className="text-lg font-bold">{item.value}</span>
            <span className="text-xs">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}