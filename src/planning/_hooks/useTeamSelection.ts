import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { teamService } from "@/services/api/team/TeamService";

import { usePlanningQueries } from "./usePlanningQueries";

interface UseTeamSelectionParams {
  selectedTeams: Set<string>;
}

export const useTeamSelection = ({ selectedTeams }: UseTeamSelectionParams) => {
  const { teamOptions } = usePlanningQueries();

  const selectedTeamIds = useMemo(() => {
    return teamOptions
      .filter((team) => selectedTeams.has(team.name))
      .map(({ id }) => id);
  }, [teamOptions, selectedTeams]);

  const { data: teams, isLoading: isLoadingTeams } = useQuery({
    queryKey: ["teams", JSON.stringify(selectedTeamIds)],
    queryFn: async () =>
      teamService.search({
        ...(selectedTeamIds.length > 0 && {
          filters: [
            {
              field: "id",
              operator: "in",
              value: selectedTeamIds,
            },
          ],
        }),
        sort: [{ field: "label", direction: "asc" }],
      }),
  });

  return {
    teams,
    isLoadingTeams,
    selectedTeamIds,
  };
};
