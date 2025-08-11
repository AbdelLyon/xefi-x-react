"use client";

import { mergeTailwindClasses } from "@xefi/x-react/utils";
import dayjs from "dayjs";
import React from "react";

import { Leave } from "@/models/Leave";
import { User } from "@/models/User";

import { UserRow } from "./UserRow";

type CellSize = {
  height: string;
  width: string;
};

type GroupWithUsers = {
  id: string | number;
  name?: string;
  label?: string;
  users: User[];
};

interface GroupContentProps {
  group: GroupWithUsers;
  periodDays: dayjs.Dayjs[];
  leaves: Leave[];
  cellSize: CellSize;
}

interface GroupRendererProps {
  groups: GroupWithUsers[];
  expandedState: Record<string, boolean>;
  periodDays: dayjs.Dayjs[];
  leaves: Leave[];
  cellSize: CellSize;
}

const GroupContent: React.FC<GroupContentProps> = ({
  group,
  periodDays,
  leaves,
  cellSize,
}) => {
  if (!group.users || group.users.length === 0) return null;

  return (
    <div
      className="relative"
      role="grid"
      aria-label={`Planning pour ${group.name || group.label}`}
    >
      {group.users.map((user, userIndex) => (
        <UserRow
          key={`${group.id}-${userIndex}`}
          user={user}
          groupId={group.id}
          userIndex={userIndex}
          periodDays={periodDays}
          leaves={leaves}
          cellSize={cellSize}
        />
      ))}
    </div>
  );
};

export const GroupRenderer: React.FC<GroupRendererProps> = ({
  groups,
  expandedState,
  periodDays,
  leaves,
  cellSize,
}) => {
  return (
    <>
      {groups.map((group, index) => {
        const groupId = group.id.toString();
        const isFirstGroupWithUsers =
          index === groups.findIndex((g) => g.users.length > 0);
        const isExpanded =
          expandedState[groupId] !== undefined
            ? expandedState[groupId]
            : isFirstGroupWithUsers && group.users.length > 0;

        if (index === 0) {
          return isExpanded && group.users.length > 0 ? (
            <div key={group.id} className="w-full">
              <GroupContent
                group={group}
                periodDays={periodDays}
                leaves={leaves}
                cellSize={cellSize}
              />
            </div>
          ) : (
            <div key={group.id} className="h-[30px]" />
          );
        }

        return (
          <React.Fragment key={group.id}>
            <div
              className={mergeTailwindClasses(
                "h-[30px]",
                isExpanded ? "border-b border-border/40" : "",
              )}
            />
            {isExpanded && group.users.length > 0 && (
              <div className="w-full">
                <GroupContent
                  group={group}
                  periodDays={periodDays}
                  leaves={leaves}
                  cellSize={cellSize}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};
