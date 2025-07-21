import { ComponentClassNames } from '../utils/classNames';
import { ReactNode } from 'react';
/**
 * Common form field states
 */
export type FormFieldState = "default" | "invalid" | "valid" | "loading";
/**
 * Common form field sizes
 */
export type FormFieldSize = "sm" | "md" | "lg";
/**
 * Common form field variants
 */
export type FormFieldVariant = "flat" | "bordered" | "faded" | "underlined";
/**
 * Base form field class configurations
 */
export declare const baseFormFieldClasses: {
    readonly wrapper: "relative flex flex-col";
    readonly label: "text-foreground-600 text-sm font-medium mb-1";
    readonly description: "text-foreground-400 text-xs mt-1";
    readonly errorMessage: "text-danger text-xs mt-1";
    readonly required: "text-danger ml-1";
};
/**
 * Form field size classes
 */
export declare const formFieldSizeClasses: {
    readonly sm: {
        readonly label: "text-xs";
        readonly description: "text-xs";
        readonly errorMessage: "text-xs";
    };
    readonly md: {
        readonly label: "text-sm";
        readonly description: "text-xs";
        readonly errorMessage: "text-xs";
    };
    readonly lg: {
        readonly label: "text-base";
        readonly description: "text-sm";
        readonly errorMessage: "text-sm";
    };
};
/**
 * Form field state classes
 */
export declare const formFieldStateClasses: {
    readonly default: {
        readonly wrapper: "";
        readonly label: "text-foreground-600";
    };
    readonly invalid: {
        readonly wrapper: "";
        readonly label: "text-danger";
        readonly errorMessage: "block";
    };
    readonly valid: {
        readonly wrapper: "";
        readonly label: "text-success";
    };
    readonly loading: {
        readonly wrapper: "opacity-60 pointer-events-none";
        readonly label: "text-foreground-400";
    };
};
/**
 * Common validation functions
 */
export declare const formValidators: {
    readonly required: (value: unknown) => true | "This field is required";
    readonly email: (value: string) => true | "Please enter a valid email address";
    readonly minLength: (min: number) => (value: string) => string | true;
    readonly maxLength: (max: number) => (value: string) => string | true;
    readonly pattern: (regex: RegExp, message: string) => (value: string) => string | true;
    readonly phone: (value: string) => true | "Please enter a valid phone number";
    readonly url: (value: string) => true | "Please enter a valid URL";
    readonly number: (value: string) => true | "Please enter a valid number";
};
/**
 * Form field configuration interface
 */
export interface FormFieldConfig {
    /** Field label */
    label?: ReactNode;
    /** Field description/help text */
    description?: ReactNode;
    /** Whether field is required */
    required?: boolean;
    /** Field size */
    size?: FormFieldSize;
    /** Field variant */
    variant?: FormFieldVariant;
    /** Field state */
    state?: FormFieldState;
    /** Whether field is disabled */
    disabled?: boolean;
    /** Custom validation function */
    validate?: (value: unknown) => boolean | string | Promise<boolean | string>;
    /** Multiple validation functions */
    validators?: Array<(value: unknown) => boolean | string>;
    /** Custom class names */
    classNames?: ComponentClassNames<typeof baseFormFieldClasses>;
}
/**
 * Form group configuration
 */
export interface FormGroupConfig {
    /** Group label */
    label?: ReactNode;
    /** Group description */
    description?: ReactNode;
    /** Group orientation */
    orientation?: "horizontal" | "vertical";
    /** Spacing between items */
    spacing?: "sm" | "md" | "lg";
    /** Whether group is required */
    required?: boolean;
    /** Whether group is disabled */
    disabled?: boolean;
    /** Custom class names */
    classNames?: {
        wrapper?: string;
        label?: string;
        description?: string;
        items?: string;
    };
}
/**
 * Validate form field value
 */
export declare const validateFormField: (value: unknown, config: FormFieldConfig) => Promise<{
    valid: boolean;
    error?: string;
}>;
/**
 * Get form field classes based on configuration
 */
