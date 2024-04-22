import { useState } from "react";
import { ExampleContext } from "./context/ExampleContext";
import { ViewSection } from "./components/ViewSection";
import { FormSection } from "./components/FormSection";

export function UseContextExample() {
  const [name, setName] = useState<string>("");

  return (
    <ExampleContext.Provider value={{ name, setName }}>
      <div className="p-[40px] text-secondary flex flex-col items-center gap-y-[60px] justify-center">
        <h1 className="font-semibold text-[32px]">Enter your name</h1>
        <FormSection />
        <ViewSection />
      </div>
    </ExampleContext.Provider>
  );
}
