import { default as React } from 'react';
import { ChartData, ChartOptions, ChartTypeRegistry, InteractionItem, TooltipItem, Chart as ChartJS } from 'chart.js';
import { ChartProps } from 'react-chartjs-2';
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
export declare const Chart: React.ForwardRefExoticComponent<ChartBaseProps<keyof ChartTypeRegistry> & Omit<ChartProps<keyof ChartTypeRegistry, (number | import('chart.js').Point | [number, number] | import('chart.js').BubbleDataPoint | null)[], unknown>, keyof ChartBaseProps<T>> & React.RefAttributes<HTMLDivElement>>;
export type { ChartType, ChartClassNames, ChartTypeRegistry, ChartJS, ChartOptions, ChartProps, ChartBaseProps, };
