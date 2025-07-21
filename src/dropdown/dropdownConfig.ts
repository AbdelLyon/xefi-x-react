/**
 * Dropdown component configuration
 * Provides standardized styling and behavior patterns
 */

import { createClassNamesConfig } from "@/utils/classNames";
import type { ReactNode } from "react";

/**
 * Default class names for dropdown components
 */
export const defaultDropdownClassNames = {
  base: "relative inline-block",
  trigger: "",
  content: "z-50 min-w-[200px] rounded-lg border border-border bg-background p-1 shadow-lg",
  arrow: "fill-background",
  section: "",
  sectionTitle: "px-2 py-1.5 text-xs font-semibold text-foreground-600 uppercase tracking-wider",
  item: "relative flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
  itemContent: "flex-1 truncate",
  itemShortcut: "ml-auto text-xs text-foreground-500",
  divider: "my-1 h-px bg-border",
} as const;

/**
 * Dropdown size class configurations
 */
export const dropdownSizeClasses = {
  sm: {
    content: "min-w-[150px] text-xs",
    item: "px-1.5 py-1 text-xs",
    sectionTitle: "px-1.5 py-1 text-xs",
  },
  md: {
    content: "min-w-[200px] text-sm",
    item: "px-2 py-1.5 text-sm",
    sectionTitle: "px-2 py-1.5 text-xs",
  },
  lg: {
    content: "min-w-[250px] text-base",
    item: "px-3 py-2 text-base",
    sectionTitle: "px-3 py-2 text-sm",
  },
} as const;

/**
 * Dropdown item variant classes
 */
export const dropdownItemVariantClasses = {
  default: {
    item: "hover:bg-content1 active:bg-content2 focus:bg-content1 focus:outline-none",
  },
  destructive: {
    item: "text-danger hover:bg-danger-50 active:bg-danger-100 focus:bg-danger-50 focus:outline-none",
  },
  success: {
    item: "text-success hover:bg-success-50 active:bg-success-100 focus:bg-success-50 focus:outline-none",
  },
  warning: {
    item: "text-warning hover:bg-warning-50 active:bg-warning-100 focus:bg-warning-50 focus:outline-none",
  },
} as const;

/**
 * Dropdown placement configurations
 */
export const dropdownPlacementClasses = {
  top: "origin-bottom",
  "top-start": "origin-bottom-left",
  "top-end": "origin-bottom-right",
  bottom: "origin-top",
  "bottom-start": "origin-top-left",
  "bottom-end": "origin-top-right",
  left: "origin-right",
  "left-start": "origin-top-right",
  "left-end": "origin-bottom-right",
  right: "origin-left",
  "right-start": "origin-top-left",
  "right-end": "origin-bottom-left",
} as const;

/**
 * Create dropdown class configuration
 */
export const dropdownClassConfig = createClassNamesConfig(defaultDropdownClassNames);

/**
 * Get dropdown size classes
 */
export const getDropdownSizeClasses = (size: keyof typeof dropdownSizeClasses = "md") => {
  return dropdownSizeClasses[size] || dropdownSizeClasses.md;
};

/**
 * Get dropdown item variant classes
 */
export const getDropdownItemVariantClasses = (variant: keyof typeof dropdownItemVariantClasses = "default") => {
  return dropdownItemVariantClasses[variant] || dropdownItemVariantClasses.default;
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
export const createDropdownProps = (config: DropdownConfig) => {
  return config.sections.flatMap((section) => section.items);
};

/**
 * Validate a dropdown config structure
 */
export const validateDropdownConfig = (config: DropdownConfig) => {
  if (!Array.isArray(config.sections)) { return false; }
  return config.sections.every((section) => Array.isArray(section.items));
};

/**
 * Filter dropdown items with a search term
 */
export const searchDropdownItems = (config: DropdownConfig, search: string): DropdownConfig => {
  const term = search.toLowerCase();
  const filteredSections = config.sections
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => {
        const label = typeof item.label === "string" ? item.label : "";
        return label.toLowerCase().includes(term);
      }),
    }))
    .filter((section) => section.items.length > 0);

  return { sections: filteredSections };
};

/**
 * Handle keyboard navigation for dropdown
 */
export const handleDropdownKeyNavigation = (e: KeyboardEvent, items: HTMLElement[], currentIndex: number) => {
  if (e.key === "ArrowDown") {
    e.preventDefault();
    const next = (currentIndex + 1) % items.length;
    items[next]?.focus();
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    const prev = (currentIndex - 1 + items.length) % items.length;
    items[prev]?.focus();
  }
};
