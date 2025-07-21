import { ComponentClassNames } from '../utils/classNames';
import { ReactNode } from 'react';
/**
 * Default class names for chip components
 */
export declare const defaultChipClassNames: {
    readonly base: "inline-flex items-center gap-1.5 font-medium transition-all";
    readonly content: "text-inherit";
    readonly dot: "w-2 h-2 rounded-full";
    readonly avatar: "flex-shrink-0";
    readonly closeButton: "outline-none hover:opacity-80 transition-opacity";
};
/**
 * Chip variant class configurations
 */
export declare const chipVariantClasses: {
    readonly solid: {
        readonly base: "text-white";
    };
    readonly bordered: {
        readonly base: "border-2 bg-transparent";
    };
    readonly light: {
        readonly base: "bg-transparent";
    };
    readonly flat: {
        readonly base: "";
    };
    readonly faded: {
        readonly base: "border border-default-200 bg-default-50";
    };
    readonly shadow: {
        readonly base: "shadow-lg";
    };
    readonly dot: {
        readonly base: "relative pl-6";
        readonly dot: "absolute left-2 top-1/2 -translate-y-1/2";
    };
};
/**
 * Chip size class configurations
 */
export declare const chipSizeClasses: {
    readonly sm: {
        readonly base: "px-2 py-1 text-xs h-6 min-h-6";
        readonly content: "text-xs";
        readonly closeButton: "w-4 h-4";
    };
    readonly md: {
        readonly base: "px-3 py-1.5 text-sm h-7 min-h-7";
        readonly content: "text-sm";
        readonly closeButton: "w-4 h-4";
    };
    readonly lg: {
        readonly base: "px-4 py-2 text-base h-8 min-h-8";
        readonly content: "text-base";
        readonly closeButton: "w-5 h-5";
    };
};
/**
 * Chip color class configurations
 */
export declare const chipColorClasses: {
    readonly default: {
        readonly solid: "bg-default text-default-foreground";
        readonly bordered: "border-default text-default";
        readonly light: "text-default bg-default/20";
        readonly flat: "bg-default-100 text-default-800";
        readonly dot: "text-default";
    };
    readonly primary: {
        readonly solid: "bg-primary text-primary-foreground";
        readonly bordered: "border-primary text-primary";
        readonly light: "text-primary bg-primary/20";
        readonly flat: "bg-primary-100 text-primary-800";
        readonly dot: "text-primary";
    };
    readonly secondary: {
        readonly solid: "bg-secondary text-secondary-foreground";
        readonly bordered: "border-secondary text-secondary";
        readonly light: "text-secondary bg-secondary/20";
        readonly flat: "bg-secondary-100 text-secondary-800";
        readonly dot: "text-secondary";
    };
    readonly success: {
        readonly solid: "bg-success text-success-foreground";
        readonly bordered: "border-success text-success";
        readonly light: "text-success bg-success/20";
        readonly flat: "bg-success-100 text-success-800";
        readonly dot: "text-success";
    };
    readonly warning: {
        readonly solid: "bg-warning text-warning-foreground";
        readonly bordered: "border-warning text-warning";
        readonly light: "text-warning bg-warning/20";
        readonly flat: "bg-warning-100 text-warning-800";
        readonly dot: "text-warning";
    };
    readonly danger: {
        readonly solid: "bg-danger text-danger-foreground";
        readonly bordered: "border-danger text-danger";
        readonly light: "text-danger bg-danger/20";
        readonly flat: "bg-danger-100 text-danger-800";
        readonly dot: "text-danger";
    };
};
/**
 * Create chip class configuration
 */
export declare const chipClassConfig: {
    defaultClasses: {
        readonly base: "inline-flex items-center gap-1.5 font-medium transition-all";
        readonly content: "text-inherit";
        readonly dot: "w-2 h-2 rounded-full";
        readonly avatar: "flex-shrink-0";
        readonly closeButton: "outline-none hover:opacity-80 transition-opacity";
    };
    mergeClasses: (customClasses?: Partial<Record<"content" | "base" | "closeButton" | "avatar" | "dot", string>> | undefined) => Record<"content" | "base" | "closeButton" | "avatar" | "dot", string>;
};
/**
 * Get chip variant classes
 */
export declare const getChipVariantClasses: (variant?: keyof typeof chipVariantClasses) => {
    readonly base: "text-white";
} | {
    readonly base: "border-2 bg-transparent";
} | {
    readonly base: "bg-transparent";
} | {
    readonly base: "";
} | {
    readonly base: "border border-default-200 bg-default-50";
} | {
    readonly base: "shadow-lg";
} | {
    readonly base: "relative pl-6";
    readonly dot: "absolute left-2 top-1/2 -translate-y-1/2";
};
/**
 * Get chip size classes
 */
