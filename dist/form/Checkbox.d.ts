import { CheckboxGroupProps as HeroUICheckboxGroupProps, Checkbox } from '@heroui/react';
import { CheckboxItemConfig } from './checkboxConfig';
import { FormFieldState, FormFieldSize } from './formConfig';
import { ReactNode } from 'react';
import { StylableComponent } from '../utils/typeUtils';
export interface CheckboxGroupProps extends Omit<HeroUICheckboxGroupProps, "children" | "classNames" | "validate">, StylableComponent {
    items: CheckboxItemConfig[];
    size?: FormFieldSize;
    color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
    state?: FormFieldState;
    orientation?: "horizontal" | "vertical";
    spacing?: "sm" | "md" | "lg";
    maxSelections?: number;
    minSelections?: number;
    showSelectAll?: boolean;
    selectAllLabel?: ReactNode;
    customValidate?: (selectedValues: string[]) => boolean | string | Promise<boolean | string>;
    onValidationChange?: (isValid: boolean, errors: string[]) => void;
    classNames?: {
        wrapper?: string;
        label?: string;
        description?: string;
        errorMessage?: string;
        items?: string;
    };
    validateConfig?: boolean;
}
export declare const CheckboxGroup: import('react').ForwardRefExoticComponent<Omit<CheckboxGroupProps, "ref"> & import('react').RefAttributes<HTMLDivElement>>;
export { Checkbox };
