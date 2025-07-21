import { FormFieldConfig, FormGroupConfig } from './formConfig';
import { ReactNode } from 'react';
/**
 * Default class names for checkbox components
 */
export declare const defaultCheckboxClassNames: {
    readonly base: "group relative max-w-fit inline-flex items-center justify-start cursor-pointer";
    readonly wrapper: "relative inline-flex items-center justify-center flex-shrink-0";
    readonly icon: "z-10 w-4 h-4 opacity-0 group-data-[selected=true]:opacity-100 transition-opacity";
    readonly label: "ml-2 text-foreground select-none";
    readonly description: "text-foreground-400 text-xs mt-1";
    readonly errorMessage: "text-danger text-xs mt-1";
    readonly required: "text-danger ml-1";
};
/**
 * Checkbox size class configurations
 */
export declare const checkboxSizeClasses: {
    readonly sm: {
        readonly wrapper: "w-4 h-4 mr-2";
        readonly icon: "w-3 h-3";
        readonly label: "text-sm";
    };
    readonly md: {
        readonly wrapper: "w-5 h-5 mr-2";
        readonly icon: "w-3 h-3";
        readonly label: "text-base";
    };
    readonly lg: {
        readonly wrapper: "w-6 h-6 mr-3";
        readonly icon: "w-4 h-4";
        readonly label: "text-lg";
    };
};
/**
 * Checkbox color class configurations
 */
export declare const checkboxColorClasses: {
    readonly default: {
        readonly wrapper: "border-default-300 data-[selected=true]:border-default data-[selected=true]:bg-default";
        readonly icon: "text-default-foreground";
    };
    readonly primary: {
        readonly wrapper: "border-default-300 data-[selected=true]:border-primary data-[selected=true]:bg-primary";
        readonly icon: "text-primary-foreground";
    };
    readonly secondary: {
        readonly wrapper: "border-default-300 data-[selected=true]:border-secondary data-[selected=true]:bg-secondary";
        readonly icon: "text-secondary-foreground";
    };
    readonly success: {
        readonly wrapper: "border-default-300 data-[selected=true]:border-success data-[selected=true]:bg-success";
        readonly icon: "text-success-foreground";
    };
    readonly warning: {
        readonly wrapper: "border-default-300 data-[selected=true]:border-warning data-[selected=true]:bg-warning";
        readonly icon: "text-warning-foreground";
    };
    readonly danger: {
        readonly wrapper: "border-default-300 data-[selected=true]:border-danger data-[selected=true]:bg-danger";
        readonly icon: "text-danger-foreground";
    };
};
/**
 * Checkbox state classes
 */
export declare const checkboxStateClasses: {
    readonly default: {
        readonly base: "";
        readonly wrapper: "";
    };
    readonly invalid: {
        readonly base: "";
        readonly wrapper: "border-danger data-[selected=true]:border-danger data-[selected=true]:bg-danger";
    };
    readonly valid: {
        readonly base: "";
        readonly wrapper: "border-success data-[selected=true]:border-success data-[selected=true]:bg-success";
    };
    readonly disabled: {
        readonly base: "opacity-50 cursor-not-allowed";
        readonly wrapper: "border-default-200 bg-default-100";
    };
};
/**
 * Create checkbox class configuration
 */
export declare const checkboxClassConfig: {
    defaultClasses: {
        readonly base: "group relative max-w-fit inline-flex items-center justify-start cursor-pointer";
        readonly wrapper: "relative inline-flex items-center justify-center flex-shrink-0";
        readonly icon: "z-10 w-4 h-4 opacity-0 group-data-[selected=true]:opacity-100 transition-opacity";
        readonly label: "ml-2 text-foreground select-none";
        readonly description: "text-foreground-400 text-xs mt-1";
        readonly errorMessage: "text-danger text-xs mt-1";
        readonly required: "text-danger ml-1";
    };
    mergeClasses: (customClasses?: Partial<Record<"base" | "label" | "description" | "icon" | "wrapper" | "errorMessage" | "required", string>> | undefined) => Record<"base" | "label" | "description" | "icon" | "wrapper" | "errorMessage" | "required", string>;
};
/**
 * Get checkbox size classes
 */
