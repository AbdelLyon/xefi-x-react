import { default as React } from 'react';
/**
 * Props for SidebarBurgerButton component
 */
export interface SidebarBurgerButtonProps {
    /** Whether the sidebar is collapsed */
    isCollapsed: boolean;
    /** Toggle function for sidebar collapse state */
    onToggle: () => void;
    /** Whether in desktop mode */
    isDesktop: boolean;
    /** Whether in tablet mode */
    isTablet: boolean;
    /** Custom className */
    className?: string;
}
/**
 * Modern burger button component for sidebar toggle
 * Only visible on desktop and tablet, hidden on mobile
 *
 * @example
 * ```tsx
 * <SidebarBurgerButton
 *   isCollapsed={isCollapsed}
 *   onToggle={toggleCollapsed}
 *   isDesktop={isDesktop}
 *   isTablet={isTablet}
 * />
 * ```
 */
export declare const SidebarBurgerButton: React.FC<SidebarBurgerButtonProps>;
