import React from "react";
import { TextInputProps } from "./interface";

export function withTextInput(Component: React.FC<TextInputProps>) {
  function WithTextInput(props: TextInputProps) {
    return <Component {...props} />;
  }

  return WithTextInput;
}
