import { default as React } from 'react';
import { ChartData, ChartOptions, InteractionItem } from 'chart.js';
import { ChartProps } from 'react-chartjs-2';
import { ChartType, DefaultChartOptionsConfig } from './chartOptions';
/**
 * Custom styling options for chart components
 */
export interface ChartClassNames {
    root?: string;
    canvas?: string;
    title?: string;
    legend?: string;
    tooltip?: string;
}
/**
 * Enhanced Chart component props
 */
export interface ChartBaseProps<T extends ChartType> extends DefaultChartOptionsConfig<T> {
    /** Chart data */
    data: ChartData<T>;
    /** Chart options (will be merged with defaults) */
    options?: ChartOptions<T>;
    /** Chart type */
    type: T;
    /** Callback when chart elements are clicked */
    getElementSelected?: (elementSelected: InteractionItem[]) => void;
    /** Custom CSS classes for different parts */
    classNames?: ChartClassNames;
    /** Chart width */
    width?: number | string;
    /** Chart height */
    height?: number | string;
}
/**
 * Complete Chart component props
 */
export type ChartComponentProps<T extends ChartType> = ChartBaseProps<T> & Omit<ChartProps<T>, keyof ChartBaseProps<T>>;
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
export declare const Chart: React.ForwardRefExoticComponent<ChartBaseProps<keyof import('chart.js').ChartTypeRegistry> & Omit<ChartProps<keyof import('chart.js').ChartTypeRegistry, (number | import('chart.js').Point | [number, number] | import('chart.js').BubbleDataPoint | null)[], unknown>, keyof ChartBaseProps<T>> & React.RefAttributes<HTMLDivElement>>;
export type { ChartType, DefaultChartOptionsConfig };
export type { ChartData, ChartOptions, InteractionItem, TooltipItem, Chart as ChartJS, } from 'chart.js';
