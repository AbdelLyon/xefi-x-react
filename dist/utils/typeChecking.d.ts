/**
 * Type checking utilities for runtime type validation
 */
type Dict<T = unknown> = Record<string, T>;
export declare function isArray<T>(value: unknown): value is Array<T>;
export declare function isObject(value: unknown): value is Dict;
export declare function isFunction<T extends (...args: unknown[]) => unknown>(value: unknown): value is T;
export {};
