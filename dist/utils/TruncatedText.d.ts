import { ReactNode, JSX } from 'react';
interface TruncatedTextProps {
    children: ReactNode;
    className?: string;
    tooltipClassName?: string;
    placement?: "top" | "bottom" | "left" | "right";
}
export declare function TruncatedText({ children, className, tooltipClassName, placement, }: TruncatedTextProps): JSX.Element;
export {};
