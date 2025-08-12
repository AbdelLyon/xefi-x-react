import { ReactNode } from 'react';
export type GenericDate = {
    format: (format: string) => string;
    toDate: () => Date;
    isSame?: <T>(date: T, unit?: string) => boolean;
    isBetween?: <T>(start: T, end: T, unit?: string, inclusivity?: string) => boolean;
};
export interface PlanningDay<TDate = GenericDate> {
    date: TDate;
    isWeekend?: boolean;
    isHoliday?: boolean;
    holidayName?: string;
    isToday?: boolean;
}
export interface PlanningItem<TData = Record<string, never>> {
    id: string;
    user_id: string;
    start_date: string;
    end_date: string;
    data: TData;
    color?: string;
    title?: string;
    duration?: number;
    status?: string;
}
export interface PlanningUser<TUserData = Record<string, never>> {
    id: string;
    name: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    avatar?: string;
    data: TUserData;
}
export interface PlanningGroup<TGroupData = Record<string, never>, TUserData = Record<string, never>> {
    id: string;
    name: string;
    count?: number;
    expanded?: boolean;
    data: TGroupData;
    users: PlanningUser<TUserData>[];
}
export type ViewMode = "day" | "week" | "month" | "twomonths" | "quarter";
export interface ViewModeConfig {
    key: ViewMode;
    label: string;
    cellWidth?: string;
    disabled?: boolean;
}
export interface FilterOption<T = string> {
    key: string;
    label: string;
    value: T;
    color?: string;
}
export interface FilterConfig<T = string> {
    key: string;
    label: string;
    type: "select" | "multiselect" | "daterange" | "search" | "toggle";
    options?: FilterOption<T>[];
    placeholder?: string;
    value?: T;
    onChange?: (value: T) => void;
}
export interface ActiveFilter {
    key: string;
    label: string;
    value: string | string[] | boolean | null;
    displayValue?: string;
}
export interface ToolbarAction {
    key: string;
    label: string;
    icon?: ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    variant?: "default" | "primary" | "secondary" | "danger";
}
export interface ImportExportConfig {
    enabled: boolean;
    formats?: string[];
    onImport?: (file: File) => void | Promise<void>;
    onExport?: (format: string) => void | Promise<void>;
}
export interface LegendItem {
    id: string;
    label: string;
    color: string;
    count?: number;
    visible?: boolean;
}
export interface LegendConfig {
    enabled: boolean;
    toggleable?: boolean;
    items: LegendItem[];
    onToggle?: (itemId: string, visible: boolean) => void;
}
export interface SidebarTab {
    key: string;
    label: string;
    icon?: ReactNode;
    count?: number;
}
export interface SidebarConfig {
    enabled: boolean;
    width?: number;
    tabs?: SidebarTab[];
    defaultTab?: string;
    showBalances?: boolean;
    showUserActions?: boolean;
}
export interface PlanningConfig<TGroupData = Record<string, never>, TUserData = Record<string, never>, TItemData = Record<string, never>, TDate = GenericDate> {
    groups: PlanningGroup<TGroupData, TUserData>[];
    items: PlanningItem<TItemData>[];
    periodDays: PlanningDay<TDate>[];
    viewMode: ViewMode;
    viewModes?: ViewModeConfig[];
    onViewModeChange?: (mode: ViewMode) => void;
    headerTitle: string;
    onNavigatePrevious?: () => void;
    onNavigateNext?: () => void;
    showNavigation?: boolean;
    toolbar?: {
        enabled: boolean;
        filters?: FilterConfig[];
        actions?: ToolbarAction[];
        importExport?: ImportExportConfig;
        showToday?: boolean;
        onTodayClick?: () => void;
    };
    sidebar?: SidebarConfig;
    legend?: LegendConfig;
    isLoading?: boolean;
    loadingSkeleton?: ReactNode;
    expandedGroups?: Record<string, boolean>;
    onGroupToggle?: (groupId: string) => void;
    hasMore?: boolean;
    isLoadingMore?: boolean;
    onLoadMore?: () => void;
    renderSidebarUser?: (user: PlanningUser<TUserData>, showDetails?: boolean, actions?: ToolbarAction[]) => ReactNode;
    renderSidebarGroup?: (group: PlanningGroup<TGroupData, TUserData>, isExpanded: boolean, onToggle: () => void) => ReactNode;
    renderHeaderCell?: (day: PlanningDay<TDate>, index: number) => ReactNode;
    renderBodyCell?: (user: PlanningUser<TUserData>, day: PlanningDay<TDate>, items: PlanningItem<TItemData>[]) => ReactNode;
    renderItem?: (item: PlanningItem<TItemData>, user: PlanningUser<TUserData>, day: PlanningDay<TDate>) => ReactNode;
    cellMinWidth?: string;
    className?: string;
    sidebarClassName?: string;
    headerClassName?: string;
    bodyClassName?: string;
    toolbarClassName?: string;
    onItemClick?: (item: PlanningItem<TItemData>) => void;
    onCellClick?: (user: PlanningUser<TUserData>, day: PlanningDay<TDate>) => void;
    onUserClick?: (user: PlanningUser<TUserData>) => void;
    ariaLabel?: string;
    ariaDescription?: string;
}
export type PlanningProps<TGroupData = Record<string, never>, TUserData = Record<string, never>, TItemData = Record<string, never>, TDate = GenericDate> = PlanningConfig<TGroupData, TUserData, TItemData, TDate>;
