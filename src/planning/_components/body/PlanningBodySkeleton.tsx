"use client";

import { Skeleton } from "@xefi/x-react/skeleton";
import dayjs from "dayjs";
import React, { useMemo } from "react";

import { usePlanningStore } from "@/store/usePlanningStore";

import { PLANNING_CONSTANTS, getCellSize } from "../../_utils/planningUtils";

interface PlanningBodySkeletonProps {
  groupCount?: number;
  usersPerGroup?: number;
}

export const PlanningBodySkeleton: React.FC<PlanningBodySkeletonProps> = ({
  groupCount = 3,
  usersPerGroup = 5,
}) => {
  const { viewMode, currentDate, filters } = usePlanningStore();

  const daysCount = useMemo(() => {
    const startDateFilter = filters.find((f) => f.field === "start_date");
    const endDateFilter = filters.find((f) => f.field === "end_date");

    if (startDateFilter && endDateFilter) {
      const startDate = dayjs(startDateFilter.value as string);
      const endDate = dayjs(endDateFilter.value as string);
      if (startDate.isValid() && endDate.isValid()) {
        return endDate.diff(startDate, "day") + 1;
      }
    }

    switch (viewMode) {
      case "day":
        return 1;
      case "week":
        return 7;
      case "month":
        return currentDate.daysInMonth();
      case "twomonths":
        return (
          currentDate.daysInMonth() + currentDate.add(1, "month").daysInMonth()
        );
      case "dateSelected":
        return 30;
      default:
        return 30;
    }
  }, [viewMode, currentDate, filters]);

  const cellSize = getCellSize(viewMode);

  return (
    <div role="region" aria-label="Chargement du planning des congés">
      {Array(groupCount)
        .fill(0)
        .map((_, groupIndex) => (
          <GroupSkeleton
            key={groupIndex}
            userCount={usersPerGroup}
            daysCount={daysCount}
            cellSize={cellSize}
            isFirst={groupIndex === 0}
          />
        ))}
    </div>
  );
};

interface GroupSkeletonProps {
  userCount: number;
  daysCount: number;
  cellSize: { height: string; width: string };
  isFirst: boolean;
}

const GroupSkeleton: React.FC<GroupSkeletonProps> = ({
  userCount,
  daysCount,
  cellSize,
  isFirst,
}) => {
  return (
    <div className="w-full">
      {!isFirst && (
        <div
          className={`${PLANNING_CONSTANTS.GROUP_SEPARATOR_HEIGHT} border-b border-border/40`}
        />
      )}

      <div className="relative">
        {Array(userCount)
          .fill(0)
          .map((_, userIndex) => (
            <UserRowSkeleton
              key={userIndex}
              daysCount={daysCount}
              cellSize={cellSize}
            />
          ))}
      </div>
    </div>
  );
};

interface UserRowSkeletonProps {
  daysCount: number;
  cellSize: { height: string; width: string };
}

const UserRowSkeleton: React.FC<UserRowSkeletonProps> = ({
  daysCount,
  cellSize,
}) => {
  return (
    <div className={`flex ${cellSize.height} border-l border-border/60`}>
      <div className="flex flex-1 flex-nowrap">
        {Array(daysCount)
          .fill(0)
          .map((_, dayIndex) => (
            <PlanningCellSkeleton key={dayIndex} cellSize={cellSize} />
          ))}
      </div>
    </div>
  );
};

interface PlanningCellSkeletonProps {
  cellSize: { height: string; width: string };
}

const PlanningCellSkeleton: React.FC<PlanningCellSkeletonProps> = ({
  cellSize,
}) => {
  const getSkeletonHeight = () => {
    switch (cellSize.height) {
      case "h-8":
        return "h-4";
      case "h-6":
        return "h-3";
      case "h-5":
        return "h-2";
      case "h-4":
        return "h-2";
      case "h-3":
        return "h-1";
      default:
        return "h-3";
    }
  };

  return (
    <div
      className={`flex ${cellSize.height} ${cellSize.width} items-center justify-center border-r border-border/20 bg-background p-1`}
    >
      {Math.random() > 0.85 && (
        <Skeleton
          className={`${getSkeletonHeight()} w-full rounded-sm opacity-30`}
        />
      )}
    </div>
  );
};
