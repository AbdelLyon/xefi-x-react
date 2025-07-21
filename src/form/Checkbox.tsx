import { forwardRef } from "react";
import type { CheckboxGroupProps, CheckboxProps } from "@heroui/react";
import { CheckboxGroup as CheckboxGroupRoot, Checkbox } from "@heroui/react";
import { mergeTailwindClasses } from "@/utils/utils";

type CheckboxItemProps = {
  label?: React.ReactNode;
} & Omit<CheckboxProps, "children">;

type CheckboxWrapperProps = {
  items: CheckboxItemProps[];
  groupClasses?: {
    base?: string;
    label?: string;
  };
  itemClasses?: {
    base?: string;
    label?: string;
    wrapper?: string;
  };
} & Omit<CheckboxGroupProps, "children">;

const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxWrapperProps>(
  (
    {
      items,
      groupClasses,
      itemClasses,
      label = "Select options",
      defaultValue,
      ...props
    },
    ref,
  ): React.ReactNode => {
    const defaultGroupClasses = {
      base: "w-full",
      label: "text-medium font-semibold",
    };

    const defaultItemClasses = {
      base: "w-full",
      label: "text-small",
      wrapper: "",
    };

    return (
      <CheckboxGroupRoot
        ref={ref}
        label={label}
        defaultValue={defaultValue}
        {...props}
        classNames={{
          base: mergeTailwindClasses(
            defaultGroupClasses.base,
            groupClasses?.base,
          ),
          label: mergeTailwindClasses(
            defaultGroupClasses.label,
            groupClasses?.label,
          ),
        }}
      >
        {items.map(
          (item): React.ReactNode => (
            <Checkbox
              key={item.value}
              {...item}
              classNames={{
                base: mergeTailwindClasses(
                  defaultItemClasses.base,
                  itemClasses?.base,
                  item.className,
                ),
                label: mergeTailwindClasses(
                  defaultItemClasses.label,
                  itemClasses?.label,
                  item.classNames?.label,
                ),
                wrapper: mergeTailwindClasses(
                  defaultItemClasses.wrapper,
                  itemClasses?.wrapper,
                  item.classNames?.wrapper,
                ),
              }}
            >
              {item.label}
            </Checkbox>
          ),
        )}
      </CheckboxGroupRoot>
    );
  },
);

CheckboxGroup.displayName = "CheckboxGroup";

export { Checkbox, CheckboxGroup };
