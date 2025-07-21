import { mergeTailwindClasses } from "./utils"

/**
 * Type for component class names configuration
 */
export type ComponentClassNames<T extends Record<string, string>> = Partial<T>

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
export const mergeComponentClassNames = <T extends Record<string, string>>(
  defaultClasses: T,
  customClasses?: ComponentClassNames<T>,
): T => {
  if (!customClasses) {
    return defaultClasses;
  }

  const merged = { ...defaultClasses } as T;

  // Merge existing keys from default classes
  Object.keys(defaultClasses).forEach((key) => {
    const typedKey = key as keyof T;
    const defaultClass = defaultClasses[typedKey];
    const customClass = customClasses[typedKey];

    if (customClass !== undefined) {
      merged[typedKey] = mergeTailwindClasses(defaultClass, customClass) as T[keyof T];
    }
  });

  // Add custom keys that don't exist in default classes
  Object.keys(customClasses).forEach((key) => {
    const typedKey = key as keyof T;
    if (!(typedKey in defaultClasses) && customClasses[typedKey] !== undefined) {
      merged[typedKey] = mergeTailwindClasses(customClasses[typedKey]) as T[keyof T];
    }
  });

  return merged
}

/**
 * Create a class names configuration with proper defaults
*/
export const createClassNamesConfig = <T extends Record<string, string>>(
  defaultClasses: T,
): {
  defaultClasses: T;
  mergeClasses: (customClasses?: Partial<Record<keyof T, string>>) => Record<keyof T, string>;
} => {
  return {
    defaultClasses,
    mergeClasses: (customClasses) => mergeComponentClassNames(defaultClasses, customClasses),
  };
};



/**
 * Conditional class names utility
 * Helps with responsive and state-based class applications
 */
export const conditionalClasses = (
  conditions: Record<string, boolean | undefined>,
): string => {
  return Object.entries(conditions)
    .filter(([_, condition]) => Boolean(condition))
    .map(([className]) => className)
    .join(" ")
}

/**
 * Variant-based class names utility
 */
export const variantClasses = <T extends string>(
  variant: T,
  variantMap: Record<T, string>,
  fallback = "",
): string => {
  return variantMap[variant] || fallback
}

/**
 * Size-based class names utility
 */
export const sizeClasses = <T extends string>(
  size: T,
  sizeMap: Record<T, string>,
  fallback = "",
): string => {
  return sizeMap[size] || fallback
}

/**
 * Color-based class names utility
 */
export const colorClasses = <T extends string>(
  color: T,
  colorMap: Record<T, string | Record<string, string>>,
  variant?: string,
  fallback = "",
): string => {
  const colorConfig = colorMap[color]
  if (!colorConfig) { 
    return fallback 
  }

  if (typeof colorConfig === "string") {
    return colorConfig
  }

  if (variant && colorConfig[variant]) {
    return colorConfig[variant]
  }

  return fallback
}