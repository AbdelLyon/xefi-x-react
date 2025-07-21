export declare const useDebouncedValue: <T>(value: T, wait: number, options?: {
    leading: boolean;
}) => {
    debouncedValue: T;
    cancel: () => void;
};
