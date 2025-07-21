/**
 * Chip component configuration
 * Provides standardized styling and behavior patterns
 */

import { createClassNamesConfig, type ComponentClassNames } from "@/utils/classNames";
import type { ReactNode } from "react";

/**
 * Default class names for chip components
 */
export const defaultChipClassNames = {
  base: "inline-flex items-center gap-1.5 font-medium transition-all",
  content: "text-inherit",
  dot: "w-2 h-2 rounded-full",
  avatar: "flex-shrink-0",
  closeButton: "outline-none hover:opacity-80 transition-opacity",
} as const;

/**
 * Chip variant class configurations
 */
export const chipVariantClasses = {
  solid: {
    base: "text-white",
  },
  bordered: {
    base: "border-2 bg-transparent",
  },
  light: {
    base: "bg-transparent",
  },
  flat: {
    base: "",
  },
  faded: {
    base: "border border-default-200 bg-default-50",
  },
  shadow: {
    base: "shadow-lg",
  },
  dot: {
    base: "relative pl-6",
    dot: "absolute left-2 top-1/2 -translate-y-1/2",
  },
} as const;

/**
 * Chip size class configurations
 */
export const chipSizeClasses = {
  sm: {
    base: "px-2 py-1 text-xs h-6 min-h-6",
    content: "text-xs",
    closeButton: "w-4 h-4",
  },
  md: {
    base: "px-3 py-1.5 text-sm h-7 min-h-7",
    content: "text-sm",
    closeButton: "w-4 h-4",
  },
  lg: {
    base: "px-4 py-2 text-base h-8 min-h-8",
    content: "text-base",
    closeButton: "w-5 h-5",
  },
} as const;

/**
 * Chip color class configurations
 */
export const chipColorClasses = {
  default: {
    solid: "bg-default text-default-foreground",
    bordered: "border-default text-default",
    light: "text-default bg-default/20",
    flat: "bg-default-100 text-default-800",
    dot: "text-default",
  },
  primary: {
    solid: "bg-primary text-primary-foreground",
    bordered: "border-primary text-primary",
    light: "text-primary bg-primary/20",
    flat: "bg-primary-100 text-primary-800",
    dot: "text-primary",
  },
  secondary: {
    solid: "bg-secondary text-secondary-foreground",
    bordered: "border-secondary text-secondary",
    light: "text-secondary bg-secondary/20",
    flat: "bg-secondary-100 text-secondary-800",
    dot: "text-secondary",
  },
  success: {
    solid: "bg-success text-success-foreground",
    bordered: "border-success text-success",
    light: "text-success bg-success/20",
    flat: "bg-success-100 text-success-800",
    dot: "text-success",
  },
  warning: {
    solid: "bg-warning text-warning-foreground",
    bordered: "border-warning text-warning",
    light: "text-warning bg-warning/20",
    flat: "bg-warning-100 text-warning-800",
    dot: "text-warning",
  },
  danger: {
    solid: "bg-danger text-danger-foreground",
    bordered: "border-danger text-danger",
    light: "text-danger bg-danger/20",
    flat: "bg-danger-100 text-danger-800",
    dot: "text-danger",
  },
} as const;

/**
 * Create chip class configuration
 */
export const chipClassConfig = createClassNamesConfig(defaultChipClassNames);

/**
 * Get chip variant classes
 */
export const getChipVariantClasses = (variant: keyof typeof chipVariantClasses = "solid") => {
  return chipVariantClasses[variant] || chipVariantClasses.solid;
};

/**
 * Get chip size classes
 */
export const getChipSizeClasses = (size: keyof typeof chipSizeClasses = "md") => {
  return chipSizeClasses[size] || chipSizeClasses.md;
};

/**
 * Get chip color classes for specific variant
 */
export const getChipColorClasses = (
  color: keyof typeof chipColorClasses = "default",
  variant: keyof typeof chipVariantClasses = "solid"
) => {
  const colorConfig = chipColorClasses[color] || chipColorClasses.default;
  return colorConfig[variant as keyof typeof colorConfig] || colorConfig.solid;
};

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
export const validateChipConfig = (config: ChipConfig): { valid: boolean; errors: string[]; } => {
  const errors: string[] = [];

  if (!config.children && !config.startContent && !config.avatar) {
    errors.push("Chip must have children, startContent, or avatar");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Generate chip key from content
 */
export const generateChipKey = (content: ReactNode, index?: number): string => {
  if (typeof content === "string") {
    return content.toLowerCase().replace(/\s+/g, "-");
  }

  if (typeof content === "number") {
    return content.toString();
  }

  return `chip-${index ?? Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Default chip behavior configuration
 */
export const defaultChipBehavior = {
  variant: "solid" as const,
  color: "default" as const,
  size: "md" as const,
  radius: "full" as const,
  isDisabled: false,
  isCloseable: false,
} as const;
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

export const createChipProps = (
  userProps: ChipProps,
  overrides?: Partial<ChipProps>
) => {
  return {
    ...defaultChipBehavior,
    ...overrides,
    ...userProps,
  };
};