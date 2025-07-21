/**
 * Progress component utilities and formatters
 */

/**
 * Format options for progress value display
 */
export interface ProgressFormatOptions extends Intl.NumberFormatOptions {
  /** Format style (percent, decimal, etc.) */
  style?: "percent" | "decimal" | "currency"
}

/**
 * Default format options for progress values
 */
export const defaultProgressFormatOptions: ProgressFormatOptions = {
  style: "percent",
  minimumFractionDigits: 0,
  maximumFractionDigits: 1,
} as const

/**
 * Format progress value using Intl.NumberFormat
 */
export const formatProgressValue = (
  value: number,
  maxValue: number = 100,
  formatOptions: ProgressFormatOptions = defaultProgressFormatOptions,
  locale?: string,
): string => {
  try {
    const normalizedValue = value / maxValue
    return new Intl.NumberFormat(locale, formatOptions).format(normalizedValue)
  } catch (error) {
    console.warn("Progress value formatting failed:", error)
    return `${Math.round((value / maxValue) * 100)}%`
  }
}

/**
 * Calculate percentage from value and max value
 */
export const calculatePercentage = (
  value: number,
  maxValue: number = 100,
): number => {
  if (maxValue === 0) {
    return 0
  }
  return Math.min(Math.max((value / maxValue) * 100, 0), 100)
}

/**
 * Validate progress value
 */
export const validateProgressValue = (
  value: number,
  minValue: number = 0,
  maxValue: number = 100,
): number => {
  return Math.min(Math.max(value, minValue), maxValue)
}

/**
 * Get progress status based on value
 */
export const getProgressStatus = (
  value: number,
  maxValue: number = 100,
): "empty" | "low" | "medium" | "high" | "complete" => {
  const percentage = calculatePercentage(value, maxValue)
  
  if (percentage === 0) {
    return "empty"
  }
  if (percentage < 25) {
    return "low"
  }
  if (percentage < 50) {
    return "medium"
  }
  if (percentage < 100) {
    return "high"
  }
  return "complete"
}