/**
 * Chart.js registration utility
 * Centralizes all Chart.js component registration
 */
export declare const registerChartComponents: () => void;
/**
 * Default theme configuration for charts
 */
export declare const defaultChartTheme: {
    readonly colors: {
        readonly primary: "#3b82f6";
        readonly secondary: "#8b5cf6";
        readonly success: "#10b981";
        readonly warning: "#f59e0b";
        readonly danger: "#ef4444";
        readonly background: "#ffffff";
        readonly foreground: "#1f2937";
    };
    readonly fonts: {
        readonly title: {
            readonly size: 16;
            readonly weight: "bold";
        };
        readonly body: {
            readonly size: 14;
            readonly weight: "normal";
        };
        readonly legend: {
            readonly size: 12;
            readonly weight: "normal";
        };
    };
    readonly spacing: {
        readonly padding: {
            readonly top: 10;
            readonly bottom: 20;
            readonly left: 10;
            readonly right: 10;
        };
        readonly tooltip: 8;
    };
    readonly borders: {
        readonly width: 1;
        readonly radius: 4;
    };
};
/**
 * Default CSS classes for chart components
 */
export declare const defaultChartClasses: {
    readonly root: "relative w-full h-max flex flex-col items-center border border-border justify-center bg-white dark:bg-content1 p-6 shadow-md rounded-xl";
    readonly canvas: "w-full h-[400px]";
    readonly title: "text-lg font-semibold text-center mb-4";
    readonly legend: "mt-4";
    readonly tooltip: "bg-white p-2 rounded shadow-lg border text-sm";
};
