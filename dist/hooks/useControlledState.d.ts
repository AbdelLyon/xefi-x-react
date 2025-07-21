type SetValueFunction<T> = (value: T | ((prev: T) => T), ...args: unknown[]) => void;
type OnChangeCallback<T> = (value: T, ...args: unknown[]) => void;
export declare function useControlledState<T, C = T>(value: Exclude<T, undefined>, defaultValue: Exclude<T, undefined> | undefined, onChange?: OnChangeCallback<C>): [T, SetValueFunction<T>];
export declare function useControlledState<T, C = T>(value: Exclude<T, undefined> | undefined, defaultValue: Exclude<T, undefined>, onChange?: OnChangeCallback<C>): [T, SetValueFunction<T>];
export {};
