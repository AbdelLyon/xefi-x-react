import { SpinnerProps as SpinnerRootProps } from '@heroui/react';
import { Color } from '../types';
interface SpinnerProps extends Omit<SpinnerRootProps, "label" | "labelColor"> {
    color?: Color;
    size?: "sm" | "md" | "lg";
    disableAnimation?: boolean;
    strokeWidth?: number;
}
export declare const Spinner: import('react').ForwardRefExoticComponent<Omit<SpinnerProps, "ref"> & import('react').RefAttributes<HTMLDivElement>>;
export {};
