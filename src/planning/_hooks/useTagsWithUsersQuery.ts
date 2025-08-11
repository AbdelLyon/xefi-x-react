import { useInfiniteQuery } from "@tanstack/react-query";

import { Team } from "@/models/Team";
import { teamService } from "@/services/api/team/TeamService";

interface QueryResponse<T> {
  data: T[];
  nextPage: number | undefined;
}

export const useTagsWithUsersQuery = (searchTerm: string) => {
  return useInfiniteQuery({
    queryKey: ["tags-with-users-infinite", searchTerm],
    queryFn: async ({ pageParam = 1 }): Promise<QueryResponse<Team>> => {
      const response = await teamService.getAllTeamsWithUsers(pageParam, 20);

      return {
        data: response.tags?.data || [],
        nextPage:
          response.tags?.current_page < response.tags?.last_page
            ? pageParam + 1
            : undefined,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });
};
