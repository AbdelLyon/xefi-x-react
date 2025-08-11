import { default as React } from 'react';
import { User } from '../../../models/User';
interface GroupItemProps {
    id: string;
    name: string;
    users?: User[];
    isExpanded: boolean;
    onToggle: () => void;
    showBalances: boolean;
    getLeaveBalance: (userId: number, isLastYear: boolean) => number;
    getLeavesTaken: (userId: number) => number;
    isFetchingNextPage: boolean;
}
export declare const GroupItem: React.FC<GroupItemProps>;
export {};
