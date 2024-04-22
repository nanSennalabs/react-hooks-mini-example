import { useContext } from "react";
import { ExampleContext } from "../context/ExampleContext";

export function FormSection() {
  const { setName } = useContext(ExampleContext);

  return (
    <div>
      <input
        className="text-[16px] font-light placeholder:font-light text-black-1 border border-gray-4 rounded-[6px] h-[50px] px-[20px] placeholder:text-gray-3 disabled:bg-white-1 w-[300px] focus:outline-none"
        onChange={(event) => {
            setName(event.target.value);
        }}
      />
    </div>
  );
}
