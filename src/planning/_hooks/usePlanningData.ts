import { useLeavesPlannigQuery } from "./useLeavesPlannigQuery";
import { usePeriodDays } from "./usePlanningBodyData";
import { usePlanningGroups } from "./usePlanningGroups";
import { usePlanningUsers } from "./usePlanningUsers";

export const usePlanningData = () => {
  const {
    users,
    allUserLength,
    isFetchingNextPage,
    hasNextPage,
    isLoadingUsers,
    usersError,
    handleLoadMore,
  } = usePlanningUsers();

  const periodDays = usePeriodDays();
  const { data: leaves = [], isLoading: isLoadingLeaves } =
    useLeavesPlannigQuery(periodDays, users);

  const { currentGroups } = usePlanningGroups({ teams: { data: [] }, users });

  if (usersError) {
    console.error("Users error:", usersError);
  }

  return {
    users,
    allUserLength,
    leaves,
    periodDays,
    currentGroups,
    isFetchingNextPage,
    hasNextPage,
    isLoadingUsers,
    isLoadingLeaves,
    handleLoadMore,
  };
};