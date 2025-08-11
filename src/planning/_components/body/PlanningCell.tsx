"use client";

import { mergeTailwindClasses } from "@xefi/x-react/utils";
import dayjs from "dayjs";
import React from "react";

import { CustomDrawer } from "@/components/LeaveDetails/CustomDrawer";
import { Leave } from "@/models/Leave";
import { User } from "@/models/User";
import { usePlanningStore } from "@/store/usePlanningStore";
import { flutterColorToHexa } from "@/utils";

type PublicHoliday = {
  date: string;
  name: string;
  clients_exists: boolean;
};

type CellSize = {
  height: string;
  width: string;
};

interface PlanningCellProps {
  user: User;
  day: dayjs.Dayjs;
  dayIndex: number;
  groupId: string | number;
  userIndex: number;
  leave: Leave | null;
  cellSize: CellSize;
  isHalfDay?: boolean | null;
}

const isWeekend = (date: dayjs.Dayjs): boolean =>
  date.day() === 0 || date.day() === 6;

const isPublicHoliday = (
  date: dayjs.Dayjs,
  publicHolidays: PublicHoliday[],
): boolean => {
  return publicHolidays.some(
    (holiday) =>
      dayjs(holiday.date).isSame(date, "day") && holiday.clients_exists,
  );
};

const isToday = (date: dayjs.Dayjs): boolean => dayjs().isSame(date, "day");

export const PlanningCell: React.FC<PlanningCellProps> = ({
  user,
  day,
  dayIndex,
  groupId,
  userIndex,
  leave,
  cellSize,
  isHalfDay = null,
}) => {
  const { hoveredDay, reversePrimary, publicHolidays } = usePlanningStore();

  const isStartDate = leave && dayjs(leave.start_date).isSame(day, "day");
  const isEndDate = leave && dayjs(leave.end_date).isSame(day, "day");
  const isHighlighted = hoveredDay === day.format("YYYY-MM-DD");
  const isPublicHolidayDay = isPublicHoliday(day, publicHolidays);
  const isTodayDay = isToday(day);
  const isMorningHalfDay =
    leave && isHalfDay && dayjs(leave.start_date).hour() < 12;

  const cellDate = day.format("DD/MM/YYYY");
  const userName = `${user.firstname || ""} ${user.lastname || ""}`;
  const cellStatus = leave
    ? `${leave.leave_type?.name || "Congé"}`
    : isPublicHolidayDay
      ? "Jour férié"
      : isWeekend(day)
        ? "Week-end"
        : "Disponible";

  const getCellBackgroundClass = () => {
    if (isHighlighted) return "bg-default dark:bg-default/40";
    if (isPublicHolidayDay || isWeekend(day)) return "bg-content1-100";
    return "";
  };

  return (
    <div
      key={`cell-${groupId}-${userIndex}-${dayIndex}`}
      className={mergeTailwindClasses(
        "relative",
        cellSize.width,
        "flex-1 border-b border-r border-border/60",
        getCellBackgroundClass(),
        "transition-colors duration-150",
      )}
      aria-label={`${userName} - ${cellDate} - ${cellStatus}`}
    >
      {isTodayDay && (
        <div
          className="absolute inset-y-0 left-1/2 border border-dashed border-primary bg-transparent opacity-70"
          aria-hidden="true"
        />
      )}

      {leave && !isWeekend(day) && (
        <CustomDrawer
          leaveId={leave.id}
          trigger={
            <div
              className={mergeTailwindClasses(
                "absolute inset-0 flex size-full cursor-pointer flex-col p-[0.5px] transition-opacity duration-300",
                isHalfDay ? "w-1/2" : "w-full",
                isHalfDay && !isMorningHalfDay ? "ml-auto" : "",
              )}
              aria-label={`Détails du congé: ${leave.leave_type?.name || "Congé"}`}
            >
              <div
                className="flex-1 transition-all duration-300"
                style={{
                  backgroundColor: reversePrimary
                    ? flutterColorToHexa(leave?.status?.color)
                    : leave.leave_type?.color,
                  borderTopLeftRadius: isHalfDay
                    ? isMorningHalfDay
                      ? "4px"
                      : "0"
                    : isStartDate
                      ? "4px"
                      : "0",
                  borderTopRightRadius: isHalfDay
                    ? !isMorningHalfDay
                      ? "4px"
                      : "0"
                    : isEndDate
                      ? "4px"
                      : "0",
                }}
                aria-hidden="true"
              />
              <div
                className="h-1/5 min-h-[3px] transition-all duration-300"
                style={{
                  backgroundColor: reversePrimary
                    ? leave.leave_type?.color
                    : flutterColorToHexa(leave?.status?.color),
                  borderBottomLeftRadius: isHalfDay
                    ? isMorningHalfDay
                      ? "4px"
                      : "0"
                    : isStartDate
                      ? "4px"
                      : "0",
                  borderBottomRightRadius: isHalfDay
                    ? !isMorningHalfDay
                      ? "4px"
                      : "0"
                    : isEndDate
                      ? "4px"
                      : "0",
                }}
                aria-hidden="true"
              />
            </div>
          }
        />
      )}
    </div>
  );
};
