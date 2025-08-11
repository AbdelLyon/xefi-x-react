"use client"

import { Card } from "@/card"
import type { RangeValue } from "@/datepicker"
import { Switch } from "@/form"
import { IconX, IconFilter } from "@tabler/icons-react"
import { addToast } from "@/toast"
import { mergeTailwindClasses } from "@/utils"
import { useCallback, useState } from "react"

import type {
  FilterConfig,
  ActiveFilter,
  ToolbarAction,
  ImportExportConfig,
  ViewMode,
} from "../types/planning.types"

import { FilterControls } from "./filters/FilterControls"
import { ImportExportActions } from "./actions/ImportExportActions"
import { ViewModeSelector } from "./selectors/ViewModeSelector"
import { TodayButton } from "./actions/TodayButton"

interface ToolbarProps {
  // Core configuration
  enabled?: boolean
  className?: string

  // Filters
  filters?: FilterConfig[]
  activeFilters?: ActiveFilter[]
  onFilterChange?: (
    key: string,
    value: string | string[] | boolean | null
  ) => void
  onFilterClear?: (key: string) => void
  onFiltersClearAll?: () => void

  // View mode
  viewMode?: ViewMode
  viewModes?: Array<{ key: ViewMode; label: string; disabled?: boolean }>
  onViewModeChange?: (mode: ViewMode) => void

  // Today button
  showToday?: boolean
  onTodayClick?: () => void

  // Custom actions
  actions?: ToolbarAction[]

  // Import/Export
  importExport?: ImportExportConfig

  // Additional switches/toggles
  switches?: Array<{
    key: string
    label: string
    checked: boolean
    onChange: (checked: boolean) => void
  }>

  // Date range
  dateRange?: RangeValue<unknown>
  onDateRangeChange?: (range: RangeValue<unknown>) => void
  showDateRangeFilter?: boolean

  // Loading state
  isLoading?: boolean
}

