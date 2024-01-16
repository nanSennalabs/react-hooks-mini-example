import React from "react";

export interface CheckboxProps
  extends Omit<React.HTMLProps<HTMLInputElement>, "label" | "size"> {
  label?: string | React.ReactNode;
  className?: string;
  classNameLabel?: string;
  size?: "small" | "large";
}
