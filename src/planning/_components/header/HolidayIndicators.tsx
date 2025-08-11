"use client";

import { Chip } from "@xefi/x-react/chip";
import { mergeTailwindClasses } from "@xefi/x-react/utils";
import dayjs from "dayjs";
import React, { useMemo } from "react";

import { SchoolHolidayZonesSkeleton } from "./SchoolHolidayZonesSkeleton";

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

interface HolidayIndicatorsProps {
  periodDays: dayjs.Dayjs[];
  publicHolidays: PublicHoliday[];
  schoolHolidays: SchoolHoliday[];
  holidayZones: HolidayZone[];
  getPublicHolidayAtThisDate: (date: dayjs.Dayjs) => PublicHoliday | undefined;
  getSchoolHolidayAtThisDate: (
    date: dayjs.Dayjs,
    zone: string,
  ) => SchoolHoliday | undefined;
  isLoading?: boolean;
}

const HolidayIndicatorsSkeleton = ({
  periodDays,
  zonesCount,
}: {
  periodDays: number;
  zonesCount: number;
}) => {
  return (
    <SchoolHolidayZonesSkeleton
      periodDays={periodDays}
      zonesCount={zonesCount}
    />
  );
};

export const HolidayIndicators: React.FC<HolidayIndicatorsProps> = ({
  periodDays,
  holidayZones,
  getPublicHolidayAtThisDate,
  getSchoolHolidayAtThisDate,
  isLoading = false,
}) => {
  const schoolHolidayZones = useMemo(() => {
    if (isLoading) {
      return (
        <SchoolHolidayZonesSkeleton
          periodDays={periodDays.length}
          zonesCount={holidayZones.length || 3}
        />
      );
    }

    return holidayZones.map((zone) => (
      <div className="contents" key={`zone-${zone.label}`}>
        {periodDays.map((day, dayIndex) => {
          const schoolHoliday = getSchoolHolidayAtThisDate(day, zone.label);

          return (
            <div
              key={`zone-${zone.label}-day-${dayIndex}`}
              className={mergeTailwindClasses(
                "my-[1.5px] h-[2px] transition-all duration-200",
                schoolHoliday ? "shadow-sm" : "",
              )}
              style={{
                backgroundColor: schoolHoliday ? zone.color : "transparent",
                opacity: schoolHoliday ? 0.85 : 0,
              }}
              title={schoolHoliday?.name}
            />
          );
        })}
      </div>
    ));
  }, [periodDays, holidayZones, getSchoolHolidayAtThisDate, isLoading]);

  const publicHolidaysIndicators = useMemo(() => {
    return (
      <div className="contents">
        {periodDays.map((day) => {
          const publicHoliday = getPublicHolidayAtThisDate(day);

          return (
            <div
              key={`holiday-${day.format("YYYY-MM-DD")}`}
              className="flex items-center justify-center"
            >
              {publicHoliday && (
                <Chip
                  size="sm"
                  className="flex items-center justify-center rounded-full border border-border-200 bg-content1-200 text-[10px] font-bold shadow-sm backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:shadow active:scale-95"
                  classNames={{
                    dot: "bg-primary",
                  }}
                  title={`${publicHoliday.name} - ${day.format("DD/MM/YYYY")}`}
                  aria-label={`Jour férié: ${publicHoliday.name}`}
                >
                  F
                </Chip>
              )}
            </div>
          );
        })}
      </div>
    );
  }, [periodDays, getPublicHolidayAtThisDate, isLoading]);

  if (periodDays.length === 0) {
    return null;
  }

  return (
    <>
      {schoolHolidayZones}
      {publicHolidaysIndicators}
    </>
  );
};

export { SchoolHolidayZonesSkeleton, HolidayIndicatorsSkeleton };
