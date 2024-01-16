import cn from "classnames";

import { CheckIcon } from "components/icons/CheckIcon";
import { CheckboxProps } from "components/Checkbox/interface";

function Checkbox({
  label,
  disabled,
  className,
  classNameLabel,
  size = "small",
  type = "checkbox",
  ...props
}: CheckboxProps) {
  const checked = props.checked ?? props.defaultChecked;
  return (
    <label
      className={cn("grid items-center", className, {
        "grid-cols-[16px_1fr]": size === "small",
        "grid-cols-[24px_1fr]": size === "large",
      })}
    >
      <div
        className={cn("relative border border-gray-4 rounded-[4px] shrink-0", {
          "bg-gray-3": disabled,
          "bg-white": !disabled && !checked,
          "bg-primary border-primary": !disabled && checked,
          "w-[16px] h-[16px]": size === "small",
          "w-[24px] h-[24px]": size === "large",
        })}
      >
        {checked && (
          <CheckIcon
            className={cn(
              "text-black absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-white",
              {
                "w-[12px] h-[12px]": size === "small",
                "w-[16px] h-[16px]": size === "large",
              }
            )}
          />
        )}
        <input
          className="w-full h-full opacity-0 cursor-pointer disabled:cursor-default"
          type={type}
          disabled={disabled}
          {...props}
        />
      </div>

      {label && (
        <div
          className={cn(
            "text-base font-light ml-[8px] select-none",
            classNameLabel
          )}
        >
          {label}
        </div>
      )}
    </label>
  );
}

export { Checkbox };
