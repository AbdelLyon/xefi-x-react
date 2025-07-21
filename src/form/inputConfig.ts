import { createClassNamesConfig } from "@/utils/classNames";

/**
 * Default class names for input component
 */
export const defaultInputClassNames = {
  base: "",
  mainWrapper: "",
  inputWrapper: "shadow-sm",
  innerWrapper: "",
  input: "text-small placeholder:text-default-500",
  clearButton: "",
  label: "text-small",
  description: "text-tiny text-default-400",
  errorMessage: "text-tiny text-danger",
} as const;

/**
 * Input variant class configurations
 */
export const inputVariantClasses = {
  flat: {
    inputWrapper: [
      "border-none",
      "bg-default-100",
      "dark:bg-default-50",
      "data-[hover=true]:bg-default-200",
      "group-data-[focus=true]:bg-default-100",
      "h-12"
    ].join(" "),
  },
  faded: {
    inputWrapper: [
      "border-1",
      "border-transparent",
      "bg-default-100",
      "dark:bg-default-50",
      "data-[hover=true]:bg-default-200",
      "group-data-[focus=true]:border-foreground",
      "h-12"
    ].join(" "),
  },
  bordered: {
    inputWrapper: [
      "border-1",
      "border-default-300",
      "bg-transparent",
      "data-[hover=true]:border-default-400",
      "group-data-[focus=true]:border-foreground",
      "h-12"
    ].join(" "),
  },
  underlined: {
    inputWrapper: [
      "relative",
      "border-b-1",
      "rounded-none",
      "bg-transparent",
      "border-default-300",
      "data-[hover=true]:border-default-400",
      "group-data-[focus=true]:border-foreground",
      "h-12"
    ].join(" "),
  },
} as const;

/**
 * Input size class configurations
 */
export const inputSizeClasses = {
  sm: {
    inputWrapper: "h-10 min-h-10",
    input: "text-sm",
    label: "text-sm",
  },
  md: {
    inputWrapper: "h-12 min-h-12",
    input: "text-sm",
    label: "text-sm",
  },
  lg: {
    inputWrapper: "h-14 min-h-14",
    input: "text-base",
    label: "text-base",
  },
} as const;

/**
 * Input color class configurations
 */
export const inputColorClasses = {
  default: {
    label: "text-default-600",
  },
  primary: {
    label: "text-primary",
    inputWrapper: "group-data-[focus=true]:border-primary",
  },
  secondary: {
    label: "text-secondary",
    inputWrapper: "group-data-[focus=true]:border-secondary",
  },
  success: {
    label: "text-success",
    inputWrapper: "group-data-[focus=true]:border-success",
  },
  warning: {
    label: "text-warning",
    inputWrapper: "group-data-[focus=true]:border-warning",
  },
  danger: {
    label: "text-danger",
    inputWrapper: "group-data-[focus=true]:border-danger",
  },
} as const;

/**
 * Create input class configuration
 */
export const inputClassConfig = createClassNamesConfig(defaultInputClassNames);

/**
 * Get input variant classes
 */
export const getInputVariantClasses = (variant: keyof typeof inputVariantClasses = "flat") => {
  return inputVariantClasses[variant] || inputVariantClasses.flat;
};

/**
 * Get input size classes
 */
export const getInputSizeClasses = (size: keyof typeof inputSizeClasses = "md") => {
  return inputSizeClasses[size] || inputSizeClasses.md;
};

/**
 * Get input color classes
 */
export const getInputColorClasses = (color: keyof typeof inputColorClasses = "default") => {
  return inputColorClasses[color] || inputColorClasses.default;
};

/**
 * Merge input class names
 */
export const mergeInputClassNames = inputClassConfig.mergeClasses;