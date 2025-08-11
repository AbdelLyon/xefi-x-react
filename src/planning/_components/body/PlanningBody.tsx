"use client";

import { Dayjs } from "dayjs";
import React from "react";

import { Leave } from "@/models/Leave";
import { Group } from "@/models/User";
import { usePlanningStore } from "@/store/usePlanningStore";

import { useCellSize } from "../../_hooks/usePlanningBodyData";

import { GroupRenderer } from "./GroupRenderer";
import { PlanningBodySkeleton } from "./PlanningBodySkeleton";

interface PlanningBodyProps {
  currentGroups: Group[];
  isLoading?: boolean;
  leaves: Leave[];
  periodDays: Dayjs[];
}

export const PlanningBody: React.FC<PlanningBodyProps> = ({
  isLoading,
  leaves,
  periodDays,
  currentGroups,
}) => {
  const {
    expandedSites,
    selectedTab,
    viewMode,
    expandedTeams,

    filters,
  } = usePlanningStore();

  const cellSize = useCellSize(periodDays, viewMode, filters);

  const currentExpandedState =
    selectedTab === "sites" ? expandedSites : expandedTeams;

  if (isLoading) {
    return (
      <PlanningBodySkeleton
        groupCount={currentGroups.length || 3}
        usersPerGroup={5}
      />
    );
  }

  return (
    <div role="region" aria-label="Planning des congés">
      <GroupRenderer
        groups={currentGroups}
        expandedState={currentExpandedState}
        periodDays={periodDays}
        leaves={leaves}
        cellSize={cellSize}
      />
    </div>
  );
};
