import { ApiResponseWithMeta, PostSearchRequest } from '../../services/types';
interface InfiniteSearchConfig<T> {
    queryKey: string;
    searchTerm: string;
    searchFn: (params: PostSearchRequest) => Promise<ApiResponseWithMeta<T[]>>;
    limit: number;
    sortField: string;
    sortDirection: "asc" | "desc";
}
export declare const useInfiniteSearch: <T>({ queryKey, searchTerm, searchFn, limit, sortField, sortDirection, }: InfiniteSearchConfig<T>) => any;
export {};
