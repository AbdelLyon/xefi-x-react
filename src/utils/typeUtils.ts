/**
 * TypeScript utilities for better type safety across components
 * Provides common type guards, validators, and utility types
 */

import type { ReactNode } from "react";

/**
 * Type guard to check if a value is a non-empty string
 */
export const isNonEmptyString = (value: unknown): value is string => {
  return typeof value === "string" && value.length > 0;
};

/**
 * Type guard to check if a value is a valid React node
 */
export const isValidReactNode = (value: unknown): value is ReactNode => {
  return (
    value !== null &&
    value !== undefined &&
    (typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean" ||
      typeof value === "object")
  );
};

/**
 * Type guard for checking if value is a function
 */
export const isFunction = (value: unknown): value is (...args: unknown[]) => unknown => {
  return typeof value === "function";
};

/**
 * Type guard for checking if value is a valid number
 */
export const isValidNumber = (value: unknown): value is number => {
  return typeof value === "number" && !isNaN(value) && isFinite(value);
};

/**
 * Type guard for checking if value is a positive integer
 */
export const isPositiveInteger = (value: unknown): value is number => {
  return isValidNumber(value) && value > 0 && Number.isInteger(value);
};

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
export type ComponentColor =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger";

/**
 * Utility type for component visual variants
 */
export type ComponentVariant =
  | "solid"
  | "bordered"
  | "light"
  | "flat"
  | "faded"
  | "shadow"
  | "ghost";

/**
 * Creates a branded type to prevent value confusion
 */
export type Brand<T, B> = T & { readonly __brand: B; };

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
export const validateComponentProps = <T extends Record<string, unknown>>(
  props: T,
  validators: Partial<Record<keyof T, (value: unknown) => boolean>>,
): { valid: boolean; errors: string[]; } => {
  const errors: string[] = [];

  Object.entries(validators).forEach(([key, validator]) => {
    const value = props[key as keyof T];
    if (value !== undefined && validator && !validator(value)) {
      errors.push(`Invalid value for prop '${key}': ${String(value)}`);
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Safe prop extraction with fallback values
 */
export const extractProp = <T, K extends keyof T>(
  props: T,
  key: K,
  fallback: T[K],
): T[K] => {
  const value = props[key];
  return value !== undefined ? value : fallback;
};

/**
 * Safe prop extraction with validation
 */
export const extractValidatedProp = <T, K extends keyof T>(
  props: T,
  key: K,
  validator: (value: unknown) => boolean,
  fallback: T[K],
): T[K] => {
  const value = props[key];

  if (value !== undefined && validator(value)) {
    return value;
  }

  return fallback;
};

/**
 * Creates a type-safe prop picker function
 */
export const createPropPicker = <T extends Record<string, unknown>>(
  allowedKeys: readonly (keyof T)[],
) => {
  return (props: T): Pick<T, typeof allowedKeys[number]> => {
    const result = {} as Pick<T, typeof allowedKeys[number]>;

    allowedKeys.forEach((key) => {
      if (key in props) {
        result[key] = props[key];
      }
    });

    return result;
  };
};

/**
 * Creates a type-safe prop omitter function
 */
export const createPropOmitter = <T extends Record<string, unknown>>(
  excludedKeys: readonly (keyof T)[]
) => {
  return (props: T): Omit<T, (typeof excludedKeys)[number]> => {
    const result = {} as Omit<T, (typeof excludedKeys)[number]>;

    (Object.keys(props) as (keyof T)[]).forEach((key) => {
      if (!excludedKeys.includes(key)) {
        (result as T)[key] = props[key];
      }
    });

    return result;
  };
};


export const assertType = <T>(value: unknown, guard: (value: unknown) => value is T, message?: string): T => {
  if (process.env.NODE_ENV !== "production" && !guard(value)) {
    throw new Error(message ?? `Type assertion failed for value: ${String(value)}`);
  }

  return value as T;
};

/**
 * Runtime check for exhaustive type handling
 */
export const exhaustiveCheck = (value: never): never => {
  throw new Error(`Exhaustive check failed. Received unexpected value: ${String(value)}`);
};