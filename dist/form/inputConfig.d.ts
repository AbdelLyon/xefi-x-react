/**
 * Default class names for input component
 */
export declare const defaultInputClassNames: {
    readonly base: "";
    readonly mainWrapper: "";
    readonly inputWrapper: "shadow-sm";
    readonly innerWrapper: "";
    readonly input: "text-small placeholder:text-default-500";
    readonly clearButton: "";
    readonly label: "text-small";
    readonly description: "text-tiny text-default-400";
    readonly errorMessage: "text-tiny text-danger";
};
/**
 * Input variant class configurations
 */
export declare const inputVariantClasses: {
    readonly flat: {
        readonly inputWrapper: string;
    };
    readonly faded: {
        readonly inputWrapper: string;
    };
    readonly bordered: {
        readonly inputWrapper: string;
    };
    readonly underlined: {
        readonly inputWrapper: string;
    };
};
/**
 * Input size class configurations
 */
export declare const inputSizeClasses: {
    readonly sm: {
        readonly inputWrapper: "h-10 min-h-10";
        readonly input: "text-sm";
        readonly label: "text-sm";
    };
    readonly md: {
        readonly inputWrapper: "h-12 min-h-12";
        readonly input: "text-sm";
        readonly label: "text-sm";
    };
    readonly lg: {
        readonly inputWrapper: "h-14 min-h-14";
        readonly input: "text-base";
        readonly label: "text-base";
    };
};
/**
 * Input color class configurations
 */
export declare const inputColorClasses: {
    readonly default: {
        readonly label: "text-default-600";
    };
    readonly primary: {
        readonly label: "text-primary";
        readonly inputWrapper: "group-data-[focus=true]:border-primary";
    };
    readonly secondary: {
        readonly label: "text-secondary";
        readonly inputWrapper: "group-data-[focus=true]:border-secondary";
    };
    readonly success: {
        readonly label: "text-success";
        readonly inputWrapper: "group-data-[focus=true]:border-success";
    };
    readonly warning: {
        readonly label: "text-warning";
        readonly inputWrapper: "group-data-[focus=true]:border-warning";
    };
    readonly danger: {
        readonly label: "text-danger";
        readonly inputWrapper: "group-data-[focus=true]:border-danger";
    };
};
/**
 * Create input class configuration
 */
export declare const inputClassConfig: {
    defaultClasses: {
        readonly base: "";
        readonly mainWrapper: "";
        readonly inputWrapper: "shadow-sm";
        readonly innerWrapper: "";
        readonly input: "text-small placeholder:text-default-500";
        readonly clearButton: "";
        readonly label: "text-small";
        readonly description: "text-tiny text-default-400";
        readonly errorMessage: "text-tiny text-danger";
    };
    mergeClasses: (customClasses?: Partial<Record<"base" | "input" | "label" | "description" | "mainWrapper" | "errorMessage" | "inputWrapper" | "innerWrapper" | "clearButton", string>> | undefined) => Record<"base" | "input" | "label" | "description" | "mainWrapper" | "errorMessage" | "inputWrapper" | "innerWrapper" | "clearButton", string>;
};
/**
 * Get input variant classes
 */
export declare const getInputVariantClasses: (variant?: keyof typeof inputVariantClasses) => {
    readonly inputWrapper: string;
} | {
    readonly inputWrapper: string;
} | {
    readonly inputWrapper: string;
} | {
    readonly inputWrapper: string;
};
/**
 * Get input size classes
 */
export declare const getInputSizeClasses: (size?: keyof typeof inputSizeClasses) => {
    readonly inputWrapper: "h-10 min-h-10";
    readonly input: "text-sm";
    readonly label: "text-sm";
} | {
    readonly inputWrapper: "h-12 min-h-12";
    readonly input: "text-sm";
    readonly label: "text-sm";
} | {
    readonly inputWrapper: "h-14 min-h-14";
    readonly input: "text-base";
    readonly label: "text-base";
};
/**
 * Get input color classes
 */
export declare const getInputColorClasses: (color?: keyof typeof inputColorClasses) => {
    readonly label: "text-default-600";
} | {
    readonly label: "text-primary";
    readonly inputWrapper: "group-data-[focus=true]:border-primary";
} | {
    readonly label: "text-secondary";
    readonly inputWrapper: "group-data-[focus=true]:border-secondary";
} | {
    readonly label: "text-success";
    readonly inputWrapper: "group-data-[focus=true]:border-success";
} | {
    readonly label: "text-warning";
    readonly inputWrapper: "group-data-[focus=true]:border-warning";
} | {
    readonly label: "text-danger";
    readonly inputWrapper: "group-data-[focus=true]:border-danger";
};
/**
 * Merge input class names
 */
export declare const mergeInputClassNames: (customClasses?: Partial<Record<"base" | "input" | "label" | "description" | "mainWrapper" | "errorMessage" | "inputWrapper" | "innerWrapper" | "clearButton", string>> | undefined) => Record<"base" | "input" | "label" | "description" | "mainWrapper" | "errorMessage" | "inputWrapper" | "innerWrapper" | "clearButton", string>;
