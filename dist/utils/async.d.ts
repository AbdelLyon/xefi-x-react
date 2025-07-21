/**
 * Async utilities for handling promises and concurrent operations
 */
/**
 * Create a delay promise
 */
export declare const delay: (ms: number) => Promise<void>;
/**
 * Timeout wrapper for promises
 */
export declare const withTimeout: <T>(promise: Promise<T>, timeoutMs: number, timeoutMessage?: string) => Promise<T>;
/**
 * Retry a promise with exponential backoff
 */
export declare const retry: <T>(fn: () => Promise<T>, options?: {
    maxAttempts?: number;
    baseDelay?: number;
    maxDelay?: number;
    exponential?: boolean;
    shouldRetry?: (error: Error, attempt: number) => boolean;
}) => Promise<T>;
/**
 * Run promises in chunks (batches)
 */
export declare const chunk: <T, R>(items: T[], fn: (item: T) => Promise<R>, chunkSize?: number) => Promise<R[]>;
/**
 * Run promises with concurrency limit
 */
export declare const parallel: <T, R>(items: T[], fn: (item: T) => Promise<R>, concurrency?: number) => Promise<R[]>;
/**
 * Race with all results (doesn't reject on first error)
 */
export declare const raceAll: <T>(promises: Promise<T>[]) => Promise<{
    winner: T;
    results: Array<{
        status: "fulfilled" | "rejected";
        value?: T;
        reason?: Error;
    }>;
}>;
/**
 * Create a cancelable promise
 */
export declare const makeCancelable: <T>(promise: Promise<T>) => {
    promise: Promise<T>;
    cancel: () => void;
    isCanceled: () => boolean;
};
/**
 * Debounce a promise-returning function
 */
export declare const debounceAsync: <T extends (...args: unknown[]) => Promise<unknown>>(fn: T, delay: number) => ((...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>>);
/**
 * Create a promise that resolves when condition is met
 */
export declare const waitFor: (condition: () => boolean, options?: {
    timeout?: number;
    interval?: number;
}) => Promise<void>;
/**
 * Memoize async function results
 */
export declare const memoizeAsync: <T extends (...args: unknown[]) => Promise<unknown>>(fn: T, keyGenerator?: (...args: Parameters<T>) => string) => T & {
    clear: () => void;
};
