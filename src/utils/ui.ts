/**
 * UI utilities for DOM attributes and interface helpers
 */

// Types
type Booleanish = boolean | "true" | "false";

export const dataAttr = (condition: boolean | undefined): Booleanish =>
  (condition ? "true" : undefined) as Booleanish;

export const generateUniqueId = (prefix: string): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${prefix}-${timestamp}-${random}`;
};

export const formatArrayWithZeroLast = <T>(array: T[]): T[] => {
  const zeroIndex = array.findIndex((item) => String(item) === "0");
  if (zeroIndex === -1) {
    return array;
  }

  return [...array.slice(0, zeroIndex), ...array.slice(zeroIndex + 1), array[zeroIndex]];
};