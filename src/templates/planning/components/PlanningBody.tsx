import { Skeleton } from "@/skeleton"
import { mergeTailwindClasses } from "@/utils"
import React, { useCallback, useMemo } from "react"

import type {
  PlanningDay,
  PlanningGroup,
  PlanningItem,
  PlanningUser,
  GenericDate,
} from "../types/planning.types"

interface PlanningBodyProps<
  TGroupData = Record<string, never>,
  TUserData = Record<string, never>,
  TItemData = Record<string, never>,
  TDate = GenericDate,
> {
  // Data
  groups: PlanningGroup<TGroupData, TUserData>[]
  items: PlanningItem<TItemData>[]
  periodDays: PlanningDay<TDate>[]

  // Display options
  expandedGroups?: Record<string, boolean>
  cellMinWidth?: string

  // Loading
  isLoading?: boolean

  // Events
  onItemClick?: (item: PlanningItem<TItemData>) => void
  onCellClick?: (user: PlanningUser<TUserData>, day: PlanningDay<TDate>) => void
  onUserClick?: (user: PlanningUser<TUserData>) => void

  // Custom renderers
  renderCell?: (
    user: PlanningUser<TUserData>,
    day: PlanningDay<TDate>,
    items: PlanningItem<TItemData>[]
  ) => React.ReactNode
  renderItem?: (
    item: PlanningItem<TItemData>,
    user: PlanningUser<TUserData>,
    day: PlanningDay<TDate>
  ) => React.ReactNode

  // Styling
  className?: string
  hoveredUser?: string
  hoveredDay?: string
}

export const PlanningBody = <
  TGroupData = Record<string, never>,
  TUserData = Record<string, never>,
  TItemData = Record<string, never>,
  TDate = GenericDate,
