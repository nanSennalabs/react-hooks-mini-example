import { OptionType } from "interfacs/OptionType";

export interface WithMultipleSelectProps {
  title?: string;
  options: OptionType[];
  value: OptionType[];
  label?: string;
  labelInput?: string;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  dropdownClassName?: string;
  maxMember?: number;
  disabled?: boolean;
  onChange: (value: OptionType[]) => void;
  handleFetchNext?: () => void;
}

export interface MultipleSelectProps extends WithMultipleSelectProps {
  inputRef: React.RefObject<HTMLDivElement>;
  divRef: React.RefObject<HTMLDivElement>;
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  handleSelect: (item: OptionType, isSelect: boolean) => void;
  handleSelectAll: () => void;
  handleUnselectAll: () => void;
  onFetchNextPage?: () => void;
}
