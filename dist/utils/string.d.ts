import { ClassValue } from 'clsx';
/**
 * String utilities for text manipulation and formatting
 */
export declare const mergeTailwindClasses: (...classes: ClassValue[]) => string;
export declare const capitalizeString: (text: string) => string;
export declare const joinStringsWithSpace: (...strings: (string | undefined)[]) => string;
export declare const hasPrefix: (text: string, prefix: string) => boolean;
export declare const hasSuffix: (text: string, suffix: string) => boolean;
export declare const convertToLowerCase: (text: string) => string;
export declare const convertToUpperCase: (text: string) => string;
export declare const trimWhitespace: (text: string) => string;
export declare const reverseString: (text: string) => string;
