/**
 * Options for useCounter hook
 */
export interface UseCounterOptions {
    /** Minimum allowed value */
    min?: number;
    /** Maximum allowed value */
    max?: number;
    /** Step value for increment/decrement operations */
    step?: number;
}
/**
 * Return type for useCounter hook
 */
export interface UseCounterReturn {
    /** Current count value */
    count: number;
    /** Increment by step amount */
    increment: () => void;
    /** Decrement by step amount */
    decrement: () => void;
    /** Set specific value (will be clamped to min/max) */
    set: (value: number | ((prev: number) => number)) => void;
    /** Reset to initial value */
    reset: () => void;
    /** Increment by custom amount */
    incrementBy: (amount: number) => void;
    /** Decrement by custom amount */
    decrementBy: (amount: number) => void;
    /** Check if at minimum value */
    isAtMin: boolean;
    /** Check if at maximum value */
    isAtMax: boolean;
    /** Check if can increment */
    canIncrement: boolean;
    /** Check if can decrement */
    canDecrement: boolean;
}
/**
 * Enhanced counter hook with min/max bounds and step control
 *
 * @example
 * ```tsx
 * // Basic counter
 * const { count, increment, decrement } = useCounter(0)
 *
 * // Counter with bounds and custom step
 * const { count, increment, isAtMax } = useCounter(5, {
 *   min: 0,
 *   max: 10,
 *   step: 2
 * })
 *
 * // Counter with functional setter
 * const { set } = useCounter(0)
 * set(prev => prev * 2)
 * ```
 */
export declare const useCounter: (initialValue?: number, options?: UseCounterOptions) => UseCounterReturn;
