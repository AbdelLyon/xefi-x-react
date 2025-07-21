import { JSX, ReactNode } from 'react';
import { ProgressFormatOptions } from './progressUtils';
/**
 * Props for ProgressLabel component
 */
export interface ProgressLabelProps {
    /** Label text */
    label?: ReactNode;
    /** Current progress value */
    value: number;
    /** Maximum progress value */
    maxValue: number;
    /** Custom value label */
    valueLabel?: string;
    /** Whether to show the value label */
    showValueLabel: boolean;
    /** Format options for value display */
    formatOptions: ProgressFormatOptions;
    /** Label position */
    position: "top" | "bottom" | "none";
    /** Custom CSS class */
    className?: string;
    /** Locale for formatting */
    locale?: string;
}
/**
 * Progress label component with flexible positioning and formatting
 */
export declare const ProgressLabel: ({ label, value, maxValue, valueLabel, showValueLabel, formatOptions, position, className, locale, }: ProgressLabelProps) => JSX.Element | null;
