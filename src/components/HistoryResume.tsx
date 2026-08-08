import type { TiposEscala } from "@/types/escala";

interface ResumeItem {
  label: string;
  value: number;
  color: string;
}

interface HistoryResumeProps {
  escala: TiposEscala;
  itens: ResumeItem[];
  showResumo?: boolean;
  selected?: string | null;
  onSelect?: (item: ResumeItem) => void;
}

export function HistoryResume({
  escala,
  itens,
  showResumo = true,
  selected,
  onSelect
}: HistoryResumeProps) {
  return (
    <div className="space-y-2">
      {showResumo && (
        <h3 className="text-center font-bold">
          Resumo {escala}
        </h3>
      )}

      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2 p-2">
        {itens.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => onSelect?.(item)}
            className={`
              grid grid-cols-[80%_auto]
              gap-2
              text-left
              items-center
              rounded-md
              p-2
              cursor-pointer
              hover:bg-primary
              hover:text-primary-foreground
              ${selected === item.label ? "bg-primary text-primary-foreground" : ""}
            `}
          >
            <span
              className={`
                relative
                pl-6
                before:absolute
                before:left-0
                before:top-1/2
                before:-translate-y-1/2
                before:w-3
                before:h-3
                before:rounded-full
                before:content-['']
                before:${item.color}
              `}
            >
              {item.label}
            </span>

            <span
              className="
                counter-total
                bg-gray-200
                text-gray-900
                rounded-full
                px-2
                py-0.5
                w-fit
                justify-self-center
                font-mono
                tabular-nums
              "
            >
              {item.value}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}