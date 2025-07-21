/**
 * Formatting utilities for numbers, dates, and strings
 */
/**
 * Format number with locale-specific formatting
 */
export declare const formatNumber: (value: number, options?: Intl.NumberFormatOptions, locale?: string) => string;
/**
 * Format currency with proper locale formatting
 */
export declare const formatCurrency: (value: number, currency?: string, locale?: string) => string;
/**
 * Format percentage
 */
export declare const formatPercentage: (value: number, decimals?: number, locale?: string) => string;
/**
 * Format file size in human readable format
 */
export declare const formatFileSize: (bytes: number, decimals?: number) => string;
/**
 * Format duration in human readable format
 */
export declare const formatDuration: (milliseconds: number, options?: {
    format?: "short" | "long";
    maxUnit?: "days" | "hours" | "minutes" | "seconds";
}) => string;
/**
 * Format date with relative time (e.g., "2 hours ago")
 */
export declare const formatRelativeTime: (date: Date | string | number, locale?: string) => string;
/**
 * Format date with options
 */
export declare const formatDate: (date: Date | string | number, options?: Intl.DateTimeFormatOptions, locale?: string) => string;
/**
 * Format phone number
 */
export declare const formatPhoneNumber: (phoneNumber: string, format?: "international" | "national" | "e164") => string;
/**
 * Format credit card number
 */
export declare const formatCreditCard: (value: string) => string;
/**
 * Mask sensitive information
 */
export declare const maskString: (value: string, options?: {
    start?: number;
    end?: number;
    maskChar?: string;
}) => string;
/**
 * Truncate text with ellipsis
 */
export declare const truncateText: (text: string, maxLength: number, ellipsis?: string) => string;
/**
 * Convert to title case
 */
export declare const toTitleCase: (text: string) => string;
/**
 * Convert to kebab case
 */
export declare const toKebabCase: (text: string) => string;
/**
 * Convert to camel case
 */
export declare const toCamelCase: (text: string) => string;
/**
 * Convert to snake case
 */
export declare const toSnakeCase: (text: string) => string;
