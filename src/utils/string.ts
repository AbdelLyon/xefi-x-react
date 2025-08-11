import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * String utilities for text manipulation and formatting
 */

export const mergeTailwindClasses = (...classes: ClassValue[]): string => {
  return twMerge(clsx(classes));
};

export const capitalizeString = (text: string): string =>
  text.charAt(0).toUpperCase() + text.slice(1);

export const joinStringsWithSpace = (
  ...strings: (string | undefined)[]
): string => strings.filter(Boolean).join(" ");

export const hasPrefix = (text: string, prefix: string): boolean =>
  text.startsWith(prefix);

export const hasSuffix = (text: string, suffix: string): boolean =>
  text.endsWith(suffix);

export const convertToLowerCase = (text: string): string => text.toLowerCase();

export const convertToUpperCase = (text: string): string => text.toUpperCase();

export const trimWhitespace = (text: string): string => text.trim();

export const reverseString = (text: string): string =>
  text.split("").reverse().join("");