"use client"

import { useCallback, useEffect, useState } from "react"

import type {
  PlanningProps,
  ActiveFilter,
  GenericDate,
} from "./types/planning.types"
import { Header } from "./components/Header"
import { Sidebar } from "./components/Sidebar"
import { PlanningBody } from "./components/PlanningBody"
import { Toolbar } from "./components/Toolbar"
import { Legend } from "./components/Legend"
import { mergeTailwindClasses } from "@/utils"

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
export const Planning = <
  TGroupData = Record<string, never>,
  TUserData = Record<string, never>,
  TItemData = Record<string, never>,
  TDate = GenericDate,
>({
  // Data
  groups,
  items,
  periodDays,

  // View configuration
  viewMode = "month",
  viewModes = [
    { key: "week", label: "Semaine" },
    { key: "month", label: "Mois" },
    { key: "twomonths", label: "2 Mois" },
  ],
  onViewModeChange,

  // Navigation
  headerTitle,
  onNavigatePrevious,
  onNavigateNext,
  showNavigation = true,

  // Toolbar
  toolbar = { enabled: true },

  // Sidebar
  sidebar = { enabled: true },

  // Legend
  legend,

  // Loading states
  isLoading = false,
  loadingSkeleton,

  // Group management
  expandedGroups = {},
  onGroupToggle,

  // Infinite scroll
  hasMore = false,
  isLoadingMore = false,
  onLoadMore,

  // Custom renderers
  renderSidebarUser,
  renderSidebarGroup,
  renderHeaderCell,
  renderBodyCell,
  renderItem,

  // Styling
  cellMinWidth = "20px",
  className = "",
  sidebarClassName = "",
  headerClassName = "",
  bodyClassName = "",
  toolbarClassName = "",

  // Events
  onItemClick,
  onCellClick,
  onUserClick,

  // Accessibility
  ariaLabel = "Planning",
  ariaDescription = "Grille de planning interactive",
}: PlanningProps<TGroupData, TUserData, TItemData, TDate>) => {
  // Internal state
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([])
  const [hoveredUser] = useState<string>()
  const [hoveredDay] = useState<string>()
  const [selectedTab, setSelectedTab] = useState(
    sidebar?.tabs?.[0]?.key || "default"
  )

  // Handle filter changes
  const handleFilterChange = useCallback(
    (key: string, value: string | string[] | boolean | null) => {
      setActiveFilters((prev) => {
        const existing = prev.find((f) => f.key === key)

        if (value === null || value === undefined || value === "") {
          return prev.filter((f) => f.key !== key)
        }

        const filter = toolbar?.filters?.find((f) => f.key === key)
        if (!filter) {
          return prev
        }

        const displayValue = Array.isArray(value)
          ? `${value.length} sélectionné${value.length > 1 ? "s" : ""}`
          : typeof value === "object" && value !== null
            ? JSON.stringify(value)
            : String(value)

        const newFilter: ActiveFilter = {
          key,
          label: filter.label,
          value,
          displayValue,
        }

        if (existing) {
          return prev.map((f) => (f.key === key ? newFilter : f))
        } else {
          return [...prev, newFilter]
        }
      })
    },
    [toolbar?.filters]
  )

  const handleFilterClear = useCallback((key: string) => {
    setActiveFilters((prev) => prev.filter((f) => f.key !== key))
  }, [])

  const handleFiltersClearAll = useCallback(() => {
    setActiveFilters([])
  }, [])

  // Handle tab change
  const handleTabChange = useCallback((tabKey: string) => {
    setSelectedTab(tabKey)
  }, [])

  // Auto-expand first group if none are expanded
  useEffect(() => {
    if (groups.length > 0 && Object.keys(expandedGroups).length === 0) {
      const firstGroup = groups[0]
      if (firstGroup && onGroupToggle) {
        onGroupToggle(firstGroup.id)
      }
    }
  }, [groups, expandedGroups, onGroupToggle])

  // Loading skeleton
  if (isLoading && loadingSkeleton) {
    return (
      <div
        className={mergeTailwindClasses(
          "flex w-full flex-col bg-background text-foreground",
          className
        )}
      >
        {loadingSkeleton}
      </div>
    )
  }

  return (
    <div
      className={mergeTailwindClasses(
        "flex w-full flex-col bg-background text-foreground",
        className
      )}
      role="application"
      aria-label={ariaLabel}
      aria-description={ariaDescription}
    >
      {/* Toolbar */}
      {toolbar?.enabled && (
        <Toolbar
          className={toolbarClassName}
          enabled={toolbar.enabled}
          filters={toolbar.filters}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          onFilterClear={handleFilterClear}
          onFiltersClearAll={handleFiltersClearAll}
          viewMode={viewMode}
          viewModes={viewModes}
          onViewModeChange={onViewModeChange}
          showToday={toolbar.showToday}
          onTodayClick={toolbar.onTodayClick}
          actions={toolbar.actions}
          importExport={toolbar.importExport}
          isLoading={isLoading}
        />
      )}

      {/* Main planning container */}
      <div className="flex-1 overflow-hidden rounded-lg border border-border bg-background">
        <div className="flex h-[630px]">
          {/* Sidebar */}
          {sidebar?.enabled && (
            <Sidebar<TGroupData, TUserData>
              className={sidebarClassName}
              enabled={sidebar.enabled}
              width={sidebar.width}
              groups={groups}
              tabs={sidebar.tabs}
              selectedTab={selectedTab}
              onTabChange={handleTabChange}
              expandedGroups={expandedGroups}
              onGroupToggle={onGroupToggle}
              showBalances={sidebar.showBalances}
              showUserActions={sidebar.showUserActions}
              isLoading={isLoading}
              hasMore={hasMore}
              isLoadingMore={isLoadingMore}
              onLoadMore={onLoadMore}
              renderUser={renderSidebarUser}
              renderGroup={renderSidebarGroup}
              hoveredUser={hoveredUser}
            />
          )}

          {/* Main content area */}
          <div className="relative flex flex-1 flex-col overflow-hidden">
            {/* Header */}
            <Header<TDate>
              className={headerClassName}
              periodDays={periodDays}
              title={headerTitle}
              onNavigatePrevious={onNavigatePrevious}
              onNavigateNext={onNavigateNext}
              showNavigation={showNavigation}
              cellMinWidth={cellMinWidth}
              isLoading={isLoading}
              renderDay={renderHeaderCell}
            />

            {/* Body */}
            <div className="flex-1 overflow-auto">
              <PlanningBody<TGroupData, TUserData, TItemData, TDate>
                className={bodyClassName}
                groups={groups}
                items={items}
                periodDays={periodDays}
                expandedGroups={expandedGroups}
                cellMinWidth={cellMinWidth}
                isLoading={isLoading}
                onItemClick={onItemClick}
                onCellClick={onCellClick}
                onUserClick={onUserClick}
                renderCell={renderBodyCell}
                renderItem={renderItem}
                hoveredUser={hoveredUser}
                hoveredDay={hoveredDay}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      {legend?.enabled && (
        <div className="mt-4">
          <Legend config={legend} compact={true} position="top" />
        </div>
      )}
    </div>
  )
}
