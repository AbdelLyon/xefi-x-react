"use client"

import type { ReactNode } from "react"
import { useCallback, useState } from "react"

// Generic date type - can be Dayjs, Date, string, etc.
type GenericDate = {
  format: (format: string) => string
  toDate: () => Date
}

// Generic interfaces for the planning template
export interface PlanningDay<T = GenericDate> {
  date: T
  isWeekend?: boolean
  isHoliday?: boolean
  holidayName?: string
}

export interface PlanningItem<TData = unknown> {
  id: string
  user_id: string
  start_date: string
  end_date: string
  data: TData
  color?: string
  title?: string
}

export interface PlanningUser<TUserData = unknown> {
  id: string
  name: string
  data: TUserData
}

export interface PlanningGroup<TGroupData = unknown, TUserData = unknown> {
  id: string
  name: string
  data: TGroupData
  users: PlanningUser<TUserData>[]
}

export interface PlanningTemplateProps<
  TGroupData = unknown,
  TUserData = unknown,
  TItemData = unknown,
  TDateType = GenericDate,
> {
  // Data
  groups: PlanningGroup<TGroupData, TUserData>[]
  items: PlanningItem<TItemData>[]
  periodDays: PlanningDay<TDateType>[]

  // Header configuration
  headerTitle: string
  onNavigatePrevious?: () => void
  onNavigateNext?: () => void
  showNavigation?: boolean

  // Sidebar configuration
  sidebarWidth?: number
  showSidebar?: boolean
  sidebarTabs?: Array<{
    key: string
    label: string
  }>
  defaultSelectedTab?: string
  onTabChange?: (tabKey: string) => void

  // Custom renderers
  renderSidebarUser?: (
    user: PlanningUser<TUserData>,
    showDetails?: boolean
  ) => ReactNode
  renderSidebarGroup?: (
    group: PlanningGroup<TGroupData, TUserData>,
    isExpanded: boolean,
    onToggle: () => void
  ) => ReactNode
  renderHeaderCell?: (day: PlanningDay<TDateType>, index: number) => ReactNode
  renderBodyCell?: (
    user: PlanningUser<TUserData>,
    day: PlanningDay<TDateType>,
    items: PlanningItem<TItemData>[]
  ) => ReactNode
  renderSidebarHeader?: () => ReactNode

  // Styling
  cellMinWidth?: string
  className?: string
  sidebarClassName?: string
  headerClassName?: string
  bodyClassName?: string

  // Loading state
  isLoading?: boolean
  loadingSkeleton?: ReactNode

  // Expand/collapse state
  expandedGroups?: Record<string, boolean>
  onGroupToggle?: (groupId: string) => void

  // Additional actions
  onLoadMore?: () => void
  hasMore?: boolean
  isLoadingMore?: boolean
}

export const PlanningTemplate = <
  TGroupData = unknown,
  TUserData = unknown,
  TItemData = unknown,
  TDateType = GenericDate,
