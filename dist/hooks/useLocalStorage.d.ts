/**
 * Configuration for localStorage hook
 */
export interface UseLocalStorageOptions<T> {
    /** Serializer function */
    serializer?: {
        read: (value: string) => T;
        write: (value: T) => string;
    };
    /** Error handler for storage operations */
    onError?: (error: Error, operation: 'read' | 'write' | 'remove') => void;
    /** Sync across tabs/windows */
    syncAcrossTabs?: boolean;
}
/**
 * Return type for useLocalStorage hook
 */
export interface UseLocalStorageReturn<T> {
    /** Current stored value */
    value: T;
    /** Set new value */
    setValue: (value: T | ((prevValue: T) => T)) => void;
    /** Remove value from storage */
    removeValue: () => void;
    /** Check if value exists in storage */
    hasValue: boolean;
    /** Loading state for initial value */
    loading: boolean;
    /** Last error encountered */
    error: Error | null;
}
/**
 * Enhanced localStorage hook with error handling and cross-tab sync
 *
 * @example
 * ```tsx
 * // Basic usage
 * const { value, setValue } = useLocalStorage('user-preferences', {
 *   theme: 'light',
 *   language: 'en'
 * })
 *
 * // With custom serializer
 * const { value, setValue } = useLocalStorage('counter', 0, {
 *   serializer: {
 *     read: (v) => parseInt(v, 10),
 *     write: (v) => v.toString()
 *   }
 * })
 * ```
 */
export declare const useLocalStorage: <T>(key: string, defaultValue: T, options?: UseLocalStorageOptions<T>) => UseLocalStorageReturn<T>;
