import { ClassValue } from 'clsx';
type Dict<T = unknown> = Record<string, T>;
type Booleanish = boolean | "true" | "false";
type DebouncedFunction<Args extends unknown[]> = {
    (...args: Args): void;
    cancel: () => void;
};
export declare const mergeTailwindClasses: (...classes: ClassValue[]) => string;
export declare const capitalizeString: (text: string) => string;
export declare const joinStringsWithSpace: (...strings: (string | undefined)[]) => string;
export declare const hasPrefix: (text: string, prefix: string) => boolean;
export declare const hasSuffix: (text: string, suffix: string) => boolean;
export declare const convertToLowerCase: (text: string) => string;
export declare const convertToUpperCase: (text: string) => string;
export declare const trimWhitespace: (text: string) => string;
export declare const reverseString: (text: string) => string;
export declare const clampNumber: (value: number, min: number | undefined, max: number | undefined) => number;
export declare const isNumeric: (value?: string | number) => boolean;
export declare function isArray<T>(value: unknown): value is Array<T>;
export declare function isObject(value: unknown): value is Dict;
export declare function isFunction<T extends (...args: unknown[]) => unknown>(value: unknown): value is T;
export declare function isEmptyArray(value: unknown): boolean;
export declare function isEmptyObject(value: unknown): boolean;
export declare function isEmpty(value: unknown): boolean;
export declare function filterUnique<T>(arr: T[], criteria: ((item: T) => unknown) | keyof T): T[];
export declare function findIntersection<T>(arrays: T[][], criteria: ((item: T) => unknown) | keyof T): T[];
export declare function arrayToObject<T extends Record<string, unknown>>(arr: T[]): Record<string, unknown>;
export declare function getNestedValue<T extends Dict, D = undefined>(obj: T, path: string | (string | number)[], defaultValue?: D): T[keyof T] | D;
export declare function cleanObject<T extends Record<string, unknown>>(obj: T, options?: {
    removeNull?: boolean;
    removeUndefined?: boolean;
    removeKeys?: string[];
}): Partial<T>;
export declare function serializeObject(obj: Dict | undefined, fallback?: string): string;
/**
 * Exécute une série de fonctions dans l'ordre avec les mêmes arguments
 * @param callbacks - Les fonctions à exécuter en chaîne
 */
export declare function chainCallbacks(...callbacks: unknown[]): (...args: unknown[]) => void;
export declare function createDebouncedFunction<Callback extends (...args: never[]) => unknown, Args extends Parameters<Callback>>(callback: Callback, delay?: number): DebouncedFunction<Args>;
export declare const dataAttr: (condition: boolean | undefined) => Booleanish;
export declare const generateUniqueId: (prefix: string) => string;
export {};
