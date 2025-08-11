import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
const mergeTailwindClasses = (...classes) => {
  return twMerge(clsx(classes));
};
const capitalizeString = (text) => text.charAt(0).toUpperCase() + text.slice(1);
const joinStringsWithSpace = (...strings) => strings.filter(Boolean).join(" ");
const hasPrefix = (text, prefix) => text.startsWith(prefix);
const hasSuffix = (text, suffix) => text.endsWith(suffix);
const convertToLowerCase = (text) => text.toLowerCase();
const convertToUpperCase = (text) => text.toUpperCase();
const trimWhitespace = (text) => text.trim();
const reverseString = (text) => text.split("").reverse().join("");
export {
  capitalizeString,
  convertToLowerCase,
  convertToUpperCase,
  hasPrefix,
  hasSuffix,
  joinStringsWithSpace,
  mergeTailwindClasses,
  reverseString,
  trimWhitespace
};