export const Toolbar: React.FC<ToolbarProps> = ({
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
    { key: "twomonths", label: "2 Mois" },
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
  isLoading = false,
}) => {
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false)

  const handleFilterChange = useCallback(
    (key: string, value: string | string[] | boolean | null) => {
      onFilterChange?.(key, value)
    },
    [onFilterChange]
  )

  const handleFilterClear = useCallback(
    (key: string) => {
      onFilterClear?.(key)
    },
    [onFilterClear]
  )

  const handleAction = useCallback((action: ToolbarAction) => {
    if (action.disabled) {
      return
    }

    try {
      action.onClick?.()
      if (action.variant === "primary") {
        addToast({
          title: `Action ${action.label}`,
          description: "Action exécutée avec succès",
          color: "success",
        })
      }
    } catch {
      addToast({
        title: "Erreur",
        description: `Impossible d'exécuter ${action.label}`,
        color: "danger",
      })
    }
  }, [])

  const handleImport = useCallback(
    async (file: File) => {
      if (!importExport?.onImport) {
        return
      }

      try {
        await importExport.onImport(file)
        addToast({
          title: "Import réussi",
          description: `Fichier ${file.name} importé avec succès`,
          color: "success",
        })
      } catch {
        addToast({
          title: "Erreur d'import",
          description: "Impossible d'importer le fichier",
          color: "danger",
        })
      }
    },
    [importExport]
  )

  const handleExport = useCallback(
    async (format: string) => {
      if (!importExport?.onExport) {
        return
      }

      try {
        await importExport.onExport(format)
        addToast({
          title: "Export réussi",
          description: `Données exportées en format ${format}`,
          color: "success",
        })
      } catch {
        addToast({
          title: "Erreur d'export",
          description: "Impossible d'exporter les données",
          color: "danger",
        })
      }
    },
    [importExport]
  )

  const hasActiveFilters = activeFilters.length > 0

  if (!enabled) {
    return null
  }

  return (
    <Card
      className={mergeTailwindClasses(
        "mb-4 overflow-hidden transition-all duration-200",
        isLoading && "opacity-50 pointer-events-none",
        className
      )}
    >
      <div className="p-4">
        {/* Main toolbar row */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Left section: View modes and Today */}
          <div className="flex items-center gap-3">
            <ViewModeSelector
              value={viewMode}
              options={viewModes}
              onChange={onViewModeChange}
              disabled={isLoading}
            />

            {showToday && (
              <TodayButton onClick={onTodayClick} disabled={isLoading} />
            )}

            {/* Filter toggle button */}
            {filters.length > 0 && (
              <button
                onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
                className={mergeTailwindClasses(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  "hover:bg-default-100 dark:hover:bg-default-800/50",
                  hasActiveFilters && "bg-primary/10 text-primary",
                  isFiltersExpanded && "bg-default-100 dark:bg-default-800"
                )}
                disabled={isLoading}
              >
                <IconFilter className="size-4" />
                Filtres
                {hasActiveFilters && (
                  <span className="flex size-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                    {activeFilters.length}
                  </span>
                )}
              </button>
            )}
          </div>

          {/* Right section: Actions and switches */}
          <div className="flex items-center gap-3">
            {/* Custom switches */}
            {switches.map((switchItem) => (
              <div key={switchItem.key} className="flex items-center gap-2">
                <Switch
                  isSelected={switchItem.checked}
                  onValueChange={switchItem.onChange}
                  size="sm"
                  disabled={isLoading}
                >
                  {switchItem.label}
                </Switch>
              </div>
            ))}

            {/* Import/Export actions */}
            {importExport?.enabled && (
              <ImportExportActions
                formats={importExport.formats}
                onImport={handleImport}
                onExport={handleExport}
                disabled={isLoading}
              />
            )}

            {/* Custom actions */}
            {actions.map((action) => (
              <button
                key={action.key}
                onClick={() => handleAction(action)}
                disabled={action.disabled || isLoading}
                className={mergeTailwindClasses(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  action.variant === "primary" &&
                    "bg-primary text-primary-foreground hover:bg-primary/90",
                  action.variant === "secondary" &&
                    "bg-default-100 hover:bg-default-200 dark:bg-default-800 dark:hover:bg-default-700",
                  action.variant === "danger" &&
                    "bg-danger text-danger-foreground hover:bg-danger/90",
                  !action.variant &&
                    "hover:bg-default-100 dark:hover:bg-default-800",
                  (action.disabled || isLoading) &&
                    "opacity-50 cursor-not-allowed"
                )}
              >
                {action.icon}
                {action.label}
              </button>
            ))}
          </div>
        </div>

        {/* Active filters display */}
        {hasActiveFilters && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-foreground-500">
              Filtres actifs:
            </span>
            {activeFilters.map((filter) => (
              <div
                key={filter.key}
                className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm"
              >
                <span className="font-medium text-primary">
                  {filter.label}:
                </span>
                <span className="text-foreground-700">
                  {filter.displayValue || filter.value}
                </span>
                <button
                  onClick={() => handleFilterClear(filter.key)}
                  className="ml-1 rounded-full p-0.5 hover:bg-primary/20"
                  disabled={isLoading}
                >
                  <IconX className="size-3" />
                </button>
              </div>
            ))}
            {activeFilters.length > 1 && (
              <button
                onClick={onFiltersClearAll}
                className="text-sm text-danger hover:underline"
                disabled={isLoading}
              >
                Effacer tout
              </button>
            )}
          </div>
        )}

        {/* Expanded filters */}
        {isFiltersExpanded && filters.length > 0 && (
          <div className="mt-4 border-t border-border pt-4">
            <FilterControls
              filters={filters}
              onFilterChange={handleFilterChange}
              dateRange={dateRange}
              onDateRangeChange={onDateRangeChange}
              showDateRangeFilter={showDateRangeFilter}
              disabled={isLoading}
            />
          </div>
        )}
      </div>
    </Card>
  )
}
