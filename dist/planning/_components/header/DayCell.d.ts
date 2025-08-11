import { default as dayjs } from 'dayjs';
import { default as React } from 'react';
interface DayCellProps {
    day: dayjs.Dayjs;
    index: number;
    cellMinWidth: string;
    type: "number" | "name";
}
export declare const DayCell: React.FC<DayCellProps>;
export {};
