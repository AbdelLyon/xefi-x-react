/**
 * Component development helpers and patterns
 * Standardizes common patterns across all components
 */

import { mergeTailwindClasses } from "./utils"
import { mergeComponentClassNames, type ComponentClassNames } from "./classNames"

/**
 * Standard props interface for component styling
 */
export interface StandardComponentProps {
  /** Root CSS class */
  className?: string
  /** Test ID for testing */
  "data-testid"?: string
  /** HTML ID attribute */
  id?: string
}

/**
 * Creates a standardized props merger for components
 * Ensures className is properly merged with defaults
 */
export const createPropsMerger = <T extends Record<string, unknown>>(
  defaultProps: Partial<T>,
) => {
  return (userProps: T): T => {
    const merged = { ...defaultProps, ...userProps } as T & { className?: string }

    // Special handling for className merging
    if ("className" in defaultProps && "className" in userProps) {
      merged.className = mergeTailwindClasses(
        defaultProps.className as string,
        userProps.className as string,
      )
    }

    return merged
  }
}

/**
 * Component class names management helper
 * Provides a consistent way to handle component styling
 */
export class ComponentStyleManager<T extends Record<string, string>> {
  private defaultClasses: T;

  constructor(defaultClasses: T) {
    this.defaultClasses = defaultClasses
  }

  /**
   * Merge user classes with defaults
   */
  merge(userClasses?: ComponentClassNames<T>): T {
    return mergeComponentClassNames(this.defaultClasses, userClasses)
  }

  /**
   * Get specific class with fallback
   */
  getClass(key: keyof T, userClasses?: ComponentClassNames<T>, fallback = ""): string {
    const merged = this.merge(userClasses)
    return merged[key] || fallback
  }

  /**
   * Apply conditional classes
   */
  conditional(
    key: keyof T,
    condition: boolean | undefined,
    conditionalClass: string,
    userClasses?: ComponentClassNames<T>,
  ): string {
    const baseClass = this.getClass(key, userClasses)
    return mergeTailwindClasses(
      baseClass,
      condition ? conditionalClass : "",
    )
  }
}

/**
 * Validates that a component properly handles className merging
 * Useful for development and testing
 */
export const validateClassMerging = (
  componentProps: Record<string, unknown>,
  expectedKeys: string[],
): { valid: boolean; issues: string[] } => {
  const issues: string[] = []

  // Check if className is handled
  if ("className" in componentProps && typeof componentProps.className !== "string") {
    issues.push("className prop is not a string")
  }

  // Check if classNames object is properly typed
  if ("classNames" in componentProps) {
    const classNames = componentProps.classNames as Record<string, unknown>
    if (classNames && typeof classNames === "object") {
      Object.keys(classNames).forEach(key => {
        if (!expectedKeys.includes(key)) {
          issues.push(`Unexpected classNames key: ${key}`)
        }
        if (typeof classNames[key] !== "string" && classNames[key] !== undefined) {
          issues.push(`classNames.${key} should be string or undefined`)
        }
      })
    }
  }

  return {
    valid: issues.length === 0,
    issues,
  }
}

/**
 * Development-only class name validator
 * Helps ensure proper Tailwind class usage
 */
export const validateTailwindClasses = (
  classes: string,
  componentName?: string,
): { valid: boolean; warnings: string[] } => {
  const warnings: string[] = []

  // Check for common issues
  if (classes.includes("  ")) {
    warnings.push("Multiple consecutive spaces found in classes")
  }

  if (classes.startsWith(" ") || classes.endsWith(" ")) {
    warnings.push("Classes string has leading or trailing spaces")
  }

  // Check for potentially conflicting classes
  const classArray = classes.split(" ").filter(Boolean)
  const hasConflicts = {
    padding: classArray.some(c => c.startsWith("p-")) && classArray.some(c => c.startsWith("px-") || c.startsWith("py-")),
    margin: classArray.some(c => c.startsWith("m-")) && classArray.some(c => c.startsWith("mx-") || c.startsWith("my-")),
    background: classArray.filter(c => c.startsWith("bg-")).length > 1,
  }

  Object.entries(hasConflicts).forEach(([type, hasConflict]) => {
    if (hasConflict) {
      warnings.push(`Potential ${type} class conflicts detected`)
    }
  })

  if (componentName && warnings.length > 0) {
    console.warn(`[${componentName}] Class validation warnings:`, warnings)
  }

  return {
    valid: warnings.length === 0,
    warnings,
  }
}

/**
 * Component development best practices checker
 */
export const checkComponentBestPractices = <T extends Record<string, unknown>>(
  componentName: string,
  props: T,
  classNamesConfig?: { expectedKeys: string[]; },
): void => {
  if (process.env.NODE_ENV === "production") { 
    return 
  }

  const issues: string[] = []

  // Check className merging
  if (classNamesConfig) {
    const validation = validateClassMerging(props, classNamesConfig.expectedKeys)
    if (!validation.valid) {
      issues.push(...validation.issues)
    }
  }

  // Check Tailwind classes if className is present
  if ("className" in props && typeof props.className === "string") {
    const { warnings } = validateTailwindClasses(props.className as string, componentName)
    if (warnings.length > 0) {
      issues.push(...warnings.map(w => `className: ${w}`))
    }
  }

  if (issues.length > 0) {
    console.warn(`[${componentName}] Component issues detected:`, issues)
  }
}