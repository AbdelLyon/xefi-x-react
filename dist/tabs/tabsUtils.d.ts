import { TabsProps } from './Tabs';
/**
 * Default class names for tabs component
 */
export declare const defaultTabsClassNames: {
    readonly base: "";
    readonly tabList: "gap-2";
    readonly cursor: "";
    readonly tab: "text-base";
    readonly tabContent: "group-data-[selected=true]:text-primary";
    readonly panel: "py-4";
};
/**
 * Variant-specific class names for tabs
 */
export declare const tabsVariantClasses: {
    readonly solid: {
        readonly tabList: "";
        readonly tab: "";
    };
    readonly bordered: {
        readonly tabList: "border-1 border-border";
        readonly tab: "";
    };
    readonly underlined: {
        readonly tabList: "gap-4";
        readonly tab: "h-auto";
    };
    readonly light: {
        readonly tabList: "";
        readonly tab: "bg-transparent";
    };
};
/**
 * Create tabs class configuration
 */
export declare const tabsClassConfig: {
    defaultClasses: {
        readonly base: "";
        readonly tabList: "gap-2";
        readonly cursor: "";
        readonly tab: "text-base";
        readonly tabContent: "group-data-[selected=true]:text-primary";
        readonly panel: "py-4";
    };
    mergeClasses: (customClasses?: Partial<Record<"base" | "tab" | "cursor" | "tabList" | "tabContent" | "panel", string>> | undefined) => Record<"base" | "tab" | "cursor" | "tabList" | "tabContent" | "panel", string>;
};
/**
 * Get variant-specific classes for tabs
 */
export declare const getTabsVariantClasses: (variant?: TabsProps["variant"]) => Partial<(typeof tabsVariantClasses)[keyof typeof tabsVariantClasses]>;
/**
 * Merge tabs class names with proper Tailwind handling
 */
export declare const mergeTabsClassNames: (customClasses?: Partial<Record<"base" | "tab" | "cursor" | "tabList" | "tabContent" | "panel", string>> | undefined) => Record<"base" | "tab" | "cursor" | "tabList" | "tabContent" | "panel", string>;
