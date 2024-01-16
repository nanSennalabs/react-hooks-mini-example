import { useState } from "react";

export function UseStateExample() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-[40px] text-secondary flex flex-col items-center gap-y-[60px] justify-center">
      <h1 className="font-semibold text-[32px]">Count: {count}</h1>
      <div className="flex gap-x-[16px]">
        <button
          type="button"
          className="bg-white px-[16px] py-[8px] rounded-[8px] text-black"
          onClick={() => setCount((prev) => prev + 1)}
        >
          +
        </button>
        <button
          type="button"
          className="bg-white px-[16px] py-[8px] rounded-[8px] text-black"
          onClick={() => setCount((prev) => prev - 1)}
        >
          -
        </button>
      </div>

      <button
        type="button"
        className="bg-secondary px-[16px] py-[8px] rounded-[8px] text-black"
        onClick={() => window.location.reload()}
      >
        Reload
      </button>
    </div>
  );
}
