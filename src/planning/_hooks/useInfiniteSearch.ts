import { useInfiniteQuery } from "@tanstack/react-query";

import { ApiResponseWithMeta, PostSearchRequest } from "@/services/types";

interface QueryResponse<T> {
  data: T[];
  nextPage: number | undefined;
}

interface InfiniteSearchConfig<T> {
  queryKey: string;
  searchTerm: string;
  searchFn: (params: PostSearchRequest) => Promise<ApiResponseWithMeta<T[]>>;
  limit: number;
  sortField: string;
  sortDirection: "asc" | "desc";
}

export const useInfiniteSearch = <T>({
  queryKey,
  searchTerm,
  searchFn,
  limit,
  sortField,
  sortDirection = "asc",
}: InfiniteSearchConfig<T>) => {
  return useInfiniteQuery({
    queryKey: [queryKey, searchTerm],
    queryFn: async ({ pageParam = 1 }): Promise<QueryResponse<T>> => {
      const searchParams: PostSearchRequest = {
        limit,
        page: pageParam,
        sort: [{ field: sortField, direction: sortDirection }],
      };

      if (searchTerm) {
        searchParams.search = { value: searchTerm };
      }

      const response = await searchFn(searchParams);
      return {
        data: response.data || [],
        nextPage: response.meta.current_page < response.meta.last_page ? pageParam + 1 : undefined,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });
};