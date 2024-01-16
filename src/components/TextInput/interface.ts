import { RefObject } from "react";

export interface TextInputProps
  extends Omit<React.HTMLProps<HTMLInputElement>, "label"> {
  label?: string | JSX.Element;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  inputRef?: RefObject<HTMLInputElement>;
  leftIconClassName?: string;
  rightIconClassName?: string;
}
