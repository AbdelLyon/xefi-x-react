import { PlanningProps, GenericDate } from './types/planning.types';
/**
 * Planning Component - Ultra-generic planning system
 *
 * A complete planning solution with:
 * - Configurable toolbar with filters, import/export
 * - Responsive sidebar with groups and users
 * - Interactive header with navigation
 * - Customizable planning grid
 * - Legend system
 *
 * @example
 * ```tsx
 * <Planning<GroupData, UserData, ItemData, Dayjs>
 *   groups={groups}
 *   items={items}
 *   periodDays={periodDays}
 *   headerTitle="Planning - Janvier 2024"
 *   viewMode="month"
 *   toolbar={{
 *     enabled: true,
 *     filters: [
 *       { key: "status", label: "Statut", type: "select", options: [...] }
 *     ],
 *     importExport: { enabled: true, formats: ["excel", "csv"] }
 *   }}
 *   sidebar={{
 *     enabled: true,
 *     tabs: [{ key: "teams", label: "Équipes" }]
 *   }}
 *   legend={{
 *     enabled: true,
 *     items: [{ id: "vacation", label: "Congés", color: "#3b82f6" }]
 *   }}
 * />
 * ```
 */
export declare const Planning: <TGroupData = Record<string, never>, TUserData = Record<string, never>, TItemData = Record<string, never>, TDate = GenericDate>({ groups, items, periodDays, viewMode, viewModes, onViewModeChange, headerTitle, onNavigatePrevious, onNavigateNext, showNavigation, toolbar, sidebar, legend, isLoading, loadingSkeleton, expandedGroups, onGroupToggle, hasMore, isLoadingMore, onLoadMore, renderSidebarUser, renderSidebarGroup, renderHeaderCell, renderBodyCell, renderItem, cellMinWidth, className, sidebarClassName, headerClassName, bodyClassName, toolbarClassName, onItemClick, onCellClick, onUserClick, ariaLabel, ariaDescription, }: PlanningProps<TGroupData, TUserData, TItemData, TDate>) => import("react/jsx-runtime").JSX.Element;
