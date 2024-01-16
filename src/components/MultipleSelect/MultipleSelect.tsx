/* eslint-disable @typescript-eslint/no-explicit-any */
import cn from "classnames";
import { MultipleSelectProps } from "./interface";
import { Checkbox } from "components/Checkbox";
import { CaretUpIcon } from "components/icons/CaretUpIcon";

export function MultipleSelect({
  inputRef,
  divRef,
  className,
  dropdownClassName,
  inputClassName,
  label,
  placeholder,
  disabled,
  isExpanded,
  options,
  value,
  setIsExpanded,
  handleSelectAll,
  handleUnselectAll,
  handleSelect,
  handleFetchNext,
}: MultipleSelectProps) {
  return (
    <div ref={divRef} className={cn("grid w-full select-none", className)}>
      {label && (
        <div className="relative">
          <div className="absolute top-[-9px] left-[15px] z-[1px] text-[12px] text-black-1">
            <div className="relative h-[18px]">
              <div className="absolute top-1/2 -translate-y-1/2 w-fit px-[5px]">
                {label}
              </div>
              <div className="invisible h-0 w-fit px-[5px]">{label}</div>
              <div className="h-1/2 w-full bg-transparent" />
              <div
                className={cn("h-1/2 w-full ", {
                  "bg-white": !disabled,
                  "bg-white-1": disabled,
                })}
              />
            </div>
          </div>
        </div>
      )}

      <div
        ref={inputRef}
        className={cn(
          "border border-gray-4 min-h-[50px] text-[14px] rounded-md pl-[8px] pr-[20px] grid grid-cols-[1fr_16px] justify-items-start items-center gap-x-[10px] bg-white",
          {
            "!border-gray-1": isExpanded,
            "cursor-pointer": !disabled,
            "!bg-white-1 text-gray-2 border-gray-4 pointer-events-none":
              disabled,
          },
          inputClassName
        )}
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <div className="flex-1 flex flex-wrap text-base font-light">
          {value.length ? (
            <div className="flex items-center space-x-[5px] py-[6px] text-base font-light bg-white-2 px-[16px]">
              <div className="whitespace-nowrap">
                {`${value.length} selected`}
              </div>
            </div>
          ) : (
            <span className="text-black-1 pl-[12px]">{placeholder}</span>
          )}
        </div>
        <CaretUpIcon
          width="16"
          height="16"
          className={cn({ "rotate-180": !isExpanded })}
        />
      </div>

      {isExpanded && (
        <div
          style={
            inputRef.current?.offsetWidth
              ? { width: inputRef.current.offsetWidth }
              : {}
          }
          className={cn(
            "absolute z-[10] mt-[54px] shadow-dropdown rounded-[6px] bg-white shadow-drop1",
            dropdownClassName
          )}
        >
          <div className="px-[16px] py-[12px]">
            <div
              onScroll={(e: any) => {
                const scrollHeight = e.target.scrollHeight;
                const scrollTop = e.target.scrollTop + e.target.offsetHeight;
                if (scrollHeight === scrollTop && handleFetchNext) {
                  handleFetchNext();
                }
              }}
              className="flex flex-col gap-y-[8px] max-h-[337px] overflow-y-scroll"
            >
              <div className="px-[16px] flex gap-x-[24px] text-sm font-semibold">
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="disabled:text-gray-2 underline"
                  disabled={value.length === options.length}
                >
                  Select all
                </button>
                <button
                  type="button"
                  onClick={handleUnselectAll}
                  className="disabled:text-gray-2 underline"
                  disabled={value.length === 0}
                >
                  Deselect all
                </button>
              </div>
              {options.map((item) => {
                const isSelect = value.some(
                  (element) => element.value === item.value
                );
                return (
                  <div
                    key={item.value}
                    className={cn(
                      "flex items-center gap-x-[8px] px-[8px] py-[4px] rounded-[4px] pl-[16px]",
                      { "bg-primary-5": isSelect }
                    )}
                  >
                    <Checkbox
                      checked={isSelect}
                      onChange={() => handleSelect(item, isSelect)}
                    />
                    <span className="truncate text-base font-light">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
