import { ReactNode } from 'react';
/**
 * Default class names for dropdown components
 */
export declare const defaultDropdownClassNames: {
    readonly base: "relative inline-block";
    readonly trigger: "";
    readonly content: "z-50 min-w-[200px] rounded-lg border border-border bg-background p-1 shadow-lg";
    readonly arrow: "fill-background";
    readonly section: "";
    readonly sectionTitle: "px-2 py-1.5 text-xs font-semibold text-foreground-600 uppercase tracking-wider";
    readonly item: "relative flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors";
    readonly itemContent: "flex-1 truncate";
    readonly itemShortcut: "ml-auto text-xs text-foreground-500";
    readonly divider: "my-1 h-px bg-border";
};
/**
 * Dropdown size class configurations
 */
export declare const dropdownSizeClasses: {
    readonly sm: {
        readonly content: "min-w-[150px] text-xs";
        readonly item: "px-1.5 py-1 text-xs";
        readonly sectionTitle: "px-1.5 py-1 text-xs";
    };
    readonly md: {
        readonly content: "min-w-[200px] text-sm";
        readonly item: "px-2 py-1.5 text-sm";
        readonly sectionTitle: "px-2 py-1.5 text-xs";
    };
    readonly lg: {
        readonly content: "min-w-[250px] text-base";
        readonly item: "px-3 py-2 text-base";
        readonly sectionTitle: "px-3 py-2 text-sm";
    };
};
/**
 * Dropdown item variant classes
 */
export declare const dropdownItemVariantClasses: {
    readonly default: {
        readonly item: "hover:bg-content1 active:bg-content2 focus:bg-content1 focus:outline-none";
    };
    readonly destructive: {
        readonly item: "text-danger hover:bg-danger-50 active:bg-danger-100 focus:bg-danger-50 focus:outline-none";
    };
    readonly success: {
        readonly item: "text-success hover:bg-success-50 active:bg-success-100 focus:bg-success-50 focus:outline-none";
    };
    readonly warning: {
        readonly item: "text-warning hover:bg-warning-50 active:bg-warning-100 focus:bg-warning-50 focus:outline-none";
    };
};
/**
 * Dropdown placement configurations
 */
export declare const dropdownPlacementClasses: {
    readonly top: "origin-bottom";
    readonly "top-start": "origin-bottom-left";
    readonly "top-end": "origin-bottom-right";
    readonly bottom: "origin-top";
    readonly "bottom-start": "origin-top-left";
    readonly "bottom-end": "origin-top-right";
    readonly left: "origin-right";
    readonly "left-start": "origin-top-right";
    readonly "left-end": "origin-bottom-right";
    readonly right: "origin-left";
    readonly "right-start": "origin-top-left";
    readonly "right-end": "origin-bottom-left";
};
/**
 * Create dropdown class configuration
 */
export declare const dropdownClassConfig: {
    defaultClasses: {
        readonly base: "relative inline-block";
        readonly trigger: "";
        readonly content: "z-50 min-w-[200px] rounded-lg border border-border bg-background p-1 shadow-lg";
        readonly arrow: "fill-background";
        readonly section: "";
        readonly sectionTitle: "px-2 py-1.5 text-xs font-semibold text-foreground-600 uppercase tracking-wider";
        readonly item: "relative flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors";
        readonly itemContent: "flex-1 truncate";
        readonly itemShortcut: "ml-auto text-xs text-foreground-500";
        readonly divider: "my-1 h-px bg-border";
    };
    mergeClasses: (customClasses?: Partial<Record<"content" | "trigger" | "base" | "section" | "arrow" | "item" | "itemContent" | "divider" | "sectionTitle" | "itemShortcut", string>> | undefined) => Record<"content" | "trigger" | "base" | "section" | "arrow" | "item" | "itemContent" | "divider" | "sectionTitle" | "itemShortcut", string>;
};
/**
 * Get dropdown size classes
 */
export declare const getDropdownSizeClasses: (size?: keyof typeof dropdownSizeClasses) => {
    readonly content: "min-w-[150px] text-xs";
    readonly item: "px-1.5 py-1 text-xs";
    readonly sectionTitle: "px-1.5 py-1 text-xs";
} | {
    readonly content: "min-w-[200px] text-sm";
    readonly item: "px-2 py-1.5 text-sm";
    readonly sectionTitle: "px-2 py-1.5 text-xs";
} | {
    readonly content: "min-w-[250px] text-base";
    readonly item: "px-3 py-2 text-base";
    readonly sectionTitle: "px-3 py-2 text-sm";
};
/**
 * Get dropdown item variant classes
 */
export declare const getDropdownItemVariantClasses: (variant?: keyof typeof dropdownItemVariantClasses) => {
    readonly item: "hover:bg-content1 active:bg-content2 focus:bg-content1 focus:outline-none";
} | {
    readonly item: "text-danger hover:bg-danger-50 active:bg-danger-100 focus:bg-danger-50 focus:outline-none";
} | {
    readonly item: "text-success hover:bg-success-50 active:bg-success-100 focus:bg-success-50 focus:outline-none";
} | {
    readonly item: "text-warning hover:bg-warning-50 active:bg-warning-100 focus:bg-warning-50 focus:outline-none";
};
/**
 * Dropdown item configuration
 */
export interface DropdownItemConfig {
    key: string;
    label: ReactNode;
    href?: string;
    disabled?: boolean;
    readOnly?: boolean;
    shortcut?: string;
    variant?: keyof typeof dropdownItemVariantClasses;
    onClick?: () => void;
}
/**
 * Dropdown section configuration
 */
export interface DropdownSectionConfig {
    key: string;
    title?: ReactNode;
    items: DropdownItemConfig[];
}
/**
 * Full dropdown config
 */
export interface DropdownConfig {
    sections: DropdownSectionConfig[];
}
/**
 * Create dropdown props from full config
 */
export declare const createDropdownProps: (config: DropdownConfig) => DropdownItemConfig[];
/**
 * Validate a dropdown config structure
 */
export declare const validateDropdownConfig: (config: DropdownConfig) => boolean;
/**
 * Filter dropdown items with a search term
 */
export declare const searchDropdownItems: (config: DropdownConfig, search: string) => DropdownConfig;
/**
 * Handle keyboard navigation for dropdown
 */
export declare const handleDropdownKeyNavigation: (e: KeyboardEvent, items: HTMLElement[], currentIndex: number) => void;
