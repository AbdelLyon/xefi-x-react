/**
 * Array utilities for collection manipulation and operations
 */
export declare function filterUnique<T>(arr: T[], criteria: ((item: T) => unknown) | keyof T): T[];
export declare function findIntersection<T>(arrays: T[][], criteria: ((item: T) => unknown) | keyof T): T[];
export declare function arrayToObject<T extends Record<string, unknown>>(arr: T[]): Record<string, unknown>;
