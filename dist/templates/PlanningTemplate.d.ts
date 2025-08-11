import { ReactNode } from 'react';
type GenericDate = {
    format: (format: string) => string;
    toDate: () => Date;
};
export interface PlanningDay<T = GenericDate> {
    date: T;
    isWeekend?: boolean;
    isHoliday?: boolean;
    holidayName?: string;
}
export interface PlanningItem<TData = unknown> {
    id: string;
    user_id: string;
    start_date: string;
    end_date: string;
    data: TData;
    color?: string;
    title?: string;
}
export interface PlanningUser<TUserData = unknown> {
    id: string;
    name: string;
    data: TUserData;
}
export interface PlanningGroup<TGroupData = unknown, TUserData = unknown> {
    id: string;
    name: string;
    data: TGroupData;
    users: PlanningUser<TUserData>[];
}
export interface PlanningTemplateProps<TGroupData = unknown, TUserData = unknown, TItemData = unknown, TDateType = GenericDate> {
    groups: PlanningGroup<TGroupData, TUserData>[];
    items: PlanningItem<TItemData>[];
    periodDays: PlanningDay<TDateType>[];
    headerTitle: string;
    onNavigatePrevious?: () => void;
    onNavigateNext?: () => void;
    showNavigation?: boolean;
    sidebarWidth?: number;
    showSidebar?: boolean;
    sidebarTabs?: Array<{
        key: string;
        label: string;
    }>;
    defaultSelectedTab?: string;
    onTabChange?: (tabKey: string) => void;
    renderSidebarUser?: (user: PlanningUser<TUserData>, showDetails?: boolean) => ReactNode;
    renderSidebarGroup?: (group: PlanningGroup<TGroupData, TUserData>, isExpanded: boolean, onToggle: () => void) => ReactNode;
    renderHeaderCell?: (day: PlanningDay<TDateType>, index: number) => ReactNode;
    renderBodyCell?: (user: PlanningUser<TUserData>, day: PlanningDay<TDateType>, items: PlanningItem<TItemData>[]) => ReactNode;
    renderSidebarHeader?: () => ReactNode;
    cellMinWidth?: string;
    className?: string;
    sidebarClassName?: string;
    headerClassName?: string;
    bodyClassName?: string;
    isLoading?: boolean;
    loadingSkeleton?: ReactNode;
    expandedGroups?: Record<string, boolean>;
    onGroupToggle?: (groupId: string) => void;
    onLoadMore?: () => void;
    hasMore?: boolean;
    isLoadingMore?: boolean;
}
export declare const PlanningTemplate: <TGroupData = unknown, TUserData = unknown, TItemData = unknown, TDateType = GenericDate>({ groups, items, periodDays, headerTitle, onNavigatePrevious, onNavigateNext, showNavigation, sidebarWidth, showSidebar, sidebarTabs, defaultSelectedTab, onTabChange, renderSidebarUser, renderSidebarGroup, renderHeaderCell, renderBodyCell, renderSidebarHeader, cellMinWidth, className, sidebarClassName, headerClassName, bodyClassName, isLoading, loadingSkeleton, expandedGroups, onGroupToggle, onLoadMore, hasMore, isLoadingMore, }: PlanningTemplateProps<TGroupData, TUserData, TItemData, TDateType>) => import("react/jsx-runtime").JSX.Element;
export {};
