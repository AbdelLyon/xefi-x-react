import { jsx, jsxs } from "react/jsx-runtime";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useMemo } from "react";
import { Chip } from "../../../../chip/Chip/index.es.js";
import { Skeleton } from "../../../../skeleton/Skeleton/index.es.js";
import { mergeTailwindClasses } from "../../../../utils/string/index.es.js";
const Header = ({
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
    { label: "C", color: "#5d1f16" }
  ]
}) => {
  const defaultRenderDay = (day, index) => {
    const date = day.date;
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: mergeTailwindClasses(
          "flex h-20 min-w-[var(--cell-width)] flex-col items-center justify-center",
          "border-r border-border/20 bg-background p-1 text-xs",
          day.isWeekend && "bg-default-50 dark:bg-default-900/50",
          day.isToday && "bg-primary/10 border-primary/30"
        ),
        style: { "--cell-width": cellMinWidth },
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: mergeTailwindClasses(
                "font-semibold",
                day.isToday && "text-primary",
                day.isWeekend && "text-foreground-500"
              ),
              children: date.format("DD")
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: mergeTailwindClasses(
                "text-foreground-500 text-[10px] uppercase tracking-wide",
                day.isToday && "text-primary/80"
              ),
              children: date.format("ddd")
            }
          ),
          day.isHoliday && /* @__PURE__ */ jsx(
            "div",
            {
              className: "mt-1 h-1 w-6 rounded-full bg-red-500",
              title: day.holidayName
            }
          )
        ]
      },
      `day-${index}`
    );
  };
  const holidayIndicators = useMemo(() => {
    if (!showHolidayIndicators) {
      return null;
    }
    return /* @__PURE__ */ jsx("div", { className: "flex h-6 border-b border-border/20", children: /* @__PURE__ */ jsx(
      "div",
      {
        className: "grid w-full",
        style: {
          gridTemplateColumns: `repeat(${periodDays.length}, minmax(${cellMinWidth}, 1fr))`
        },
        children: periodDays.map((day, index) => /* @__PURE__ */ jsx(
          "div",
          {
            className: "flex items-center justify-center border-r border-border/20 last:border-r-0",
            children: day.isHoliday && holidayZones.map((zone) => /* @__PURE__ */ jsx(
              Chip,
              {
                size: "sm",
                className: "mx-0.5",
                style: {
                  backgroundColor: zone.color,
                  color: "white",
                  fontSize: "10px",
                  height: "16px",
                  minHeight: "16px"
                },
                children: zone.label
              },
              zone.label
            ))
          },
          `holiday-${index}`
        ))
      }
    ) });
  }, [periodDays, showHolidayIndicators, holidayZones, cellMinWidth]);
  if (isLoading) {
    return /* @__PURE__ */ jsxs("div", { className: "sticky top-0 z-40 bg-background", children: [
      showNavigation && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b border-border p-4", children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "size-8 rounded" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-48 rounded" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "size-8 rounded" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex h-20 border-b border-border", children: Array.from({ length: Math.min(periodDays.length, 31) }, (_, i) => /* @__PURE__ */ jsx(
        Skeleton,
        {
          className: "h-full flex-1 border-r border-border last:border-r-0",
          style: { minWidth: cellMinWidth }
        },
        i
      )) }),
      showHolidayIndicators && /* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-full border-b border-border" })
    ] });
  }
  if (periodDays.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: "sticky top-0 z-40 bg-background", children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center p-8 text-sm text-foreground-500", children: "Aucune donnée disponible pour cette période" }) });
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: mergeTailwindClasses(
        "sticky top-0 z-40 bg-background border-b border-border",
        className
      ),
      children: [
        showNavigation && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b border-border/50 p-3", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: onNavigatePrevious,
              disabled: !onNavigatePrevious || isLoading,
              className: mergeTailwindClasses(
                "flex items-center justify-center size-8 rounded-lg transition-colors",
                "hover:bg-default-100 dark:hover:bg-default-800",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              ),
              children: /* @__PURE__ */ jsx(IconChevronLeft, { className: "size-4" })
            }
          ),
          /* @__PURE__ */ jsx("h2", { className: "min-w-0 flex-1 px-4 text-center text-sm font-semibold", children: title }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: onNavigateNext,
              disabled: !onNavigateNext || isLoading,
              className: mergeTailwindClasses(
                "flex items-center justify-center size-8 rounded-lg transition-colors",
                "hover:bg-default-100 dark:hover:bg-default-800",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              ),
              children: /* @__PURE__ */ jsx(IconChevronRight, { className: "size-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "h-20 bg-background", children: /* @__PURE__ */ jsx(
          "div",
          {
            className: "grid h-full",
            style: {
              gridTemplateColumns: `repeat(${periodDays.length}, minmax(${cellMinWidth}, 1fr))`
            },
            children: periodDays.map(
              (day, index) => renderDay ? renderDay(day, index) : defaultRenderDay(day, index)
            )
          }
        ) }),
        holidayIndicators
      ]
    }
  );
};
export {
  Header
};
