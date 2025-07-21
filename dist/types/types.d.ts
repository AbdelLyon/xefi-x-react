import { PressEvent } from '@heroui/react';
import { CSSProperties, ReactNode, default as React } from 'react';
/**
 * Core theme colors following design system principles
 */
export type BaseColor = "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
/**
 * Extended color palette including neutral options
 */
export type Color = "default" | BaseColor;
/**
 * Link-specific color variants
 */
export type LinkColor = "foreground" | BaseColor;
/**
 * Component visual variants
 */
export type Variant = "solid" | "bordered" | "flat" | "faded" | "light" | "shadow" | "ghost";
/**
 * Border radius values
 */
export type Radius = "none" | "sm" | "md" | "lg" | "full";
/**
 * Shadow intensity levels
 */
export type Shadow = "none" | "sm" | "md" | "lg";
/**
 * Standard component sizes
 */
export type Size = "xs" | "sm" | "md" | "lg" | "xl";
/**
 * Responsive breakpoint names
 */
export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
/**
 * Animation duration presets
 */
export type Duration = "fast" | "normal" | "slow";
/**
 * Flex direction values
 */
export type FlexDirection = "row" | "row-reverse" | "col" | "col-reverse";
/**
 * Justify content values
 */
export type JustifyContent = "start" | "center" | "end" | "between" | "around" | "evenly";
/**
 * Align items values
 */
export type AlignItems = "start" | "center" | "end" | "stretch" | "baseline";
/**
 * Text alignment options
 */
export type TextAlign = "left" | "center" | "right" | "justify";
/**
 * Spacing scale (Tailwind-compatible)
 */
export type Spacing = 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 14 | 16 | 20 | 24 | 28 | 32 | 36 | 40 | 44 | 48 | 52 | 56 | 60 | 64 | 72 | 80 | 96;
/**
 * Base props available to all components
 */
export interface BaseComponentProps {
    /** Custom CSS classes */
    className?: string;
    /** Test identifier for automated testing */
    "data-testid"?: string;
    /** Custom CSS styles */
    style?: CSSProperties;
    /** HTML id attribute */
    id?: string;
}
/**
 * Props for components that can show loading states
 */
export interface LoadingState {
    /** Whether component is in loading state */
    isLoading?: boolean;
    /** Custom loading text */
    loadingText?: string;
    /** Loading spinner size */
    loadingSize?: Size;
}
/**
 * Props for components with disabled states
 */
export interface DisabledState {
    /** Whether component is disabled */
    isDisabled?: boolean;
    /** Disable reason (for tooltips) */
    disabledReason?: string;
}
/**
 * Selection modes for list-like components
 */
export type SelectionMode = "none" | "single" | "multiple";
/**
 * Selection behavior options
 */
export type SelectionBehavior = "toggle" | "replace";
/**
 * Common event handler types
 */
export interface CommonEventHandlers<T = unknown> {
    /** Click handler */
    onClick?: (event: PressEvent) => void;
    /** Click start handler */
    onClickStart?: (event: PressEvent) => void;
    /** Click end handler */
    onClickEnd?: (event: PressEvent) => void;
    /** Value change handler */
    onChange?: (value: T) => void;
    /** Focus handler */
    onFocus?: (event: FocusEvent) => void;
    /** Blur handler */
    onBlur?: (event: FocusEvent) => void;
}
/**
 * Keyboard event handlers
 */
export interface KeyboardEventHandlers {
    /** Key down handler */
    onKeyDown?: (event: KeyboardEvent) => void;
    /** Key up handler */
    onKeyUp?: (event: KeyboardEvent) => void;
    /** Key press handler (deprecated but included for compatibility) */
    onKeyPress?: (event: KeyboardEvent) => void;
}
/**
 * Mouse event handlers
 */
export interface MouseEventHandlers {
    /** Mouse enter handler */
    onMouseEnter?: (event: MouseEvent) => void;
    /** Mouse leave handler */
    onMouseLeave?: (event: MouseEvent) => void;
    /** Mouse move handler */
    onMouseMove?: (event: MouseEvent) => void;
}
/**
 * ARIA attributes for accessibility
 */
