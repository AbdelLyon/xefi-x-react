import { ReactNode } from 'react';
import { ProgressProps as ProgressRootProps } from '@heroui/react';
type AdditionalProgressProps = {
    label?: ReactNode;
    labelPosition?: "top" | "bottom" | "none";
    containerClassName?: string;
    labelClassName?: string;
};
type ProgressProps = {
    classNames?: ProgressRootProps["classNames"];
} & Omit<ProgressRootProps, "classNames"> & AdditionalProgressProps;
export declare const Progress: import('react').ForwardRefExoticComponent<Omit<ProgressProps, "ref"> & import('react').RefAttributes<HTMLDivElement>>;
export {};
