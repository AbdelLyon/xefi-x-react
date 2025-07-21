import "@/index.css";

export { Chart } from "./Chart";
export type {
  ChartComponentProps,
  ChartClassNames,
  ChartType,
  DefaultChartOptionsConfig,
  ChartData,
  ChartOptions,
  InteractionItem,
  TooltipItem,
  ChartJS,
} from "./Chart";

// Export utilities for advanced usage
export { 
  registerChartComponents, 
  defaultChartTheme, 
  defaultChartClasses 
} from "./chartConfig";

export {
  createDefaultChartOptions,
  mergeChartOptions,
} from "./chartOptions";