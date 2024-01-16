import { useRef, useState } from "react";

export function UseRefExample() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchText, setSearchText] = useState("");

  function handleKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
    const value = inputRef.current && inputRef.current.value || "";
    if (e.key === "Enter") {
      e.preventDefault();
      setSearchText(value);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  }

  return (
    <div className="p-[40px] text-secondary flex flex-col items-center gap-y-[60px] justify-center">
      <h1 className="font-semibold text-[32px]">Enter your name</h1>
      <input
        ref={inputRef}
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
        className="text-[16px] font-light placeholder:font-light text-black-1 border border-gray-4 rounded-[6px] h-[50px] px-[20px] placeholder:text-gray-3 disabled:bg-white-1 w-[300px] focus:outline-none"
        type="text"
        placeholder="Enter text ..."
      />

      <div>
        <b>Name: </b> {searchText}
      </div>
    </div>
  );
}
