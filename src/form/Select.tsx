import type { JSX } from "react";
import { forwardRef } from "react";
import type { SelectProps as UISelectProps, Selection } from "@heroui/react";
import { Select as UISelect, SelectItem } from "@heroui/react";
import { mergeTailwindClasses } from "@/utils";

export interface SelectOption {
  key: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

interface SelectProps
  extends Omit<UISelectProps, "children" | "value" | "onSelectionChange"> {
  options: SelectOption[];
  value?: Selection;
  defaultValue?: Selection;
  onSelectionChange?: (key: Selection) => void;
}

const defaultClassNames = {
  base: "max-w-xs",
  trigger:
    "border border-border bg-transparant data-[focus-visible=true]:outline-0 data-[focus=true]:border-outline data-[hover=true]:bg-transparant data-[hover=true]:border-outline",
  listbox: "data-[focus=true]:outline-0",
  value: "text-small",
  popoverContent: "bg-white dark:bg-background",
} as const;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { options = [], value, defaultValue, classNames, ...props },
    ref,
  ): JSX.Element => {
    const mergedClassNames = {
      base: mergeTailwindClasses(defaultClassNames.base, classNames?.base),
      trigger: mergeTailwindClasses(
        defaultClassNames.trigger,
        classNames?.trigger,
      ),
      value: mergeTailwindClasses(defaultClassNames.value, classNames?.value),
      popoverContent: mergeTailwindClasses(
        defaultClassNames.popoverContent,
        classNames?.popoverContent,
      ),
    };

    return (
      <UISelect
        ref={ref}
        classNames={mergedClassNames}
        selectedKeys={value}
        defaultSelectedKeys={defaultValue}
        {...props}
      >
        {options.map(
          (option): JSX.Element => (
            <SelectItem
              key={option.key}
              description={option.description}
              startContent={option.icon}
              className="text-small"
            >
              {option.label}
            </SelectItem>
          ),
        )}
      </UISelect>
    );
  },
);

Select.displayName = "Select";
