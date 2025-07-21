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
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { mergeTailwindClasses } from "../utils/index.es.js";
import { mergeComponentClassNames } from "../classNames/index.es.js";
const createPropsMerger = (defaultProps) => {
  return (userProps) => {
    const merged = __spreadValues(__spreadValues({}, defaultProps), userProps);
    if ("className" in defaultProps && "className" in userProps) {
      merged.className = mergeTailwindClasses(
        defaultProps.className,
        userProps.className
      );
    }
    return merged;
  };
};
class ComponentStyleManager {
  constructor(defaultClasses) {
    __publicField(this, "defaultClasses");
    this.defaultClasses = defaultClasses;
  }
  /**
   * Merge user classes with defaults
   */
  merge(userClasses) {
    return mergeComponentClassNames(this.defaultClasses, userClasses);
  }
  /**
   * Get specific class with fallback
   */
  getClass(key, userClasses, fallback = "") {
    const merged = this.merge(userClasses);
    return merged[key] || fallback;
  }
  /**
   * Apply conditional classes
   */
  conditional(key, condition, conditionalClass, userClasses) {
    const baseClass = this.getClass(key, userClasses);
    return mergeTailwindClasses(
      baseClass,
      condition ? conditionalClass : ""
    );
  }
}
const validateClassMerging = (componentProps, expectedKeys) => {
  const issues = [];
  if ("className" in componentProps && typeof componentProps.className !== "string") {
    issues.push("className prop is not a string");
  }
  if ("classNames" in componentProps) {
    const classNames = componentProps.classNames;
    if (classNames && typeof classNames === "object") {
      Object.keys(classNames).forEach((key) => {
        if (!expectedKeys.includes(key)) {
          issues.push(`Unexpected classNames key: ${key}`);
        }
        if (typeof classNames[key] !== "string" && classNames[key] !== void 0) {
          issues.push(`classNames.${key} should be string or undefined`);
        }
      });
    }
  }
  return {
    valid: issues.length === 0,
    issues
  };
};
const validateTailwindClasses = (classes, componentName) => {
  const warnings = [];
  if (classes.includes("  ")) {
    warnings.push("Multiple consecutive spaces found in classes");
  }
  if (classes.startsWith(" ") || classes.endsWith(" ")) {
    warnings.push("Classes string has leading or trailing spaces");
  }
  const classArray = classes.split(" ").filter(Boolean);
  const hasConflicts = {
    padding: classArray.some((c) => c.startsWith("p-")) && classArray.some((c) => c.startsWith("px-") || c.startsWith("py-")),
    margin: classArray.some((c) => c.startsWith("m-")) && classArray.some((c) => c.startsWith("mx-") || c.startsWith("my-")),
    background: classArray.filter((c) => c.startsWith("bg-")).length > 1
  };
  Object.entries(hasConflicts).forEach(([type, hasConflict]) => {
    if (hasConflict) {
      warnings.push(`Potential ${type} class conflicts detected`);
    }
  });
  if (componentName && warnings.length > 0) {
    console.warn(`[${componentName}] Class validation warnings:`, warnings);
  }
  return {
    valid: warnings.length === 0,
    warnings
  };
};
const checkComponentBestPractices = (componentName, props, classNamesConfig) => {
  if (process.env.NODE_ENV === "production") {
    return;
  }
  const issues = [];
  if (classNamesConfig) {
    const validation = validateClassMerging(props, classNamesConfig.expectedKeys);
    if (!validation.valid) {
      issues.push(...validation.issues);
    }
  }
  if ("className" in props && typeof props.className === "string") {
    const { warnings } = validateTailwindClasses(props.className, componentName);
    if (warnings.length > 0) {
      issues.push(...warnings.map((w) => `className: ${w}`));
    }
  }
  if (issues.length > 0) {
    console.warn(`[${componentName}] Component issues detected:`, issues);
  }
};
export {
  ComponentStyleManager,
  checkComponentBestPractices,
  createPropsMerger,
  validateClassMerging,
  validateTailwindClasses
};
