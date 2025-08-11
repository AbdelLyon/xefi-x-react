/**
 * Type checking utilities for runtime type validation
 */

// Types
type Dict<T = unknown> = Record<string, T>;

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