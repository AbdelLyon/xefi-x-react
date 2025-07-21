import { TextAreaProps as TextAreaRootProps } from '@heroui/react';
type TextareaProps = TextAreaRootProps & {
    containerClasses?: string;
    width?: string | number;
    height?: string | number;
    customValidation?: (value: string) => boolean | string;
};
export declare const Textarea: import('react').ForwardRefExoticComponent<Omit<TextareaProps, "ref"> & import('react').RefAttributes<HTMLTextAreaElement>>;
export {};
