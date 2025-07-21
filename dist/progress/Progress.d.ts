import { ReactNode } from 'react';
import { ProgressProps as HeroUIProgressProps } from '@heroui/react';
import { BaseComponentProps, Color } from '../types';
import { ProgressFormatOptions } from './progressUtils';
/**
 * Enhanced Progress component props
 */
export interface ProgressProps extends Omit<HeroUIProgressProps, "value" | "maxValue" | "minValue" | "color" | "size">, BaseComponentProps {
    /** Progress value */
    value?: number;
    /** Minimum value */
    minValue?: number;
    /** Maximum value */
    maxValue?: number;
    /** Progress color */
    color?: Color;
    /** Progress size */
    size?: "sm" | "md" | "lg";
    /** Label content */
    label?: ReactNode;
    /** Label position relative to progress bar */
    labelPosition?: "top" | "bottom" | "none";
    /** Custom value label (overrides formatted value) */
    valueLabel?: string;
    /** Whether to show value label */
    showValueLabel?: boolean;
    /** Format options for value display */
    formatOptions?: ProgressFormatOptions;
    /** Custom styling for different parts */
    classNames?: HeroUIProgressProps["classNames"] & {
        container?: string;
        label?: string;
    };
    /** Locale for number formatting */
    locale?: string;
    /** Whether progress is indeterminate */
    isIndeterminate?: boolean;
}
/**
 * Enhanced Progress component built on top of HeroUI Progress
 * Provides advanced formatting, labeling, and validation features
 *
 * @example
 * ```tsx
 * // Basic progress
 * <Progress value={65} label="Upload Progress" />
 *
 * // Progress with custom formatting
 * <Progress
 *   value={1250}
 *   maxValue={2000}
 *   label="Download"
 *   formatOptions={{ style: "decimal", unit: "byte" }}
 * />
 *
 * // Indeterminate progress
 * <Progress
 *   isIndeterminate
 *   label="Processing..."
 *   showValueLabel={false}
 * />
 * ```
 */
export declare const Progress: import('react').ForwardRefExoticComponent<Omit<ProgressProps, "ref"> & import('react').RefAttributes<HTMLDivElement>>;
