import { Chip } from "@/chip"
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react"
import { Skeleton } from "@/skeleton"
import { mergeTailwindClasses } from "@/utils"
import { useMemo } from "react"

import type { PlanningDay, GenericDate } from "../types/planning.types"

interface HeaderProps<TDate = GenericDate> {
  periodDays: PlanningDay<TDate>[]
  title: string
  onNavigatePrevious?: () => void
  onNavigateNext?: () => void
  showNavigation?: boolean
  cellMinWidth?: string
  isLoading?: boolean
  className?: string
  renderDay?: (day: PlanningDay<TDate>, index: number) => React.ReactNode
  showHolidayIndicators?: boolean
  holidayZones?: Array<{
    label: string
    color: string
  }>
}

export const Header = <TDate = GenericDate,>({
  periodDays,
  title,
  onNavigatePrevious,
  onNavigateNext,
  showNavigation = true,
  cellMinWidth = "20px",
  isLoading = false,
  className = "",
  renderDay,
  showHolidayIndicators = true,
  holidayZones = [
    { label: "A", color: "#e84c3d" },
    { label: "B", color: "#8b2f1f" },
    { label: "C", color: "#5d1f16" },
  ],
}: HeaderProps<TDate>) => {
  const defaultRenderDay = (day: PlanningDay<TDate>, index: number) => {
    const date = day.date as GenericDate

    return (
      <div
        key={`day-${index}`}
        className={mergeTailwindClasses(
          "flex h-20 min-w-[var(--cell-width)] flex-col items-center justify-center",
          "border-r border-border/20 bg-background p-1 text-xs",
          day.isWeekend && "bg-default-50 dark:bg-default-900/50",
          day.isToday && "bg-primary/10 border-primary/30"
        )}
        style={{ "--cell-width": cellMinWidth } as React.CSSProperties}
      >
        {/* Day number */}
        <div
          className={mergeTailwindClasses(
            "font-semibold",
            day.isToday && "text-primary",
            day.isWeekend && "text-foreground-500"
          )}
        >
          {date.format("DD")}
        </div>

        {/* Day name */}
        <div
          className={mergeTailwindClasses(
            "text-foreground-500 text-[10px] uppercase tracking-wide",
            day.isToday && "text-primary/80"
          )}
        >
          {date.format("ddd")}
        </div>

        {/* Holiday indicator */}
        {day.isHoliday && (
          <div
            className="mt-1 h-1 w-6 rounded-full bg-red-500"
            title={day.holidayName}
          />
        )}
      </div>
    )
  }

  const holidayIndicators = useMemo(() => {
    if (!showHolidayIndicators) {
      return null
    }

    return (
      <div className="flex h-6 border-b border-border/20">
        <div
          className="grid w-full"
          style={{
            gridTemplateColumns: `repeat(${periodDays.length}, minmax(${cellMinWidth}, 1fr))`,
          }}
        >
          {periodDays.map((day, index) => (
            <div
              key={`holiday-${index}`}
              className="flex items-center justify-center border-r border-border/20 last:border-r-0"
            >
              {day.isHoliday &&
                holidayZones.map((zone) => (
                  <Chip
                    key={zone.label}
                    size="sm"
                    className="mx-0.5"
                    style={{
                      backgroundColor: zone.color,
                      color: "white",
                      fontSize: "10px",
                      height: "16px",
                      minHeight: "16px",
                    }}
                  >
                    {zone.label}
                  </Chip>
                ))}
            </div>
          ))}
        </div>
      </div>
    )
  }, [periodDays, showHolidayIndicators, holidayZones, cellMinWidth])

  if (isLoading) {
    return (
      <div className="sticky top-0 z-40 bg-background">
        {/* Navigation skeleton */}
        {showNavigation && (
          <div className="flex items-center justify-between border-b border-border p-4">
            <Skeleton className="size-8 rounded" />
            <Skeleton className="h-6 w-48 rounded" />
            <Skeleton className="size-8 rounded" />
          </div>
        )}

        {/* Days skeleton */}
        <div className="flex h-20 border-b border-border">
          {Array.from({ length: Math.min(periodDays.length, 31) }, (_, i) => (
            <Skeleton
              key={i}
              className="h-full flex-1 border-r border-border last:border-r-0"
              style={{ minWidth: cellMinWidth }}
            />
          ))}
        </div>

        {/* Holiday indicators skeleton */}
        {showHolidayIndicators && (
          <Skeleton className="h-6 w-full border-b border-border" />
        )}
      </div>
    )
  }

  if (periodDays.length === 0) {
    return (
      <div className="sticky top-0 z-40 bg-background">
        <div className="flex items-center justify-center p-8 text-sm text-foreground-500">
          Aucune donnée disponible pour cette période
        </div>
      </div>
    )
  }

  return (
    <div
      className={mergeTailwindClasses(
        "sticky top-0 z-40 bg-background border-b border-border",
        className
      )}
    >
      {/* Navigation controls */}
      {showNavigation && (
        <div className="flex items-center justify-between border-b border-border/50 p-3">
          <button
            onClick={onNavigatePrevious}
            disabled={!onNavigatePrevious || isLoading}
            className={mergeTailwindClasses(
              "flex items-center justify-center size-8 rounded-lg transition-colors",
              "hover:bg-default-100 dark:hover:bg-default-800",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            <IconChevronLeft className="size-4" />
          </button>

          <h2 className="min-w-0 flex-1 px-4 text-center text-sm font-semibold">
            {title}
          </h2>

          <button
            onClick={onNavigateNext}
            disabled={!onNavigateNext || isLoading}
            className={mergeTailwindClasses(
              "flex items-center justify-center size-8 rounded-lg transition-colors",
              "hover:bg-default-100 dark:hover:bg-default-800",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            <IconChevronRight className="size-4" />
          </button>
        </div>
      )}

      {/* Days header */}
      <div className="h-20 bg-background">
        <div
          className="grid h-full"
          style={{
            gridTemplateColumns: `repeat(${periodDays.length}, minmax(${cellMinWidth}, 1fr))`,
          }}
        >
          {periodDays.map((day, index) =>
            renderDay ? renderDay(day, index) : defaultRenderDay(day, index)
          )}
        </div>
      </div>

      {/* Holiday indicators */}
      {holidayIndicators}
    </div>
  )
}
