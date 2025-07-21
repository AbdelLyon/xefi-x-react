import { RadioGroupProps, RadioProps } from '@heroui/react';
type RadioItemProps = {
    label?: React.ReactNode;
} & Omit<RadioProps, "children">;
type RadioWrapperProps = {
    items: RadioItemProps[];
    groupClasses?: {
        base?: string;
        label?: string;
    };
    itemClasses?: {
        base?: string;
        label?: string;
        wrapper?: string;
        control?: string;
    };
} & Omit<RadioGroupProps, "children">;
export declare const RadioGroup: import('react').ForwardRefExoticComponent<Omit<RadioWrapperProps, "ref"> & import('react').RefAttributes<HTMLDivElement>>;
export {};
