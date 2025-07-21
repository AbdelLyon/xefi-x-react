import type { JSX } from "react"
import React, { forwardRef } from "react"
import type {
  ChartData,
  ChartOptions,
  InteractionItem,
  Chart as ChartJS,
} from "chart.js"
import type { ChartProps } from "react-chartjs-2"
import { Chart as ChartRoot, getElementAtEvent } from "react-chartjs-2"
import { mergeTailwindClasses } from "@/utils"
import { registerChartComponents, defaultChartClasses } from "./chartConfig"
import {
  createDefaultChartOptions,
  mergeChartOptions,
  type ChartType,
  type DefaultChartOptionsConfig,
} from "./chartOptions"

// Register Chart.js components on module load
registerChartComponents()

/**
 * Custom styling options for chart components
 */
export interface ChartClassNames {
  root?: string
  canvas?: string
  title?: string
  legend?: string
  tooltip?: string
}

/**
 * Enhanced Chart component props
 */
export interface ChartBaseProps<T extends ChartType>
  extends DefaultChartOptionsConfig<T> {
  /** Chart data */
  data: ChartData<T>
  /** Chart options (will be merged with defaults) */
  options?: ChartOptions<T>
  /** Chart type */
  type: T
  /** Callback when chart elements are clicked */
  getElementSelected?: (elementSelected: InteractionItem[]) => void
  /** Custom CSS classes for different parts */
  classNames?: ChartClassNames
  /** Chart width */
  width?: number | string
  /** Chart height */
  height?: number | string
}

/**
 * Complete Chart component props
 */
export type ChartComponentProps<T extends ChartType> = ChartBaseProps<T> &
  Omit<ChartProps<T>, keyof ChartBaseProps<T>>

/**
 * Enhanced Chart component built on top of react-chartjs-2
 * Provides theming, responsive behavior, and interaction handling
 *
 * @example
 * ```tsx
 * // Basic chart
 * <Chart
 *   type="bar"
 *   data={chartData}
 *   title="Sales Report"
 *   showLegend={true}
 * />
 *
 * // Chart with custom options and click handling
 * <Chart
 *   type="doughnut"
 *   data={pieData}
 *   options={{ cutout: '60%' }}
 *   getElementSelected={(elements) => console.log(elements)}
 *   customTooltip={(context) => `${context.label}: ${context.parsed}`}
 * />
 * ```
 */
export const Chart = forwardRef<HTMLDivElement, ChartComponentProps<ChartType>>(
  (
    {
      type,
      data,
      options: userOptions,
      getElementSelected,
      classNames = {},
      responsive = true,
      maintainAspectRatio = false,
      title,
      showLegend = true,
      showTooltip = true,
      legendPosition = "top",
      customTooltip,
      ...props
    },
    ref
  ): JSX.Element => {
    // Merge custom classes with defaults
    const mergedClassNames = {
      root: mergeTailwindClasses(defaultChartClasses.root, classNames.root),
      canvas: mergeTailwindClasses(
        defaultChartClasses.canvas,
        classNames.canvas
      ),
      title: mergeTailwindClasses(defaultChartClasses.title, classNames.title),
      legend: mergeTailwindClasses(
        defaultChartClasses.legend,
        classNames.legend
      ),
      tooltip: mergeTailwindClasses(
        defaultChartClasses.tooltip,
        classNames.tooltip
      ),
    }

    // Handle chart element click events
    const handleClick = (event: React.MouseEvent<HTMLCanvasElement>): void => {
      if (!getElementSelected) {
        return
      }

      const chartElement = event.currentTarget
      const clickedElements = getElementAtEvent(
        chartElement as unknown as ChartJS<
          | "line"
          | "bar"
          | "radar"
          | "doughnut"
          | "pie"
          | "polarArea"
          | "bubble"
          | "scatter"
        >,
        event
      )

      if (clickedElements.length > 0) {
        getElementSelected(clickedElements)
      }
    }

    // Create and merge chart options
    const defaultOptions = createDefaultChartOptions({
      responsive,
      maintainAspectRatio,
      title,
      showLegend,
      showTooltip,
      legendPosition,
      customTooltip,
    })

    const finalOptions = mergeChartOptions(defaultOptions, userOptions)

    return (
      <div ref={ref} className={mergedClassNames.root}>
        <ChartRoot
          data={data}
          options={finalOptions}
          type={type}
          onClick={handleClick}
          className={mergedClassNames.canvas}
          {...props}
        />
      </div>
    )
  }
)

Chart.displayName = "Chart"

// Re-export types for external use
export type { ChartType, DefaultChartOptionsConfig }

// Re-export Chart.js types for convenience
export type {
  ChartData,
  ChartOptions,
  InteractionItem,
  TooltipItem,
  Chart as ChartJS,
} from "chart.js"
