import { useContext } from "react";
import { ExampleContext } from "../context/ExampleContext";

export function ViewSection() {
  const { name } = useContext(ExampleContext);

  return (
    <div className="flex gap-x-[10px]">
      <span className="font-bold">Name: </span>
      <span>{name}</span>
    </div>
  );
}
