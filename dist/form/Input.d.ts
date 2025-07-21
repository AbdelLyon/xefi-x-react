import { InputProps as InputRootProps } from '@heroui/react';
interface InputClassNames {
    base?: string;
    mainWrapper?: string;
    inputWrapper?: string;
    innerWrapper?: string;
    input?: string;
    clearButton?: string;
    label?: string;
    description?: string;
    errorMessage?: string;
}
type InputProps = Omit<InputRootProps, "classNames"> & {
    containerClasses?: string;
    customValidation?: (value: string) => boolean | string;
    classNames?: InputClassNames;
};
export declare const Input: import('react').ForwardRefExoticComponent<Omit<InputProps, "ref"> & import('react').RefAttributes<HTMLInputElement>>;
export {};
