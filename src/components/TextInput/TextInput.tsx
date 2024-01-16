import cn from "classnames";

import { TextInputProps } from "./interface";

export function TextInput({
  className,
  inputClassName,
  leftIcon,
  rightIcon,
  label,
  disabled,
  labelClassName,
  inputRef,
  leftIconClassName,
  rightIconClassName,
  ...props
}: TextInputProps) {
  return (
    <div className={className}>
      <div className="relative w-full">
        {!!label && (
          <div
            className={cn(
              "absolute top-[-9px] left-[15px] z-[1px] text-black-1 text-[14px] font-normal",
              labelClassName
            )}
          >
            <div className="relative h-[18px]">
              {/* DESC: Real visible label */}
              <div className="absolute top-1/2 -translate-y-1/2 w-fit px-[5px]">
                {label}
              </div>
              {/* 
              DESC: Render invisible label tag for width of real label 
                    because parent element cannot expand width from absolute child element
            */}
              <div className="invisible h-0 w-fit px-[5px]">{label}</div>
              <div className="h-1/2 w-full bg-transparent" />
              <div
                className={cn("h-1/2 w-full mt-[-1px]", {
                  "bg-white": !disabled,
                  "bg-white-1": disabled,
                })}
              />
            </div>
          </div>
        )}
        {leftIcon && (
          <div
            className={cn(
              "left-[16px] z-[1] text-black-1 top-1/2 -translate-y-1/2 absolute mr-[8px]",
              leftIconClassName
            )}
          >
            {leftIcon}
          </div>
        )}
        <input
          ref={inputRef}
          type="text"
          className={cn(
            "text-[16px] font-light placeholder:font-light text-black-1 border border-gray-4 rounded-[6px] h-[50px] px-[20px] placeholder:text-gray-3 disabled:bg-white-1 w-full focus:outline-none",
            {
              "pl-[36px]": leftIcon,
              "pr-[36px]": rightIcon,
              "hover:border-gray-1 focus:border-gray-1 ": !disabled,
            },
            inputClassName
          )}
          disabled={disabled}
          {...props}
        />
        {rightIcon && (
          <div
            className={cn(
              "right-[10px] z-[1] top-1/2 text-black-1 -translate-y-1/2 absolute",
              rightIconClassName
            )}
          >
            {rightIcon}
          </div>
        )}
      </div>
    </div>
  );
}
