import { default as React, ReactNode } from 'react';
/**
 * Props for SidebarHeader component
 */
export interface SidebarHeaderProps {
    /** App logo component */
    appLogo?: ReactNode;
    /** Whether the sidebar is collapsed */
    isCollapsed: boolean;
    /** Toggle function for sidebar collapse state */
    onToggle: () => void;
    /** Whether in desktop mode */
    isDesktop: boolean;
    /** Whether in tablet mode */
    isTablet: boolean;
    /** Whether to show burger button */
    showBurgerButton?: boolean;
    /** Custom className */
    className?: string;
}
/**
 * Sidebar header component containing logo and burger button
 *
 * @example
 * ```tsx
 * <SidebarHeader
 *   appLogo={<Logo />}
 *   isCollapsed={isCollapsed}
 *   onToggle={toggleCollapsed}
 *   isDesktop={isDesktop}
 *   isTablet={isTablet}
 * />
 * ```
 */
export declare const SidebarHeader: React.FC<SidebarHeaderProps>;
