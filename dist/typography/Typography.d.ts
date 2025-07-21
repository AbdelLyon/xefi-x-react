import { ReactNode, ElementType } from 'react';
export interface TypographyProps {
    children: ReactNode;
    as?: ElementType;
    variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "base" | "small" | "caption" | "overline";
    weight?: "light" | "normal" | "medium" | "semibold" | "bold";
    align?: "left" | "center" | "right" | "justify";
    color?: string;
    truncate?: boolean;
    className?: string;
}
export declare const Typography: import('react').ForwardRefExoticComponent<TypographyProps & import('react').RefAttributes<HTMLElement>>;
