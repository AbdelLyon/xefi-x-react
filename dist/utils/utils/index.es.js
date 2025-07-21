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
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
const mergeTailwindClasses = (...classes) => {
  return twMerge(clsx(classes));
};
const capitalizeString = (text) => text.charAt(0).toUpperCase() + text.slice(1);
const joinStringsWithSpace = (...strings) => strings.filter(Boolean).join(" ");
const hasPrefix = (text, prefix) => text.startsWith(prefix);
const hasSuffix = (text, suffix) => text.endsWith(suffix);
const convertToLowerCase = (text) => text.toLowerCase();
const convertToUpperCase = (text) => text.toUpperCase();
const trimWhitespace = (text) => text.trim();
const reverseString = (text) => text.split("").reverse().join("");
const clampNumber = (value, min, max) => {
  if (min === void 0 && max === void 0) {
    return value;
  }
  if (min !== void 0 && max === void 0) {
    return Math.max(value, min);
  }
  if (min === void 0 && max !== void 0) {
    return Math.min(value, max);
  }
  if (min !== void 0 && max !== void 0) {
    return Math.min(Math.max(value, min), max);
  }
  return value;
};
const isNumeric = (value) => value !== void 0 && value !== null && parseInt(value.toString(), 10) > 0;
function isArray(value) {
  return Array.isArray(value);
}
function isObject(value) {
  const type = typeof value;
  return value !== null && (type === "object" || type === "function") && !isArray(value);
}
function isFunction(value) {
  return typeof value === "function";
}
function isEmptyArray(value) {
  return isArray(value) && value.length === 0;
}
function isEmptyObject(value) {
  return isObject(value) && Object.keys(value).length === 0;
}
function isEmpty(value) {
  if (isArray(value)) {
    return isEmptyArray(value);
  }
  if (isObject(value)) {
    return isEmptyObject(value);
  }
  return value === null || value === "";
}
function filterUnique(arr, criteria) {
  const iteratee = typeof criteria === "function" ? criteria : (item) => item[criteria];
  const seen = /* @__PURE__ */ new Map();
  return arr.filter((item) => {
    const key = iteratee(item);
    if (seen.has(key)) {
      return false;
    }
    seen.set(key, true);
    return true;
  });
}
function findIntersection(arrays, criteria) {
  if (!arrays.length) {
    return [];
  }
  if (arrays.length === 1) {
    return arrays[0];
  }
  const iteratee = typeof criteria === "function" ? criteria : (item) => item[criteria];
  const [first, ...rest] = arrays;
  const transformedRest = rest.map(
    (arr) => new Set(arr.map(iteratee))
  );
  return first.filter((item) => {
    const transformed = iteratee(item);
    return transformedRest.every((set) => set.has(transformed));
  });
}
function arrayToObject(arr) {
  if (!(arr == null ? void 0 : arr.length)) {
    return {};
  }
  return arr.reduce(
    (acc, item) => __spreadValues(__spreadValues({}, acc), item),
    {}
  );
}
function getNestedValue(obj, path, defaultValue) {
  const keys = Array.isArray(path) ? path : path.replace(/\[(\d+)\]/g, ".$1").split(".");
  let result = obj;
  for (const key of keys) {
    result = result == null ? void 0 : result[key];
    if (result === void 0) {
      return defaultValue;
    }
  }
  return result;
}
function cleanObject(obj, options = {}) {
  if (!isObject(obj)) {
    return obj;
  }
  const {
    removeNull = true,
    removeUndefined = true,
    removeKeys = []
  } = options;
  return Object.entries(obj).reduce(
    (acc, [key, value]) => {
      if (removeKeys.includes(key)) {
        return acc;
      }
      if (removeUndefined && value === void 0) {
        return acc;
      }
      if (removeNull && value === null) {
        return acc;
      }
      acc[key] = value;
      return acc;
    },
    {}
  );
}
function serializeObject(obj, fallback = "") {
  if (!obj || typeof obj !== "object") {
    return fallback;
  }
  try {
    return JSON.stringify(obj, (_, value) => {
      if (typeof value === "function") {
        return "function";
      }
      if (value instanceof Set) {
        return Array.from(value);
      }
      if (value instanceof Map) {
        return Object.fromEntries(value);
      }
      return value;
    });
  } catch (e) {
    return fallback;
  }
}
function chainCallbacks(...callbacks) {
  return (...args) => {
    for (const callback of callbacks) {
      if (typeof callback === "function") {
        callback(...args);
      }
    }
  };
}
function createDebouncedFunction(callback, delay = 0) {
  let timeoutId = null;
  const debouncedFunction = (...args) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
  debouncedFunction.cancel = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
  };
  return debouncedFunction;
}
const dataAttr = (condition) => condition ? "true" : void 0;
const generateUniqueId = (prefix) => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${prefix}-${timestamp}-${random}`;
};
export {
  arrayToObject,
  capitalizeString,
  chainCallbacks,
  clampNumber,
  cleanObject,
  convertToLowerCase,
  convertToUpperCase,
  createDebouncedFunction,
  dataAttr,
  filterUnique,
  findIntersection,
  generateUniqueId,
  getNestedValue,
  hasPrefix,
  hasSuffix,
  isArray,
  isEmpty,
  isEmptyArray,
  isEmptyObject,
  isFunction,
  isNumeric,
  isObject,
  joinStringsWithSpace,
  mergeTailwindClasses,
  reverseString,
  serializeObject,
  trimWhitespace
};
