import { CircularProgressProps as CircularProgressRootProps } from '@heroui/react';
type AdditionalCircularProgressProps = {
    autoIncrement?: boolean;
    incrementInterval?: number;
    incrementStep?: number;
    onValueChange?: (value: number) => void;
};
type CircularProgressProps = Omit<CircularProgressRootProps, "classNames"> & AdditionalCircularProgressProps & {
    classNames?: CircularProgressRootProps["classNames"];
};
export declare const CircularProgress: import('react').ForwardRefExoticComponent<Omit<CircularProgressProps, "ref"> & import('react').RefAttributes<HTMLDivElement>>;
export {};
