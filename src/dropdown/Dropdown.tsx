import type { JSX } from "react";
import type { DropdownProps, DropdownMenuProps } from "@heroui/react";
import {
  Dropdown as DropdownRoot,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@heroui/react";
import { mergeTailwindClasses } from "@/utils";

export type DropdownItemConfig = {
  key: string;
  label: string;
  href?: string;
  isReadOnly?: boolean;
  className?: string;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  shortcut?: string;
  onClick: () => void;
};

export interface DropdownSectionConfig {
  key: string;
  label?: string;
  showDivider?: boolean;
  items: DropdownItemConfig[];
}

type Props = {
  trigger: React.ReactNode;
  sections: DropdownSectionConfig[];
  dropdownMenuProps?: DropdownMenuProps;
  onItemPress?: (item: DropdownItemConfig) => void;
} & Omit<DropdownProps, "trigger" | "children">;

export const Dropdown = ({
  trigger,
  sections,
  dropdownMenuProps,
  classNames,
  ...props
}: Props): JSX.Element => {
  return (
    <DropdownRoot
      showArrow
      classNames={{
        base: "before:bg-default-200",
        content: "p-0 border border-border bg-background",
        ...classNames,
      }}
      {...props}
    >
      <DropdownTrigger>{trigger}</DropdownTrigger>
      <DropdownMenu className="p-3" {...dropdownMenuProps}>
        {sections.map(
          (section): JSX.Element => (
            <DropdownSection
              key={section.key}
              showDivider={section.showDivider}
              aria-label={section.label}
            >
              {section.items.map((item): JSX.Element => {
                const { key, label, ...remainingProps } = item;
                return (
                  <DropdownItem
                    className={mergeTailwindClasses(
                      "data-[hover=true]:bg-content1-300",
                      remainingProps.className,
                    )}
                    key={key}
                    {...remainingProps}
                  >
                    {label}
                  </DropdownItem>
                );
              })}
            </DropdownSection>
          ),
        )}
      </DropdownMenu>
    </DropdownRoot>
  );
};
