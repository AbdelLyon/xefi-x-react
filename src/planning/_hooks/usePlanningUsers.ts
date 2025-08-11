import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";

import { User } from "@/models/User";
import { userService } from "@/services/api/users/UserService";
import { PostSearchRequest } from "@/services/types";
import { usePlanningStore } from "@/store/usePlanningStore";
import { useUserStore } from "@/store/useUserStore";
import { getFullname } from "@/utils";


export const usePlanningUsers = () => {
  const { currentUser } = useUserStore();
  const {
    setUsers,
    setUsersGroupedBySite,
    setAllUserLength,
    filters,
    isTagsDisplay,
  } = usePlanningStore();

  const isAdmin = ["ADMINISTRATEUR", "ADMINISTRATEURMANAGER"].includes(
    currentUser?.profile?.label ?? "",
  );
  const isDirector = currentUser?.profile?.label === "DIRECTOR";

  const buildSearchRequest = useCallback((): PostSearchRequest => {
    const filtersWithoutPeriod = filters.filter(
      ({ field }) => field && !["start_date", "end_date"].includes(field),
    );

    const baseRequest: PostSearchRequest = {
      filters: filtersWithoutPeriod,
      sort: [
        { field: "site.name", direction: "asc" },
        { field: "lastname", direction: "asc" },
      ],
    };

    if (!isTagsDisplay && !isAdmin && !isDirector) {
      baseRequest.scopes = [{ name: "viewUndirectManagedUsers" }];
    }

    if (currentUser?.id) {
      baseRequest.aggregates = [
        {
          relation: "directors",
          type: "exists",
          filters: [
            {
              field: "directors.director_id",
              operator: "=",
              value: currentUser.id,
            },
          ],
        },
      ];
    }

    return baseRequest;
  }, [filters, isTagsDisplay, isAdmin, isDirector, currentUser?.id]);

  const {
    data: usersQueryData,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isLoading: isLoadingUsers,
    error: usersError,
  } = useInfiniteQuery({
    queryKey: [
      "users-planning",
      JSON.stringify(filters),
      isTagsDisplay,
      currentUser?.id,
    ],
    queryFn: async ({ pageParam = 1 }) => {
      if (!currentUser?.id) {
        throw new Error("User not authenticated");
      }

      const searchRequest = buildSearchRequest();
      const response = await userService.searchUsersForPlanning(
        searchRequest,
        pageParam as number,
        50,
        isTagsDisplay,
      );
      return response;
    },
    getNextPageParam: (lastPage) => {
      const { current_page, last_page } = lastPage.meta;
      return current_page < last_page ? current_page + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: !!currentUser?.id,
    retry: 3,
  });

  const extractSitesAndTagsFromUsers = useCallback(
    (userList: User[]) => {
      if (!userList?.length) {
        setUsersGroupedBySite([]);
        return;
      }

      const groupModel = userList.reduce(
        (group: Record<string, User[]>, user) => {
          let category = "";

          if (isTagsDisplay && user.tag_id) {
            category = `tag_${user.tag_label}_${user.tag_id}`;
          } else if (user.site?.name && user.site?.id) {
            category = `site_${user.site.name}_${user.site.id}`;
          } else {
            category = `site_Inconnu_${user.id}`;
          }

          if (!group[category]) {
            group[category] = [];
          }
          group[category].push(user);
          return group;
        },
        {},
      );

      const userGroupBySitesSorted = Object.entries(groupModel).map(
        ([name, users]) => ({
          name,
          users: users
            .map((user) => ({ ...user, name: getFullname(user) }))
            .sort((a, b) => a.name.localeCompare(b.name)),
        }),
      );

      setUsersGroupedBySite(userGroupBySitesSorted);
    },
    [isTagsDisplay, setUsersGroupedBySite],
  );

  useEffect(() => {
    if (usersQueryData?.pages) {
      const allUsers = usersQueryData.pages.flatMap((page) => page.data);
      const total = usersQueryData.pages[0]?.meta.total || 0;
      setUsers(allUsers);
      setAllUserLength(total);
      extractSitesAndTagsFromUsers(allUsers);
    }
  }, [
    usersQueryData?.pages,
    setUsers,
    setAllUserLength,
    extractSitesAndTagsFromUsers,
  ]);

  const handleLoadMore = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  const users = usersQueryData?.pages.flatMap((page) => page.data) || [];
  const allUserLength = usersQueryData?.pages[0]?.meta.total || 0;

  return {
    users,
    allUserLength,
    isFetchingNextPage,
    hasNextPage,
    isLoadingUsers,
    usersError,
    handleLoadMore,
  };
};