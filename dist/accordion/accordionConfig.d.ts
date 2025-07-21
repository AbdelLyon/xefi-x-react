import { ComponentClassNames } from '../utils/classNames';
/**
 * Default class names for accordion components
 */
export declare const defaultAccordionClassNames: {
    readonly base: "rounded-md";
    readonly item: "w-full shadow-none";
    readonly itemTitle: "text-lg font-semibold";
    readonly itemContent: "text-sm";
    readonly itemIndicator: "";
};
/**
 * Accordion variant class configurations
 */
export declare const accordionVariantClasses: {
    readonly light: {
        readonly base: "";
        readonly item: "bg-transparent";
    };
    readonly shadow: {
        readonly base: "shadow-md";
        readonly item: "bg-white dark:bg-content1";
    };
    readonly bordered: {
        readonly base: "border-1 border-border";
        readonly item: "border-b border-border last:border-b-0";
    };
    readonly splitted: {
        readonly base: "gap-2";
        readonly item: "bg-white dark:bg-content1 border-1 border-border rounded-md mb-2 last:mb-0";
    };
};
/**
 * Accordion size class configurations
 */
export declare const accordionSizeClasses: {
    readonly sm: {
        readonly itemTitle: "text-sm";
        readonly itemContent: "text-xs";
    };
    readonly md: {
        readonly itemTitle: "text-base";
        readonly itemContent: "text-sm";
    };
    readonly lg: {
        readonly itemTitle: "text-lg";
        readonly itemContent: "text-base";
    };
};
/**
 * Create accordion class configuration
 */
export declare const accordionClassConfig: {
    defaultClasses: {
        readonly base: "rounded-md";
        readonly item: "w-full shadow-none";
        readonly itemTitle: "text-lg font-semibold";
        readonly itemContent: "text-sm";
        readonly itemIndicator: "";
    };
    mergeClasses: (customClasses?: Partial<Record<"base" | "item" | "itemTitle" | "itemContent" | "itemIndicator", string>> | undefined) => Record<"base" | "item" | "itemTitle" | "itemContent" | "itemIndicator", string>;
};
/**
 * Get accordion variant classes
 */
export declare const getAccordionVariantClasses: (variant?: keyof typeof accordionVariantClasses) => {
    readonly base: "";
    readonly item: "bg-transparent";
} | {
    readonly base: "shadow-md";
    readonly item: "bg-white dark:bg-content1";
} | {
    readonly base: "border-1 border-border";
    readonly item: "border-b border-border last:border-b-0";
} | {
    readonly base: "gap-2";
    readonly item: "bg-white dark:bg-content1 border-1 border-border rounded-md mb-2 last:mb-0";
};
/**
 * Get accordion size classes
 */
export declare const getAccordionSizeClasses: (size?: keyof typeof accordionSizeClasses) => {
    readonly itemTitle: "text-sm";
    readonly itemContent: "text-xs";
} | {
    readonly itemTitle: "text-base";
    readonly itemContent: "text-sm";
} | {
    readonly itemTitle: "text-lg";
    readonly itemContent: "text-base";
};
/**
 * Accordion item configuration interface
 */
export interface AccordionItemConfig {
    key: string;
    title: React.ReactNode;
    content: React.ReactNode;
    isDisabled?: boolean;
    startContent?: React.ReactNode;
    subtitle?: React.ReactNode;
    classNames?: ComponentClassNames<typeof defaultAccordionClassNames>;
}
/**
 * Validate accordion item configuration
 */
export declare const validateAccordionItem: (item: AccordionItemConfig) => {
    valid: boolean;
    errors: string[];
};
/**
 * Default accordion behavior configuration
 */
export declare const defaultAccordionBehavior: {
    readonly variant: "light";
    readonly size: "md";
    readonly selectionMode: "multiple";
    readonly isCompact: false;
    readonly hideIndicator: false;
    readonly disallowEmptySelection: false;
    readonly keepContentMounted: false;
};
/**
 * Create accordion props with defaults
 */
export declare const createAccordionProps: <T extends Record<string, unknown>>(userProps: T, overrides?: Partial<typeof defaultAccordionBehavior>) => {
    variant: "light";
    size: "md";
    selectionMode: "multiple";
    isCompact: false;
    hideIndicator: false;
    disallowEmptySelection: false;
    keepContentMounted: false;
} & T;