>({
  groups,
  items,
  periodDays,
  expandedGroups = {},
  cellMinWidth = "20px",
  isLoading = false,
  onItemClick,
  onCellClick,
  onUserClick: _onUserClick,
  renderCell,
  renderItem,
  className = "",
  hoveredUser,
  hoveredDay,
}: PlanningBodyProps<TGroupData, TUserData, TItemData, TDate>) => {
  // Get items for a specific user and day
  const getItemsForUserAndDay = useCallback(
    (userId: string, day: PlanningDay<TDate>) => {
      return items.filter((item) => {
        if (item.user_id !== userId) {
          return false
        }

        const itemStart = new Date(item.start_date)
        const itemEnd = new Date(item.end_date)
        const currentDate = (day.date as GenericDate).toDate()

        return currentDate >= itemStart && currentDate <= itemEnd
      })
    },
    [items]
  )

  // Default item renderer
  const defaultRenderItem = useCallback(
    (
      item: PlanningItem<TItemData>,
      user: PlanningUser<TUserData>,
      day: PlanningDay<TDate>
    ) => {
      const isStartDate =
        new Date(item.start_date).toDateString() ===
        (day.date as GenericDate).toDate().toDateString()
      const isEndDate =
        new Date(item.end_date).toDateString() ===
        (day.date as GenericDate).toDate().toDateString()

      return (
        <div
          key={item.id}
          className={mergeTailwindClasses(
            "absolute inset-0 flex cursor-pointer transition-all duration-200",
            "hover:z-10 hover:shadow-lg"
          )}
          onClick={() => onItemClick?.(item)}
          title={item.title}
        >
          {/* Main item bar */}
          <div
            className={mergeTailwindClasses(
              "flex-1 transition-all duration-300",
              item.duration === 0.5 ? "w-1/2" : "w-full"
            )}
            style={{
              backgroundColor: item.color || "#3b82f6",
              borderTopLeftRadius: isStartDate ? "4px" : "0",
              borderBottomLeftRadius: isStartDate ? "4px" : "0",
              borderTopRightRadius: isEndDate ? "4px" : "0",
              borderBottomRightRadius: isEndDate ? "4px" : "0",
            }}
          />

          {/* Status bar */}
          <div
            className="h-1/4 min-h-[3px] w-full transition-all duration-300"
            style={{
              backgroundColor:
                item.status === "approved" ? "#10b981" : "#f59e0b",
              borderBottomLeftRadius: isStartDate ? "4px" : "0",
              borderBottomRightRadius: isEndDate ? "4px" : "0",
            }}
          />
        </div>
      )
    },
    [onItemClick]
  )

  // Default cell renderer
  const defaultRenderCell = useCallback(
    (
      user: PlanningUser<TUserData>,
      day: PlanningDay<TDate>,
      cellItems: PlanningItem<TItemData>[]
    ) => {
      const date = day.date as GenericDate
      const isHighlighted = hoveredDay === date.format("YYYY-MM-DD")
      const isUserHovered = hoveredUser === user.id

      return (
        <div
          className={mergeTailwindClasses(
            "relative flex min-h-[40px] items-center justify-center",
            "border-r border-b border-border/20",
            "transition-colors duration-150",
            day.isWeekend && "bg-default-50 dark:bg-default-900/30",
            day.isHoliday && "bg-red-50 dark:bg-red-900/20",
            day.isToday && "bg-primary/5 border-primary/20",
            isHighlighted && "bg-default-100 dark:bg-default-800/50",
            isUserHovered && "bg-primary/10",
            "cursor-pointer hover:bg-default-100 dark:hover:bg-default-800/30"
          )}
          style={{ minWidth: cellMinWidth }}
          onClick={() => onCellClick?.(user, day)}
          title={`${user.name} - ${date.format("DD/MM/YYYY")}`}
        >
          {/* Today indicator */}
          {day.isToday && (
            <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-primary opacity-70" />
          )}

          {/* Items */}
          {cellItems.map((item) =>
            renderItem
              ? renderItem(item, user, day)
              : defaultRenderItem(item, user, day)
          )}

          {/* Empty state indicator */}
          {cellItems.length === 0 && day.isWeekend && (
            <div className="text-xs text-foreground-300">·</div>
          )}
        </div>
      )
    },
    [
      cellMinWidth,
      hoveredDay,
      hoveredUser,
      onCellClick,
      renderItem,
      defaultRenderItem,
    ]
  )

  // Loading skeleton
  const renderLoadingSkeleton = useMemo(
    () => (
      <div className="space-y-px">
        {Array.from({ length: 10 }, (_, rowIndex) => (
          <div key={rowIndex} className="flex">
            {Array.from(
              { length: Math.min(periodDays.length, 31) },
              (_, colIndex) => (
                <Skeleton
                  key={colIndex}
                  className="h-10 flex-1 border-r border-border last:border-r-0"
                  style={{ minWidth: cellMinWidth }}
                />
              )
            )}
          </div>
        ))}
      </div>
    ),
    [periodDays.length, cellMinWidth]
  )

  // Visible users based on expanded groups
  const visibleUsers = useMemo(() => {
    return groups.flatMap((group) =>
      expandedGroups[group.id] ? group.users : []
    )
  }, [groups, expandedGroups])

  if (isLoading) {
    return (
      <div className={mergeTailwindClasses("overflow-x-auto", className)}>
        {renderLoadingSkeleton}
      </div>
    )
  }

  if (visibleUsers.length === 0) {
    return (
      <div
        className={mergeTailwindClasses(
          "flex items-center justify-center py-16 text-sm text-foreground-500",
          className
        )}
      >
        {groups.length === 0
          ? "Aucun groupe disponible"
          : "Aucun groupe développé - cliquez sur un groupe pour voir les utilisateurs"}
      </div>
    )
  }

  if (periodDays.length === 0) {
    return (
      <div
        className={mergeTailwindClasses(
          "flex items-center justify-center py-16 text-sm text-foreground-500",
          className
        )}
      >
        Aucune période sélectionnée
      </div>
    )
  }

  return (
    <div className={mergeTailwindClasses("overflow-x-auto", className)}>
      <div
        className="min-w-full"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${periodDays.length}, minmax(${cellMinWidth}, 1fr))`,
        }}
      >
        {/* Render all user rows */}
        {visibleUsers.map((user) => (
          <React.Fragment key={user.id}>
            {periodDays.map((day, dayIndex) => {
              const cellItems = getItemsForUserAndDay(user.id, day)
              const cellKey = `${user.id}-${dayIndex}`

              return (
                <div key={cellKey}>
                  {renderCell
                    ? renderCell(user, day, cellItems)
                    : defaultRenderCell(user, day, cellItems)}
                </div>
              )
            })}
          </React.Fragment>
        ))}
      </div>

      {/* Footer info */}
      <div className="mt-2 flex justify-end px-4 py-2">
        <p className="text-xs text-foreground-500">
          Utilisateurs visibles: {visibleUsers.length} /{" "}
          {groups.reduce((total, group) => total + group.users.length, 0)}
        </p>
      </div>
    </div>
  )
}
