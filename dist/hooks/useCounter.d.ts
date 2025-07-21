export declare const useCounter: (initialValue?: number, options?: Partial<{
    min: number;
    max: number;
}>) => {
    count: number;
    increment: () => void;
    decrement: () => void;
    set: (value: number) => void;
    reset: () => void;
};
