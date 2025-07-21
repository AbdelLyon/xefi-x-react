import { useCallback, useState } from "react";

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
export const useToggle = <T = boolean>(
  options: UseToggleOptions<T> = {},
): UseToggleReturn<T> => {
  const { 
    values = [false, true] as unknown as readonly T[], 
    initialValue 
  } = options;

  // Validate initial value
  const validInitialValue = initialValue !== undefined && values.includes(initialValue)
    ? initialValue
    : values[0];

  const [currentValue, setCurrentValue] = useState<T>(validInitialValue);
  const currentIndex = values.indexOf(currentValue);

  const setValue = useCallback((action: ToggleAction<T>) => {
    setCurrentValue(prevValue => {
      const newValue = typeof action === 'function' 
        ? (action as (prev: T) => T)(prevValue)
        : action;
      
      // Ensure the new value exists in the values array
      return values.includes(newValue) ? newValue : prevValue;
    });
  }, [values]);

  const toggle = useCallback((action?: ToggleAction<T>) => {
    if (action !== undefined) {
      setValue(action);
      return;
    }

    // Toggle to next value in cycle
    setCurrentValue(prevValue => {
      const currentIdx = values.indexOf(prevValue);
      const nextIdx = (currentIdx + 1) % values.length;
      return values[nextIdx];
    });
  }, [values, setValue]);

  const reset = useCallback(() => {
    setCurrentValue(validInitialValue);
  }, [validInitialValue]);

  const getNextValue = useCallback((): T => {
    const nextIdx = (currentIndex + 1) % values.length;
    return values[nextIdx];
  }, [currentIndex, values]);

  const is = useCallback((value: T): boolean => {
    return currentValue === value;
  }, [currentValue]);

  return {
    value: currentValue,
    toggle,
    setValue,
    reset,
    getNextValue,
    is,
    index: currentIndex,
    values,
  };
};

/**
 * Simple boolean toggle hook
 * 
 * @example
 * ```tsx
 * const [isOpen, toggleOpen] = useBooleanToggle(false)
 * ```
 */
export const useBooleanToggle = (
  initialValue = false,
): [boolean, () => void, (value: boolean) => void, () => void] => {
  const { value, toggle, setValue, reset } = useToggle({
    values: [false, true] as const,
    initialValue,
  });

  return [value, toggle, setValue, reset];
};