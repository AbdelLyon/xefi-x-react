import { ChipProps as HeroUIChipProps } from '@heroui/react';
import { StylableComponent } from '../utils/typeUtils';
/**
 * Enhanced Chip component interface
 */
export interface ChipProps extends Omit<HeroUIChipProps, "variant" | "color" | "size" | "classNames">, StylableComponent {
    /** Chip variant */
    variant?: "solid" | "bordered" | "light" | "flat" | "faded" | "shadow" | "dot";
    /** Chip color theme */
    color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
    /** Chip size */
    size?: "sm" | "md" | "lg";
    /** Whether chip is selectable */
    selectable?: boolean;
    /** Whether chip is selected (for selectable chips) */
    isSelected?: boolean;
    /** Selection change handler */
    onSelectionChange?: (isSelected: boolean) => void;
    /** Custom close handler with animation support */
    onClose?: () => void | Promise<void>;
    /** Whether to show animation on interactions */
    animated?: boolean;
    /** Custom class names for different parts */
    classNames?: {
        base?: string;
        content?: string;
        dot?: string;
        avatar?: string;
        closeButton?: string;
    };
    /** Validation mode for development */
    validateConfig?: boolean;
    /** Custom click handler */
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    /** Tooltip content */
    tooltip?: string;
}
/**
 * Enhanced Chip component built on top of HeroUI Chip
 * Provides selection states, animations, and professional styling
 */
export declare const Chip: import('react').ForwardRefExoticComponent<Omit<ChipProps, "ref"> & import('react').RefAttributes<HTMLDivElement>>;
/**
 * ChipGroup component for managing multiple chips
 */
export interface ChipGroupProps extends StylableComponent {
    /** Array of chip data */
    chips: (ChipProps & {
        key?: string;
    })[];
    /** Whether chips are selectable */
    selectable?: boolean;
    /** Selection mode */
    selectionMode?: "single" | "multiple";
    /** Selected chip keys */
    selectedKeys?: Set<string>;
    /** Selection change handler */
    onSelectionChange?: (keys: Set<string>) => void;
    /** Group spacing */
    spacing?: "sm" | "md" | "lg";
    /** Group orientation */
    orientation?: "horizontal" | "vertical";
    /** Whether to wrap chips */
    wrap?: boolean;
    /** Whether group is disabled */
    isDisabled?: boolean;
}
/**
 * ChipGroup component for organizing multiple chips
 */
export declare const ChipGroup: import('react').ForwardRefExoticComponent<ChipGroupProps & import('react').RefAttributes<HTMLDivElement>>;
