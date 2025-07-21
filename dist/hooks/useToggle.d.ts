type ToggleReducerAction<T> = T | ((prevValue: T) => T);
export type ToggleReturn<T> = {
    current: T;
    toggle: (value?: ToggleReducerAction<T>) => void;
};
export declare const useToggle: <T = boolean>(options?: readonly T[]) => ToggleReturn<T>;
export {};
