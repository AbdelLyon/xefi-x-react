import { default as dayjs } from 'dayjs';
import { default as React } from 'react';
import { Leave } from '../../../models/Leave';
import { User } from '../../../models/User';
type CellSize = {
    height: string;
    width: string;
};
type GroupWithUsers = {
    id: string | number;
    name?: string;
    label?: string;
    users: User[];
};
interface GroupRendererProps {
    groups: GroupWithUsers[];
    expandedState: Record<string, boolean>;
    periodDays: dayjs.Dayjs[];
    leaves: Leave[];
    cellSize: CellSize;
}
export declare const GroupRenderer: React.FC<GroupRendererProps>;
export {};
