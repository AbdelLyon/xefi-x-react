import { default as React } from 'react';
import { User } from '../../../models/User';
interface UserItemProps {
    user: User;
    groupId: string;
    index: number;
    showBalances: boolean;
    getLeaveBalance: (userId: number, isLastYear: boolean) => number;
    getLeavesTaken: (userId: number) => number;
}
export declare const UserItem: React.FC<UserItemProps>;
export {};
