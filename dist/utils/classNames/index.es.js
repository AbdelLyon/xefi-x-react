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
import { mergeTailwindClasses } from "../utils/index.es.js";
const mergeComponentClassNames = (defaultClasses, customClasses) => {
  if (!customClasses) {
    return defaultClasses;
  }
  const merged = __spreadValues({}, defaultClasses);
  Object.keys(defaultClasses).forEach((key) => {
    const typedKey = key;
    const defaultClass = defaultClasses[typedKey];
    const customClass = customClasses[typedKey];
    if (customClass !== void 0) {
      merged[typedKey] = mergeTailwindClasses(defaultClass, customClass);
    }
  });
  Object.keys(customClasses).forEach((key) => {
    const typedKey = key;
    if (!(typedKey in defaultClasses) && customClasses[typedKey] !== void 0) {
      merged[typedKey] = mergeTailwindClasses(customClasses[typedKey]);
    }
  });
  return merged;
};
const createClassNamesConfig = (defaultClasses) => {
  return {
    defaultClasses,
    mergeClasses: (customClasses) => mergeComponentClassNames(defaultClasses, customClasses)
  };
};
const conditionalClasses = (conditions) => {
  return Object.entries(conditions).filter(([_, condition]) => Boolean(condition)).map(([className]) => className).join(" ");
};
const variantClasses = (variant, variantMap, fallback = "") => {
  return variantMap[variant] || fallback;
};
const sizeClasses = (size, sizeMap, fallback = "") => {
  return sizeMap[size] || fallback;
};
const colorClasses = (color, colorMap, variant, fallback = "") => {
  const colorConfig = colorMap[color];
  if (!colorConfig) {
    return fallback;
  }
  if (typeof colorConfig === "string") {
    return colorConfig;
  }
  if (variant && colorConfig[variant]) {
    return colorConfig[variant];
  }
  return fallback;
};
export {
  colorClasses,
  conditionalClasses,
  createClassNamesConfig,
  mergeComponentClassNames,
  sizeClasses,
  variantClasses
};
