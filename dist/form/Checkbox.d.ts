import { CheckboxGroupProps, CheckboxProps, Checkbox } from '@heroui/react';
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
declare const CheckboxGroup: import('react').ForwardRefExoticComponent<Omit<CheckboxWrapperProps, "ref"> & import('react').RefAttributes<HTMLDivElement>>;
export { Checkbox, CheckboxGroup };
