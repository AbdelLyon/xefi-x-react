import { default as dayjs } from 'dayjs';
import { Filter } from '../../services/types';
export declare const usePeriodDays: () => dayjs.Dayjs[];
export declare const useCellSize: (periodDays: dayjs.Dayjs[], viewMode: string, filters: Filter[]) => {
    readonly height: "h-8";
    readonly width: "min-w-[40px]";
} | {
    readonly height: "h-6";
    readonly width: "min-w-[20px]";
} | {
    readonly height: "h-5";
    readonly width: "min-w-[15px]";
} | {
    readonly height: "h-3";
    readonly width: "min-w-[8px]";
} | {
    readonly height: "h-4";
    readonly width: "min-w-[10px]";
};
