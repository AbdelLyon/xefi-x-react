import { PlanningDay, PlanningGroup, PlanningItem, PlanningUser, GenericDate } from '../types/planning.types';
interface PlanningBodyProps<TGroupData = Record<string, never>, TUserData = Record<string, never>, TItemData = Record<string, never>, TDate = GenericDate> {
    groups: PlanningGroup<TGroupData, TUserData>[];
    items: PlanningItem<TItemData>[];
    periodDays: PlanningDay<TDate>[];
    expandedGroups?: Record<string, boolean>;
    cellMinWidth?: string;
    isLoading?: boolean;
    onItemClick?: (item: PlanningItem<TItemData>) => void;
    onCellClick?: (user: PlanningUser<TUserData>, day: PlanningDay<TDate>) => void;
    onUserClick?: (user: PlanningUser<TUserData>) => void;
    renderCell?: (user: PlanningUser<TUserData>, day: PlanningDay<TDate>, items: PlanningItem<TItemData>[]) => React.ReactNode;
    renderItem?: (item: PlanningItem<TItemData>, user: PlanningUser<TUserData>, day: PlanningDay<TDate>) => React.ReactNode;
    className?: string;
    hoveredUser?: string;
    hoveredDay?: string;
}
export declare const PlanningBody: <TGroupData = Record<string, never>, TUserData = Record<string, never>, TItemData = Record<string, never>, TDate = GenericDate>({ groups, items, periodDays, expandedGroups, cellMinWidth, isLoading, onItemClick, onCellClick, onUserClick: _onUserClick, renderCell, renderItem, className, hoveredUser, hoveredDay }: PlanningBodyProps<TGroupData, TUserData, TItemData, TDate>) => import("react/jsx-runtime").JSX.Element;
export {};
