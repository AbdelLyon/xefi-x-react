import { Chart, CategoryScale, LinearScale, Title, Tooltip, Legend, RadialLinearScale, BarElement, ArcElement, PointElement, LineElement, BarController, DoughnutController, ScatterController, PolarAreaController } from "chart.js";
const registerChartComponents = () => {
  Chart.register(
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
    PolarAreaController
  );
};
const defaultChartTheme = {
  colors: {
    primary: "#3b82f6",
    secondary: "#8b5cf6",
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444",
    background: "#ffffff",
    foreground: "#1f2937"
  },
  fonts: {
    title: {
      size: 16,
      weight: "bold"
    },
    body: {
      size: 14,
      weight: "normal"
    },
    legend: {
      size: 12,
      weight: "normal"
    }
  },
  spacing: {
    padding: {
      top: 10,
      bottom: 20,
      left: 10,
      right: 10
    },
    tooltip: 8
  },
  borders: {
    width: 1,
    radius: 4
  }
};
const defaultChartClasses = {
  root: "relative w-full h-max flex flex-col items-center border border-border justify-center bg-white dark:bg-content1 p-6 shadow-md rounded-xl",
  canvas: "w-full h-[400px]",
  title: "text-lg font-semibold text-center mb-4",
  legend: "mt-4",
  tooltip: "bg-white p-2 rounded shadow-lg border text-sm"
};
export {
  defaultChartClasses,
  defaultChartTheme,
  registerChartComponents
};
