/**
 * Accordion component configuration
 * Provides standardized styling and behavior patterns
 */

import { createClassNamesConfig, type ComponentClassNames } from "@/utils/classNames";

/**
 * Default class names for accordion components
 */
export const defaultAccordionClassNames = {
  base: "rounded-md",
  item: "w-full shadow-none",
  itemTitle: "text-lg font-semibold",
  itemContent: "text-sm",
  itemIndicator: "",
} as const;

/**
 * Accordion variant class configurations
 */
export const accordionVariantClasses = {
  light: {
    base: "",
    item: "bg-transparent",
  },
  shadow: {
    base: "shadow-md",
    item: "bg-white dark:bg-content1",
  },
  bordered: {
    base: "border-1 border-border",
    item: "border-b border-border last:border-b-0",
  },
  splitted: {
    base: "gap-2",
    item: "bg-white dark:bg-content1 border-1 border-border rounded-md mb-2 last:mb-0",
  },
} as const;

/**
 * Accordion size class configurations
 */
export const accordionSizeClasses = {
  sm: {
    itemTitle: "text-sm",
    itemContent: "text-xs",
  },
  md: {
    itemTitle: "text-base",
    itemContent: "text-sm",
  },
  lg: {
    itemTitle: "text-lg",
    itemContent: "text-base",
  },
} as const;

/**
 * Create accordion class configuration
 */
export const accordionClassConfig = createClassNamesConfig(defaultAccordionClassNames);

/**
 * Get accordion variant classes
 */
export const getAccordionVariantClasses = (variant: keyof typeof accordionVariantClasses = "light") => {
  return accordionVariantClasses[variant] || accordionVariantClasses.light;
};

/**
 * Get accordion size classes
 */
export const getAccordionSizeClasses = (size: keyof typeof accordionSizeClasses = "md") => {
  return accordionSizeClasses[size] || accordionSizeClasses.md;
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
export const validateAccordionItem = (item: AccordionItemConfig): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!item.key || typeof item.key !== "string") {
    errors.push("Item key is required and must be a string");
  }
  
  if (!item.title) {
    errors.push("Item title is required");
  }
  
  if (!item.content) {
    errors.push("Item content is required");
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Default accordion behavior configuration
 */
export const defaultAccordionBehavior = {
  variant: "light" as const,
  size: "md" as const,
  selectionMode: "multiple" as const,
  isCompact: false,
  hideIndicator: false,
  disallowEmptySelection: false,
  keepContentMounted: false,
} as const;

/**
 * Create accordion props with defaults
 */
export const createAccordionProps = <T extends Record<string, unknown>>(
  userProps: T,
  overrides?: Partial<typeof defaultAccordionBehavior>
) => {
  return {
    ...defaultAccordionBehavior,
    ...overrides,
    ...userProps,
  };
};