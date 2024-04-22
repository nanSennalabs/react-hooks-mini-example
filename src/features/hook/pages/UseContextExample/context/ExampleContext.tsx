import { createContext } from "react";

interface ContextType {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}

export const ExampleContext = createContext<ContextType>({} as ContextType);
