import { createClassNamesConfig } from "../../utils/classNames/index.es.js";
const defaultInputClassNames = {
  base: "",
  mainWrapper: "",
  inputWrapper: "shadow-sm",
  innerWrapper: "",
  input: "text-small placeholder:text-default-500",
  clearButton: "",
  label: "text-small",
  description: "text-tiny text-default-400",
  errorMessage: "text-tiny text-danger"
};
const inputVariantClasses = {
  flat: {
    inputWrapper: [
      "border-none",
      "bg-default-100",
      "dark:bg-default-50",
      "data-[hover=true]:bg-default-200",
      "group-data-[focus=true]:bg-default-100",
      "h-12"
    ].join(" ")
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
    ].join(" ")
  },
  bordered: {
    inputWrapper: [
      "border-1",
      "border-default-300",
      "bg-transparent",
      "data-[hover=true]:border-default-400",
      "group-data-[focus=true]:border-foreground",
      "h-12"
    ].join(" ")
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
    ].join(" ")
  }
};
const inputSizeClasses = {
  sm: {
    inputWrapper: "h-10 min-h-10",
    input: "text-sm",
    label: "text-sm"
  },
  md: {
    inputWrapper: "h-12 min-h-12",
    input: "text-sm",
    label: "text-sm"
  },
  lg: {
    inputWrapper: "h-14 min-h-14",
    input: "text-base",
    label: "text-base"
  }
};
const inputColorClasses = {
  default: {
    label: "text-default-600"
  },
  primary: {
    label: "text-primary",
    inputWrapper: "group-data-[focus=true]:border-primary"
  },
  secondary: {
    label: "text-secondary",
    inputWrapper: "group-data-[focus=true]:border-secondary"
  },
  success: {
    label: "text-success",
    inputWrapper: "group-data-[focus=true]:border-success"
  },
  warning: {
    label: "text-warning",
    inputWrapper: "group-data-[focus=true]:border-warning"
  },
  danger: {
    label: "text-danger",
    inputWrapper: "group-data-[focus=true]:border-danger"
  }
};
const inputClassConfig = createClassNamesConfig(defaultInputClassNames);
const getInputVariantClasses = (variant = "flat") => {
  return inputVariantClasses[variant] || inputVariantClasses.flat;
};
const getInputSizeClasses = (size = "md") => {
  return inputSizeClasses[size] || inputSizeClasses.md;
};
const getInputColorClasses = (color = "default") => {
  return inputColorClasses[color] || inputColorClasses.default;
};
export {
  defaultInputClassNames,
  getInputColorClasses,
  getInputSizeClasses,
  getInputVariantClasses,
  inputClassConfig,
  inputColorClasses,
  inputSizeClasses,
  inputVariantClasses
};
