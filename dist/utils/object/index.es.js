import { isObject } from "../typeChecking/index.es.js";
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
export {
  chainCallbacks,
  cleanObject,
  createDebouncedFunction,
  getNestedValue,
  serializeObject
};
