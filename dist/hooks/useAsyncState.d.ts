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
export declare const useAsyncState: <T, E = Error>(asyncFn: () => Promise<T>, executeOnMount?: boolean) => UseAsyncStateReturn<T, E>;
