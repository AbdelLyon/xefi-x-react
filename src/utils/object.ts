import { isObject } from "./typeChecking";

/**
 * Object utilities for object manipulation and serialization
 */

// Types
type Dict<T = unknown> = Record<string, T>;
type DebouncedFunction<Args extends unknown[]> = {
  (...args: Args): void;
  cancel: () => void;
};

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