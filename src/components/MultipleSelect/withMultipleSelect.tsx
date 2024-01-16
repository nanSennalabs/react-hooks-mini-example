import React, { useRef, useState } from "react";

import { useOutsideClick } from "hooks/useOutsideClick";
import { MultipleSelectProps, WithMultipleSelectProps } from "./interface";
import { OptionType } from "interfacs/OptionType";

export function withMultipleSelect(Component: React.FC<MultipleSelectProps>) {
  function WithMultipleSelect({
    options,
    value,
    onChange,
    ...props
  }: WithMultipleSelectProps) {
    const inputRef = useRef<HTMLDivElement>(null);
    const divRef = useOutsideClick(() => {
      handleCancel();
    });
    const [isExpanded, setIsExpanded] = useState(false);

    function handleSelect(
      item: OptionType,
      isSelect: boolean
    ) {
      if (isSelect) {
        onChange(value.filter((row) => row.value !== item.value));
      } else {
        onChange([...value, item]);
      }
    }

    function handleCancel() {
      setIsExpanded(false);
    }

    function handleSelectAll() {
      onChange(options);
    }

    function handleUnselectAll() {
      onChange([]);
    }

    const newProps = {
      inputRef,
      divRef,
      options,
      value,
      isExpanded,
      onChange,
      setIsExpanded,
      handleSelect,
      handleSelectAll,
      handleUnselectAll,
      ...props,
    };
    return <Component {...newProps} />;
  }
  return WithMultipleSelect;
}
