import { ChartOptions, ChartTypeRegistry, TooltipItem } from 'chart.js';
export type ChartType = keyof ChartTypeRegistry;
/**
 * Options for creating default chart configuration
 */
export interface DefaultChartOptionsConfig<T extends ChartType> {
    responsive?: boolean;
    maintainAspectRatio?: boolean;
    title?: string;
    showLegend?: boolean;
    showTooltip?: boolean;
    legendPosition?: "top" | "bottom" | "left" | "right";
    customTooltip?: (context: TooltipItem<T>) => string | string[] | undefined;
}
/**
 * Creates default chart options with theme integration
 */
export declare const createDefaultChartOptions: <T extends ChartType>(config?: DefaultChartOptionsConfig<T>) => ChartOptions<T>;
/**
 * Merges user options with default options
 */
export declare const mergeChartOptions: <T extends ChartType>(defaultOptions: ChartOptions<T>, userOptions?: ChartOptions<T>) => ChartOptions<T>;
