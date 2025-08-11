"use client"

import { DatePicker, type RangeValue } from "@/datepicker"
import { Select } from "@/form"
import { 
  IconCalendar, 
  IconSearch, 
  IconX,
  IconFilter
} from "@tabler/icons-react"
import { Tooltip } from "@/tooltip"
import { mergeTailwindClasses } from "@/utils"
import { useCallback, useMemo } from "react"

import type { FilterConfig } from "../../types/planning.types"

interface FilterControlsProps {
  filters: FilterConfig[]
  onFilterChange: (key: string, value: string | string[] | boolean | null) => void
  dateRange?: RangeValue
  onDateRangeChange?: (range: RangeValue) => void
  showDateRangeFilter?: boolean
  disabled?: boolean
  className?: string
}

export const FilterControls: React.FC<FilterControlsProps> = ({
  filters,
  onFilterChange,
  dateRange,
  onDateRangeChange,
  showDateRangeFilter = true,
  disabled = false,
  className = ""
}) => {
  const handleFilterChange = useCallback((key: string, value: string | string[] | boolean | null) => {
    onFilterChange(key, value)
  }, [onFilterChange])
  
  const renderFilter = useCallback((filter: FilterConfig) => {
    const commonProps = {
      disabled: disabled,
      className: "w-full"
    }
    
    switch (filter.type) {
      case "select":
        return (
          <Select
            {...commonProps}
            label={filter.label}
            placeholder={filter.placeholder || `Sélectionner ${filter.label.toLowerCase()}`}
            selectedKeys={filter.value ? new Set([filter.value]) : new Set()}
            onSelectionChange={(keys) => {
              const value = Array.from(keys)[0]
              handleFilterChange(filter.key, value || null)
            }}
            items={filter.options || []}
            renderValue={(items) => {
              const item = Array.from(items)[0]
              const option = filter.options?.find(opt => opt.key === item?.key)
              return option?.label || filter.placeholder
            }}
          >
            {(option) => (
              <Select.Item key={option.key} textValue={option.label}>
                <div className="flex items-center gap-2">
                  {option.color && (
                    <div 
                      className="size-3 rounded-full"
                      style={{ backgroundColor: option.color }}
                    />
                  )}
                  {option.label}
                </div>
              </Select.Item>
            )}
          </Select>
        )
      
      case "multiselect":
        return (
          <Select
            {...commonProps}
            label={filter.label}
            placeholder={filter.placeholder || `Sélectionner ${filter.label.toLowerCase()}`}
            selectionMode="multiple"
            selectedKeys={new Set(filter.value || [])}
            onSelectionChange={(keys) => {
              handleFilterChange(filter.key, Array.from(keys))
            }}
            items={filter.options || []}
            renderValue={(items) => {
              const count = Array.from(items).length
              return count > 0 ? `${count} sélectionné${count > 1 ? 's' : ''}` : filter.placeholder
            }}
          >
            {(option) => (
              <Select.Item key={option.key} textValue={option.label}>
                <div className="flex items-center gap-2">
                  {option.color && (
                    <div 
                      className="size-3 rounded-full"
                      style={{ backgroundColor: option.color }}
                    />
                  )}
                  {option.label}
                </div>
              </Select.Item>
            )}
          </Select>
        )
      
      case "search":
        return (
          <div className="relative">
            <input
              {...commonProps}
              type="text"
              placeholder={filter.placeholder || `Rechercher ${filter.label.toLowerCase()}`}
              value={filter.value || ""}
              onChange={(e) => handleFilterChange(filter.key, e.target.value)}
              className={mergeTailwindClasses(
                "w-full rounded-lg border border-border bg-background px-4 py-2 pl-10 text-sm",
                "focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "dark:border-default-800 dark:bg-default-900"
              )}
            />
            <IconSearch className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-foreground-500" />
            {filter.value && (
              <button
                onClick={() => handleFilterChange(filter.key, "")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-default-100"
                disabled={disabled}
              >
                <IconX className="size-3" />
              </button>
            )}
            <label className="absolute -top-2 left-3 bg-background px-1 text-xs font-medium text-foreground-600">
              {filter.label}
            </label>
          </div>
        )
      
      case "toggle":
        return (
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id={filter.key}
              checked={filter.value || false}
              onChange={(e) => handleFilterChange(filter.key, e.target.checked)}
              disabled={disabled}
              className="rounded border-border text-primary focus:ring-primary"
            />
            <label 
              htmlFor={filter.key}
              className="text-sm font-medium text-foreground-700"
            >
              {filter.label}
            </label>
          </div>
        )
      
      default:
        return null
    }
  }, [handleFilterChange, disabled])
  
  const dateRangeFilter = useMemo(() => {
    if (!showDateRangeFilter) {
      return null
    }
    
    return (
      <div className="relative">
        <DatePicker
          label="Période personnalisée"
          placeholder="Sélectionner une période"
          value={dateRange}
          onChange={onDateRangeChange}
          disabled={disabled}
          className="w-full"
          variant="bordered"
          startContent={<IconCalendar className="size-4 text-foreground-500" />}
          isRange
        />
        {dateRange && (onDateRangeChange) && (
          <Tooltip content="Effacer la période">
            <button
              onClick={() => onDateRangeChange(null)}
              className="absolute right-10 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-default-100"
              disabled={disabled}
            >
              <IconX className="size-3" />
            </button>
          </Tooltip>
        )}
      </div>
    )
  }, [showDateRangeFilter, dateRange, onDateRangeChange, disabled])
  
  if (filters.length === 0 && !showDateRangeFilter) {
    return null
  }
  
  return (
    <div className={mergeTailwindClasses(
      "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
      className
    )}>
      {/* Date range filter */}
      {dateRangeFilter}
      
      {/* Dynamic filters */}
      {filters.map((filter) => (
        <div key={filter.key} className="space-y-1">
          {renderFilter(filter)}
        </div>
      ))}
      
      {/* Empty state */}
      {filters.length === 0 && !showDateRangeFilter && (
        <div className="col-span-full flex items-center justify-center py-8 text-sm text-foreground-500">
          <IconFilter className="mr-2 size-4" />
          Aucun filtre disponible
        </div>
      )}
    </div>
  )
}