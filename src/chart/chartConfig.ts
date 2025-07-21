import {
  CategoryScale,
  Chart as ChartLibrary,
  Legend,
  LinearScale,
  Title,
  Tooltip,
  BarController,
  DoughnutController,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  ScatterController,
  PolarAreaController,
} from "chart.js";

/**
 * Chart.js registration utility
 * Centralizes all Chart.js component registration
 */
export const registerChartComponents = (): void => {
  ChartLibrary.register(
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    RadialLinearScale,
    BarElement,
    ArcElement,
    PointElement,
    LineElement,
    BarController,
    DoughnutController,
    ScatterController,
    PolarAreaController,
  );
};

/**
 * Default theme configuration for charts
 */
export const defaultChartTheme = {
  colors: {
    primary: "#3b82f6",
    secondary: "#8b5cf6", 
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444",
    background: "#ffffff",
    foreground: "#1f2937",
  },
  
  fonts: {
    title: {
      size: 16,
      weight: "bold" as const,
    },
    body: {
      size: 14,
      weight: "normal" as const,
    },
    legend: {
      size: 12,
      weight: "normal" as const,
    },
  },
  
  spacing: {
    padding: {
      top: 10,
      bottom: 20,
      left: 10,
      right: 10,
    },
    tooltip: 8,
  },
  
  borders: {
    width: 1,
    radius: 4,
  },
} as const;

/**
 * Default CSS classes for chart components
 */
export const defaultChartClasses = {
  root: "relative w-full h-max flex flex-col items-center border border-border justify-center bg-white dark:bg-content1 p-6 shadow-md rounded-xl",
  canvas: "w-full h-[400px]",
  title: "text-lg font-semibold text-center mb-4",
  legend: "mt-4",
  tooltip: "bg-white p-2 rounded shadow-lg border text-sm",
} as const;