export declare const getFormFieldClasses: (config: FormFieldConfig) => {
    wrapper: "" | "relative flex flex-col";
    label: "text-foreground-600 text-sm font-medium mb-1" | "text-foreground-600";
    description: "text-xs" | "text-foreground-400 text-xs mt-1";
    errorMessage: "text-xs" | "text-danger text-xs mt-1";
    required: "text-danger ml-1";
} | {
    wrapper: "" | "relative flex flex-col";
    label: "text-danger" | "text-foreground-600 text-sm font-medium mb-1";
    description: "text-xs" | "text-foreground-400 text-xs mt-1";
    errorMessage: "block" | "text-danger text-xs mt-1";
    required: "text-danger ml-1";
} | {
    wrapper: "" | "relative flex flex-col";
    label: "text-success" | "text-foreground-600 text-sm font-medium mb-1";
    description: "text-xs" | "text-foreground-400 text-xs mt-1";
    errorMessage: "text-xs" | "text-danger text-xs mt-1";
    required: "text-danger ml-1";
} | {
    wrapper: "relative flex flex-col" | "opacity-60 pointer-events-none";
    label: "text-foreground-600 text-sm font-medium mb-1" | "text-foreground-400";
    description: "text-xs" | "text-foreground-400 text-xs mt-1";
    errorMessage: "text-xs" | "text-danger text-xs mt-1";
    required: "text-danger ml-1";
} | {
    wrapper: "" | "relative flex flex-col";
    label: "text-foreground-600 text-sm font-medium mb-1" | "text-foreground-600";
    description: "text-xs" | "text-foreground-400 text-xs mt-1";
    errorMessage: "text-xs" | "text-danger text-xs mt-1";
    required: "text-danger ml-1";
} | {
    wrapper: "" | "relative flex flex-col";
    label: "text-danger" | "text-foreground-600 text-sm font-medium mb-1";
    description: "text-xs" | "text-foreground-400 text-xs mt-1";
    errorMessage: "block" | "text-danger text-xs mt-1";
    required: "text-danger ml-1";
} | {
    wrapper: "" | "relative flex flex-col";
    label: "text-success" | "text-foreground-600 text-sm font-medium mb-1";
    description: "text-xs" | "text-foreground-400 text-xs mt-1";
    errorMessage: "text-xs" | "text-danger text-xs mt-1";
    required: "text-danger ml-1";
} | {
    wrapper: "relative flex flex-col" | "opacity-60 pointer-events-none";
    label: "text-foreground-600 text-sm font-medium mb-1" | "text-foreground-400";
    description: "text-xs" | "text-foreground-400 text-xs mt-1";
    errorMessage: "text-xs" | "text-danger text-xs mt-1";
    required: "text-danger ml-1";
} | {
    wrapper: "" | "relative flex flex-col";
    label: "text-foreground-600 text-sm font-medium mb-1" | "text-foreground-600";
    description: "text-sm" | "text-foreground-400 text-xs mt-1";
    errorMessage: "text-sm" | "text-danger text-xs mt-1";
    required: "text-danger ml-1";
} | {
    wrapper: "" | "relative flex flex-col";
    label: "text-danger" | "text-foreground-600 text-sm font-medium mb-1";
    description: "text-sm" | "text-foreground-400 text-xs mt-1";
    errorMessage: "block" | "text-danger text-xs mt-1";
    required: "text-danger ml-1";
} | {
    wrapper: "" | "relative flex flex-col";
    label: "text-success" | "text-foreground-600 text-sm font-medium mb-1";
    description: "text-sm" | "text-foreground-400 text-xs mt-1";
    errorMessage: "text-sm" | "text-danger text-xs mt-1";
    required: "text-danger ml-1";
} | {
    wrapper: "relative flex flex-col" | "opacity-60 pointer-events-none";
    label: "text-foreground-600 text-sm font-medium mb-1" | "text-foreground-400";
    description: "text-sm" | "text-foreground-400 text-xs mt-1";
    errorMessage: "text-sm" | "text-danger text-xs mt-1";
    required: "text-danger ml-1";
};
/**
 * Create form field props with validation
 */
