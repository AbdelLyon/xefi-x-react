import type { ChartOptions, ChartTypeRegistry, TooltipItem } from "chart.js";
import { defaultChartTheme } from "./chartConfig";

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
export const createDefaultChartOptions = <T extends ChartType>(
  config: DefaultChartOptionsConfig<T> = {},
): ChartOptions<T> => {
  const {
    responsive = true,
    maintainAspectRatio = false,
    title,
    showLegend = true,
    showTooltip = true,
    legendPosition = "top",
    customTooltip,
  } = config;

  return {
    responsive,
    maintainAspectRatio,
    plugins: {
      title: title
        ? {
          display: true,
          text: title,
          font: defaultChartTheme.fonts.title,
          padding: defaultChartTheme.spacing.padding,
        }
        : undefined,

      legend: {
        display: showLegend,
        position: legendPosition,
        labels: {
          font: defaultChartTheme.fonts.legend,
        },
      },

      tooltip: showTooltip
        ? {
          enabled: true,
          backgroundColor: defaultChartTheme.colors.background,
          titleColor: defaultChartTheme.colors.foreground,
          bodyColor: "#4b5563",
          borderColor: "#e5e7eb",
          borderWidth: defaultChartTheme.borders.width,
          padding: defaultChartTheme.spacing.tooltip,
          cornerRadius: defaultChartTheme.borders.radius,
          bodyFont: defaultChartTheme.fonts.body,
          titleFont: defaultChartTheme.fonts.title,
          ...(customTooltip && {
            callbacks: {
              label: customTooltip,
            },
          }),
        }
        : { enabled: false },
    },
  } as ChartOptions<T>;
};

/**
 * Merges user options with default options
 */
export const mergeChartOptions = <T extends ChartType>(
  defaultOptions: ChartOptions<T>,
  userOptions?: ChartOptions<T>,
): ChartOptions<T> => {
  if (!userOptions) { return defaultOptions; }

  return {
    ...defaultOptions,
    ...userOptions,
    plugins: {
      ...(defaultOptions?.plugins || {}),
      ...(userOptions?.plugins || {}),
    },
  };
};