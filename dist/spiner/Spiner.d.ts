import { SpinnerProps as SpinnerRootProps } from '@heroui/react';
import { Color, Size } from '../types/types';
interface SpinnerProps extends Omit<SpinnerRootProps, "label" | "labelColor"> {
    color?: Color;
    size?: Size;
    disableAnimation?: boolean;
    strokeWidth?: number;
}
export declare const Spinner: import('react').ForwardRefExoticComponent<Omit<SpinnerProps, "ref"> & import('react').RefAttributes<HTMLDivElement>>;
export {};
