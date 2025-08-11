var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
import { jsx, jsxs } from "react/jsx-runtime";
import { IconFilter, IconX } from "@tabler/icons-react";
import { useState, useCallback } from "react";
import { FilterControls } from "../filters/FilterControls/index.es.js";
import { ImportExportActions } from "../actions/ImportExportActions/index.es.js";
import { ViewModeSelector } from "../selectors/ViewModeSelector/index.es.js";
import { TodayButton } from "../actions/TodayButton/index.es.js";
import { Card } from "../../../../card/Card/index.es.js";
import { Switch } from "../../../../form/Switch/index.es.js";
import { addToast } from "@heroui/react";
import { mergeTailwindClasses } from "../../../../utils/string/index.es.js";
const Toolbar = ({
  enabled = true,
  className = "",
  filters = [],
  activeFilters = [],
  onFilterChange,
  onFilterClear,
  onFiltersClearAll,
  viewMode = "month",
  viewModes = [
    { key: "week", label: "Semaine" },
    { key: "month", label: "Mois" },
    { key: "twomonths", label: "2 Mois" }
  ],
  onViewModeChange,
  showToday = true,
  onTodayClick,
  actions = [],
  importExport,
  switches = [],
  dateRange,
  onDateRangeChange,
  showDateRangeFilter = true,
  isLoading = false
}) => {
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
  const handleFilterChange = useCallback(
    (key, value) => {
      onFilterChange == null ? void 0 : onFilterChange(key, value);
    },
    [onFilterChange]
  );
  const handleFilterClear = useCallback(
    (key) => {
      onFilterClear == null ? void 0 : onFilterClear(key);
    },
    [onFilterClear]
  );
  const handleAction = useCallback((action) => {
    var _a;
    if (action.disabled) {
      return;
    }
    try {
      (_a = action.onClick) == null ? void 0 : _a.call(action);
      if (action.variant === "primary") {
        addToast({
          title: `Action ${action.label}`,
          description: "Action exécutée avec succès",
          color: "success"
        });
      }
    } catch (e) {
      addToast({
        title: "Erreur",
        description: `Impossible d'exécuter ${action.label}`,
        color: "danger"
      });
    }
  }, []);
  const handleImport = useCallback(
    (file) => __async(null, null, function* () {
      if (!(importExport == null ? void 0 : importExport.onImport)) {
        return;
      }
      try {
        yield importExport.onImport(file);
        addToast({
          title: "Import réussi",
          description: `Fichier ${file.name} importé avec succès`,
          color: "success"
        });
      } catch (e) {
        addToast({
          title: "Erreur d'import",
          description: "Impossible d'importer le fichier",
          color: "danger"
        });
      }
    }),
    [importExport]
  );
  const handleExport = useCallback(
    (format) => __async(null, null, function* () {
      if (!(importExport == null ? void 0 : importExport.onExport)) {
        return;
      }
      try {
        yield importExport.onExport(format);
        addToast({
          title: "Export réussi",
          description: `Données exportées en format ${format}`,
          color: "success"
        });
      } catch (e) {
        addToast({
          title: "Erreur d'export",
          description: "Impossible d'exporter les données",
          color: "danger"
        });
      }
    }),
    [importExport]
  );
  const hasActiveFilters = activeFilters.length > 0;
  if (!enabled) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    Card,
    {
      className: mergeTailwindClasses(
        "mb-4 overflow-hidden transition-all duration-200",
        isLoading && "opacity-50 pointer-events-none",
        className
      ),
      children: /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(
              ViewModeSelector,
              {
                value: viewMode,
                options: viewModes,
                onChange: onViewModeChange,
                disabled: isLoading
              }
            ),
            showToday && /* @__PURE__ */ jsx(TodayButton, { onClick: onTodayClick, disabled: isLoading }),
            filters.length > 0 && /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => setIsFiltersExpanded(!isFiltersExpanded),
                className: mergeTailwindClasses(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  "hover:bg-default-100 dark:hover:bg-default-800/50",
                  hasActiveFilters && "bg-primary/10 text-primary",
                  isFiltersExpanded && "bg-default-100 dark:bg-default-800"
                ),
                disabled: isLoading,
                children: [
                  /* @__PURE__ */ jsx(IconFilter, { className: "size-4" }),
                  "Filtres",
                  hasActiveFilters && /* @__PURE__ */ jsx("span", { className: "flex size-5 items-center justify-center rounded-full bg-primary text-xs text-white", children: activeFilters.length })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            switches.map((switchItem) => /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsx(
              Switch,
              {
                isSelected: switchItem.checked,
                onValueChange: switchItem.onChange,
                size: "sm",
                disabled: isLoading,
                children: switchItem.label
              }
            ) }, switchItem.key)),
            (importExport == null ? void 0 : importExport.enabled) && /* @__PURE__ */ jsx(
              ImportExportActions,
              {
                formats: importExport.formats,
                onImport: handleImport,
                onExport: handleExport,
                disabled: isLoading
              }
            ),
            actions.map((action) => /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => handleAction(action),
                disabled: action.disabled || isLoading,
                className: mergeTailwindClasses(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  action.variant === "primary" && "bg-primary text-primary-foreground hover:bg-primary/90",
                  action.variant === "secondary" && "bg-default-100 hover:bg-default-200 dark:bg-default-800 dark:hover:bg-default-700",
                  action.variant === "danger" && "bg-danger text-danger-foreground hover:bg-danger/90",
                  !action.variant && "hover:bg-default-100 dark:hover:bg-default-800",
                  (action.disabled || isLoading) && "opacity-50 cursor-not-allowed"
                ),
                children: [
                  action.icon,
                  action.label
                ]
              },
              action.key
            ))
          ] })
        ] }),
        hasActiveFilters && /* @__PURE__ */ jsxs("div", { className: "mt-3 flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-foreground-500", children: "Filtres actifs:" }),
          activeFilters.map((filter) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm",
              children: [
                /* @__PURE__ */ jsxs("span", { className: "font-medium text-primary", children: [
                  filter.label,
                  ":"
                ] }),
                /* @__PURE__ */ jsx("span", { className: "text-foreground-700", children: filter.displayValue || filter.value }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleFilterClear(filter.key),
                    className: "ml-1 rounded-full p-0.5 hover:bg-primary/20",
                    disabled: isLoading,
                    children: /* @__PURE__ */ jsx(IconX, { className: "size-3" })
                  }
                )
              ]
            },
            filter.key
          )),
          activeFilters.length > 1 && /* @__PURE__ */ jsx(
            "button",
            {
              onClick: onFiltersClearAll,
              className: "text-sm text-danger hover:underline",
              disabled: isLoading,
              children: "Effacer tout"
            }
          )
        ] }),
        isFiltersExpanded && filters.length > 0 && /* @__PURE__ */ jsx("div", { className: "mt-4 border-t border-border pt-4", children: /* @__PURE__ */ jsx(
          FilterControls,
          {
            filters,
            onFilterChange: handleFilterChange,
            dateRange,
            onDateRangeChange,
            showDateRangeFilter,
            disabled: isLoading
          }
        ) })
      ] })
    }
  );
};
export {
  Toolbar
};