export interface AccessibilityProps {
    /** Accessible label */
    "aria-label"?: string;
    /** ID of element that labels this component */
    "aria-labelledby"?: string;
    /** ID of element that describes this component */
    "aria-describedby"?: string;
    /** Whether element is expanded */
    "aria-expanded"?: boolean;
    /** Whether element is disabled */
    "aria-disabled"?: boolean;
    /** Whether element is required */
    "aria-required"?: boolean;
    /** Whether element has invalid value */
    "aria-invalid"?: boolean;
    /** Whether element is hidden from screen readers */
    "aria-hidden"?: boolean;
    /** Current value for progress/slider components */
    "aria-valuenow"?: number;
    /** Minimum value for range components */
    "aria-valuemin"?: number;
    /** Maximum value for range components */
    "aria-valuemax"?: number;
    /** Text representation of current value */
    "aria-valuetext"?: string;
}
/**
 * Focus management props
 */
export interface FocusableProps {
    /** Whether element can receive focus */
    tabIndex?: number;
    /** Whether to auto focus on mount */
    autoFocus?: boolean;
}
/**
 * Form field states
 */
export interface FormFieldState {
    /** Field value */
    value?: unknown;
    /** Whether field is invalid */
    isInvalid?: boolean;
    /** Whether field is required */
    isRequired?: boolean;
    /** Whether field is read-only */
    isReadOnly?: boolean;
    /** Error message */
    errorMessage?: string;
    /** Helper text */
    description?: string;
}
/**
 * Form validation result
 */
export interface ValidationResult {
    /** Whether validation passed */
    isValid: boolean;
    /** Array of error messages */
    errors: string[];
    /** Array of warning messages */
    warnings?: string[];
}
/**
 * Input types
 */
export type InputType = "text" | "email" | "password" | "number" | "tel" | "url" | "search" | "date" | "time" | "datetime-local";
/**
 * Container maximum widths
 */
export type ContainerSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
/**
 * Grid template columns
 */
export type GridCols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
/**
 * Aspect ratio values
 */
export type AspectRatio = "square" | "video" | "auto" | "portrait" | "landscape";
/**
 * Typography variants
 */
export type TypographyVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "body1" | "body2" | "caption" | "overline";
/**
 * Icon positions
 */
export type IconPosition = "start" | "end" | "top" | "bottom";
/**
 * Content with icon props
 */
export interface WithIcon {
    /** Icon element */
    icon?: ReactNode;
    /** Icon position */
    iconPosition?: IconPosition;
}
/**
 * Make all properties optional recursively
 */
export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends (infer U)[] ? DeepPartial<U>[] : T[P] extends object ? DeepPartial<T[P]> : T[P];
};
/**
 * Make specific properties required
 */
export type RequiredProps<T, K extends keyof T> = T & Required<Pick<T, K>>;
/**
 * Omit multiple keys
 */
export type OmitMultiple<T, K extends keyof T> = Omit<T, K>;
/**
 * Extract props from component type
 */
export type PropsOf<T> = T extends (props: infer P) => unknown ? P : never;
/**
 * Polymorphic component props
 */
export type PolymorphicProps<T = "div"> = {
    as?: T;
} & (T extends keyof React.JSX.IntrinsicElements ? React.JSX.IntrinsicElements[T] : Record<string, unknown>);
/**
 * Responsive value type
 */
export type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>;
/**
 * Option for select components
 */
export interface SelectOption<T = string> {
    /** Option value */
    value: T;
    /** Display label */
    label: string;
    /** Whether option is disabled */
    disabled?: boolean;
    /** Optional description */
    description?: string;
    /** Optional icon */
    icon?: ReactNode;
}
/**
 * Tree node structure
 */
export interface TreeNode<T = unknown> {
    /** Node ID */
    id: string;
    /** Node label */
    label: string;
    /** Node value */
    value?: T;
    /** Child nodes */
    children?: TreeNode<T>[];
    /** Whether node is expanded */
    expanded?: boolean;
    /** Whether node is disabled */
    disabled?: boolean;
    /** Optional icon */
    icon?: ReactNode;
}
/**
 * Pagination info
 */
export interface PaginationState {
    /** Current page (1-based) */
    page: number;
    /** Items per page */
    pageSize: number;
    /** Total number of items */
    total: number;
    /** Total number of pages */
    totalPages: number;
}
/**
 * API response wrapper
 */
export interface ApiResponse<T = unknown> {
    /** Response data */
    data: T;
    /** Success status */
    success: boolean;
    /** Error message if any */
    message?: string;
    /** Additional metadata */
    meta?: Record<string, unknown>;
}
/**
 * Async operation state
 */
export interface AsyncState<T = unknown, E = Error> {
    /** Operation data */
    data: T | null;
    /** Loading state */
    loading: boolean;
    /** Error if any */
    error: E | null;
    /** Whether operation completed */
    completed: boolean;
}
