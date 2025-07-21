/**
 * Standard development patterns and conventions
 * Ensures consistency across all components in the library
 */
/**
 * Standard component pattern interface
 * All components should follow this basic structure
 */
export interface StandardComponentPattern {
    /** Component display name for debugging */
    displayName: string;
    /** Forward ref pattern for DOM access */
    forwardRef: boolean;
    /** Base props interface extending common patterns */
    baseProps: "BaseComponentProps" | "StylableComponent";
    /** Default prop values */
    defaults: Record<string, unknown>;
    /** Class merging strategy */
    classMerging: "mergeTailwindClasses" | "ComponentStyleManager";
}
/**
 * Standard import order for components
 */
export declare const STANDARD_IMPORT_ORDER: readonly ["// React imports", "React, { forwardRef, useState, useEffect, useCallback } from 'react'", "type { JSX, ReactNode } from 'react'", "", "// HeroUI imports", "type { ...Props } from '@heroui/react'", "{ Component as HeroUIComponent } from '@heroui/react'", "", "// Internal imports", "{ mergeTailwindClasses, ComponentStyleManager } from '@/utils'", "{ useCustomHook } from '@/hooks'", "type { Color, Size, Variant } from '@/types'", "", "// Component-specific imports", "{ ComponentConfig } from './componentConfig'", "type { ComponentProps } from './types'"];
/**
 * Standard component structure template
 */
export declare const COMPONENT_STRUCTURE_TEMPLATE = "\n/**\n * Component interface extending HeroUI base component\n */\nexport interface ComponentProps extends Omit<HeroUIComponentProps, 'conflicting' | 'props'> {\n  /** Component-specific props */\n  customProp?: string;\n  \n  /** Enhanced styling options */\n  classNames?: {\n    base?: string;\n    element?: string;\n  };\n}\n\n/**\n * Enhanced Component built on top of HeroUI Component\n * Provides additional functionality while maintaining HeroUI compatibility\n * \n * @example\n * ```tsx\n * <Component color=\"primary\" size=\"md\">\n *   Content\n * </Component>\n * ```\n */\nexport const Component = forwardRef<HTMLDivElement, ComponentProps>(\n  (\n    {\n      color = \"primary\",\n      size = \"md\",\n      classNames,\n      className,\n      ...props\n    },\n    ref,\n  ): JSX.Element => {\n    // Component logic here\n    \n    return (\n      <HeroUIComponent\n        ref={ref}\n        color={color}\n        size={size}\n        className={mergeTailwindClasses(\n          \"component-base-classes\",\n          className\n        )}\n        classNames={{\n          base: mergeTailwindClasses(\n            \"default-base-classes\", \n            classNames?.base\n          ),\n          element: mergeTailwindClasses(\n            \"default-element-classes\",\n            classNames?.element\n          ),\n        }}\n        {...props}\n      >\n        {children}\n      </HeroUIComponent>\n    );\n  },\n);\n\nComponent.displayName = \"Component\";\n";
/**
 * Component development checklist
 */
export declare const COMPONENT_DEVELOPMENT_CHECKLIST: readonly ["✅ Extends HeroUI base component properly", "✅ Uses forwardRef pattern for DOM access", "✅ Implements proper TypeScript interfaces", "✅ Uses mergeTailwindClasses for all className merging", "✅ Provides comprehensive JSDoc documentation", "✅ Includes usage examples in documentation", "✅ Handles edge cases and error states", "✅ Implements accessibility features (ARIA)", "✅ Follows consistent naming conventions", "✅ Exports through proper index.ts file", "✅ Has corresponding test file with comprehensive coverage", "✅ Supports theme customization", "✅ Optimized for tree-shaking"];
/**
 * Hook development patterns
 */
export declare const HOOK_PATTERNS: {
    readonly useState: "Use for simple state management";
    readonly useReducer: "Use for complex state with multiple actions";
    readonly useEffect: "Use for side effects, always include dependency arrays";
    readonly useCallback: "Use for event handlers to prevent re-renders";
    readonly useMemo: "Use for expensive calculations";
    readonly useRef: "Use for DOM references and persistent values";
    readonly custom: "Create custom hooks for reusable stateful logic";
};
/**
 * Testing patterns for components
 */
export declare const TESTING_PATTERNS: {
    readonly structure: "Test component renders without crashing";
    readonly props: "Test all props are applied correctly";
    readonly events: "Test event handlers are called properly";
    readonly accessibility: "Test ARIA attributes and keyboard navigation";
    readonly states: "Test different component states (loading, error, etc.)";
    readonly edge_cases: "Test edge cases and boundary conditions";
    readonly snapshots: "Use snapshot tests for visual regression";
    readonly integration: "Test component integration with forms/layouts";
};
/**
 * Performance optimization patterns
 */
export declare const PERFORMANCE_PATTERNS: {
    readonly memoization: "Use React.memo for expensive re-renders";
    readonly lazy_loading: "Use React.lazy for code splitting";
    readonly virtualization: "Use virtualization for large lists";
    readonly debouncing: "Debounce expensive operations";
    readonly code_splitting: "Split large components into smaller chunks";
    readonly tree_shaking: "Ensure components are tree-shakeable";
};
/**
 * Common anti-patterns to avoid
 */
export declare const ANTI_PATTERNS: readonly ["❌ Using array.join(' ') instead of mergeTailwindClasses", "❌ Direct object spread in className props", "❌ Missing forwardRef for DOM components", "❌ Hardcoded style values instead of theme tokens", "❌ Missing displayName for components", "❌ Inconsistent prop naming conventions", "❌ Missing TypeScript interfaces", "❌ Inline styles instead of Tailwind classes", "❌ Missing accessibility attributes", "❌ Not handling edge cases (null, undefined)", "❌ Using any type instead of proper typing", "❌ Missing error boundaries for complex components"];
/**
 * Code quality metrics for components
 */
export interface ComponentQualityMetrics {
    /** Lines of code (should be < 200 for single responsibility) */
    loc: number;
    /** Cyclomatic complexity (should be < 10) */
    complexity: number;
    /** Test coverage percentage (should be > 80%) */
    coverage: number;
    /** TypeScript strict mode compliance */
    strictMode: boolean;
    /** Accessibility score (should be 100%) */
    a11yScore: number;
    /** Performance score (Core Web Vitals) */
    performanceScore: number;
}
/**
 * Component grading system (A+ to F)
 */
export declare const gradeComponent: (metrics: ComponentQualityMetrics) => string;
/**
 * Validates component follows standard patterns
 */
export declare const validateComponentPattern: (componentCode: string) => {
    valid: boolean;
    issues: string[];
    suggestions: string[];
};
