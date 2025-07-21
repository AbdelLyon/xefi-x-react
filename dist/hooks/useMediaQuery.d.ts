export type UseMediaQueryOptions = {
    getInitialValueInEffect?: boolean;
    initialValue?: boolean;
};
export declare function useMediaQuery(query: string, options?: UseMediaQueryOptions): boolean;
