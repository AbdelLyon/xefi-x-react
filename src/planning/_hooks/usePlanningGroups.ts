import { useMemo } from "react";

import { Team } from "@/models/Team";
import { Group, User } from "@/models/User";
import { usePlanningStore } from "@/store/usePlanningStore";

import { processUserGroup } from "../_utils/planningUtils";

interface UseGroupsParams {
  teams?: { data: Team[]; };
  users: User[];
}

export const usePlanningGroups = ({ teams, users }: UseGroupsParams) => {
  const { selectedTab, searchQuery, usersGroupedBySite } = usePlanningStore();

  const siteGroups = useMemo(() => {
    const groups: Group[] = [];

    usersGroupedBySite.forEach((group) => {
      const parts = group.name.split("_");
      const groupId = parts.length >= 3 ? parts[parts.length - 1] : group.name;
      const displayName =
        parts.length >= 3 ? parts.slice(1, -1).join("_") : group.name;

      const processedUsers = processUserGroup(group.users, searchQuery);

      if (processedUsers.length > 0 || !searchQuery) {
        groups.push({
          id: `site_${groupId}`,
          name: displayName,
          label: displayName,
          users: processedUsers,
        });
      }
    });

    return groups;
  }, [usersGroupedBySite, searchQuery]);

  const teamGroups = useMemo(() => {
    if (!teams?.data || teams.data.length === 0) return [];

    const groups: Group[] = [];

    teams.data.forEach((team) => {
      const teamUsers = users.filter((user) =>
        String(user.tag_id) === String(team.id)
      );

      const processedUsers = processUserGroup(teamUsers, searchQuery);

      if (processedUsers.length > 0 || !searchQuery) {
        groups.push({
          id: `team_${team.id}`,
          name: team.label || `Équipe ${team.id}`,
          label: team.label || `Équipe ${team.id}`,
          users: processedUsers,
        });
      }
    });

    return groups;
  }, [teams?.data, users, searchQuery]);

  const currentGroups = useMemo(() => {
    return selectedTab === "sites" ? siteGroups : teamGroups;
  }, [selectedTab, siteGroups, teamGroups]);

  return {
    siteGroups,
    teamGroups,
    currentGroups,
  };
};