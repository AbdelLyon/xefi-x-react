import type { JSX, ReactNode } from "react"
import { forwardRef } from "react"
import type { ProgressProps as HeroUIProgressProps } from "@heroui/react"
import { Progress as HeroUIProgress } from "@heroui/react"
import { mergeTailwindClasses } from "@/utils"
import type { BaseComponentProps, Color } from "@/types"
import { ProgressLabel } from "./ProgressLabel"
import {
  validateProgressValue,
  type ProgressFormatOptions,
  defaultProgressFormatOptions,
} from "./progressUtils"

/**
 * Enhanced Progress component props
 */
export interface ProgressProps
  extends Omit<
      HeroUIProgressProps,
      "value" | "maxValue" | "minValue" | "color" | "size"
    >,
    BaseComponentProps {
  /** Progress value */
  value?: number
  /** Minimum value */
  minValue?: number
  /** Maximum value */
  maxValue?: number
  /** Progress color */
  color?: Color
  /** Progress size */
  size?: "sm" | "md" | "lg"
  /** Label content */
  label?: ReactNode
  /** Label position relative to progress bar */
  labelPosition?: "top" | "bottom" | "none"
  /** Custom value label (overrides formatted value) */
  valueLabel?: string
  /** Whether to show value label */
  showValueLabel?: boolean
  /** Format options for value display */
  formatOptions?: ProgressFormatOptions
  /** Custom styling for different parts */
  classNames?: HeroUIProgressProps["classNames"] & {
    container?: string
    label?: string
  }
  /** Locale for number formatting */
  locale?: string
  /** Whether progress is indeterminate */
  isIndeterminate?: boolean
}

/**
 * Enhanced Progress component built on top of HeroUI Progress
 * Provides advanced formatting, labeling, and validation features
 *
 * @example
 * ```tsx
 * // Basic progress
 * <Progress value={65} label="Upload Progress" />
 *
 * // Progress with custom formatting
 * <Progress
 *   value={1250}
 *   maxValue={2000}
 *   label="Download"
 *   formatOptions={{ style: "decimal", unit: "byte" }}
 * />
 *
 * // Indeterminate progress
 * <Progress
 *   isIndeterminate
 *   label="Processing..."
 *   showValueLabel={false}
 * />
 * ```
 */
export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value = 0,
      minValue = 0,
      maxValue = 100,
      color = "primary",

      size = "md",
      label,
      labelPosition = "top",
      valueLabel,
      showValueLabel = true,
      formatOptions = defaultProgressFormatOptions,
      classNames = {},
      locale,
      isIndeterminate = false,
      className,
      ...props
    },
    ref
  ): JSX.Element => {
    // Validate and normalize the progress value
    const normalizedValue = validateProgressValue(value, minValue, maxValue)

    // Prepare HeroUI Progress props
    const progressProps: HeroUIProgressProps = {
      value: normalizedValue,
      minValue,
      maxValue,
      color,
      size,
      isIndeterminate,
      showValueLabel: false,
      ...props,
      classNames: {
        ...classNames,
        base: mergeTailwindClasses("w-full", classNames.base),
      },
    }

    return (
      <div
        ref={ref}
        className={mergeTailwindClasses(
          "flex w-full max-w-md flex-col gap-2",
          classNames.container,
          className
        )}
      >
        <ProgressLabel
          label={label}
          value={normalizedValue}
          maxValue={maxValue}
          valueLabel={valueLabel}
          showValueLabel={showValueLabel && !isIndeterminate}
          formatOptions={formatOptions}
          position={labelPosition}
          className={classNames.label}
          locale={locale}
        />

        <HeroUIProgress {...progressProps} />
      </div>
    )
  }
)

Progress.displayName = "Progress"
