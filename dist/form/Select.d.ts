import { SelectProps as UISelectProps, Selection } from '@heroui/react';
export interface SelectOption {
    key: string;
    label: string;
    description?: string;
    icon?: React.ReactNode;
}
interface SelectProps extends Omit<UISelectProps, "children" | "value" | "onSelectionChange"> {
    options: SelectOption[];
    value?: Selection;
    defaultValue?: Selection;
    onSelectionChange?: (key: Selection) => void;
}
export declare const Select: import('react').ForwardRefExoticComponent<Omit<SelectProps, "ref"> & import('react').RefAttributes<HTMLSelectElement>>;
export {};
