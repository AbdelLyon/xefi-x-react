"use client";

import { mergeTailwindClasses } from "@xefi/x-react/utils";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import React from "react";

import { Leave } from "@/models/Leave";
import { User } from "@/models/User";
import { usePlanningStore } from "@/store/usePlanningStore";

import { PlanningCell } from "./PlanningCell";

dayjs.extend(utc);
dayjs.extend(timezone);

type CellSize = {
  height: string;
  width: string;
};

interface UserRowProps {
  user: User;
  groupId: string | number;
  userIndex: number;
  periodDays: dayjs.Dayjs[];
  leaves: Leave[];
  cellSize: CellSize;
}

const getLeaveForUserAndDate = (
  leaves: Leave[],
  userId: number,
  date: dayjs.Dayjs,
): Leave | null => {
  const userLeaves = leaves.filter((leave) => {
    if (leave.user_id !== userId) return false;

    const startDate = dayjs.utc(leave.start_date).startOf("day");
    const endDate = dayjs.utc(leave.end_date).startOf("day");
    const currentDay = dayjs.utc(date.format("YYYY-MM-DD")).startOf("day");

    if (startDate.isSame(endDate, "day")) {
      return currentDay.isSame(startDate, "day");
    }

    return (
      currentDay.isSameOrAfter(startDate) && currentDay.isSameOrBefore(endDate)
    );
  });

  return userLeaves.length > 0 ? userLeaves[0] : null;
};

export const UserRow: React.FC<UserRowProps> = ({
  user,
  groupId,
  userIndex,
  periodDays,
  leaves,
  cellSize,
}) => {
  const { hoveredUser } = usePlanningStore();
  const fullName = `${user.firstname || ""} ${user.lastname || ""}`;

  return (
    <div
      key={`user-${groupId}-${userIndex}`}
      className={mergeTailwindClasses(
        "flex h-8 border-l border-border/60",
        hoveredUser === user.id ? "bg-primary/10" : "",
      )}
      aria-label={`Ligne pour ${fullName}`}
      role="row"
    >
      <div className="flex flex-1 flex-nowrap" role="rowgroup">
        {periodDays.map((day, dayIndex) => {
          const leave = getLeaveForUserAndDate(leaves, user.id, day);

          const isHalfDay = leave && leave.duration === 0.5;
          return (
            <PlanningCell
              key={`${groupId}-${userIndex}-${dayIndex}-${day.format("YYYY-MM-DD")}`}
              user={user}
              day={day}
              dayIndex={dayIndex}
              groupId={groupId}
              userIndex={userIndex}
              leave={leave}
              cellSize={cellSize}
              isHalfDay={isHalfDay}
            />
          );
        })}
      </div>
    </div>
  );
};
