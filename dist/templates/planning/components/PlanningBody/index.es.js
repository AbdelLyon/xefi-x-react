import { jsxs, jsx } from "react/jsx-runtime";
import { useCallback, useMemo } from "react";
import { Skeleton } from "../../../../skeleton/Skeleton/index.es.js";
import { mergeTailwindClasses } from "../../../../utils/string/index.es.js";
const PlanningBody = ({
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
  hoveredDay
}) => {
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
  const defaultRenderItem = useCallback((item, user, day) => {
    const isStartDate = new Date(item.start_date).toDateString() === day.date.toDate().toDateString();
    const isEndDate = new Date(item.end_date).toDateString() === day.date.toDate().toDateString();
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: mergeTailwindClasses(
          "absolute inset-0 flex cursor-pointer transition-all duration-200",
          "hover:z-10 hover:shadow-lg"
        ),
        onClick: () => onItemClick == null ? void 0 : onItemClick(item),
        title: item.title,
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: mergeTailwindClasses(
                "flex-1 transition-all duration-300",
                item.duration === 0.5 ? "w-1/2" : "w-full"
              ),
              style: {
                backgroundColor: item.color || "#3b82f6",
                borderTopLeftRadius: isStartDate ? "4px" : "0",
                borderBottomLeftRadius: isStartDate ? "4px" : "0",
                borderTopRightRadius: isEndDate ? "4px" : "0",
                borderBottomRightRadius: isEndDate ? "4px" : "0"
              }
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "h-1/4 min-h-[3px] w-full transition-all duration-300",
              style: {
                backgroundColor: item.status === "approved" ? "#10b981" : "#f59e0b",
                borderBottomLeftRadius: isStartDate ? "4px" : "0",
                borderBottomRightRadius: isEndDate ? "4px" : "0"
              }
            }
          )
        ]
      },
      item.id
    );
  }, [onItemClick]);
  const defaultRenderCell = useCallback((user, day, cellItems) => {
    const date = day.date;
    const isHighlighted = hoveredDay === date.format("YYYY-MM-DD");
    const isUserHovered = hoveredUser === user.id;
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: mergeTailwindClasses(
          "relative flex min-h-[40px] items-center justify-center",
          "border-r border-b border-border/20",
          "transition-colors duration-150",
          day.isWeekend && "bg-default-50 dark:bg-default-900/30",
          day.isHoliday && "bg-red-50 dark:bg-red-900/20",
          day.isToday && "bg-primary/5 border-primary/20",
          isHighlighted && "bg-default-100 dark:bg-default-800/50",
          isUserHovered && "bg-primary/10",
          "cursor-pointer hover:bg-default-100 dark:hover:bg-default-800/30"
        ),
        style: { minWidth: cellMinWidth },
        onClick: () => onCellClick == null ? void 0 : onCellClick(user, day),
        title: `${user.name} - ${date.format("DD/MM/YYYY")}`,
        children: [
          day.isToday && /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-primary opacity-70" }),
          cellItems.map(
            (item) => renderItem ? renderItem(item, user, day) : defaultRenderItem(item, user, day)
          ),
          cellItems.length === 0 && day.isWeekend && /* @__PURE__ */ jsx("div", { className: "text-xs text-foreground-300", children: "·" })
        ]
      }
    );
  }, [cellMinWidth, hoveredDay, hoveredUser, onCellClick, renderItem, defaultRenderItem]);
  const renderLoadingSkeleton = useMemo(() => /* @__PURE__ */ jsx("div", { className: "space-y-px", children: Array.from({ length: 10 }, (_, rowIndex) => /* @__PURE__ */ jsx("div", { className: "flex", children: Array.from({ length: Math.min(periodDays.length, 31) }, (_2, colIndex) => /* @__PURE__ */ jsx(
    Skeleton,
    {
      className: "h-10 flex-1 border-r border-border last:border-r-0",
      style: { minWidth: cellMinWidth }
    },
    colIndex
  )) }, rowIndex)) }), [periodDays.length, cellMinWidth]);
  const visibleUsers = useMemo(() => {
    return groups.flatMap(
      (group) => expandedGroups[group.id] ? group.users : []
    );
  }, [groups, expandedGroups]);
  if (isLoading) {
    return /* @__PURE__ */ jsx("div", { className: mergeTailwindClasses("overflow-x-auto", className), children: renderLoadingSkeleton });
  }
  if (visibleUsers.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: mergeTailwindClasses(
      "flex items-center justify-center py-16 text-sm text-foreground-500",
      className
    ), children: groups.length === 0 ? "Aucun groupe disponible" : "Aucun groupe développé - cliquez sur un groupe pour voir les utilisateurs" });
  }
  if (periodDays.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: mergeTailwindClasses(
      "flex items-center justify-center py-16 text-sm text-foreground-500",
      className
    ), children: "Aucune période sélectionnée" });
  }
  return /* @__PURE__ */ jsxs("div", { className: mergeTailwindClasses("overflow-x-auto", className), children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "min-w-full",
        style: {
          display: "grid",
          gridTemplateColumns: `repeat(${periodDays.length}, minmax(${cellMinWidth}, 1fr))`
        },
        children: visibleUsers.map((user) => /* @__PURE__ */ jsx(React.Fragment, { children: periodDays.map((day, dayIndex) => {
          const cellItems = getItemsForUserAndDay(user.id, day);
          const cellKey = `${user.id}-${dayIndex}`;
          return /* @__PURE__ */ jsx("div", { children: renderCell ? renderCell(user, day, cellItems) : defaultRenderCell(user, day, cellItems) }, cellKey);
        }) }, user.id))
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "mt-2 flex justify-end px-4 py-2", children: /* @__PURE__ */ jsxs("p", { className: "text-xs text-foreground-500", children: [
      "Utilisateurs visibles: ",
      visibleUsers.length,
      " / ",
      groups.reduce((total, group) => total + group.users.length, 0)
    ] }) })
  ] });
};
export {
  PlanningBody
};
