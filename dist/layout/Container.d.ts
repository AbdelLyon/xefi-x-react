import { ReactNode } from 'react';
interface ContainerProps {
    children: ReactNode;
    maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
    className?: string;
}
export declare const Container: import('react').ForwardRefExoticComponent<ContainerProps & import('react').RefAttributes<HTMLDivElement>>;
export {};
