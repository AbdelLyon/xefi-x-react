import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Types
type Dict<T = unknown> = Record<string, T>;
type Booleanish = boolean | "true" | "false";
type DebouncedFunction<Args extends unknown[]> = {
  (...args: Args): void;
  cancel: () => void;
};

// ----- String Utilities -----
export const mergeTailwindClasses = (...classes: ClassValue[]): string => {
  return twMerge(clsx(classes));
};

export const capitalizeString = (text: string): string =>
  text.charAt(0).toUpperCase() + text.slice(1);

export const joinStringsWithSpace = (
  ...strings: (string | undefined)[]
): string => strings.filter(Boolean).join(" ");

export const hasPrefix = (text: string, prefix: string): boolean =>
  text.startsWith(prefix);

export const hasSuffix = (text: string, suffix: string): boolean =>
  text.endsWith(suffix);

export const convertToLowerCase = (text: string): string => text.toLowerCase();

export const convertToUpperCase = (text: string): string => text.toUpperCase();

export const trimWhitespace = (text: string): string => text.trim();

export const reverseString = (text: string): string =>
  text.split("").reverse().join("");

// ----- Number Utilities -----
export const clampNumber = (
  value: number,
  min: number | undefined,
  max: number | undefined,
): number => {
  if (min === undefined && max === undefined) {
    return value;
  }
  if (min !== undefined && max === undefined) {
    return Math.max(value, min);
  }
  if (min === undefined && max !== undefined) {
    return Math.min(value, max);
  }
  if (min !== undefined && max !== undefined) {
    return Math.min(Math.max(value, min), max);
  }
  return value;
};

export const isNumeric = (value?: string | number): boolean =>
  value !== undefined && value !== null && parseInt(value.toString(), 10) > 0;

// ----- Type Checking Utilities -----
export function isArray<T>(value: unknown): value is Array<T> {
  return Array.isArray(value);
}

export function isObject(value: unknown): value is Dict {
  const type = typeof value;
  return (
    value !== null &&
    (type === "object" || type === "function") &&
    !isArray(value)
  );
}

export function isFunction<T extends (...args: unknown[]) => unknown>(
  value: unknown,
): value is T {
  return typeof value === "function";
}

// ----- State Checking Utilities -----
export function isEmptyArray(value: unknown): boolean {
  return isArray(value) && value.length === 0;
}

export function isEmptyObject(value: unknown): boolean {
  return isObject(value) && Object.keys(value).length === 0;
}

export function isEmpty(value: unknown): boolean {
  if (isArray(value)) {
    return isEmptyArray(value);
  }
  if (isObject(value)) {
    return isEmptyObject(value);
  }
  return value === null || value === "";
}

// ----- Array Utilities -----
export function filterUnique<T>(
  arr: T[],
  criteria: ((item: T) => unknown) | keyof T,
): T[] {
  const iteratee =
    typeof criteria === "function"
      ? criteria
      : (item: T): unknown => item[criteria];
  const seen = new Map();
  return arr.filter((item): boolean => {
    const key = iteratee(item);
    if (seen.has(key)) {
      return false;
    }
    seen.set(key, true);
    return true;
  });
}

export function findIntersection<T>(
  arrays: T[][],
  criteria: ((item: T) => unknown) | keyof T,
): T[] {
  if (!arrays.length) {
    return [];
  }
  if (arrays.length === 1) {
    return arrays[0];
  }

  const iteratee =
    typeof criteria === "function"
      ? criteria
      : (item: T): unknown => item[criteria];
  const [first, ...rest] = arrays;
  const transformedRest = rest.map(
    (arr): Set<unknown> => new Set(arr.map(iteratee)),
  );

  return first.filter((item): boolean => {
    const transformed = iteratee(item);
    return transformedRest.every((set): boolean => set.has(transformed));
  });
}

export function arrayToObject<T extends Record<string, unknown>>(
  arr: T[],
): Record<string, unknown> {
  if (!arr?.length) {
    return {};
  }
  return arr.reduce<Record<string, unknown>>(
    (acc: Record<string, unknown>, item: T): Record<string, unknown> => ({
      ...acc,
      ...item,
    }),
    {},
  );
}

// ----- Object Utilities -----
export function getNestedValue<T extends Dict, D = undefined>(
  obj: T,
  path: string | (string | number)[],
  defaultValue?: D,
): T[keyof T] | D {
  const keys = Array.isArray(path)
    ? path
    : path.replace(/\[(\d+)\]/g, ".$1").split(".");

  let result = obj;
  for (const key of keys) {
    result = result?.[key] as unknown as T;
    if (result === undefined) {
      return defaultValue as D | T[keyof T];
    }
  }

  return result as unknown as T[keyof T] | D;
}

export function cleanObject<T extends Record<string, unknown>>(
  obj: T,
  options: {
    removeNull?: boolean;
    removeUndefined?: boolean;
    removeKeys?: string[];
  } = {},
): Partial<T> {
  if (!isObject(obj)) {
    return obj;
  }

  const {
    removeNull = true,
    removeUndefined = true,
    removeKeys = [],
  } = options;

  return Object.entries(obj).reduce<Partial<T>>(
    (acc: Partial<T>, [key, value]): Partial<T> => {
      if (removeKeys.includes(key)) {
        return acc;
      }
      if (removeUndefined && value === undefined) {
        return acc;
      }
      if (removeNull && value === null) {
        return acc;
      }
      acc[key as keyof T] = value as T[keyof T];
      return acc;
    },
    {} as Partial<T>,
  );
}

export function serializeObject(obj: Dict | undefined, fallback = ""): string {
  if (!obj || typeof obj !== "object") {
    return fallback;
  }

  try {
    return JSON.stringify(obj, (_, value): unknown => {
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
  } catch {
    return fallback;
  }
}

/**
 * Exécute une série de fonctions dans l'ordre avec les mêmes arguments
 * @param callbacks - Les fonctions à exécuter en chaîne
 */
export function chainCallbacks(
  ...callbacks: unknown[]
): (...args: unknown[]) => void {
  return (...args: unknown[]): void => {
    for (const callback of callbacks) {
      if (typeof callback === "function") {
        callback(...args);
      }
    }
  };
}

export function createDebouncedFunction<
  Callback extends (...args: never[]) => unknown,
  Args extends Parameters<Callback>,
>(callback: Callback, delay = 0): DebouncedFunction<Args> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const debouncedFunction = (...args: Args): void => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout((): void => {
      callback(...args);
    }, delay);
  };

  debouncedFunction.cancel = (): void => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
  };

  return debouncedFunction;
}

// ----- UI Utilities -----
export const dataAttr = (condition: boolean | undefined): Booleanish =>
  (condition ? "true" : undefined) as Booleanish;

export const generateUniqueId = (prefix: string): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${prefix}-${timestamp}-${random}`;
};

// ----- Logging Utilities -----
// const displayedWarnings: { [key: string]: boolean } = {};

// export function logWarning(
//   message: string,
//   componentName?: string,
//   ...additionalArgs: unknown[]
// ): void {
//   const componentTag = componentName ? ` [${componentName}]` : " ";
//   const fullMessage = `[xReact]${componentTag}: ${message}`;

//   if (typeof console === "undefined") {
//     return;
//   }
//   if (displayedWarnings[fullMessage]) {
//     return;
//   }

//   displayedWarnings[fullMessage] = true;
//   if (process.env.NODE_ENV !== "production") {
//     console.warn(fullMessage, additionalArgs);
//   }
// }
