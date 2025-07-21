/**
 * Type for component class names configuration
 */
export type ComponentClassNames<T extends Record<string, string>> = Partial<T>;
/**
 * Merge default and custom class names for components
 * Ensures proper Tailwind class merging and handles undefined values
 *
 * @example
 * ```tsx
 * const defaultClasses = {
 *   base: "flex items-center",
 *   content: "p-4 bg-white"
 * };
 *
 * const customClasses = {
 *   base: "justify-center",
 *   content: "bg-gray-100"
 * };
 *
 * const merged = mergeComponentClassNames(defaultClasses, customClasses);
 * // Result: {
 * //   base: "flex items-center justify-center",
 * //   content: "p-4 bg-gray-100"
 * // }
 * ```
 */
export declare const mergeComponentClassNames: <T extends Record<string, string>>(defaultClasses: T, customClasses?: ComponentClassNames<T>) => T;
/**
 * Create a class names configuration with proper defaults
*/
export declare const createClassNamesConfig: <T extends Record<string, string>>(defaultClasses: T) => {
    defaultClasses: T;
    mergeClasses: (customClasses?: Partial<Record<keyof T, string>>) => Record<keyof T, string>;
};
/**
 * Conditional class names utility
 * Helps with responsive and state-based class applications
 */
export declare const conditionalClasses: (conditions: Record<string, boolean | undefined>) => string;
/**
 * Variant-based class names utility
 */
export declare const variantClasses: <T extends string>(variant: T, variantMap: Record<T, string>, fallback?: string) => string;
/**
 * Size-based class names utility
 */
export declare const sizeClasses: <T extends string>(size: T, sizeMap: Record<T, string>, fallback?: string) => string;
/**
 * Color-based class names utility
 */
export declare const colorClasses: <T extends string>(color: T, colorMap: Record<T, string | Record<string, string>>, variant?: string, fallback?: string) => string;
