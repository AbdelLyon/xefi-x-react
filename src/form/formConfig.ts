/**
 * Form components shared configuration
 * Provides standardized styling and behavior patterns for all form elements
 */

import { type ComponentClassNames } from "@/utils/classNames";
import type { ReactNode } from "react";

/**
 * Common form field states
 */
export type FormFieldState = "default" | "invalid" | "valid" | "loading";

/**
 * Common form field sizes
 */
export type FormFieldSize = "sm" | "md" | "lg";

/**
 * Common form field variants
 */
export type FormFieldVariant = "flat" | "bordered" | "faded" | "underlined";

/**
 * Base form field class configurations
 */
export const baseFormFieldClasses = {
  wrapper: "relative flex flex-col",
  label: "text-foreground-600 text-sm font-medium mb-1",
  description: "text-foreground-400 text-xs mt-1",
  errorMessage: "text-danger text-xs mt-1",
  required: "text-danger ml-1",
} as const;

/**
 * Form field size classes
 */
export const formFieldSizeClasses = {
  sm: {
    label: "text-xs",
    description: "text-xs",
    errorMessage: "text-xs",
  },
  md: {
    label: "text-sm",
    description: "text-xs",
    errorMessage: "text-xs",
  },
  lg: {
    label: "text-base",
    description: "text-sm",
    errorMessage: "text-sm",
  },
} as const;

/**
 * Form field state classes
 */
export const formFieldStateClasses = {
  default: {
    wrapper: "",
    label: "text-foreground-600",
  },
  invalid: {
    wrapper: "",
    label: "text-danger",
    errorMessage: "block",
  },
  valid: {
    wrapper: "",
    label: "text-success",
  },
  loading: {
    wrapper: "opacity-60 pointer-events-none",
    label: "text-foreground-400",
  },
} as const;

/**
 * Common validation functions
 */
export const formValidators = {
  required: (value: unknown) => {
    if (value === null || value === undefined || value === "") {
      return "This field is required";
    }
    return true;
  },

  email: (value: string) => {
    if (!value) { return true; } // Allow empty for optional fields
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(value) || "Please enter a valid email address";
  },

  minLength: (min: number) => (value: string) => {
    if (!value) { return true; }
    return value.length >= min || `Must be at least ${min} characters`;
  },

  maxLength: (max: number) => (value: string) => {
    if (!value) { return true; }
    return value.length <= max || `Must be no more than ${max} characters`;
  },

  pattern: (regex: RegExp, message: string) => (value: string) => {
    if (!value) { return true; }
    return regex.test(value) || message;
  },

  phone: (value: string) => {
    if (!value) { return true; }
    const phoneRegex = /^[+]?[(]?[0-9\\s\\-\\(\\)]{10,}$/;
    return phoneRegex.test(value) || "Please enter a valid phone number";
  },

  url: (value: string) => {
    if (!value) { return true; }
    try {
      new URL(value);
      return true;
    } catch {
      return "Please enter a valid URL";
    }
  },

  number: (value: string) => {
    if (!value) { return true; }
    return !isNaN(Number(value)) || "Please enter a valid number";
  },
} as const;

/**
 * Form field configuration interface
 */
export interface FormFieldConfig {
  /** Field label */
  label?: ReactNode;
  /** Field description/help text */
  description?: ReactNode;
  /** Whether field is required */
  required?: boolean;
  /** Field size */
  size?: FormFieldSize;
  /** Field variant */
  variant?: FormFieldVariant;
  /** Field state */
  state?: FormFieldState;
  /** Whether field is disabled */
  disabled?: boolean;
  /** Custom validation function */
  validate?: (value: unknown) => boolean | string | Promise<boolean | string>;
  /** Multiple validation functions */
  validators?: Array<(value: unknown) => boolean | string>;
  /** Custom class names */
  classNames?: ComponentClassNames<typeof baseFormFieldClasses>;
}

/**
 * Form group configuration
 */
export interface FormGroupConfig {
  /** Group label */
  label?: ReactNode;
  /** Group description */
  description?: ReactNode;
  /** Group orientation */
  orientation?: "horizontal" | "vertical";
  /** Spacing between items */
  spacing?: "sm" | "md" | "lg";
  /** Whether group is required */
  required?: boolean;
  /** Whether group is disabled */
  disabled?: boolean;
  /** Custom class names */
  classNames?: {
    wrapper?: string;
    label?: string;
    description?: string;
    items?: string;
  };
}

/**
 * Validate form field value
 */
export const validateFormField = async (
  value: unknown,
  config: FormFieldConfig
): Promise<{ valid: boolean; error?: string; }> => {
  // Check required validation
  if (config.required) {
    const requiredResult = formValidators.required(value);
    if (typeof requiredResult === "string") {
      return { valid: false, error: requiredResult };
    }
  }

  // Run custom validation
  if (config.validate) {
    try {
      const result = await config.validate(value);
      if (typeof result === "string") {
        return { valid: false, error: result };
      }
      if (!result) {
        return { valid: false, error: "Validation failed" };
      }
    } catch {
      return { valid: false, error: "Validation error occurred" };
    }
  }

  // Run multiple validators
  if (config.validators) {
    for (const validator of config.validators) {
      const result = validator(value);
      if (typeof result === "string") {
        return { valid: false, error: result };
      }
      if (!result) {
        return { valid: false, error: "Validation failed" };
      }
    }
  }

  return { valid: true };
};

/**
 * Get form field classes based on configuration
 */
export const getFormFieldClasses = (config: FormFieldConfig) => {
  const sizeClasses = config.size ? formFieldSizeClasses[config.size] : formFieldSizeClasses.md;
  const stateClasses = config.state ? formFieldStateClasses[config.state] : formFieldStateClasses.default;

  return {
    ...baseFormFieldClasses,
    ...sizeClasses,
    ...stateClasses,
    ...config.classNames,
  };
};

/**
 * Create form field props with validation
 */
export const createFormFieldProps = <T extends Record<string, unknown>>(
  userProps: T,
  config: FormFieldConfig
) => {
  const fieldClasses = getFormFieldClasses(config);

  return {
    size: config.size || "md",
    variant: config.variant || "bordered",
    isRequired: config.required || false,
    isDisabled: config.disabled || false,
    isInvalid: config.state === "invalid",
    label: config.label,
    description: config.description,
    classNames: fieldClasses,
    ...userProps,
  };
};

/**
 * Default form behavior configuration
 */
export const defaultFormBehavior = {
  size: "md" as const,
  variant: "bordered" as const,
  state: "default" as const,
  required: false,
  disabled: false,
  validateOnChange: true,
  validateOnBlur: true,
  showValidationIcon: true,
} as const;