export declare const getChipSizeClasses: (size?: keyof typeof chipSizeClasses) => {
    readonly base: "px-2 py-1 text-xs h-6 min-h-6";
    readonly content: "text-xs";
    readonly closeButton: "w-4 h-4";
} | {
    readonly base: "px-3 py-1.5 text-sm h-7 min-h-7";
    readonly content: "text-sm";
    readonly closeButton: "w-4 h-4";
} | {
    readonly base: "px-4 py-2 text-base h-8 min-h-8";
    readonly content: "text-base";
    readonly closeButton: "w-5 h-5";
};
/**
 * Get chip color classes for specific variant
 */
export declare const getChipColorClasses: (color?: keyof typeof chipColorClasses, variant?: keyof typeof chipVariantClasses) => "bg-default text-default-foreground" | "bg-primary text-primary-foreground" | "bg-secondary text-secondary-foreground" | "bg-success text-success-foreground" | "bg-warning text-warning-foreground" | "bg-danger text-danger-foreground" | "border-default text-default" | "text-default bg-default/20" | "bg-default-100 text-default-800" | "text-default" | "border-primary text-primary" | "text-primary bg-primary/20" | "bg-primary-100 text-primary-800" | "text-primary" | "border-secondary text-secondary" | "text-secondary bg-secondary/20" | "bg-secondary-100 text-secondary-800" | "text-secondary" | "border-success text-success" | "text-success bg-success/20" | "bg-success-100 text-success-800" | "text-success" | "border-warning text-warning" | "text-warning bg-warning/20" | "bg-warning-100 text-warning-800" | "text-warning" | "border-danger text-danger" | "text-danger bg-danger/20" | "bg-danger-100 text-danger-800" | "text-danger";
/**
 * Chip configuration interface
 */
export interface ChipConfig {
    /** Chip content */
    children: ReactNode;
    /** Chip variant */
    variant?: keyof typeof chipVariantClasses;
    /** Chip color */
    color?: keyof typeof chipColorClasses;
    /** Chip size */
    size?: keyof typeof chipSizeClasses;
    /** Chip radius */
    radius?: "none" | "sm" | "md" | "lg" | "full";
    /** Whether chip is closeable */
    onClose?: () => void;
    /** Start content (icon, avatar, etc.) */
    startContent?: ReactNode;
    /** End content (icon, close button, etc.) */
    endContent?: ReactNode;
    /** Avatar content */
    avatar?: ReactNode;
    /** Whether chip is disabled */
    isDisabled?: boolean;
    /** Custom class names */
    classNames?: ComponentClassNames<typeof defaultChipClassNames>;
}
/**
 * Chip group configuration
 */
export interface ChipGroupConfig {
    /** Array of chip configurations */
    chips: ChipConfig[];
    /** Whether chips are selectable */
    selectable?: boolean;
    /** Selection mode */
    selectionMode?: "single" | "multiple";
    /** Selected chip keys */
    selectedKeys?: Set<string>;
    /** Selection change handler */
    onSelectionChange?: (keys: Set<string>) => void;
    /** Group spacing */
    spacing?: "sm" | "md" | "lg";
    /** Group orientation */
    orientation?: "horizontal" | "vertical";
    /** Whether to wrap chips */
    wrap?: boolean;
}
/**
 * Validate chip configuration
 */
export declare const validateChipConfig: (config: ChipConfig) => {
    valid: boolean;
    errors: string[];
};
/**
 * Generate chip key from content
 */
export declare const generateChipKey: (content: ReactNode, index?: number) => string;
/**
 * Default chip behavior configuration
 */
export declare const defaultChipBehavior: {
    readonly variant: "solid";
    readonly color: "default";
    readonly size: "md";
    readonly radius: "full";
    readonly isDisabled: false;
    readonly isCloseable: false;
};
interface ChipProps {
    radius?: "md" | "full" | "sm" | "lg" | "none";
    isDisabled?: boolean;
    isCloseable?: boolean;
    content?: string;
    avatar?: React.ReactNode;
    [key: string]: unknown;
}
/**
 * Create chip props with defaults
 */
export declare const createChipProps: (userProps: ChipProps, overrides?: Partial<ChipProps>) => {
    radius: "md" | "full" | "sm" | "lg" | "none";
    isDisabled: boolean;
    isCloseable: boolean;
    content?: string;
    avatar?: React.ReactNode;
    variant: "solid";
    color: "default";
    size: "md";
};
export {};
