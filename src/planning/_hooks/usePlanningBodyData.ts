import dayjs from "dayjs";
import { useMemo } from "react";

import { Filter } from "@/services/types";
import { usePlanningStore } from "@/store/usePlanningStore";

export const usePeriodDays = () => {
  const { currentDate, viewMode, filters } = usePlanningStore();

  return useMemo(() => {
    const startDateFilter = filters.find(
      (filter) => filter.field === "start_date",
    );
    const endDateFilter = filters.find((filter) => filter.field === "end_date");

    if (startDateFilter && endDateFilter) {
      const startDate = dayjs(startDateFilter.value as string);
      const endDate = dayjs(endDateFilter.value as string);

      if (
        startDate.isValid() &&
        endDate.isValid() &&
        startDate.isBefore(endDate)
      ) {
        const days: dayjs.Dayjs[] = [];
        let currentDay = startDate;

        while (
          currentDay.isBefore(endDate) ||
          currentDay.isSame(endDate, "day")
        ) {
          days.push(currentDay);
          currentDay = currentDay.add(1, "day");
        }
        return days;
      }
    }

    let startDate: dayjs.Dayjs;
    let endDate: dayjs.Dayjs;

    switch (viewMode) {
      case "week":
        startDate = currentDate.startOf("week");
        endDate = currentDate.endOf("week");
        break;
      case "month":
        startDate = currentDate.startOf("month");
        endDate = currentDate.endOf("month");
        break;
      default:
        startDate = currentDate.startOf("month");
        endDate = currentDate.add(1, "month").endOf("month");
    }

    const days: dayjs.Dayjs[] = [];
    let day = startDate;
    while (day?.isSame(endDate) || day?.isBefore(endDate)) {
      days.push(day);
      day = day.add(1, "day");
    }

    return days;
  }, [currentDate, viewMode, filters]);
};

export const useCellSize = (
  periodDays: dayjs.Dayjs[],
  viewMode: string,
  filters: Filter[],
) => {
  return useMemo(() => {
    const CELL_SIZES = {
      week: { height: "h-8", width: "min-w-[40px]" },
      month: { height: "h-6", width: "min-w-[20px]" },
      twomonths: { height: "h-5", width: "min-w-[15px]" },
      custom: {
        small: { height: "h-3", width: "min-w-[8px]" },
        medium: { height: "h-4", width: "min-w-[10px]" },
        large: { height: "h-5", width: "min-w-[15px]" },
        xlarge: { height: "h-6", width: "min-w-[20px]" },
        xxlarge: { height: "h-8", width: "min-w-[40px]" },
      },
    } as const;

    const startDateFilter = filters.find(
      (filter) => filter.field === "start_date",
    );
    const endDateFilter = filters.find((filter) => filter.field === "end_date");

    if (startDateFilter && endDateFilter) {
      const startDate = dayjs(startDateFilter.value as string);
      const endDate = dayjs(endDateFilter.value as string);
      const daysDiff = endDate.diff(startDate, "day") + 1;

      if (daysDiff <= 7) return CELL_SIZES.custom.xxlarge;
      if (daysDiff <= 31) return CELL_SIZES.custom.xlarge;
      if (daysDiff <= 62) return CELL_SIZES.custom.large;
      if (daysDiff <= 120) return CELL_SIZES.custom.medium;
      return CELL_SIZES.custom.small;
    }

    const result =
      CELL_SIZES[viewMode as keyof typeof CELL_SIZES] || CELL_SIZES.month;
    return typeof result === "object" && "small" in result
      ? CELL_SIZES.month
      : result;
  }, [periodDays, viewMode, filters]);
};
