import { default as dayjs } from 'dayjs';
import { default as React } from 'react';
import { SchoolHolidayZonesSkeleton } from './SchoolHolidayZonesSkeleton';
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
    getSchoolHolidayAtThisDate: (date: dayjs.Dayjs, zone: string) => SchoolHoliday | undefined;
    isLoading?: boolean;
}
declare const HolidayIndicatorsSkeleton: ({ periodDays, zonesCount, }: {
    periodDays: number;
    zonesCount: number;
}) => import("react/jsx-runtime").JSX.Element;
export declare const HolidayIndicators: React.FC<HolidayIndicatorsProps>;
export { SchoolHolidayZonesSkeleton, HolidayIndicatorsSkeleton };
