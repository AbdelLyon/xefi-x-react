"use client";

import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import "dayjs/locale/fr";
import { useCallback, useEffect, useMemo } from "react";

import { ClientHoliday } from "@/models/Holiday";
import { Holiday } from "@/models/Leave";
import { holidayService } from "@/services/api/holiday/holidayService";
import { leaveBaseService } from "@/services/api/leave/LeaveBaseService";
import { usePlanningStore } from "@/store/usePlanningStore";
import { useUserStore } from "@/store/useUserStore";

import { DayCell } from "./DayCell";
import { HolidayIndicators } from "./HolidayIndicators";
import { NavigationControls } from "./NavigationControls";

dayjs.extend(weekOfYear);
dayjs.locale("fr");

interface PublicHoliday {
  id: number;
  date: string;
  name: string;
  year: number;
  country_code: string;
  clients_exists: boolean;
  is_manual: boolean;
  created_at: string;
  updated_at: string;
}

interface SchoolHoliday {
  name: string;
  start_date: string;
  end_date: string;
  zones: string;
}

interface HolidayZone {
  label: string;
  color: string;
}

interface DateFilters {
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
}

const HOLIDAY_ZONES: HolidayZone[] = [
  { label: "a", color: "#e84c3d" },
  { label: "b", color: "#8b2f1f" },
  { label: "c", color: "#5d1f16" },
] as const;

const DAY_THRESHOLDS = {
  week: 7,
  month: 31,
  twomonths: 62,
  extended: 120,
} as const;

