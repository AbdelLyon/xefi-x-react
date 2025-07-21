import type { JSX, ReactNode } from "react"
import { useMemo } from "react"
import { mergeTailwindClasses } from "@/utils"
import {
  formatProgressValue,
  type ProgressFormatOptions,
} from "./progressUtils"

/**
 * Props for ProgressLabel component
 */
export interface ProgressLabelProps {
  /** Label text */
  label?: ReactNode
  /** Current progress value */
  value: number
  /** Maximum progress value */
  maxValue: number
  /** Custom value label */
  valueLabel?: string
  /** Whether to show the value label */
  showValueLabel: boolean
  /** Format options for value display */
  formatOptions: ProgressFormatOptions
  /** Label position */
  position: "top" | "bottom" | "none"
  /** Custom CSS class */
  className?: string
  /** Locale for formatting */
  locale?: string
}

/**
 * Progress label component with flexible positioning and formatting
 */
export const ProgressLabel = ({
  label,
  value,
  maxValue,
  valueLabel,
  showValueLabel,
  formatOptions,
  position,
  className,
  locale,
}: ProgressLabelProps): JSX.Element | null => {
  const formattedValue = useMemo(() => {
    if (position === "none") {
      return null
    }

    const hasCustomLabel =
      typeof valueLabel === "string" && valueLabel.trim() !== ""
    return hasCustomLabel
      ? valueLabel
      : formatProgressValue(value, maxValue, formatOptions, locale)
  }, [value, maxValue, valueLabel, formatOptions, locale, position])

  if (position === "none") {
    return null
  }

  return (
    <div
      className={mergeTailwindClasses(
        "flex items-center justify-between text-small font-medium text-default-500",
        {
          "order-first": position === "top",
          "order-last": position === "bottom",
        },
        className
      )}
    >
      {label !== undefined && <span>{label}</span>}
      {showValueLabel && <span>{formattedValue}</span>}
    </div>
  )
}
