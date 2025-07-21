/**
 * Action type for toggle operations
 * Can be a direct value or a function that receives the previous value
 */
export type ToggleAction<T> = T | ((prevValue: T) => T);
/**
 * Configuration options for useToggle hook
 */
export interface UseToggleOptions<T> {
    /** Array of values to cycle through */
    values?: readonly T[];
    /** Initial value (must be included in values array) */
    initialValue?: T;
}
/**
 * Return type for useToggle hook
 */
export interface UseToggleReturn<T> {
    /** Current active value */
    value: T;
    /** Toggle to next value or set specific value */
    toggle: (value?: ToggleAction<T>) => void;
    /** Set specific value directly */
    setValue: (value: ToggleAction<T>) => void;
    /** Reset to initial value */
    reset: () => void;
    /** Get next value without changing state */
    getNextValue: () => T;
    /** Check if current value matches */
    is: (value: T) => boolean;
    /** Get index of current value */
    index: number;
    /** Get all possible values */
    values: readonly T[];
}
/**
 * Enhanced toggle hook with multiple values support and utilities
 *
 * @example
 * ```tsx
 * // Simple boolean toggle
 * const { value, toggle } = useToggle()
 *
 * // Multi-value toggle
 * const { value, toggle } = useToggle({
 *   values: ['small', 'medium', 'large'],
 *   initialValue: 'medium'
 * })
 *
 * // With custom logic
 * const { value, setValue, is } = useToggle({ values: [1, 2, 3] })
 * setValue(prev => prev === 3 ? 1 : prev + 1)
 * ```
 */
export declare const useToggle: <T = boolean>(options?: UseToggleOptions<T>) => UseToggleReturn<T>;
/**
 * Simple boolean toggle hook
 *
 * @example
 * ```tsx
 * const [isOpen, toggleOpen] = useBooleanToggle(false)
 * ```
 */
export declare const useBooleanToggle: (initialValue?: boolean) => [boolean, () => void, (value: boolean) => void, () => void];
