"use client";

import { mergeTailwindClasses } from "@xefi/x-react/utils";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import React, { useMemo } from "react";

interface DayCellProps {
  day: dayjs.Dayjs;
  index: number;
  cellMinWidth: string;
  type: "number" | "name";
}

export const DayCell: React.FC<DayCellProps> = ({
  day,
  cellMinWidth,
  type,
}) => {
  const dayInfo = useMemo(() => {
    const today = dayjs();
    const isToday = today.isSame(day, "day");
    const isWeekend = day.day() === 0 || day.day() === 6;
    const isMonday = day.day() === 1;
    const dayNumber = day.date();
    const dayLetter = day.locale("fr").format("dd").charAt(0);

    return {
      isToday,
      isWeekend,
      isMonday,
      dayNumber,
      dayLetter,
    };
  }, [day]);

  const containerStyles = useMemo(() => {
    const baseClasses =
      "flex items-center justify-center border border-border transition-colors duration-200 mx-0.5  ";
    const todayClasses = "bg-primary text-white";
    const weekendClasses = "bg-content1-100";

    if (type === "number") {
      return mergeTailwindClasses(
        baseClasses,
        "mt-1 rounded-t-md border-b-0",
        dayInfo.isToday
          ? todayClasses
          : dayInfo.isWeekend
            ? weekendClasses
            : "",
      );
    }

    return mergeTailwindClasses(
      baseClasses,
      "mb-1 rounded-b-md border-t-0",
      dayInfo.isToday ? todayClasses : dayInfo.isWeekend ? weekendClasses : "",
    );
  }, [type, dayInfo.isToday, dayInfo.isWeekend]);

  const textStyles = useMemo(() => {
    if (type === "number") {
      return mergeTailwindClasses(
        "text-xs",
        dayInfo.isToday
          ? "font-semibold text-white"
          : dayInfo.isWeekend
            ? "text-foreground-400"
            : "text-foreground-500",
      );
    }

    return mergeTailwindClasses(
      "text-[10px] font-medium uppercase",
      dayInfo.isToday
        ? "text-white"
        : dayInfo.isMonday
          ? "text-primary"
          : "text-foreground-400",
    );
  }, [type, dayInfo.isToday, dayInfo.isWeekend, dayInfo.isMonday]);

  const commonProps = {
    className: containerStyles,
    style: { minWidth: cellMinWidth },
    title: day.format("dddd DD MMMM YYYY"),
  };

  if (type === "number") {
    return (
      <div
        key={`day-num-${day.format("YYYY-MM-DD")}`}
        {...commonProps}
        aria-label={`Jour ${dayInfo.dayNumber}${dayInfo.isToday ? " (aujourd'hui)" : ""}`}
        suppressHydrationWarning
      >
        <span className={textStyles}>{dayInfo.dayNumber}</span>
      </div>
    );
  }

  return (
    <div
      key={`day-name-${day.format("YYYY-MM-DD")}`}
      {...commonProps}
      aria-label={`${day.format("dddd")}${dayInfo.isToday ? " (aujourd'hui)" : ""}`}
      suppressHydrationWarning
    >
      <span className={textStyles}>
        {dayInfo.dayLetter}
      </span>
    </div>
  );
};
