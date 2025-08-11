import { Dayjs } from 'dayjs';
import { default as React } from 'react';
import { Leave } from '../../../models/Leave';
import { Group } from '../../../models/User';
interface PlanningBodyProps {
    currentGroups: Group[];
    isLoading?: boolean;
    leaves: Leave[];
    periodDays: Dayjs[];
}
export declare const PlanningBody: React.FC<PlanningBodyProps>;
export {};