export declare const createFormFieldProps: <T extends Record<string, unknown>>(userProps: T, config: FormFieldConfig) => {
    size: FormFieldSize;
    variant: FormFieldVariant;
    isRequired: boolean;
    isDisabled: boolean;
    isInvalid: boolean;
    label: ReactNode;
    description: ReactNode;
    classNames: {
        wrapper: "" | "relative flex flex-col";
        label: "text-foreground-600 text-sm font-medium mb-1" | "text-foreground-600";
        description: "text-xs" | "text-foreground-400 text-xs mt-1";
        errorMessage: "text-xs" | "text-danger text-xs mt-1";
        required: "text-danger ml-1";
    } | {
        wrapper: "" | "relative flex flex-col";
        label: "text-danger" | "text-foreground-600 text-sm font-medium mb-1";
        description: "text-xs" | "text-foreground-400 text-xs mt-1";
        errorMessage: "block" | "text-danger text-xs mt-1";
        required: "text-danger ml-1";
    } | {
        wrapper: "" | "relative flex flex-col";
        label: "text-success" | "text-foreground-600 text-sm font-medium mb-1";
        description: "text-xs" | "text-foreground-400 text-xs mt-1";
        errorMessage: "text-xs" | "text-danger text-xs mt-1";
        required: "text-danger ml-1";
    } | {
        wrapper: "relative flex flex-col" | "opacity-60 pointer-events-none";
        label: "text-foreground-600 text-sm font-medium mb-1" | "text-foreground-400";
        description: "text-xs" | "text-foreground-400 text-xs mt-1";
        errorMessage: "text-xs" | "text-danger text-xs mt-1";
        required: "text-danger ml-1";
    } | {
        wrapper: "" | "relative flex flex-col";
        label: "text-foreground-600 text-sm font-medium mb-1" | "text-foreground-600";
        description: "text-xs" | "text-foreground-400 text-xs mt-1";
        errorMessage: "text-xs" | "text-danger text-xs mt-1";
        required: "text-danger ml-1";
    } | {
        wrapper: "" | "relative flex flex-col";
        label: "text-danger" | "text-foreground-600 text-sm font-medium mb-1";
        description: "text-xs" | "text-foreground-400 text-xs mt-1";
        errorMessage: "block" | "text-danger text-xs mt-1";
        required: "text-danger ml-1";
    } | {
        wrapper: "" | "relative flex flex-col";
        label: "text-success" | "text-foreground-600 text-sm font-medium mb-1";
        description: "text-xs" | "text-foreground-400 text-xs mt-1";
        errorMessage: "text-xs" | "text-danger text-xs mt-1";
        required: "text-danger ml-1";
    } | {
        wrapper: "relative flex flex-col" | "opacity-60 pointer-events-none";
        label: "text-foreground-600 text-sm font-medium mb-1" | "text-foreground-400";
        description: "text-xs" | "text-foreground-400 text-xs mt-1";
        errorMessage: "text-xs" | "text-danger text-xs mt-1";
        required: "text-danger ml-1";
    } | {
        wrapper: "" | "relative flex flex-col";
        label: "text-foreground-600 text-sm font-medium mb-1" | "text-foreground-600";
        description: "text-sm" | "text-foreground-400 text-xs mt-1";
        errorMessage: "text-sm" | "text-danger text-xs mt-1";
        required: "text-danger ml-1";
    } | {
        wrapper: "" | "relative flex flex-col";
        label: "text-danger" | "text-foreground-600 text-sm font-medium mb-1";
        description: "text-sm" | "text-foreground-400 text-xs mt-1";
        errorMessage: "block" | "text-danger text-xs mt-1";
        required: "text-danger ml-1";
    } | {
        wrapper: "" | "relative flex flex-col";
        label: "text-success" | "text-foreground-600 text-sm font-medium mb-1";
        description: "text-sm" | "text-foreground-400 text-xs mt-1";
        errorMessage: "text-sm" | "text-danger text-xs mt-1";
        required: "text-danger ml-1";
    } | {
        wrapper: "relative flex flex-col" | "opacity-60 pointer-events-none";
        label: "text-foreground-600 text-sm font-medium mb-1" | "text-foreground-400";
        description: "text-sm" | "text-foreground-400 text-xs mt-1";
        errorMessage: "text-sm" | "text-danger text-xs mt-1";
        required: "text-danger ml-1";
    };
} & T;
/**
 * Default form behavior configuration
 */
export declare const defaultFormBehavior: {
    readonly size: "md";
    readonly variant: "bordered";
    readonly state: "default";
    readonly required: false;
    readonly disabled: false;
    readonly validateOnChange: true;
    readonly validateOnBlur: true;
    readonly showValidationIcon: true;
};
