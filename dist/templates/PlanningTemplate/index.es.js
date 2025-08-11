import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useCallback } from "react";
const PlanningTemplate = ({
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
  isLoadingMore = false
}) => {
  var _a;
  const [selectedTab, setSelectedTab] = useState(
    defaultSelectedTab || ((_a = sidebarTabs[0]) == null ? void 0 : _a.key) || ""
  );
  const handleTabChange = useCallback(
    (tabKey) => {
      setSelectedTab(tabKey);
      onTabChange == null ? void 0 : onTabChange(tabKey);
    },
    [onTabChange]
  );
  const handleGroupToggle = useCallback(
    (groupId) => {
      onGroupToggle == null ? void 0 : onGroupToggle(groupId);
    },
    [onGroupToggle]
  );
  const getItemsForUserAndDay = useCallback(
    (userId, day) => {
      return items.filter((item) => {
        if (item.user_id !== userId) {
          return false;
        }
        const itemStart = new Date(item.start_date);
        const itemEnd = new Date(item.end_date);
        const currentDate = day.date.toDate();
        return currentDate >= itemStart && currentDate <= itemEnd;
      });
    },
    [items]
  );
  const defaultHeaderCell = useCallback(
    (day, index) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "flex h-20 min-w-[var(--cell-width)] flex-col items-center justify-center border-r border-border/20 bg-background p-1 text-xs",
        style: { "--cell-width": cellMinWidth },
        children: [
          /* @__PURE__ */ jsx("div", { className: "font-medium", children: day.date.format("DD") }),
          /* @__PURE__ */ jsx("div", { className: "text-foreground-500", children: day.date.format("ddd") }),
          day.isHoliday && /* @__PURE__ */ jsx(
            "div",
            {
              className: "mt-1 h-1 w-4 rounded bg-primary",
              title: day.holidayName
            }
          )
        ]
      },
      `header-${index}`
    ),
    [cellMinWidth]
  );
  const defaultBodyCell = useCallback(
    (user, day, cellItems) => /* @__PURE__ */ jsx(
      "div",
      {
        className: "flex min-h-[40px] min-w-[var(--cell-width)] items-center justify-center border-r border-border/20 bg-background p-1",
        style: { "--cell-width": cellMinWidth },
        children: cellItems.length > 0 && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1", children: cellItems.map((item, idx) => /* @__PURE__ */ jsx(
          "div",
          {
            className: "size-2 rounded-full",
            style: { backgroundColor: item.color || "#3b82f6" },
            title: item.title
          },
          `item-${item.id}-${idx}`
        )) })
      },
      `cell-${user.id}-${day.date.format("YYYY-MM-DD")}`
    ),
    [cellMinWidth]
  );
  const defaultSidebarUser = useCallback(
    (user) => /* @__PURE__ */ jsx("div", { className: "flex h-10 items-center px-4 py-2 text-sm", children: user.name }),
    []
  );
  const defaultSidebarGroup = useCallback(
    (group, isExpanded, onToggle) => /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: onToggle,
          className: "flex w-full items-center justify-between px-4 py-2 text-left font-medium hover:bg-foreground-100",
          children: [
            /* @__PURE__ */ jsx("span", { children: group.name }),
            /* @__PURE__ */ jsx(
              "span",
              {
                className: `transform transition-transform ${isExpanded ? "rotate-90" : ""}`,
                children: "→"
              }
            )
          ]
        }
      ),
      isExpanded && /* @__PURE__ */ jsx("div", { className: "ml-4 border-l border-border/20", children: group.users.map((user) => /* @__PURE__ */ jsx("div", { children: (renderSidebarUser || defaultSidebarUser)(user) }, user.id)) })
    ] }),
    [renderSidebarUser, defaultSidebarUser]
  );
  if (isLoading && loadingSkeleton) {
    return /* @__PURE__ */ jsx("div", { className, children: loadingSkeleton });
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `flex w-full flex-col bg-background text-foreground ${className}`,
      children: [
        showNavigation && /* @__PURE__ */ jsxs(
          "div",
          {
            className: `flex items-center justify-between border-b border-border px-4 py-2 ${headerClassName}`,
            children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: onNavigatePrevious,
                  disabled: !onNavigatePrevious,
                  className: "rounded border border-border px-3 py-1 text-sm hover:bg-foreground-100 disabled:opacity-50",
                  children: "←"
                }
              ),
              /* @__PURE__ */ jsx("h2", { className: "font-medium", children: headerTitle }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: onNavigateNext,
                  disabled: !onNavigateNext,
                  className: "rounded border border-border px-3 py-1 text-sm hover:bg-foreground-100 disabled:opacity-50",
                  children: "→"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "h-[630px] overflow-y-auto rounded-lg border border-border", children: /* @__PURE__ */ jsxs("div", { className: "flex", children: [
          showSidebar && /* @__PURE__ */ jsxs(
            "div",
            {
              className: `flex flex-col bg-background ${sidebarClassName}`,
              style: { width: sidebarWidth },
              children: [
                /* @__PURE__ */ jsxs("div", { className: "sticky top-0 z-40 border-b border-border bg-background", children: [
                  renderSidebarHeader && renderSidebarHeader(),
                  sidebarTabs.length > 0 && /* @__PURE__ */ jsx("div", { className: "flex", children: sidebarTabs.map((tab) => /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => handleTabChange(tab.key),
                      className: `flex-1 px-4 py-2 text-sm ${selectedTab === tab.key ? "bg-primary text-primary-foreground" : "bg-background hover:bg-foreground-100"}`,
                      children: tab.label
                    },
                    tab.key
                  )) })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-auto", children: isLoading ? /* @__PURE__ */ jsx("div", { className: "p-4", children: "Chargement..." }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                  groups.map((group) => /* @__PURE__ */ jsx("div", { children: (renderSidebarGroup || defaultSidebarGroup)(
                    group,
                    expandedGroups[group.id] || false,
                    () => handleGroupToggle(group.id)
                  ) }, group.id)),
                  hasMore && !isLoadingMore && onLoadMore && /* @__PURE__ */ jsx("div", { className: "flex justify-center p-4", children: /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: onLoadMore,
                      className: "rounded bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90",
                      children: "Charger plus"
                    }
                  ) }),
                  isLoadingMore && /* @__PURE__ */ jsx("div", { className: "flex justify-center p-4", children: /* @__PURE__ */ jsx("div", { className: "text-sm text-foreground-500", children: "Chargement..." }) })
                ] }) })
              ]
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "relative flex-1 rounded-t-lg", children: [
            /* @__PURE__ */ jsx("div", { className: "sticky top-0 z-40 bg-background", children: /* @__PURE__ */ jsx(
              "div",
              {
                className: `grid ${headerClassName}`,
                style: {
                  gridTemplateColumns: `repeat(${periodDays.length}, minmax(${cellMinWidth}, 1fr))`
                },
                children: periodDays.map(
                  (day, index) => (renderHeaderCell || defaultHeaderCell)(day, index)
                )
              }
            ) }),
            /* @__PURE__ */ jsx("div", { className: `overflow-x-auto ${bodyClassName}`, children: isLoading ? /* @__PURE__ */ jsx("div", { className: "p-4", children: "Chargement des données..." }) : /* @__PURE__ */ jsx("div", { role: "region", "aria-label": "Planning grid", children: groups.map(
              (group) => (expandedGroups[group.id] || false) && group.users.map((user) => /* @__PURE__ */ jsx(
                "div",
                {
                  className: "flex border-b border-border/20",
                  children: /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "grid",
                      style: {
                        gridTemplateColumns: `repeat(${periodDays.length}, minmax(${cellMinWidth}, 1fr))`
                      },
                      children: periodDays.map((day) => {
                        const cellItems = getItemsForUserAndDay(
                          user.id,
                          day
                        );
                        return (renderBodyCell || defaultBodyCell)(
                          user,
                          day,
                          cellItems
                        );
                      })
                    }
                  )
                },
                `user-row-${user.id}`
              ))
            ) }) })
          ] })
        ] }) })
      ]
    }
  );
};
export {
  PlanningTemplate
};
