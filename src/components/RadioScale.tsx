import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Escala } from "@/types/escala";
import { useRef } from "react";


interface RadioScaleProps {
  escala: Escala;
  value?: number;
  onChange: (value: number) => void;
}

export function RadioScale({
  escala,
  value,
  onChange,
}: RadioScaleProps) {
  const Icon = escala.icon;

  const fieldsetRef = useRef<HTMLFieldSetElement>(null);

  const handleRadioChange = () => {
    requestAnimationFrame(() => {
      const nextFieldset =
        fieldsetRef.current?.nextElementSibling as HTMLFieldSetElement | null;

      if (nextFieldset) {
        nextFieldset.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        return;
      }

      // Último RadioGroup: vai para o final da página
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    });
  };

  return (
    <fieldset 
      ref={fieldsetRef}
      className="space-y-3 scroll-mt-2.5"
    >
      <legend className="mb-3 flex items-center gap-2 text-base font-semibold bg-primary w-full text-white p-2 rounded">
        <Icon className="size-5" />
        {escala.item}
      </legend>

      {escala.subItem &&
        <h3 className="
          relative
          overflow-hidden
          before:absolute
          before:inset-y-0
          before:left-0
          before:w-1
          before:rounded
          before:bg-primary
          px-2
        ">
          {escala.subItem}
        </h3>
      }

      <RadioGroup
        name={String(escala.id)}
        value={value !== undefined ? String(value) : ""}
        onValueChange={(value) => {
          onChange(Number(value))
          handleRadioChange()
        }}
        className="space-y-2"
      >
        {escala.itens.map((item, index) => {
          const id = `${escala.id}-${index}`;

          return (
            <FieldLabel
              key={id}
              htmlFor={id}
              className="cursor-pointer"
            >
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>{item.item}</FieldTitle>

                  <FieldDescription>
                    {item.pontos}{" "}
                    {item.pontos === 1 ? "ponto" : "pontos"}
                  </FieldDescription>
                </FieldContent>

                <RadioGroupItem
                  id={id}
                  value={String(item.pontos)}
                />
              </Field>
            </FieldLabel>
          );
        })}
      </RadioGroup>
    </fieldset>
  );
}