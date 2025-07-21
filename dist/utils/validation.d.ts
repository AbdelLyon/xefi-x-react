/**
 * Validation utilities for forms and data
 */
export type ValidationResult = {
    isValid: boolean;
    errors: string[];
};
export type ValidationRule<T = unknown> = {
    test: (value: T) => boolean;
    message: string;
};
export declare const isEmail: (email: string) => boolean;
export declare const isUrl: (url: string) => boolean;
export declare const isPhone: (phone: string) => boolean;
export declare const isStrongPassword: (password: string) => boolean;
export declare const validationRules: {
    required: <T>(message?: string) => ValidationRule<T>;
    email: (message?: string) => ValidationRule<string>;
    url: (message?: string) => ValidationRule<string>;
    phone: (message?: string) => ValidationRule<string>;
    minLength: (min: number, message?: string) => ValidationRule<string>;
    maxLength: (max: number, message?: string) => ValidationRule<string>;
    min: (min: number, message?: string) => ValidationRule<number>;
    max: (max: number, message?: string) => ValidationRule<number>;
    pattern: (pattern: RegExp, message?: string) => ValidationRule<string>;
    strongPassword: (message?: string) => ValidationRule<string>;
    match: <T>(targetValue: T, message?: string) => ValidationRule<T>;
    oneOf: <T>(allowedValues: T[], message?: string) => ValidationRule<T>;
    custom: <T>(fn: (value: T) => boolean, message: string) => ValidationRule<T>;
};
/**
 * Validate a value against multiple rules
 */
export declare const validate: <T>(value: T, rules: ValidationRule<T>[]) => ValidationResult;
/**
 * Validate an object against a schema
 */
export declare const validateSchema: <T extends Record<string, unknown>>(data: T, schema: Record<keyof T, ValidationRule<T[keyof T]>[]>) => Record<keyof T, ValidationResult> & {
    isValid: boolean;
};
/**
 * Create a debounced validator
 */
export declare const createDebouncedValidator: <T>(validator: (value: T) => ValidationResult | Promise<ValidationResult>, delay?: number) => (value: T) => Promise<ValidationResult>;
