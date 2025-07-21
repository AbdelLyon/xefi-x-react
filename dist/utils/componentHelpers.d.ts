import { ComponentClassNames } from './classNames';
/**
 * Standard props interface for component styling
 */
export interface StandardComponentProps {
    /** Root CSS class */
    className?: string;
    /** Test ID for testing */
    "data-testid"?: string;
    /** HTML ID attribute */
    id?: string;
}
/**
 * Creates a standardized props merger for components
 * Ensures className is properly merged with defaults
 */
export declare const createPropsMerger: <T extends Record<string, unknown>>(defaultProps: Partial<T>) => (userProps: T) => T;
/**
 * Component class names management helper
 * Provides a consistent way to handle component styling
 */
export declare class ComponentStyleManager<T extends Record<string, string>> {
    private defaultClasses;
    constructor(defaultClasses: T);
    /**
     * Merge user classes with defaults
     */
    merge(userClasses?: ComponentClassNames<T>): T;
    /**
     * Get specific class with fallback
     */
    getClass(key: keyof T, userClasses?: ComponentClassNames<T>, fallback?: string): string;
    /**
     * Apply conditional classes
     */
    conditional(key: keyof T, condition: boolean | undefined, conditionalClass: string, userClasses?: ComponentClassNames<T>): string;
}
/**
 * Validates that a component properly handles className merging
 * Useful for development and testing
 */
export declare const validateClassMerging: (componentProps: Record<string, unknown>, expectedKeys: string[]) => {
    valid: boolean;
    issues: string[];
};
/**
 * Development-only class name validator
 * Helps ensure proper Tailwind class usage
 */
export declare const validateTailwindClasses: (classes: string, componentName?: string) => {
    valid: boolean;
    warnings: string[];
};
/**
 * Component development best practices checker
 */
export declare const checkComponentBestPractices: <T extends Record<string, unknown>>(componentName: string, props: T, classNamesConfig?: {
    expectedKeys: string[];
}) => void;
