import { AnchorHTMLAttributes, ComponentType, JSX } from 'react';
import { ButtonProps as ButtonRootProps } from '@heroui/react';
import { Color, Radius } from '../types/types';
export interface ButtonProps extends Omit<ButtonRootProps, "onPress"> {
    LinkComponent?: ComponentType<AnchorHTMLAttributes<HTMLAnchorElement>>;
    classNames?: {
        base?: string;
        beforeContent?: string;
        afterContent?: string;
        content?: string;
    };
    onClick?: () => void;
    radius?: Radius;
    color?: Color;
}
export declare const Button: ({ onClick, radius, color, startContent, endContent, LinkComponent, classNames, href, children, target, rel, ...props }: ButtonProps) => JSX.Element;
