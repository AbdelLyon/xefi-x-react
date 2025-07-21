/**
 * Checkbox component configuration
 * Provides standardized styling and behavior patterns
 */

import { createClassNamesConfig } from "@/utils/classNames";
import { baseFormFieldClasses, type FormFieldConfig, type FormGroupConfig } from "./formConfig";
import type { ReactNode } from "react";

/**
 * Default class names for checkbox components
 */
export const defaultCheckboxClassNames = {
  ...baseFormFieldClasses,
  base: "group relative max-w-fit inline-flex items-center justify-start cursor-pointer",
  wrapper: "relative inline-flex items-center justify-center flex-shrink-0",
  icon: "z-10 w-4 h-4 opacity-0 group-data-[selected=true]:opacity-100 transition-opacity",
  label: "ml-2 text-foreground select-none",
} as const;

/**
 * Checkbox size class configurations
 */
export const checkboxSizeClasses = {
  sm: {
    wrapper: "w-4 h-4 mr-2",
    icon: "w-3 h-3",
    label: "text-sm",
  },
  md: {
    wrapper: "w-5 h-5 mr-2",
    icon: "w-3 h-3",
    label: "text-base",
  },
  lg: {
    wrapper: "w-6 h-6 mr-3",
    icon: "w-4 h-4",
    label: "text-lg",
  },
} as const;

/**
 * Checkbox color class configurations
 */
export const checkboxColorClasses = {
  default: {
    wrapper: "border-default-300 data-[selected=true]:border-default data-[selected=true]:bg-default",
    icon: "text-default-foreground",
  },
  primary: {
    wrapper: "border-default-300 data-[selected=true]:border-primary data-[selected=true]:bg-primary",
    icon: "text-primary-foreground",
  },
  secondary: {
    wrapper: "border-default-300 data-[selected=true]:border-secondary data-[selected=true]:bg-secondary",
    icon: "text-secondary-foreground",
  },
  success: {
    wrapper: "border-default-300 data-[selected=true]:border-success data-[selected=true]:bg-success",
    icon: "text-success-foreground",
  },
  warning: {
    wrapper: "border-default-300 data-[selected=true]:border-warning data-[selected=true]:bg-warning",
    icon: "text-warning-foreground",
  },
  danger: {
    wrapper: "border-default-300 data-[selected=true]:border-danger data-[selected=true]:bg-danger",
    icon: "text-danger-foreground",
  },
} as const;

/**
 * Checkbox state classes
 */
export const checkboxStateClasses = {
  default: {
    base: "",
    wrapper: "",
  },
  invalid: {
    base: "",
    wrapper: "border-danger data-[selected=true]:border-danger data-[selected=true]:bg-danger",
  },
  valid: {
    base: "",
    wrapper: "border-success data-[selected=true]:border-success data-[selected=true]:bg-success",
  },
  disabled: {
    base: "opacity-50 cursor-not-allowed",
    wrapper: "border-default-200 bg-default-100",
  },
} as const;

/**
 * Create checkbox class configuration
 */
export const checkboxClassConfig = createClassNamesConfig(defaultCheckboxClassNames);

/**
 * Get checkbox size classes
 */
export const getCheckboxSizeClasses = (size: keyof typeof checkboxSizeClasses = "md") => {
  return checkboxSizeClasses[size] || checkboxSizeClasses.md;
};

/**
 * Get checkbox color classes
 */
export const getCheckboxColorClasses = (color: keyof typeof checkboxColorClasses = "primary") => {
  return checkboxColorClasses[color] || checkboxColorClasses.primary;
};

/**
 * Get checkbox state classes
 */
export const getCheckboxStateClasses = (state: keyof typeof checkboxStateClasses = "default") => {
  return checkboxStateClasses[state] || checkboxStateClasses.default;
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
export const validateCheckboxGroup = (
  selectedValues: string[],
  config: CheckboxGroupConfig
): { valid: boolean; errors: string[]; } => {
  const errors: string[] = [];

  // Check minimum selections
  if (config.minSelections && selectedValues.length < config.minSelections) {
    errors.push(`Please select at least ${config.minSelections} option${config.minSelections > 1 ? "s" : ""}`);
  }

  // Check maximum selections
  if (config.maxSelections && selectedValues.length > config.maxSelections) {
    errors.push(`Please select no more than ${config.maxSelections} option${config.maxSelections > 1 ? "s" : ""}`);
  }

  // Check required validation
  if (config.required && selectedValues.length === 0) {
    errors.push("Please select at least one option");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Create checkbox props with defaults
 */
export const createCheckboxProps = <T extends Record<string, unknown>>(
  userProps: T,
  config: CheckboxItemConfig
) => {
  const sizeClasses = getCheckboxSizeClasses(config.size);
  const colorClasses = getCheckboxColorClasses(config.color);
  const stateClasses = getCheckboxStateClasses(config.state === 'loading' ? 'default' : config.state);

  const mergedClasses = checkboxClassConfig.mergeClasses({
    ...sizeClasses,
    ...colorClasses,
    ...stateClasses,
    ...config.classNames,
  });

  return {
    value: config.value,
    isSelected: config.checked || false,
    isIndeterminate: config.indeterminate || false,
    isRequired: config.required || false,
    isDisabled: config.disabled || false,
    isInvalid: config.state === "invalid",
    size: config.size || "md",
    color: config.color || "primary",
    classNames: mergedClasses,
    children: config.label,
    icon: config.icon,
    onValueChange: config.onChange,
    ...userProps,
  };
};

/**
 * Default checkbox behavior
 */
export const defaultCheckboxBehavior = {
  size: "md" as const,
  color: "primary" as const,
  state: "default" as const,
  required: false,
  disabled: false,
  checked: false,
  indeterminate: false,
} as const;