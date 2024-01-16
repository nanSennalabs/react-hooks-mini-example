import { useMemo, useState } from "react";

export function Calculation({ data }: { data: number[] }) {
  const result = useMemo(() => {
    // Simulating an expensive calculation using a simple map
    console.log("Calculating result...");
    return data.map((item) => item * 2);
  }, [data]); // Only recompute when 'data' changes

  return (
    <div>
      <h2>Expensive Calculation Result:</h2>
      <p>{result.join(", ")}</p>
    </div>
  );
}

export function UseMemoExample() {
  const [inputData, setInputData] = useState([1, 2, 3, 4, 5]);

  return (
    <div className="p-[40px] text-secondary flex flex-col items-center gap-y-[60px] justify-center">
      <h1 className="font-semibold text-[32px]">Memo Example</h1>
      <button
        className="bg-secondary px-[16px] py-[8px] rounded-[8px] text-black"
        onClick={() => setInputData([...inputData, inputData.length + 1])}
      >
        Add Data
      </button>
      <Calculation data={inputData} />
    </div>
  );
}
