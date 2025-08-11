/**
 * Object utilities for object manipulation and serialization
 */
type Dict<T = unknown> = Record<string, T>;
type DebouncedFunction<Args extends unknown[]> = {
    (...args: Args): void;
    cancel: () => void;
};
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
export {};
