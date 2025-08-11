/**
 * UI utilities for DOM attributes and interface helpers
 */
type Booleanish = boolean | "true" | "false";
export declare const dataAttr: (condition: boolean | undefined) => Booleanish;
export declare const generateUniqueId: (prefix: string) => string;
export declare const formatArrayWithZeroLast: <T>(array: T[]) => T[];
export {};
