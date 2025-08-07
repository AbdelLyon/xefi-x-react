/**
 * Configuration for sidebar layout
 */
export interface SidebarLayoutConfig {
    /** Desktop sidebar width when expanded */
    desktopWidth: string;
    /** Desktop sidebar width when collapsed */
    desktopCollapsedWidth: string;
    /** Tablet sidebar width */
    tabletWidth: string;
    /** Whether to show sidebar on mobile */
    showOnMobile: boolean;
    /** Whether the sidebar starts collapsed */
    defaultCollapsed: boolean;
}
/**
 * Return type for sidebar layout hook
 */
export interface UseSidebarLayoutReturn {
    /** Whether sidebar should be visible */
    isVisible: boolean;
    /** Whether in desktop mode */
    isDesktop: boolean;
    /** Whether in tablet mode */
    isTablet: boolean;
    /** Whether sidebar is collapsed */
    isCollapsed: boolean;
    /** Whether in mobile mode */
    isMobile: boolean;
    /** Toggle sidebar collapse state */
    toggleCollapsed: () => void;
    /** Current sidebar width */
    width: string;
    /** CSS classes for sidebar container */
    containerClasses: string;
    /** CSS classes for navigation */
    navigationClasses: string;
    /** CSS classes for item container */
    itemContainerClasses: string;
}
/**
 * Custom hook for managing sidebar layout and responsive behavior
 *
 * @example
 * ```tsx
 * const {
 *   isVisible,
 *   isDesktop,
 *   isTablet,
 *   containerClasses,
 *   navigationClasses
 * } = useSidebarLayout();
 *
 * if (!isVisible) return null;
 * ```
 */
export declare const useSidebarLayout: (config?: Partial<SidebarLayoutConfig>) => UseSidebarLayoutReturn;
