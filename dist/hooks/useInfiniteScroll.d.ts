export interface UseInfiniteScrollProps {
    isEnabled?: boolean;
    hasMore?: boolean;
    distance?: number;
    shouldUseLoader?: boolean;
    onLoadMore?: () => void;
    debounceDelay?: number;
    threshold?: number;
}
export interface UseInfiniteScrollReturn {
    loaderRef: React.RefObject<HTMLElement | null>;
    scrollContainerRef: React.RefObject<HTMLElement | null>;
    isLoading: boolean;
    triggerLoadMore: () => void;
}
export declare const useInfiniteScroll: (props?: UseInfiniteScrollProps) => UseInfiniteScrollReturn;
