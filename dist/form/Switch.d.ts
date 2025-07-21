import { SwitchProps as SwitchRootProp } from '@heroui/react';
type SwitchProps = {
    width?: string | number;
    height?: string | number;
} & SwitchRootProp;
export declare const Switch: import('react').ForwardRefExoticComponent<Omit<SwitchProps, "ref"> & import('react').RefAttributes<HTMLInputElement>>;
export {};
