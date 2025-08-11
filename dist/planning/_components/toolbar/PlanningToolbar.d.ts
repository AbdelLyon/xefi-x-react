import { Dispatch, SetStateAction } from 'react';
import { LeaveType } from '../../../models/Leave';
interface PlanningToolbarProps {
    leaveTypes: LeaveType[];
    selectedTeams: Set<string>;
    setSelectedTeams: Dispatch<SetStateAction<Set<string>>>;
}
export declare const PlanningToolbar: ({ leaveTypes, selectedTeams, setSelectedTeams, }: PlanningToolbarProps) => import("react/jsx-runtime").JSX.Element;
export {};
