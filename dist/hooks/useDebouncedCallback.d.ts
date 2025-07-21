export declare const useDebouncedCallback: <T extends (...args: unknown[]) => unknown>(callback: T, delay: number) => ((...args: Parameters<T>) => void);
