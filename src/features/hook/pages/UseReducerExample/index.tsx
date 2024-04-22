import { useReducer } from "react";

export const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1, showText: state.showText };
    case "toggleShowText":
      return { count: state.count, showText: !state.showText };
    default:
      return state;
  }
};

export const UseReducerExample = () => {
  const [state, dispatch] = useReducer(reducer, { count: 0, showText: true });

  return (
    <div className="p-[40px] text-secondary flex flex-col items-center gap-y-[60px] justify-center">
      <h1>{state.count}</h1>
      <button
        onClick={() => {
          dispatch({ type: "INCREMENT" });
          dispatch({ type: "toggleShowText" });
        }}
      >
        Show Text
      </button>
      {state.showText && <p>Show Text</p>}
    </div>
  );
};