>({
  groups,
  items,
  periodDays,
  headerTitle,
  onNavigatePrevious,
  onNavigateNext,
  showNavigation = true,
  sidebarWidth = 240,
  showSidebar = true,
  sidebarTabs = [],
  defaultSelectedTab,
  onTabChange,
  renderSidebarUser,
  renderSidebarGroup,
  renderHeaderCell,
  renderBodyCell,
  renderSidebarHeader,
  cellMinWidth = "20px",
  className = "",
  sidebarClassName = "",
  headerClassName = "",
  bodyClassName = "",
  isLoading = false,
  loadingSkeleton,
  expandedGroups = {},
  onGroupToggle,
  onLoadMore,
  hasMore = false,
  isLoadingMore = false,
}: PlanningTemplateProps<TGroupData, TUserData, TItemData, TDateType>) => {
  const [selectedTab, setSelectedTab] = useState(
    defaultSelectedTab || sidebarTabs[0]?.key || ""
  )

  const handleTabChange = useCallback(
    (tabKey: string) => {
      setSelectedTab(tabKey)
      onTabChange?.(tabKey)
    },
    [onTabChange]
  )

  const handleGroupToggle = useCallback(
    (groupId: string) => {
      onGroupToggle?.(groupId)
    },
    [onGroupToggle]
  )

  const getItemsForUserAndDay = useCallback(
    (userId: string, day: PlanningDay<TDateType>) => {
      return items.filter((item) => {
        // Filter by user first
        if (item.user_id !== userId) {
          return false
        }

        // Then filter by date range
        const itemStart = new Date(item.start_date)
        const itemEnd = new Date(item.end_date)
        const currentDate = (day.date as GenericDate).toDate()

        return currentDate >= itemStart && currentDate <= itemEnd
      })
    },
    [items]
  )

  const defaultHeaderCell = useCallback(
    (day: PlanningDay<TDateType>, index: number) => (
      <div
        key={`header-${index}`}
        className="flex h-20 min-w-[var(--cell-width)] flex-col items-center justify-center border-r border-border/20 bg-background p-1 text-xs"
        style={{ "--cell-width": cellMinWidth } as React.CSSProperties}
      >
        <div className="font-medium">
          {(day.date as GenericDate).format("DD")}
        </div>
        <div className="text-foreground-500">
          {(day.date as GenericDate).format("ddd")}
        </div>
        {day.isHoliday && (
          <div
            className="mt-1 h-1 w-4 rounded bg-primary"
            title={day.holidayName}
          />
        )}
      </div>
    ),
    [cellMinWidth]
  )

  const defaultBodyCell = useCallback(
    (
      user: PlanningUser<TUserData>,
      day: PlanningDay<TDateType>,
      cellItems: PlanningItem<TItemData>[]
    ) => (
      <div
        key={`cell-${user.id}-${(day.date as GenericDate).format("YYYY-MM-DD")}`}
        className="flex min-h-[40px] min-w-[var(--cell-width)] items-center justify-center border-r border-border/20 bg-background p-1"
        style={{ "--cell-width": cellMinWidth } as React.CSSProperties}
      >
        {cellItems.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {cellItems.map((item, idx) => (
              <div
                key={`item-${item.id}-${idx}`}
                className="size-2 rounded-full"
                style={{ backgroundColor: item.color || "#3b82f6" }}
                title={item.title}
              />
            ))}
          </div>
        )}
      </div>
    ),
    [cellMinWidth]
  )

  const defaultSidebarUser = useCallback(
    (user: PlanningUser<TUserData>) => (
      <div className="flex h-10 items-center px-4 py-2 text-sm">
        {user.name}
      </div>
    ),
    []
  )

  const defaultSidebarGroup = useCallback(
    (
      group: PlanningGroup<TGroupData, TUserData>,
      isExpanded: boolean,
      onToggle: () => void
    ) => (
      <div>
        <button
          onClick={onToggle}
          className="flex w-full items-center justify-between px-4 py-2 text-left font-medium hover:bg-foreground-100"
        >
          <span>{group.name}</span>
          <span
            className={`transform transition-transform ${isExpanded ? "rotate-90" : ""}`}
          >
            →
          </span>
        </button>
        {isExpanded && (
          <div className="ml-4 border-l border-border/20">
            {group.users.map((user) => (
              <div key={user.id}>
                {(renderSidebarUser || defaultSidebarUser)(user)}
              </div>
            ))}
          </div>
        )}
      </div>
    ),
    [renderSidebarUser, defaultSidebarUser]
  )

  if (isLoading && loadingSkeleton) {
    return <div className={className}>{loadingSkeleton}</div>
  }

  return (
    <div
      className={`flex w-full flex-col bg-background text-foreground ${className}`}
    >
      {/* Header with navigation */}
      {showNavigation && (
        <div
          className={`flex items-center justify-between border-b border-border px-4 py-2 ${headerClassName}`}
        >
          <button
            onClick={onNavigatePrevious}
            disabled={!onNavigatePrevious}
            className="rounded border border-border px-3 py-1 text-sm hover:bg-foreground-100 disabled:opacity-50"
          >
            ←
          </button>
          <h2 className="font-medium">{headerTitle}</h2>
          <button
            onClick={onNavigateNext}
            disabled={!onNavigateNext}
            className="rounded border border-border px-3 py-1 text-sm hover:bg-foreground-100 disabled:opacity-50"
          >
            →
          </button>
        </div>
      )}

      {/* Main content container */}
      <div className="h-[630px] overflow-y-auto rounded-lg border border-border">
        <div className="flex">
          {/* Sidebar */}
          {showSidebar && (
            <div
              className={`flex flex-col bg-background ${sidebarClassName}`}
              style={{ width: sidebarWidth }}
            >
              {/* Sidebar header with tabs */}
              <div className="sticky top-0 z-40 border-b border-border bg-background">
                {renderSidebarHeader && renderSidebarHeader()}
                {sidebarTabs.length > 0 && (
                  <div className="flex">
                    {sidebarTabs.map((tab) => (
                      <button
                        key={tab.key}
                        onClick={() => handleTabChange(tab.key)}
                        className={`flex-1 px-4 py-2 text-sm ${
                          selectedTab === tab.key
                            ? "bg-primary text-primary-foreground"
                            : "bg-background hover:bg-foreground-100"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Sidebar content */}
              <div className="flex-1 overflow-auto">
                {isLoading ? (
                  <div className="p-4">Chargement...</div>
                ) : (
                  <>
                    {groups.map((group) => (
                      <div key={group.id}>
                        {(renderSidebarGroup || defaultSidebarGroup)(
                          group,
                          expandedGroups[group.id] || false,
                          () => handleGroupToggle(group.id)
                        )}
                      </div>
                    ))}

                    {/* Load more button */}
                    {hasMore && !isLoadingMore && onLoadMore && (
                      <div className="flex justify-center p-4">
                        <button
                          onClick={onLoadMore}
                          className="rounded bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
                        >
                          Charger plus
                        </button>
                      </div>
                    )}

                    {isLoadingMore && (
                      <div className="flex justify-center p-4">
                        <div className="text-sm text-foreground-500">
                          Chargement...
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          {/* Main planning area */}
          <div className="relative flex-1 rounded-t-lg">
            {/* Planning header */}
            <div className="sticky top-0 z-40 bg-background">
              <div
                className={`grid ${headerClassName}`}
                style={{
                  gridTemplateColumns: `repeat(${periodDays.length}, minmax(${cellMinWidth}, 1fr))`,
                }}
              >
                {periodDays.map((day, index) =>
                  (renderHeaderCell || defaultHeaderCell)(day, index)
                )}
              </div>
            </div>

            {/* Planning body */}
            <div className={`overflow-x-auto ${bodyClassName}`}>
              {isLoading ? (
                <div className="p-4">Chargement des données...</div>
              ) : (
                <div role="region" aria-label="Planning grid">
                  {groups.map(
                    (group) =>
                      (expandedGroups[group.id] || false) &&
                      group.users.map((user) => (
                        <div
                          key={`user-row-${user.id}`}
                          className="flex border-b border-border/20"
                        >
                          <div
                            className="grid"
                            style={{
                              gridTemplateColumns: `repeat(${periodDays.length}, minmax(${cellMinWidth}, 1fr))`,
                            }}
                          >
                            {periodDays.map((day) => {
                              const cellItems = getItemsForUserAndDay(
                                user.id,
                                day
                              )
                              return (renderBodyCell || defaultBodyCell)(
                                user,
                                day,
                                cellItems
                              )
                            })}
                          </div>
                        </div>
                      ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
