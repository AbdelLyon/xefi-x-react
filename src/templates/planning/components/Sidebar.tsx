import { useCallback } from "react"

import type {
  PlanningGroup,
  PlanningUser,
  SidebarTab,
  ToolbarAction,
} from "../types/planning.types"
import { mergeTailwindClasses } from "@/utils"
import { Tooltip } from "@/tooltip"
import { IconChevronDown, IconEye, IconEyeClosed } from "@tabler/icons-react"
import { Skeleton } from "@/skeleton"
import { Tabs, type TabItem } from "@/tabs"

interface SidebarProps<
  TGroupData = Record<string, never>,
  TUserData = Record<string, never>,
> {
  // Core configuration
  enabled?: boolean
  width?: number
  className?: string

  // Data
  groups: PlanningGroup<TGroupData, TUserData>[]

  // Tabs
  tabs?: SidebarTab[]
  selectedTab?: string
  onTabChange?: (tabKey: string) => void

  // Group management
  expandedGroups?: Record<string, boolean>
  onGroupToggle?: (groupId: string) => void

  // User actions
  userActions?: ToolbarAction[]
  showUserActions?: boolean
  onUserAction?: (action: ToolbarAction, user: PlanningUser<TUserData>) => void

  // Loading and infinite scroll
  isLoading?: boolean
  hasMore?: boolean
  isLoadingMore?: boolean
  onLoadMore?: () => void

  // Additional features
  showBalances?: boolean
  onToggleBalances?: () => void
  showUserCount?: boolean

  // Custom renderers
  renderUser?: (
    user: PlanningUser<TUserData>,
    showDetails?: boolean,
    actions?: ToolbarAction[]
  ) => React.ReactNode
  renderGroup?: (
    group: PlanningGroup<TGroupData, TUserData>,
    isExpanded: boolean,
    onToggle: () => void
  ) => React.ReactNode
  renderHeader?: () => React.ReactNode

  // Hover state
  hoveredUser?: string
}

export const Sidebar = <
  TGroupData = Record<string, never>,
  TUserData = Record<string, never>,
