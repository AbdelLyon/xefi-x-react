interface StorageProperties<T> {
    key: string;
    defaultValue: T;
}
export declare const useLocalStorage: <T>(props: StorageProperties<T>) => readonly [T, (value: T | ((val: T) => T)) => void, () => void];
export {};
