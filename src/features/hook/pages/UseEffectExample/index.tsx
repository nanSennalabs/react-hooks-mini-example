import { MultipleSelect } from "components/MultipleSelect";
import { OptionType } from "interfacs/OptionType";
import { useEffect, useRef, useState } from "react";

export function UseEffectExample() {
  const [selected, setSelected] = useState<OptionType[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const options: OptionType[] = [
    {
      label: "Pizza",
      value: "1",
    },
    {
      label: "Burger",
      value: "2",
    },
    {
      label: "Sushi",
      value: "3",
    },
    {
      label: "Shabu",
      value: "4",
    },
  ];

  useEffect(() => {
    setSelected([]);
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      if (selected.length > 0) {
        contentRef.current.style.background = "#FF004D";
      } else {
        contentRef.current.style.background = "#FAEF5D";
      }
    }
  }, [selected]);

  return (
    <div className="p-[40px] text-secondary flex flex-col items-center gap-y-[60px] justify-center">
      <h1 className="font-semibold text-[32px]">Favorite Foods</h1>
      <div className="grid grid-cols-2 gap-x-[16px]">
        <MultipleSelect
          inputClassName="font-semibold text-black"
          dropdownClassName="!z-20 text-black"
          options={options || []}
          value={selected}
          onChange={(value) => {
            setSelected(value);
          }}
          placeholder="Favorite Foods"
        />
        <div
          id="content"
          ref={contentRef}
          className="bg-secondary px-[16px] h-[50px] w-[300px] py-[8px] rounded-[8px] text-black flex items-center justify-center"
        >
          {selected.length > 0 ? (
            selected.map((item) => (
              <span key={item.value} className="last:pr-0 pr-[8px]">{item.label}</span>
            ))
          ) : (
            <>Not Select.</>
          )}
        </div>
      </div>
    </div>
  );
}