>({
  enabled = true,
  width = 240,
  className = "",
  groups,
  tabs = [],
  selectedTab,
  onTabChange,
  expandedGroups = {},
  onGroupToggle,
  userActions = [],
  showUserActions = false,
  onUserAction,
  isLoading = false,
  hasMore = false,
  isLoadingMore = false,
  onLoadMore,
  showBalances = false,
  onToggleBalances,
  showUserCount = true,
  renderUser,
  renderGroup,
  renderHeader,
}: SidebarProps<TGroupData, TUserData>) => {
  const handleGroupToggle = useCallback(
    (groupId: string) => {
      onGroupToggle?.(groupId)
    },
    [onGroupToggle]
  )

  const handleUserAction = useCallback(
    (action: ToolbarAction, user: PlanningUser<TUserData>) => {
      onUserAction?.(action, user)
    },
    [onUserAction]
  )

  const defaultRenderUser = useCallback(
    (
      user: PlanningUser<TUserData>,
      showDetails?: boolean,
      actions?: ToolbarAction[]
    ) => {
      const displayName =
        user.firstname && user.lastname
          ? `${user.firstname} ${user.lastname}`
          : user.name

      return (
        <div
          className={mergeTailwindClasses(
            "group flex items-center justify-between px-4 py-2",
            "hover:bg-default-100 dark:hover:bg-default-800/50",
            "border-b border-border/30 last:border-b-0",
            "transition-colors duration-150"
          )}
        >
          <div className="flex min-w-0 flex-1 items-center gap-3">
            {/* Avatar */}
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={displayName}
                className="size-8 rounded-full object-cover"
              />
            ) : (
              <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}

            {/* User info */}
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium text-foreground-800">
                {displayName}
              </div>
              {showDetails && user.email && (
                <div className="truncate text-xs text-foreground-500">
                  {user.email}
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          {showUserActions && actions && actions.length > 0 && (
            <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
              {actions.map((action) => (
                <Tooltip
                  key={action.key}
                  trigger={
                    <button
                      onClick={() => handleUserAction(action, user)}
                      disabled={action.disabled}
                      className={mergeTailwindClasses(
                        "flex items-center justify-center size-6 rounded transition-colors",
                        action.variant === "danger" &&
                          "hover:bg-danger/10 text-danger",
                        !action.variant &&
                          "hover:bg-default-200 dark:hover:bg-default-700",
                        action.disabled && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      {action.icon}
                    </button>
                  }
                  content={action.label}
                />
              ))}
            </div>
          )}
        </div>
      )
    },
    [showUserActions, handleUserAction]
  )

  const defaultRenderGroup = useCallback(
    (
      group: PlanningGroup<TGroupData, TUserData>,
      isExpanded: boolean,
      onToggle: () => void
    ) => (
      <div key={group.id} className="border-b border-border/50">
        {/* Group header */}
        <button
          onClick={onToggle}
          className={mergeTailwindClasses(
            "flex w-full items-center justify-between px-4 py-3",
            "hover:bg-default-100 dark:hover:bg-default-800/50",
            "text-left transition-colors duration-150",
            "bg-default-50 dark:bg-default-900/30"
          )}
        >
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <div className="flex items-center gap-2">
              <IconChevronDown
                className={mergeTailwindClasses(
                  "size-4 text-foreground-600 transition-transform duration-200",
                  !isExpanded && "-rotate-90"
                )}
              />
              <span className="font-semibold text-foreground-800">
                {group.name}
              </span>
            </div>
          </div>

          {showUserCount && (
            <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
              {group.count || group.users.length}
            </span>
          )}
        </button>

        {/* Group users */}
        {isExpanded && (
          <div className="bg-background">
            {group.users.length > 0 ? (
              group.users.map((user) => (
                <div key={user.id}>
                  {renderUser
                    ? renderUser(user, showBalances, userActions)
                    : defaultRenderUser(user, showBalances, userActions)}
                </div>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-sm text-foreground-500">
                Aucun utilisateur dans ce groupe
              </div>
            )}
          </div>
        )}
      </div>
    ),
    [showUserCount, showBalances, userActions, renderUser, defaultRenderUser]
  )

  const renderLoadingSkeleton = useCallback(
    () => (
      <div className="space-y-4 p-4">
        {Array.from({ length: 3 }, (_, groupIndex) => (
          <div key={groupIndex} className="space-y-2">
            {/* Group skeleton */}
            <Skeleton className="h-12 w-full rounded-lg" />

            {/* Users skeleton */}
            {Array.from({ length: 4 }, (_, userIndex) => (
              <div key={userIndex} className="flex items-center gap-3 px-4">
                <Skeleton className="size-8 rounded-full" />
                <div className="flex-1 space-y-1">
                  <Skeleton className="h-4 w-3/4 rounded" />
                  <Skeleton className="h-3 w-1/2 rounded" />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    ),
    []
  )

  if (!enabled) {
    return null
  }

  return (
    <div
      className={mergeTailwindClasses(
        "flex flex-col bg-background border-r border-border",
        className
      )}
      style={{ width }}
    >
      {/* Header */}
      <div className="sticky top-0 z-30 border-b border-border bg-background">
        {renderHeader ? (
          renderHeader()
        ) : (
          <div className="p-3">
            {/* Tabs */}
            {tabs.length > 0 && (
              <Tabs
                items={tabs.map(
                  (tab): TabItem => ({
                    key: tab.key,
                    title: (
                      <div className="flex items-center gap-2">
                        {tab.icon}
                        <span>{tab.label}</span>
                        {tab.count !== undefined && (
                          <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">
                            {tab.count}
                          </span>
                        )}
                      </div>
                    ),
                    content: null,
                  })
                )}
                defaultActiveTab={selectedTab}
                onTabChange={onTabChange}
                variant="bordered"
                size="sm"
                className="w-full"
              />
            )}

            {/* Toggle balances */}
            {onToggleBalances && (
              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm font-medium">
                  Afficher les détails
                </span>
                <Tooltip
                  content={
                    showBalances
                      ? "Masquer les détails"
                      : "Afficher les détails"
                  }
                  trigger={
                    <button
                      onClick={onToggleBalances}
                      className="flex size-8 items-center justify-center rounded-lg transition-colors hover:bg-default-100"
                    >
                      {showBalances ? (
                        <IconEyeClosed className="size-4" />
                      ) : (
                        <IconEye className="size-4" />
                      )}
                    </button>
                  }
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {isLoading ? (
          renderLoadingSkeleton()
        ) : (
          <>
            {groups.length > 0 ? (
              groups.map((group) =>
                renderGroup
                  ? renderGroup(group, expandedGroups[group.id] || false, () =>
                      handleGroupToggle(group.id)
                    )
                  : defaultRenderGroup(
                      group,
                      expandedGroups[group.id] || false,
                      () => handleGroupToggle(group.id)
                    )
              )
            ) : (
              <div className="flex items-center justify-center py-16 text-sm text-foreground-500">
                Aucun groupe disponible
              </div>
            )}

            {/* Load more */}
            {hasMore && !isLoadingMore && onLoadMore && (
              <div className="p-4">
                <button
                  onClick={onLoadMore}
                  className="w-full rounded-lg border border-dashed border-border py-3 text-sm text-foreground-600 transition-colors hover:bg-default-50"
                >
                  Charger plus
                </button>
              </div>
            )}

            {isLoadingMore && (
              <div className="border-t border-border p-4">
                <div className="flex items-center justify-center">
                  <Skeleton className="h-6 w-32 rounded" />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
