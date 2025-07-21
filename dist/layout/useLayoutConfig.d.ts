type UseLayoutConfigOptions<T> = {
    navbar?: Partial<T>;
    sidebar?: Partial<T>;
};
export type LayoutConfig<T> = {
    navbar?: Partial<T>;
    sidebar?: Partial<T>;
};
export declare const useLayoutConfig: <T extends object>(options?: UseLayoutConfigOptions<T>) => LayoutConfig<T>;
export {};
