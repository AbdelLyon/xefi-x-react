import { PlanningDay, GenericDate } from '../types/planning.types';
interface HeaderProps<TDate = GenericDate> {
    periodDays: PlanningDay<TDate>[];
    title: string;
    onNavigatePrevious?: () => void;
    onNavigateNext?: () => void;
    showNavigation?: boolean;
    cellMinWidth?: string;
    isLoading?: boolean;
    className?: string;
    renderDay?: (day: PlanningDay<TDate>, index: number) => React.ReactNode;
    showHolidayIndicators?: boolean;
    holidayZones?: Array<{
        label: string;
        color: string;
    }>;
}
export declare const Header: <TDate = GenericDate>({ periodDays, title, onNavigatePrevious, onNavigateNext, showNavigation, cellMinWidth, isLoading, className, renderDay, showHolidayIndicators, holidayZones, }: HeaderProps<TDate>) => import("react/jsx-runtime").JSX.Element;
export {};
