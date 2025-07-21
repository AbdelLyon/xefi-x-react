import { JSX } from 'react';
import { ButtonGroupProps } from '@heroui/react';
import { ButtonProps } from '../button/Button';
export interface ButtonsProps extends ButtonGroupProps {
    buttons: Array<{
        key: string | number;
        label: React.ReactNode;
        buttonProps?: ButtonProps;
    }>;
}
export declare const Buttons: ({ buttons, ...props }: ButtonsProps) => JSX.Element;
