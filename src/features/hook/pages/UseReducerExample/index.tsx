import { useReducer } from "react";

export const reducer = (state: { count: number }, action: { type: string }) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    default:
      return state;
  }
};

export const UseReducerExample = () => {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div className="p-[40px] text-secondary flex flex-col items-center gap-y-[60px] justify-center">
      <h1>{state.count}</h1>
      <div className="flex gap-x-[10px]">
        <button
          className="bg-secondary px-[16px] py-[8px] rounded-[8px] text-black w-[150px]"
          onClick={() => {
            dispatch({ type: "INCREMENT" });
          }}
        >
          Add
        </button>
        <button
          className="bg-secondary px-[16px] py-[8px] rounded-[8px] text-black w-[150px]"
          onClick={() => {
            dispatch({ type: "DECREMENT" });
          }}
        >
          Minus
        </button>
      </div>
    </div>
  );
};
