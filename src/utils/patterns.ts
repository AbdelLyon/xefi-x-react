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
export const STANDARD_IMPORT_ORDER = [
  "// React imports",
  "React, { forwardRef, useState, useEffect, useCallback } from 'react'",
  "type { JSX, ReactNode } from 'react'",
  "",
  "// HeroUI imports",
  "type { ...Props } from '@heroui/react'",
  "{ Component as HeroUIComponent } from '@heroui/react'",
  "",
  "// Internal imports",
  "{ mergeTailwindClasses, ComponentStyleManager } from '@/utils'",
  "{ useCustomHook } from '@/hooks'",
  "type { Color, Size, Variant } from '@/types'",
  "",
  "// Component-specific imports",
  "{ ComponentConfig } from './componentConfig'",
  "type { ComponentProps } from './types'"
] as const;

/**
 * Standard component structure template
 */
export const COMPONENT_STRUCTURE_TEMPLATE = `
/**
 * Component interface extending HeroUI base component
 */
export interface ComponentProps extends Omit<HeroUIComponentProps, 'conflicting' | 'props'> {
  /** Component-specific props */
  customProp?: string;
  
  /** Enhanced styling options */
  classNames?: {
    base?: string;
    element?: string;
  };
}

/**
 * Enhanced Component built on top of HeroUI Component
 * Provides additional functionality while maintaining HeroUI compatibility
 * 
 * @example
 * \`\`\`tsx
 * <Component color="primary" size="md">
 *   Content
 * </Component>
 * \`\`\`
 */
export const Component = forwardRef<HTMLDivElement, ComponentProps>(
  (
    {
      color = "primary",
      size = "md",
      classNames,
      className,
      ...props
    },
    ref,
  ): JSX.Element => {
    // Component logic here
    
    return (
      <HeroUIComponent
        ref={ref}
        color={color}
        size={size}
        className={mergeTailwindClasses(
          "component-base-classes",
          className
        )}
        classNames={{
          base: mergeTailwindClasses(
            "default-base-classes", 
            classNames?.base
          ),
          element: mergeTailwindClasses(
            "default-element-classes",
            classNames?.element
          ),
        }}
        {...props}
      >
        {children}
      </HeroUIComponent>
    );
  },
);

Component.displayName = "Component";
`;

/**
 * Component development checklist
 */
export const COMPONENT_DEVELOPMENT_CHECKLIST = [
  "✅ Extends HeroUI base component properly",
  "✅ Uses forwardRef pattern for DOM access",
  "✅ Implements proper TypeScript interfaces",
  "✅ Uses mergeTailwindClasses for all className merging",
  "✅ Provides comprehensive JSDoc documentation",
  "✅ Includes usage examples in documentation",
  "✅ Handles edge cases and error states",
  "✅ Implements accessibility features (ARIA)",
  "✅ Follows consistent naming conventions",
  "✅ Exports through proper index.ts file",
  "✅ Has corresponding test file with comprehensive coverage",
  "✅ Supports theme customization",
  "✅ Optimized for tree-shaking"
] as const;

/**
 * Hook development patterns
 */
export const HOOK_PATTERNS = {
  useState: "Use for simple state management",
  useReducer: "Use for complex state with multiple actions",
  useEffect: "Use for side effects, always include dependency arrays",
  useCallback: "Use for event handlers to prevent re-renders",
  useMemo: "Use for expensive calculations",
  useRef: "Use for DOM references and persistent values",
  custom: "Create custom hooks for reusable stateful logic"
} as const;

/**
 * Testing patterns for components
 */
export const TESTING_PATTERNS = {
  structure: "Test component renders without crashing",
  props: "Test all props are applied correctly",
  events: "Test event handlers are called properly",
  accessibility: "Test ARIA attributes and keyboard navigation",
  states: "Test different component states (loading, error, etc.)",
  edge_cases: "Test edge cases and boundary conditions",
  snapshots: "Use snapshot tests for visual regression",
  integration: "Test component integration with forms/layouts"
} as const;

/**
 * Performance optimization patterns
 */
export const PERFORMANCE_PATTERNS = {
  memoization: "Use React.memo for expensive re-renders",
  lazy_loading: "Use React.lazy for code splitting",
  virtualization: "Use virtualization for large lists",
  debouncing: "Debounce expensive operations",
  code_splitting: "Split large components into smaller chunks",
  tree_shaking: "Ensure components are tree-shakeable"
} as const;

/**
 * Common anti-patterns to avoid
 */
export const ANTI_PATTERNS = [
  "❌ Using array.join(' ') instead of mergeTailwindClasses",
  "❌ Direct object spread in className props",
  "❌ Missing forwardRef for DOM components",
  "❌ Hardcoded style values instead of theme tokens",
  "❌ Missing displayName for components",
  "❌ Inconsistent prop naming conventions",
  "❌ Missing TypeScript interfaces",
  "❌ Inline styles instead of Tailwind classes",
  "❌ Missing accessibility attributes",
  "❌ Not handling edge cases (null, undefined)",
  "❌ Using any type instead of proper typing",
  "❌ Missing error boundaries for complex components"
] as const;

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
export const gradeComponent = (metrics: ComponentQualityMetrics): string => {
  let score = 100;

  // Deduct points for poor metrics
  if (metrics.loc > 200) { score -= 20; }
  if (metrics.complexity > 10) { score -= 15; }
  if (metrics.coverage < 80) { score -= 25; }
  if (!metrics.strictMode) { score -= 20; }
  if (metrics.a11yScore < 90) { score -= 15; }
  if (metrics.performanceScore < 90) { score -= 5; }

  if (score >= 95) { return "A+"; }
  if (score >= 90) { return "A"; }
  if (score >= 80) { return "B"; }
  if (score >= 70) { return "C"; }
  if (score >= 60) { return "D"; }
  return "F";
};

/**
 * Validates component follows standard patterns
 */
export const validateComponentPattern = (
  componentCode: string
): { valid: boolean; issues: string[]; suggestions: string[]; } => {
  const issues: string[] = [];
  const suggestions: string[] = [];

  // Check for forwardRef usage
  if (!componentCode.includes("forwardRef")) {
    issues.push("Component should use forwardRef pattern");
    suggestions.push("Wrap component with React.forwardRef for DOM access");
  }

  // Check for displayName
  if (!componentCode.includes(".displayName")) {
    issues.push("Component missing displayName");
    suggestions.push("Add Component.displayName = 'ComponentName'");
  }

  // Check for proper class merging
  if (componentCode.includes('array.join(" ")')) {
    issues.push("Using array.join instead of mergeTailwindClasses");
    suggestions.push("Replace array.join with mergeTailwindClasses utility");
  }

  // Check for TypeScript interfaces
  if (!componentCode.includes("interface") || !componentCode.includes("Props")) {
    issues.push("Missing TypeScript interface for props");
    suggestions.push("Create comprehensive TypeScript interface for component props");
  }

  return {
    valid: issues.length === 0,
    issues,
    suggestions
  };
};