export const PlanningHeader = () => {
  const {
    viewMode,
    currentDate,
    filters,
    setCurrentDate,
    setFilters,
    setViewMode,
  } = usePlanningStore();
  const { currentUser } = useUserStore();

  const dateFilters = useMemo((): DateFilters | null => {
    const startDateFilter = filters.find(
      (filter) => filter.field === "start_date",
    );
    const endDateFilter = filters.find((filter) => filter.field === "end_date");

    if (startDateFilter?.value && endDateFilter?.value) {
      return {
        startDate: dayjs(startDateFilter.value as string),
        endDate: dayjs(endDateFilter.value as string),
      };
    }
    return null;
  }, [filters]);

  const periodDays = useMemo(() => {
    if (dateFilters) {
      return generateDaysBetween(dateFilters.startDate, dateFilters.endDate);
    }

    const { startDate, endDate } = getPeriodBounds(viewMode, currentDate);
    return generateDaysBetween(startDate, endDate);
  }, [viewMode, currentDate, dateFilters]);

  useEffect(() => {
    if (periodDays.length === 0) {
      setViewMode("month");
    }
  }, [periodDays.length, setViewMode]);

  const { data: holidaysData, isLoading: isLoadingHolidays } = useQuery({
    queryKey: ["holidays", currentDate.year()],
    queryFn: () => leaveBaseService.fetchLeaveHolidays(currentDate.year()),
    enabled: !!currentDate,
  });

  const { data: dayoffData, isLoading: isLoadingDayoff } = useQuery({
    queryKey: ["dayoff", currentUser?.client?.id, currentDate.year()],
    queryFn: async () => {
      if (!currentUser?.client?.id) return null;

      return holidayService.dayoffClientFetch(
        currentUser.client.id,
        currentDate.year(),
        currentUser.site?.country_alpha || "FR",
      );
    },
    enabled: !!currentUser?.client?.id,
  });

  const schoolHolidays = useMemo(() => {
    return (holidaysData?.data || []).filter((item: Holiday): item is Holiday =>
      Boolean(item.start_date && item.end_date && item.zones),
    );
  }, [holidaysData]);

  const publicHolidays = useMemo(() => {
    return (dayoffData?.data || []).filter(
      (item: ClientHoliday): item is ClientHoliday =>
        Boolean(item.date && typeof item.clients_exists === "boolean"),
    );
  }, [dayoffData]);

  function getCellMinWidthForViewMode(viewMode: string): string {
    const widths: Record<string, string> = {
      week: "40px",
      month: "20px",
      twomonths: "15px",
      day: "20px",
    };

    return widths[viewMode] || "20px";
  }

  const cellMinWidth = useMemo(() => {
    if (dateFilters) {
      const daysDiff =
        dateFilters.endDate.diff(dateFilters.startDate, "day") + 1;
      return getCellMinWidthForDays(daysDiff);
    }

    return getCellMinWidthForViewMode(viewMode);
  }, [viewMode, dateFilters]);

  const getPublicHolidayAtThisDate = useCallback(
    (date: dayjs.Dayjs): PublicHoliday | undefined => {
      const dateStr = date.format("YYYY-MM-DD");
      return publicHolidays.find(
        (holiday) =>
          dayjs(holiday.date).format("YYYY-MM-DD") === dateStr &&
          holiday.clients_exists,
      );
    },
    [publicHolidays],
  );

  const getSchoolHolidayAtThisDate = useCallback(
    (date: dayjs.Dayjs, zone: string): SchoolHoliday | undefined => {
      if (!schoolHolidays.length) return undefined;

      const holidaysInZone = schoolHolidays.filter((holiday) =>
        holiday.zones.toLowerCase().includes(zone.toLowerCase()),
      );

      return holidaysInZone.find((holiday) =>
        date.isBetween(
          dayjs(holiday.start_date),
          dayjs(holiday.end_date),
          "day",
          "[]",
        ),
      );
    },
    [schoolHolidays],
  );

  const changePeriod = useCallback(
    (increment: number) => {
      if (dateFilters) {
        const intervalDays =
          dateFilters.endDate.diff(dateFilters.startDate, "day") + 1;
        const newStartDate = dateFilters.startDate.add(
          increment * intervalDays,
          "day",
        );
        const newEndDate = dateFilters.endDate.add(
          increment * intervalDays,
          "day",
        );

        const newFilters = filters.map((filter) => {
          if (filter.field === "start_date") {
            return { ...filter, value: newStartDate.format("YYYY-MM-DD") };
          }
          if (filter.field === "end_date") {
            return { ...filter, value: newEndDate.format("YYYY-MM-DD") };
          }
          return filter;
        });

        setFilters(newFilters);
        setCurrentDate(newStartDate);
        return;
      }

      const newDate =
        viewMode === "week"
          ? currentDate.add(increment * 7, "day")
          : currentDate.add(increment, "month");

      setCurrentDate(newDate);
    },
    [dateFilters, filters, viewMode, currentDate, setFilters, setCurrentDate],
  );

  const headerTitle = useMemo(() => {
    if (dateFilters) {
      return `Du ${dateFilters.startDate.format("D MMMM YYYY")} au ${dateFilters.endDate.format("D MMMM YYYY")}`;
    }

    if (viewMode === "week") {
      const weekStart = currentDate.startOf("week");
      const weekEnd = currentDate.endOf("week");
      return `Du ${weekStart.format("D MMMM YYYY")} au ${weekEnd.format("D MMMM YYYY")} (semaine ${currentDate.week()})`;
    }

    const daysByMonth = periodDays.reduce<Record<string, dayjs.Dayjs[]>>(
      (acc, day) => {
        const month = day.format("YYYY-MM");
        if (!acc[month]) {
          acc[month] = [];
        }
        acc[month].push(day);
        return acc;
      },
      {},
    );

    const months = Object.keys(daysByMonth).sort();
    return months
      .map((monthKey) => dayjs(monthKey).format("MMMM YYYY"))
      .join(" - ");
  }, [dateFilters, viewMode, currentDate, periodDays]);

  const isLoading = isLoadingHolidays || isLoadingDayoff;

  if (periodDays.length === 0) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="text-sm text-foreground-500">
          Aucune donnée disponible pour cette période
        </div>
      </div>
    );
  }

  return (
    <div className="sticky top-0 z-10 w-full bg-background">
      <NavigationControls
        onPreviousPeriod={() => changePeriod(-1)}
        onNextPeriod={() => changePeriod(1)}
        title={headerTitle}
        isLoading={isLoading}
      />

      <div className="h-[80px]">
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${periodDays.length}, minmax(${cellMinWidth}, 1fr))`,
          }}
        >
          {periodDays.map((day, index) => (
            <DayCell
              key={`day-num-${day.format("YYYY-MM-DD")}`}
              day={day}
              index={index}
              cellMinWidth={cellMinWidth}
              type="number"
            />
          ))}

          {periodDays.map((day, index) => (
            <DayCell
              key={`day-name-${day.format("YYYY-MM-DD")}`}
              day={day}
              index={index}
              cellMinWidth={cellMinWidth}
              type="name"
            />
          ))}

          <HolidayIndicators
            periodDays={periodDays}
            publicHolidays={publicHolidays}
            schoolHolidays={schoolHolidays}
            holidayZones={HOLIDAY_ZONES}
            getPublicHolidayAtThisDate={getPublicHolidayAtThisDate}
            getSchoolHolidayAtThisDate={getSchoolHolidayAtThisDate}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

function generateDaysBetween(
  startDate: dayjs.Dayjs,
  endDate: dayjs.Dayjs,
): dayjs.Dayjs[] {
  const days: dayjs.Dayjs[] = [];
  let day = startDate;

  while (day.isSame(endDate) || day.isBefore(endDate)) {
    days.push(day);
    day = day.add(1, "day");
  }

  return days;
}

function getPeriodBounds(viewMode: string, currentDate: dayjs.Dayjs) {
  switch (viewMode) {
    case "week":
      return {
        startDate: currentDate.startOf("week"),
        endDate: currentDate.endOf("week"),
      };
    case "month":
      return {
        startDate: currentDate.startOf("month"),
        endDate: currentDate.endOf("month"),
      };
    case "twomonths":
      return {
        startDate: currentDate.startOf("month"),
        endDate: currentDate.add(1, "month").endOf("month"),
      };
    default:
      return {
        startDate: currentDate.startOf("month"),
        endDate: currentDate.endOf("month"),
      };
  }
}

function getCellMinWidthForDays(daysDiff: number): string {
  if (daysDiff <= DAY_THRESHOLDS.week) return "40px";
  if (daysDiff <= DAY_THRESHOLDS.month) return "20px";
  if (daysDiff <= DAY_THRESHOLDS.twomonths) return "15px";
  if (daysDiff <= DAY_THRESHOLDS.extended) return "10px";
  return "8px";
}
