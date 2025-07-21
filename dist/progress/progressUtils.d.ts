/**
 * Progress component utilities and formatters
 */
/**
 * Format options for progress value display
 */
export interface ProgressFormatOptions extends Intl.NumberFormatOptions {
    /** Format style (percent, decimal, etc.) */
    style?: "percent" | "decimal" | "currency";
}
/**
 * Default format options for progress values
 */
export declare const defaultProgressFormatOptions: ProgressFormatOptions;
/**
 * Format progress value using Intl.NumberFormat
 */
export declare const formatProgressValue: (value: number, maxValue?: number, formatOptions?: ProgressFormatOptions, locale?: string) => string;
/**
 * Calculate percentage from value and max value
 */
export declare const calculatePercentage: (value: number, maxValue?: number) => number;
/**
 * Validate progress value
 */
export declare const validateProgressValue: (value: number, minValue?: number, maxValue?: number) => number;
/**
 * Get progress status based on value
 */
export declare const getProgressStatus: (value: number, maxValue?: number) => "empty" | "low" | "medium" | "high" | "complete";
