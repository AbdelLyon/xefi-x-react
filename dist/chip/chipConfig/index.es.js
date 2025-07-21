var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
import { createClassNamesConfig } from "../../utils/classNames/index.es.js";
const defaultChipClassNames = {
  base: "inline-flex items-center gap-1.5 font-medium transition-all",
  content: "text-inherit",
  dot: "w-2 h-2 rounded-full",
  avatar: "flex-shrink-0",
  closeButton: "outline-none hover:opacity-80 transition-opacity"
};
const chipVariantClasses = {
  solid: {
    base: "text-white"
  },
  bordered: {
    base: "border-2 bg-transparent"
  },
  light: {
    base: "bg-transparent"
  },
  flat: {
    base: ""
  },
  faded: {
    base: "border border-default-200 bg-default-50"
  },
  shadow: {
    base: "shadow-lg"
  },
  dot: {
    base: "relative pl-6",
    dot: "absolute left-2 top-1/2 -translate-y-1/2"
  }
};
const chipSizeClasses = {
  sm: {
    base: "px-2 py-1 text-xs h-6 min-h-6",
    content: "text-xs",
    closeButton: "w-4 h-4"
  },
  md: {
    base: "px-3 py-1.5 text-sm h-7 min-h-7",
    content: "text-sm",
    closeButton: "w-4 h-4"
  },
  lg: {
    base: "px-4 py-2 text-base h-8 min-h-8",
    content: "text-base",
    closeButton: "w-5 h-5"
  }
};
const chipColorClasses = {
  default: {
    solid: "bg-default text-default-foreground",
    bordered: "border-default text-default",
    light: "text-default bg-default/20",
    flat: "bg-default-100 text-default-800",
    dot: "text-default"
  },
  primary: {
    solid: "bg-primary text-primary-foreground",
    bordered: "border-primary text-primary",
    light: "text-primary bg-primary/20",
    flat: "bg-primary-100 text-primary-800",
    dot: "text-primary"
  },
  secondary: {
    solid: "bg-secondary text-secondary-foreground",
    bordered: "border-secondary text-secondary",
    light: "text-secondary bg-secondary/20",
    flat: "bg-secondary-100 text-secondary-800",
    dot: "text-secondary"
  },
  success: {
    solid: "bg-success text-success-foreground",
    bordered: "border-success text-success",
    light: "text-success bg-success/20",
    flat: "bg-success-100 text-success-800",
    dot: "text-success"
  },
  warning: {
    solid: "bg-warning text-warning-foreground",
    bordered: "border-warning text-warning",
    light: "text-warning bg-warning/20",
    flat: "bg-warning-100 text-warning-800",
    dot: "text-warning"
  },
  danger: {
    solid: "bg-danger text-danger-foreground",
    bordered: "border-danger text-danger",
    light: "text-danger bg-danger/20",
    flat: "bg-danger-100 text-danger-800",
    dot: "text-danger"
  }
};
const chipClassConfig = createClassNamesConfig(defaultChipClassNames);
const getChipVariantClasses = (variant = "solid") => {
  return chipVariantClasses[variant] || chipVariantClasses.solid;
};
const getChipSizeClasses = (size = "md") => {
  return chipSizeClasses[size] || chipSizeClasses.md;
};
const getChipColorClasses = (color = "default", variant = "solid") => {
  const colorConfig = chipColorClasses[color] || chipColorClasses.default;
  return colorConfig[variant] || colorConfig.solid;
};
const validateChipConfig = (config) => {
  const errors = [];
  if (!config.children && !config.startContent && !config.avatar) {
    errors.push("Chip must have children, startContent, or avatar");
  }
  return {
    valid: errors.length === 0,
    errors
  };
};
const generateChipKey = (content, index) => {
  if (typeof content === "string") {
    return content.toLowerCase().replace(/\s+/g, "-");
  }
  if (typeof content === "number") {
    return content.toString();
  }
  return `chip-${index != null ? index : Math.random().toString(36).substr(2, 9)}`;
};
const defaultChipBehavior = {
  variant: "solid",
  color: "default",
  size: "md",
  radius: "full",
  isDisabled: false,
  isCloseable: false
};
const createChipProps = (userProps, overrides) => {
  return __spreadValues(__spreadValues(__spreadValues({}, defaultChipBehavior), overrides), userProps);
};
export {
  chipClassConfig,
  chipColorClasses,
  chipSizeClasses,
  chipVariantClasses,
  createChipProps,
  defaultChipBehavior,
  defaultChipClassNames,
  generateChipKey,
  getChipColorClasses,
  getChipSizeClasses,
  getChipVariantClasses,
  validateChipConfig
};
