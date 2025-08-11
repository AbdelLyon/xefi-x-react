/**
 * Number utilities for numerical operations and validations
 */

export const clampNumber = (
  value: number,
  min: number | undefined,
  max: number | undefined,
): number => {
  if (min === undefined && max === undefined) {
    return value;
  }
  if (min !== undefined && max === undefined) {
    return Math.max(value, min);
  }
  if (min === undefined && max !== undefined) {
    return Math.min(value, max);
  }
  if (min !== undefined && max !== undefined) {
    return Math.min(Math.max(value, min), max);
  }
  return value;
};

export const isNumeric = (value?: string | number): boolean =>
  value !== undefined && value !== null && parseInt(value.toString(), 10) > 0;