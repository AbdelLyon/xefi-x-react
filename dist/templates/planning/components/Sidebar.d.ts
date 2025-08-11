import { PlanningGroup, PlanningUser, SidebarTab, ToolbarAction } from '../types/planning.types';
interface SidebarProps<TGroupData = Record<string, never>, TUserData = Record<string, never>> {
    enabled?: boolean;
    width?: number;
    className?: string;
    groups: PlanningGroup<TGroupData, TUserData>[];
    tabs?: SidebarTab[];
    selectedTab?: string;
    onTabChange?: (tabKey: string) => void;
    expandedGroups?: Record<string, boolean>;
    onGroupToggle?: (groupId: string) => void;
    userActions?: ToolbarAction[];
    showUserActions?: boolean;
    onUserAction?: (action: ToolbarAction, user: PlanningUser<TUserData>) => void;
    isLoading?: boolean;
    hasMore?: boolean;
    isLoadingMore?: boolean;
    onLoadMore?: () => void;
    showBalances?: boolean;
    onToggleBalances?: () => void;
    showUserCount?: boolean;
    renderUser?: (user: PlanningUser<TUserData>, showDetails?: boolean, actions?: ToolbarAction[]) => React.ReactNode;
    renderGroup?: (group: PlanningGroup<TGroupData, TUserData>, isExpanded: boolean, onToggle: () => void) => React.ReactNode;
    renderHeader?: () => React.ReactNode;
    hoveredUser?: string;
}
export declare const Sidebar: <TGroupData = Record<string, never>, TUserData = Record<string, never>>({ enabled, width, className, groups, tabs, selectedTab, onTabChange, expandedGroups, onGroupToggle, userActions, showUserActions, onUserAction, isLoading, hasMore, isLoadingMore, onLoadMore, showBalances, onToggleBalances, showUserCount, renderUser, renderGroup, renderHeader, }: SidebarProps<TGroupData, TUserData>) => import("react/jsx-runtime").JSX.Element | null;
export {};
