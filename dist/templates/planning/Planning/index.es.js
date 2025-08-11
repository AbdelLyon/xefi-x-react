import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useCallback, useEffect } from "react";
import { Header } from "../components/Header/index.es.js";
import { Sidebar } from "../components/Sidebar/index.es.js";
import { PlanningBody } from "../components/PlanningBody/index.es.js";
import { Toolbar } from "../components/Toolbar/index.es.js";
import { Legend } from "../components/Legend/index.es.js";
import { mergeTailwindClasses } from "../../../utils/string/index.es.js";
const Planning = ({
  // Data
  groups = [],
  items = [],
  periodDays = [],
  // View configuration
  viewMode = "month",
  viewModes = [
    { key: "week", label: "Semaine" },
    { key: "month", label: "Mois" },
    { key: "twomonths", label: "2 Mois" }
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
  ariaDescription = "Grille de planning interactive"
}) => {
  var _a, _b;
  const [activeFilters, setActiveFilters] = useState([]);
  const [hoveredUser] = useState();
  const [hoveredDay] = useState();
  const [selectedTab, setSelectedTab] = useState(
    ((_b = (_a = sidebar == null ? void 0 : sidebar.tabs) == null ? void 0 : _a[0]) == null ? void 0 : _b.key) || "default"
  );
  const handleFilterChange = useCallback(
    (key, value) => {
      setActiveFilters((prev) => {
        var _a2;
        const existing = prev.find((f) => f.key === key);
        if (value === null || value === void 0 || value === "") {
          return prev.filter((f) => f.key !== key);
        }
        const filter = (_a2 = toolbar == null ? void 0 : toolbar.filters) == null ? void 0 : _a2.find((f) => f.key === key);
        if (!filter) {
          return prev;
        }
        const displayValue = Array.isArray(value) ? `${value.length} sélectionné${value.length > 1 ? "s" : ""}` : typeof value === "object" && value !== null ? JSON.stringify(value) : String(value);
        const newFilter = {
          key,
          label: filter.label,
          value,
          displayValue
        };
        if (existing) {
          return prev.map((f) => f.key === key ? newFilter : f);
        } else {
          return [...prev, newFilter];
        }
      });
    },
    [toolbar == null ? void 0 : toolbar.filters]
  );
  const handleFilterClear = useCallback((key) => {
    setActiveFilters((prev) => prev.filter((f) => f.key !== key));
  }, []);
  const handleFiltersClearAll = useCallback(() => {
    setActiveFilters([]);
  }, []);
  const handleTabChange = useCallback((tabKey) => {
    setSelectedTab(tabKey);
  }, []);
  useEffect(() => {
    if (groups.length > 0 && Object.keys(expandedGroups).length === 0) {
      const firstGroup = groups[0];
      if (firstGroup && onGroupToggle) {
        onGroupToggle(firstGroup.id);
      }
    }
  }, [groups, expandedGroups, onGroupToggle]);
  if (isLoading && loadingSkeleton) {
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: mergeTailwindClasses(
          "flex w-full flex-col bg-background text-foreground",
          className
        ),
        children: loadingSkeleton
      }
    );
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: mergeTailwindClasses(
        "flex w-full flex-col bg-background text-foreground",
        className
      ),
      role: "application",
      "aria-label": ariaLabel,
      "aria-description": ariaDescription,
      children: [
        (toolbar == null ? void 0 : toolbar.enabled) && /* @__PURE__ */ jsx(
          Toolbar,
          {
            className: toolbarClassName,
            enabled: toolbar.enabled,
            filters: toolbar.filters,
            activeFilters,
            onFilterChange: handleFilterChange,
            onFilterClear: handleFilterClear,
            onFiltersClearAll: handleFiltersClearAll,
            viewMode,
            viewModes,
            onViewModeChange,
            showToday: toolbar.showToday,
            onTodayClick: toolbar.onTodayClick,
            actions: toolbar.actions,
            importExport: toolbar.importExport,
            isLoading
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-hidden rounded-lg border border-border bg-background", children: /* @__PURE__ */ jsxs("div", { className: "flex h-[630px]", children: [
          (sidebar == null ? void 0 : sidebar.enabled) && /* @__PURE__ */ jsx(
            Sidebar,
            {
              className: sidebarClassName,
              enabled: sidebar.enabled,
              width: sidebar.width,
              groups,
              tabs: sidebar.tabs,
              selectedTab,
              onTabChange: handleTabChange,
              expandedGroups,
              onGroupToggle,
              showBalances: sidebar.showBalances,
              showUserActions: sidebar.showUserActions,
              isLoading,
              hasMore,
              isLoadingMore,
              onLoadMore,
              renderUser: renderSidebarUser,
              renderGroup: renderSidebarGroup,
              hoveredUser
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "relative flex flex-1 flex-col overflow-hidden", children: [
            /* @__PURE__ */ jsx(
              Header,
              {
                className: headerClassName,
                periodDays,
                title: headerTitle,
                onNavigatePrevious,
                onNavigateNext,
                showNavigation,
                cellMinWidth,
                isLoading,
                renderDay: renderHeaderCell
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-auto", children: /* @__PURE__ */ jsx(
              PlanningBody,
              {
                className: bodyClassName,
                groups,
                items,
                periodDays,
                expandedGroups,
                cellMinWidth,
                isLoading,
                onItemClick,
                onCellClick,
                onUserClick,
                renderCell: renderBodyCell,
                renderItem,
                hoveredUser,
                hoveredDay
              }
            ) })
          ] })
        ] }) }),
        (legend == null ? void 0 : legend.enabled) && /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsx(Legend, { config: legend, compact: true, position: "top" }) })
      ]
    }
  );
};
export {
  Planning
};
