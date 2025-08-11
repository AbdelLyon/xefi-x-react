import { default as dayjs } from 'dayjs';
import { default as React } from 'react';
import { Leave } from '../../../models/Leave';
import { User } from '../../../models/User';
type CellSize = {
    height: string;
    width: string;
};
interface UserRowProps {
    user: User;
    groupId: string | number;
    userIndex: number;
    periodDays: dayjs.Dayjs[];
    leaves: Leave[];
    cellSize: CellSize;
}
export declare const UserRow: React.FC<UserRowProps>;
export {};
