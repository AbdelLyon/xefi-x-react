import { useCallback, useState } from "react";
import { clampNumber } from "@/utils";

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

const DEFAULT_OPTIONS: Required<UseCounterOptions> = {
  min: -Infinity,
  max: Infinity,
  step: 1,
};

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
export const useCounter = (
  initialValue = 0,
  options: UseCounterOptions = {},
): UseCounterReturn => {
  const { min, max, step } = { ...DEFAULT_OPTIONS, ...options };
  
  const [count, setCount] = useState(() => clampNumber(initialValue, min, max));

  const set = useCallback((value: number | ((prev: number) => number)) => {
    setCount(current => {
      const newValue = typeof value === 'function' ? value(current) : value;
      return clampNumber(newValue, min, max);
    });
  }, [min, max]);

  const increment = useCallback(() => {
    set(current => current + step);
  }, [set, step]);

  const decrement = useCallback(() => {
    set(current => current - step);
  }, [set, step]);

  const incrementBy = useCallback((amount: number) => {
    set(current => current + amount);
  }, [set]);

  const decrementBy = useCallback((amount: number) => {
    set(current => current - amount);
  }, [set]);

  const reset = useCallback(() => {
    set(initialValue);
  }, [set, initialValue]);

  // Status checks
  const isAtMin = count <= min;
  const isAtMax = count >= max;
  const canIncrement = count + step <= max;
  const canDecrement = count - step >= min;

  return {
    count,
    increment,
    decrement,
    set,
    reset,
    incrementBy,
    decrementBy,
    isAtMin,
    isAtMax,
    canIncrement,
    canDecrement,
  };
};