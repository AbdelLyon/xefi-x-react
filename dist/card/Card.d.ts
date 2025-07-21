import { ReactNode } from 'react';
import { CardFooterProps, CardProps as NextUICardProps } from '@heroui/react';
interface CardProps extends NextUICardProps {
    header?: ReactNode;
    footer?: ReactNode;
    footerProps?: CardFooterProps;
    classNames?: Partial<Record<"base" | "header" | "body" | "footer", string>>;
}
export declare const Card: import('react').ForwardRefExoticComponent<Omit<CardProps, "ref"> & import('react').RefAttributes<HTMLDivElement>>;
export {};
