import { ReactNode } from 'react';
/**
 * Type guard to check if a value is a non-empty string
 */
export declare const isNonEmptyString: (value: unknown) => value is string;
/**
 * Type guard to check if a value is a valid React node
 */
export declare const isValidReactNode: (value: unknown) => value is ReactNode;
/**
 * Type guard for checking if value is a function
 */
export declare const isFunction: (value: unknown) => value is (...args: unknown[]) => unknown;
/**
 * Type guard for checking if value is a valid number
 */
export declare const isValidNumber: (value: unknown) => value is number;
/**
 * Type guard for checking if value is a positive integer
 */
export declare const isPositiveInteger: (value: unknown) => value is number;
/**
 * Utility type for making specific properties optional
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
/**
 * Utility type for making specific properties required
 */
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;
/**
 * Utility type for extracting union values as literal types
 */
export type LiteralUnion<T extends string> = T | (string & {});
/**
 * Utility type for component props that can be styled
 */
export type StylableComponent<T = object> = T & {
    className?: string;
    style?: React.CSSProperties;
    "data-testid"?: string;
};
/**
 * Utility type for components that can have loading states
 */
export type LoadableComponent<T = object> = T & {
    loading?: boolean;
    loadingText?: string;
    loadingSpinner?: ReactNode;
};
/**
 * Utility type for components with async actions
 */
export type AsyncActionComponent<T = object, R = unknown> = T & {
    onAction?: () => void | Promise<void>;
    onSuccess?: (result?: R) => void;
    onError?: (error: Error) => void;
};
/**
 * Utility type for form validation functions
 */
export type ValidationFunction<T = string> = (value: T) => boolean | string | Promise<boolean | string>;
/**
 * Utility type for component size variants
 */
export type ComponentSize = "xs" | "sm" | "md" | "lg" | "xl";
/**
 * Utility type for component color variants
 */
export type ComponentColor = "default" | "primary" | "secondary" | "success" | "warning" | "danger";
/**
 * Utility type for component visual variants
 */
export type ComponentVariant = "solid" | "bordered" | "light" | "flat" | "faded" | "shadow" | "ghost";
/**
 * Creates a branded type to prevent value confusion
 */
export type Brand<T, B> = T & {
    readonly __brand: B;
};
/**
 * Utility for creating strictly typed event handlers
 */
export type EventHandler<T extends Event = Event> = (event: T) => void;
/**
 * Utility for creating strictly typed async event handlers
 */
export type AsyncEventHandler<T extends Event = Event> = (event: T) => Promise<void>;
/**
 * Runtime validation for component props
 */
export declare const validateComponentProps: <T extends Record<string, unknown>>(props: T, validators: Partial<Record<keyof T, (value: unknown) => boolean>>) => {
    valid: boolean;
    errors: string[];
};
/**
 * Safe prop extraction with fallback values
 */
export declare const extractProp: <T, K extends keyof T>(props: T, key: K, fallback: T[K]) => T[K];
/**
 * Safe prop extraction with validation
 */
export declare const extractValidatedProp: <T, K extends keyof T>(props: T, key: K, validator: (value: unknown) => boolean, fallback: T[K]) => T[K];
/**
 * Creates a type-safe prop picker function
 */
export declare const createPropPicker: <T extends Record<string, unknown>>(allowedKeys: readonly (keyof T)[]) => (props: T) => Pick<T, (typeof allowedKeys)[number]>;
/**
 * Creates a type-safe prop omitter function
 */
export declare const createPropOmitter: <T extends Record<string, unknown>>(excludedKeys: readonly (keyof T)[]) => (props: T) => Omit<T, (typeof excludedKeys)[number]>;
export declare const assertType: <T>(value: unknown, guard: (value: unknown) => value is T, message?: string) => T;
/**
 * Runtime check for exhaustive type handling
 */
export declare const exhaustiveCheck: (value: never) => never;
