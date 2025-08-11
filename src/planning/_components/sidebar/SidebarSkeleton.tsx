"use client";

import { Skeleton } from "@xefi/x-react/skeleton";
import React from "react";

import { usePlanningStore } from "@/store/usePlanningStore";

import { getCellSize } from "../../_utils/planningUtils";

interface SidebarSkeletonProps {
  showBalances?: boolean;
  groupCount?: number;
  usersPerGroup?: number;
}

export const SidebarSkeleton: React.FC<SidebarSkeletonProps> = ({
  showBalances = false,
  groupCount = 4,
  usersPerGroup = 5,
}) => {
  const { viewMode } = usePlanningStore();
  const cellSize = getCellSize(viewMode);

  return (
    <>
      {Array(groupCount)
        .fill(0)
        .map((_, groupIndex) => (
          <GroupSkeleton
            key={groupIndex}
            showBalances={showBalances}
            userCount={usersPerGroup}
            cellSize={cellSize}
          />
        ))}
    </>
  );
};

interface GroupSkeletonProps {
  showBalances: boolean;
  userCount: number;
  cellSize: { height: string; width: string };
}

const GroupSkeleton: React.FC<GroupSkeletonProps> = ({
  showBalances,
  userCount,
  cellSize,
}) => {
  return (
    <div>
      <div className="flex items-center justify-between border border-border/40 bg-content1-100/50 px-2 py-1.5 dark:bg-content1/60">
        <div className="flex items-center gap-2">
          <Skeleton className="size-4 opacity-40" />
          <Skeleton className="h-3 w-20 opacity-50" />
        </div>
        <Skeleton className="h-3 w-8 opacity-30" />
      </div>

      <div className="flex flex-col">
        {Array(userCount)
          .fill(0)
          .map((_, userIndex) => (
            <UserSkeleton
              key={userIndex}
              showBalances={showBalances}
              cellSize={cellSize}
            />
          ))}
      </div>
    </div>
  );
};

interface UserSkeletonProps {
  showBalances: boolean;
  cellSize: { height: string; width: string };
}

const UserSkeleton: React.FC<UserSkeletonProps> = ({
  showBalances,
  cellSize,
}) => {
  return (
    <div
      className={`flex ${cellSize.height} w-full items-center justify-between border-b border-border px-3 last:border-0`}
    >
      <Skeleton className="h-3 w-24 opacity-40" />

      {showBalances && (
        <div className="flex items-center gap-1">
          <Skeleton className="h-3 w-6 opacity-25" />
          <Skeleton className="h-3 w-6 opacity-25" />
          <Skeleton className="h-3 w-6 opacity-25" />
        </div>
      )}
    </div>
  );
};
