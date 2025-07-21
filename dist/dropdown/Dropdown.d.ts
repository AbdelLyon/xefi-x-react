import { JSX } from 'react';
import { DropdownProps, DropdownMenuProps } from '@heroui/react';
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
export declare const Dropdown: ({ trigger, sections, dropdownMenuProps, classNames, ...props }: Props) => JSX.Element;
export {};
