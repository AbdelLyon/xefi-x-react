import { useCallback } from "react";

import { useOptionTransformers } from "@/hooks/useOptionTransformers";
import { useSites } from "@/hooks/useSites";
import { useTeams } from "@/hooks/useTeams";
import { useUsers } from "@/hooks/useUsers";
import { Filter } from "@/services/types";
import { usePlanningStore } from "@/store/usePlanningStore";
import { useUserStore } from "@/store/useUserStore";

import { useSearchState } from "./useSearchState";
import { useSelectionState } from "./useSelectionState";
import { useTagsWithUsersQuery } from "./useTagsWithUsersQuery";

export const usePlanningQueries = () => {
  const { setFilters } = usePlanningStore();
  const { currentUser } = useUserStore();

  const userFilters: Filter[] | undefined = currentUser?.manager_id
    ? [
      {
        field: "manager_id",
        operator: "=",
        value: currentUser.manager_id,
      },
    ]
    : undefined;

  const { searchTerms, searchHandlers, resetSearchTerms } = useSearchState();
  const { selections, selectionSetters, resetSelections } = useSelectionState();
  const { transformSites, transformTeams, transformUsers, transformTagsWithUsers } = useOptionTransformers();

  const { siteSearch, teamSearch, userSearch, tagsWithUsersSearch } = searchTerms;

  const {
    data: sitesData,
    allSites,
    fetchNextPage: fetchNextSitePage,
    hasNextPage: hasNextSitePage,
    isFetchingNextPage: isFetchingNextSitePage,
    isLoading: isLoadingSite,
    isFetching: isFetchingSite,
    error: siteError,
    refetch: refetchSites,
  } = useSites(siteSearch);

  const {
    teamsData,
    allTeams,
    fetchNextTeamPage,
    hasNextTeamPage,
    isFetchingNextTeamPage,
    isLoadingTeams: isLoadingTeam,
    isFetchingTeams: isFetchingTeam,
    teamsError: teamError,
    refetchTeams,
  } = useTeams(teamSearch);

  const {
    data: usersData,
    allUsers,
    fetchNextPage: fetchNextUserPage,
    hasNextPage: hasNextUserPage,
    isFetchingNextPage: isFetchingNextUserPage,
    isLoading: isLoadingUser,
    isFetching: isFetchingUser,
    error: userError,
    refetch: refetchUsers,
  } = useUsers(userSearch, userFilters);

  const {
    data: tagsWithUsersData,
    fetchNextPage: fetchNextTagsWithUsersPage,
    hasNextPage: hasNextTagsWithUsersPage,
    isFetchingNextPage: isFetchingNextTagsWithUsersPage,
    isLoading: isLoadingTagsWithUsers,
    isFetching: isFetchingTagsWithUsers,
    error: tagsWithUsersError,
    refetch: refetchTagsWithUsers,
  } = useTagsWithUsersQuery(tagsWithUsersSearch);

  const allTagsWithUsers = tagsWithUsersData?.pages.flatMap((page) => page.data) || [];

  const siteOptions = transformSites(allSites);
  const teamOptions = transformTeams(allTeams);
  const userOptions = transformUsers(allUsers);
  const tagsWithUsersOptions = transformTagsWithUsers(allTagsWithUsers);

  const resetFilters = useCallback(() => {
    resetSelections();
    resetSearchTerms();
    setFilters([]);
  }, [resetSelections, resetSearchTerms, setFilters]);

  const refetchAll = useCallback(async () => {
    await Promise.all([
      refetchSites(),
      refetchTeams(),
      refetchUsers(),
      refetchTagsWithUsers(),
    ]);
  }, [refetchSites, refetchTeams, refetchUsers, refetchTagsWithUsers]);

  const isLoadingAny =
    isLoadingSite || isLoadingTeam || isLoadingUser || isLoadingTagsWithUsers;
  const isFetchingAny =
    isFetchingSite ||
    isFetchingTeam ||
    isFetchingUser ||
    isFetchingTagsWithUsers;
  const hasErrors = !!(
    siteError ||
    teamError ||
    userError ||
    tagsWithUsersError
  );

  return {
    siteOptions,
    teamOptions,
    userOptions,
    tagsWithUsersOptions,

    fetchNextSitePage,
    fetchNextTeamPage,
    fetchNextUserPage,
    fetchNextTagsWithUsersPage,
    hasNextSitePage,
    hasNextTeamPage,
    hasNextUserPage,
    hasNextTagsWithUsersPage,
    isFetchingNextSitePage,
    isFetchingNextTeamPage,
    isFetchingNextUserPage,
    isFetchingNextTagsWithUsersPage,

    isLoadingSite,
    isFetchingSite,
    isLoadingTeam,
    isFetchingTeam,
    isLoadingUser,
    isFetchingUser,
    isLoadingTagsWithUsers,
    isFetchingTagsWithUsers,
    isLoadingAny,
    isFetchingAny,

    siteError,
    teamError,
    userError,
    tagsWithUsersError,
    hasErrors,

    ...searchHandlers,
    ...searchTerms,
    ...selections,
    ...selectionSetters,

    resetFilters,
    refetchAll,
    refetchSites,
    refetchTeams,
    refetchUsers,
    refetchTagsWithUsers,

    sitesData,
    teamsData,
    usersData,
    tagsWithUsersData,
  };
};
