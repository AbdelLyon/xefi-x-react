import type { JSX } from "react";
import React, { forwardRef } from "react";
import type {
  ChartData,
  ChartOptions,
  ChartTypeRegistry,
  InteractionItem,
  TooltipItem,
  Chart as ChartJS,
} from "chart.js";
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
import type { ChartProps } from "react-chartjs-2";
import { Chart as ChartRoot, getElementAtEvent } from "react-chartjs-2";
import { mergeTailwindClasses } from "@/utils";

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

type ChartType = keyof ChartTypeRegistry;

interface ChartClassNames {
  root?: string;
  canvas?: string;
  title?: string;
  legend?: string;
  tooltip?: string;
}

interface ChartBaseProps<T extends ChartType> {
  data: ChartData<T>;
  options?: ChartOptions<T>;
  type: T;
  getElementSelected?: (elementSelected: InteractionItem[]) => void;
  classNames?: ChartClassNames;
  width?: number | string;
  height?: number | string;
  responsive?: boolean;
  maintainAspectRatio?: boolean;
  title?: string;
  showLegend?: boolean;
  showTooltip?: boolean;
  legendPosition?: "top" | "bottom" | "left" | "right";
  customTooltip?: (context: TooltipItem<T>) => string | string[] | undefined;
}

type Props<T extends ChartType> = ChartBaseProps<T> &
  Omit<ChartProps<T>, keyof ChartBaseProps<T>>;

const defaultClassNames: Required<ChartClassNames> = {
  root: "relative w-full h-max flex flex-col items-center border border-border justify-center bg-white dark:bg-content1 p-6 shadow-md rounded-xl",
  canvas: "w-full h-[400px]",
  title: "text-lg font-semibold text-center mb-4",
  legend: "mt-4",
  tooltip: "bg-white p-2 rounded shadow-lg border text-sm",
};

export const Chart = forwardRef<HTMLDivElement, Props<ChartType>>(
  (
    {
      type,
      data,
      options,
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
    ref,
  ): JSX.Element => {
    // Fusion des classes
    const mergedClassNames = {
      root: mergeTailwindClasses(defaultClassNames.root, classNames.root),
      canvas: mergeTailwindClasses(defaultClassNames.canvas, classNames.canvas),
      title: mergeTailwindClasses(defaultClassNames.title, classNames.title),
      legend: mergeTailwindClasses(defaultClassNames.legend, classNames.legend),
      tooltip: mergeTailwindClasses(
        defaultClassNames.tooltip,
        classNames.tooltip,
      ),
    };

    const handleClick = (event: React.MouseEvent<HTMLCanvasElement>): void => {
      const chartElement = event.currentTarget;
      if (getElementSelected) {
        const clickedElements = getElementAtEvent(
          chartElement as unknown as ChartJS<keyof ChartTypeRegistry>,
          event,
        );

        if (clickedElements.length > 0) {
          getElementSelected(clickedElements);
        }
      }
    };

    const defaultOptions: ChartOptions<ChartType> = {
      responsive,
      maintainAspectRatio,
      plugins: {
        title: title
          ? {
              display: true,
              text: title,
              font: {
                size: 16,
                weight: "bold",
              },
              padding: {
                top: 10,
                bottom: 20,
              },
            }
          : undefined,

        legend: {
          display: showLegend,
          position: legendPosition,
        },

        tooltip: showTooltip
          ? {
              enabled: true,
              backgroundColor: "white",
              titleColor: "#1f2937",
              bodyColor: "#4b5563",
              borderColor: "#e5e7eb",
              borderWidth: 1,
              padding: 8,
              cornerRadius: 4,
              bodyFont: { size: 14 },
              titleFont: {
                size: 14,
                weight: "bold" as const,
              },
              ...(customTooltip && {
                callbacks: {
                  label: customTooltip,
                },
              }),
            }
          : undefined,
      },
    };

    const mergedOptions: ChartOptions<ChartType> = {
      ...defaultOptions,
      ...options,
    };

    return (
      <div ref={ref} className={mergedClassNames.root}>
        <ChartRoot
          data={data}
          options={mergedOptions}
          type={type}
          onClick={handleClick}
          className={mergedClassNames.canvas}
          {...props}
        />
      </div>
    );
  },
);

export type {
  ChartType,
  ChartClassNames,
  ChartTypeRegistry,
  ChartJS,
  ChartOptions,
  ChartProps,
  ChartBaseProps,
};
