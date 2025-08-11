import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useCallback } from "react";
import { IconChevronDown, IconEyeClosed, IconEye } from "@tabler/icons-react";
import { Tooltip } from "../../../../tooltip/Tooltip/index.es.js";
import { Skeleton } from "../../../../skeleton/Skeleton/index.es.js";
import { Tabs } from "../../../../tabs/Tabs/index.es.js";
import { mergeTailwindClasses } from "../../../../utils/string/index.es.js";
const Sidebar = ({
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
  renderHeader
}) => {
  const handleGroupToggle = useCallback(
    (groupId) => {
      onGroupToggle == null ? void 0 : onGroupToggle(groupId);
    },
    [onGroupToggle]
  );
  const handleUserAction = useCallback(
    (action, user) => {
      onUserAction == null ? void 0 : onUserAction(action, user);
    },
    [onUserAction]
  );
  const defaultRenderUser = useCallback(
    (user, showDetails, actions) => {
      const displayName = user.firstname && user.lastname ? `${user.firstname} ${user.lastname}` : user.name;
      return /* @__PURE__ */ jsxs(
        "div",
        {
          className: mergeTailwindClasses(
            "group flex items-center justify-between px-4 py-2",
            "hover:bg-default-100 dark:hover:bg-default-800/50",
            "border-b border-border/30 last:border-b-0",
            "transition-colors duration-150"
          ),
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 flex-1 items-center gap-3", children: [
              user.avatar ? /* @__PURE__ */ jsx(
                "img",
                {
                  src: user.avatar,
                  alt: displayName,
                  className: "size-8 rounded-full object-cover"
                }
              ) : /* @__PURE__ */ jsx("div", { className: "flex size-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary", children: displayName.charAt(0).toUpperCase() }),
              /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsx("div", { className: "truncate text-sm font-medium text-foreground-800", children: displayName }),
                showDetails && user.email && /* @__PURE__ */ jsx("div", { className: "truncate text-xs text-foreground-500", children: user.email })
              ] })
            ] }),
            showUserActions && actions && actions.length > 0 && /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100", children: actions.map((action) => /* @__PURE__ */ jsx(
              Tooltip,
              {
                trigger: /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleUserAction(action, user),
                    disabled: action.disabled,
                    className: mergeTailwindClasses(
                      "flex items-center justify-center size-6 rounded transition-colors",
                      action.variant === "danger" && "hover:bg-danger/10 text-danger",
                      !action.variant && "hover:bg-default-200 dark:hover:bg-default-700",
                      action.disabled && "opacity-50 cursor-not-allowed"
                    ),
                    children: action.icon
                  }
                ),
                content: action.label
              },
              action.key
            )) })
          ]
        }
      );
    },
    [showUserActions, handleUserAction]
  );
  const defaultRenderGroup = useCallback(
    (group, isExpanded, onToggle) => /* @__PURE__ */ jsxs("div", { className: "border-b border-border/50", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: onToggle,
          className: mergeTailwindClasses(
            "flex w-full items-center justify-between px-4 py-3",
            "hover:bg-default-100 dark:hover:bg-default-800/50",
            "text-left transition-colors duration-150",
            "bg-default-50 dark:bg-default-900/30"
          ),
          children: [
            /* @__PURE__ */ jsx("div", { className: "flex min-w-0 flex-1 items-center gap-3", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(
                IconChevronDown,
                {
                  className: mergeTailwindClasses(
                    "size-4 text-foreground-600 transition-transform duration-200",
                    !isExpanded && "-rotate-90"
                  )
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "font-semibold text-foreground-800", children: group.name })
            ] }) }),
            showUserCount && /* @__PURE__ */ jsx("span", { className: "rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary", children: group.count || group.users.length })
          ]
        }
      ),
      isExpanded && /* @__PURE__ */ jsx("div", { className: "bg-background", children: group.users.length > 0 ? group.users.map((user) => /* @__PURE__ */ jsx("div", { children: renderUser ? renderUser(user, showBalances, userActions) : defaultRenderUser(user, showBalances, userActions) }, user.id)) : /* @__PURE__ */ jsx("div", { className: "px-4 py-8 text-center text-sm text-foreground-500", children: "Aucun utilisateur dans ce groupe" }) })
    ] }, group.id),
    [showUserCount, showBalances, userActions, renderUser, defaultRenderUser]
  );
  const renderLoadingSkeleton = useCallback(
    () => /* @__PURE__ */ jsx("div", { className: "space-y-4 p-4", children: Array.from({ length: 3 }, (_, groupIndex) => /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx(Skeleton, { className: "h-12 w-full rounded-lg" }),
      Array.from({ length: 4 }, (_2, userIndex) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 px-4", children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "size-8 rounded-full" }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-1", children: [
          /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-3/4 rounded" }),
          /* @__PURE__ */ jsx(Skeleton, { className: "h-3 w-1/2 rounded" })
        ] })
      ] }, userIndex))
    ] }, groupIndex)) }),
    []
  );
  if (!enabled) {
    return null;
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: mergeTailwindClasses(
        "flex flex-col bg-background border-r border-border",
        className
      ),
      style: { width },
      children: [
        /* @__PURE__ */ jsx("div", { className: "sticky top-0 z-30 border-b border-border bg-background", children: renderHeader ? renderHeader() : /* @__PURE__ */ jsxs("div", { className: "p-3", children: [
          tabs.length > 0 && /* @__PURE__ */ jsx(
            Tabs,
            {
              items: tabs.map(
                (tab) => ({
                  key: tab.key,
                  title: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                    tab.icon,
                    /* @__PURE__ */ jsx("span", { children: tab.label }),
                    tab.count !== void 0 && /* @__PURE__ */ jsx("span", { className: "rounded-full bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary", children: tab.count })
                  ] }),
                  content: null
                })
              ),
              defaultActiveTab: selectedTab,
              onTabChange,
              variant: "bordered",
              size: "sm",
              className: "w-full"
            }
          ),
          onToggleBalances && /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Afficher les détails" }),
            /* @__PURE__ */ jsx(
              Tooltip,
              {
                content: showBalances ? "Masquer les détails" : "Afficher les détails",
                trigger: /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: onToggleBalances,
                    className: "flex size-8 items-center justify-center rounded-lg transition-colors hover:bg-default-100",
                    children: showBalances ? /* @__PURE__ */ jsx(IconEyeClosed, { className: "size-4" }) : /* @__PURE__ */ jsx(IconEye, { className: "size-4" })
                  }
                )
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-auto", children: isLoading ? renderLoadingSkeleton() : /* @__PURE__ */ jsxs(Fragment, { children: [
          groups.length > 0 ? groups.map(
            (group) => renderGroup ? renderGroup(
              group,
              expandedGroups[group.id] || false,
              () => handleGroupToggle(group.id)
            ) : defaultRenderGroup(
              group,
              expandedGroups[group.id] || false,
              () => handleGroupToggle(group.id)
            )
          ) : /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center py-16 text-sm text-foreground-500", children: "Aucun groupe disponible" }),
          hasMore && !isLoadingMore && onLoadMore && /* @__PURE__ */ jsx("div", { className: "p-4", children: /* @__PURE__ */ jsx(
            "button",
            {
              onClick: onLoadMore,
              className: "w-full rounded-lg border border-dashed border-border py-3 text-sm text-foreground-600 transition-colors hover:bg-default-50",
              children: "Charger plus"
            }
          ) }),
          isLoadingMore && /* @__PURE__ */ jsx("div", { className: "border-t border-border p-4", children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-32 rounded" }) }) })
        ] }) })
      ]
    }
  );
};
export {
  Sidebar
};