export declare const getCheckboxSizeClasses: (size?: keyof typeof checkboxSizeClasses) => {
    readonly wrapper: "w-4 h-4 mr-2";
    readonly icon: "w-3 h-3";
    readonly label: "text-sm";
} | {
    readonly wrapper: "w-5 h-5 mr-2";
    readonly icon: "w-3 h-3";
    readonly label: "text-base";
} | {
    readonly wrapper: "w-6 h-6 mr-3";
    readonly icon: "w-4 h-4";
    readonly label: "text-lg";
};
/**
 * Get checkbox color classes
 */
export declare const getCheckboxColorClasses: (color?: keyof typeof checkboxColorClasses) => {
    readonly wrapper: "border-default-300 data-[selected=true]:border-default data-[selected=true]:bg-default";
    readonly icon: "text-default-foreground";
} | {
    readonly wrapper: "border-default-300 data-[selected=true]:border-primary data-[selected=true]:bg-primary";
    readonly icon: "text-primary-foreground";
} | {
    readonly wrapper: "border-default-300 data-[selected=true]:border-secondary data-[selected=true]:bg-secondary";
    readonly icon: "text-secondary-foreground";
} | {
    readonly wrapper: "border-default-300 data-[selected=true]:border-success data-[selected=true]:bg-success";
    readonly icon: "text-success-foreground";
} | {
    readonly wrapper: "border-default-300 data-[selected=true]:border-warning data-[selected=true]:bg-warning";
    readonly icon: "text-warning-foreground";
} | {
    readonly wrapper: "border-default-300 data-[selected=true]:border-danger data-[selected=true]:bg-danger";
    readonly icon: "text-danger-foreground";
};
/**
 * Get checkbox state classes
 */
export declare const getCheckboxStateClasses: (state?: keyof typeof checkboxStateClasses) => {
    readonly base: "";
    readonly wrapper: "";
} | {
    readonly base: "";
    readonly wrapper: "border-danger data-[selected=true]:border-danger data-[selected=true]:bg-danger";
} | {
    readonly base: "";
    readonly wrapper: "border-success data-[selected=true]:border-success data-[selected=true]:bg-success";
} | {
    readonly base: "opacity-50 cursor-not-allowed";
    readonly wrapper: "border-default-200 bg-default-100";
};
/**
 * Checkbox item configuration
 */
export interface CheckboxItemConfig extends FormFieldConfig {
    /** Checkbox value */
    value: string;
    /** Checkbox label content */
    label?: ReactNode;
    /** Whether checkbox is checked */
    checked?: boolean;
    /** Whether checkbox is indeterminate */
    indeterminate?: boolean;
    /** Custom icon for checked state */
    icon?: ReactNode;
    /** Custom color theme */
    color?: keyof typeof checkboxColorClasses;
    /** Change handler */
    onChange?: (checked: boolean) => void;
}
/**
 * Checkbox group configuration
 */
export interface CheckboxGroupConfig extends FormGroupConfig {
    /** Array of checkbox items */
    items: CheckboxItemConfig[];
    /** Current selected values */
    value?: string[];
    /** Default selected values */
    defaultValue?: string[];
    /** Selection change handler */
    onChange?: (values: string[]) => void;
    /** Maximum selections allowed */
    maxSelections?: number;
    /** Minimum selections required */
    minSelections?: number;
    /** Whether to show select all option */
    showSelectAll?: boolean;
    /** Select all label */
    selectAllLabel?: ReactNode;
}
/**
 * Validate checkbox group selection
 */
export declare const validateCheckboxGroup: (selectedValues: string[], config: CheckboxGroupConfig) => {
    valid: boolean;
    errors: string[];
};
/**
 * Create checkbox props with defaults
 */
export declare const createCheckboxProps: <T extends Record<string, unknown>>(userProps: T, config: CheckboxItemConfig) => {
    value: string;
    isSelected: boolean;
    isIndeterminate: boolean;
    isRequired: boolean;
    isDisabled: boolean;
    isInvalid: boolean;
    size: import('./formConfig').FormFieldSize;
    color: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
    classNames: Record<"base" | "label" | "description" | "icon" | "wrapper" | "errorMessage" | "required", string>;
    children: ReactNode;
    icon: ReactNode;
    onValueChange: ((checked: boolean) => void) | undefined;
} & T;
/**
 * Default checkbox behavior
 */
export declare const defaultCheckboxBehavior: {
    readonly size: "md";
    readonly color: "primary";
    readonly state: "default";
    readonly required: false;
    readonly disabled: false;
    readonly checked: false;
    readonly indeterminate: false;
};
