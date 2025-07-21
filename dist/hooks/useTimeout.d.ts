interface UseTimeoutOptions {
    autoInvoke?: boolean;
}
interface UseTimeoutReturn {
    start: (...params: unknown[]) => void;
    clear: () => void;
}
export declare const useTimeout: (callback: (...params: unknown[]) => void, delay: number, { autoInvoke }?: UseTimeoutOptions) => UseTimeoutReturn;
export {};
