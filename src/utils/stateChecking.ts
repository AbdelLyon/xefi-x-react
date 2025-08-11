import { isArray, isObject } from "./typeChecking";

/**
 * State checking utilities for empty/null validations
 */

export function isEmptyArray(value: unknown): boolean {
  return isArray(value) && value.length === 0;
}

export function isEmptyObject(value: unknown): boolean {
  return isObject(value) && Object.keys(value).length === 0;
}

export function isEmpty(value: unknown): boolean {
  if (isArray(value)) {
    return isEmptyArray(value);
  }
  if (isObject(value)) {
    return isEmptyObject(value);
  }
  return value === null || value === "";
}