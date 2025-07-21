import { createClassNamesConfig } from "@/utils/classNames";
import type { TabsProps } from "./Tabs";

/**
 * Default class names for tabs component
 */
export const defaultTabsClassNames = {
  base: "",
  tabList: "gap-2",
  cursor: "",
  tab: "text-base",
  tabContent: "group-data-[selected=true]:text-primary",
  panel: "py-4",
} as const;

/**
 * Variant-specific class names for tabs
 */
export const tabsVariantClasses = {
  solid: {
    tabList: "",
    tab: "",
  },
  bordered: {
    tabList: "border-1 border-border",
    tab: "",
  },
  underlined: {
    tabList: "gap-4",
    tab: "h-auto",
  },
  light: {
    tabList: "",
    tab: "bg-transparent",
  },
} as const;

/**
 * Create tabs class configuration
 */
export const tabsClassConfig = createClassNamesConfig(defaultTabsClassNames);

/**
 * Get variant-specific classes for tabs
 */
export const getTabsVariantClasses = (
  variant: TabsProps["variant"] = "solid",
): Partial<typeof tabsVariantClasses[keyof typeof tabsVariantClasses]> => {
  return tabsVariantClasses[variant] || tabsVariantClasses.solid;
};

/**
 * Merge tabs class names with proper Tailwind handling
 */
export const mergeTabsClassNames = tabsClassConfig.mergeClasses;