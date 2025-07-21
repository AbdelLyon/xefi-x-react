import { SelectProps } from '@heroui/react';
import { JSX } from 'react';
interface BaseInfiniteSelectProps<T> extends Omit<SelectProps, "items" | "children"> {
    renderItem: (item: T) => React.ReactNode;
    getItemKey: (item: T, index?: number) => string | number;
    className?: string;
    classNames?: {
        base?: string;
        trigger?: string;
        value?: string;
        popoverContent?: string;
        selectItem?: string;
    };
}
interface FetchFunctionProps<T> extends BaseInfiniteSelectProps<T> {
    fetchFunction: (offset: number, limit: number) => Promise<{
        items: T[];
        hasMore: boolean;
    }>;
    fetchDelay?: number;
    limit?: number;
    items?: undefined;
    hasMore?: undefined;
    isLoadingMore?: undefined;
    onLoadMore?: undefined;
}
interface ExternalDataProps<T> extends BaseInfiniteSelectProps<T> {
    items: T[];
    hasMore?: boolean;
    isLoadingMore?: boolean;
    onLoadMore?: () => void;
    fetchFunction?: undefined;
    fetchDelay?: undefined;
    limit?: undefined;
}
type InfiniteSelectProps<T> = FetchFunctionProps<T> | ExternalDataProps<T>;
export declare function InfiniteSelect<T extends object>({ fetchFunction: _fetchFunction, fetchDelay: _fetchDelay, limit: _limit, items: externalItems, hasMore: externalHasMore, isLoadingMore: externalIsLoading, onLoadMore: externalLoadMore, className, classNames, renderItem, getItemKey, selectionMode, ...selectProps }: InfiniteSelectProps<T>): JSX.Element;
export {};
