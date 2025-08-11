import { default as dayjs } from 'dayjs';
import { default as React } from 'react';
import { Leave } from '../../../models/Leave';
import { User } from '../../../models/User';
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
export declare const PlanningCell: React.FC<PlanningCellProps>;
export {};
