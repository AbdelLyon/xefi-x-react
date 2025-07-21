import { useCallback, useEffect, useRef, useState } from "react";

/**
 * State for async operations
 */
export interface AsyncState<T, E = Error> {
  /** Current data value */
  data: T | null;
  /** Loading state */
  loading: boolean;
  /** Error if operation failed */
  error: E | null;
  /** Whether the operation has completed (success or error) */
  finished: boolean;
}

/**
 * Return type for useAsyncState hook
 */
export interface UseAsyncStateReturn<T, E = Error> extends AsyncState<T, E> {
  /** Execute the async operation */
  execute: () => Promise<T>;
  /** Reset state to initial values */
  reset: () => void;
  /** Set data manually */
  setData: (data: T) => void;
  /** Set error manually */
  setError: (error: E) => void;
}

/**
 * Hook for managing async operations with loading, error, and success states
 * 
 * @example
 * ```tsx
 * const { data, loading, error, execute } = useAsyncState(async () => {
 *   const response = await fetch('/api/data')
 *   return response.json()
 * })
 * 
 * // Execute on component mount
 * useEffect(() => {
 *   execute()
 * }, [])
 * ```
 */
export const useAsyncState = <T, E = Error>(
  asyncFn: () => Promise<T>,
  executeOnMount = false,
): UseAsyncStateReturn<T, E> => {
  const [state, setState] = useState<AsyncState<T, E>>({
    data: null,
    loading: false,
    error: null,
    finished: false,
  });

  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const execute = useCallback(async (): Promise<T> => {
    setState(prev => ({
      ...prev,
      loading: true,
      error: null,
      finished: false,
    }));

    try {
      const result = await asyncFn();
      
      if (isMountedRef.current) {
        setState({
          data: result,
          loading: false,
          error: null,
          finished: true,
        });
      }
      
      return result;
    } catch (error) {
      if (isMountedRef.current) {
        setState({
          data: null,
          loading: false,
          error: error as E,
          finished: true,
        });
      }
      
      throw error;
    }
  }, [asyncFn]);

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
      finished: false,
    });
  }, []);

  const setData = useCallback((data: T) => {
    setState(prev => ({
      ...prev,
      data,
      error: null,
    }));
  }, []);

  const setError = useCallback((error: E) => {
    setState(prev => ({
      ...prev,
      error,
      data: null,
    }));
  }, []);

  // Execute on mount if requested
  useEffect(() => {
    if (executeOnMount) {
      execute().catch(() => {
        // Error is already handled in execute function
      });
    }
  }, [executeOnMount, execute]);

  return {
    ...state,
    execute,
    reset,
    setData,
    setError,
  };
};