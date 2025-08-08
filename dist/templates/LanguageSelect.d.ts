import { SelectProps as UISelectProps, Selection } from '@heroui/react';
export interface Language {
    code: string;
    flag: React.ReactNode;
    label?: string;
}
interface LanguageSelectProps extends Omit<UISelectProps, "children" | "value" | "onSelectionChange"> {
    languages: Language[];
    value?: Selection;
    defaultValue?: Selection;
    onSelectionChange?: (key: Selection) => void;
    size?: "sm" | "md" | "lg";
}
export declare const LanguageSelect: import('react').ForwardRefExoticComponent<Omit<LanguageSelectProps, "ref"> & import('react').RefAttributes<HTMLSelectElement>>;
export {};
