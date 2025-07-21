interface UseIntervalOptions {
    autoInvoke?: boolean;
}
export interface UseIntervalReturn {
    start: () => void;
    stop: () => void;
    toggle: () => void;
    active: boolean;
}
export declare const useInterval: (fn: () => void, interval: number, { autoInvoke }?: UseIntervalOptions) => UseIntervalReturn;
export {};
