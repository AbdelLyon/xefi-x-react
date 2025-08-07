import { default as React, JSX, ReactNode } from 'react';
import { Item } from '../types/navigation';
import { Color } from '../types';
import { SidebarLayoutConfig } from './useSidebarLayout';
/**
 * Props for Sidebar component
 */
export interface SidebarProps {
    /** Navigation items to display */
    items?: Item[];
    isVisible?: boolean;
    isDesktop?: boolean;
    isTablet?: boolean;
    isCollapsed?: boolean;
    toggleCollapsed: () => void;
    containerClasses: string;
    navigationClasses: string;
    itemContainerClasses: string;
    /** App logo component */
    appLogo?: ReactNode;
    /** Root className */
    className?: string;
    /** Custom CSS classes for different parts */
    classNames?: {
        base?: string;
        item?: string;
        action?: string;
        sidebarHeader?: string;
    };
    /** Background image or content */
    bgImage?: ReactNode;
    /** Ref for the sidebar element */
    ref?: React.RefObject<HTMLElement>;
    /** Callback when item is clicked */
    onItemClick?: (item: Item) => void;
    /** Action button label */
    actionLabel?: string;
    /** Action button icon */
    actionIcon?: React.ReactElement<{
        className?: string;
    }>;
    /** Action button color */
    actionColor?: Color;
    /** Action button click handler */
    actionClick?: () => void;
    /** Whether to show divider after action button */
    showDivider?: boolean;
    /** Layout configuration */
    layoutConfig?: Partial<SidebarLayoutConfig>;
    /** Whether to show burger button */
    showBurgerButton?: boolean;
}
/**
 * Enhanced Sidebar component with responsive design and modular structure
 *
 * @example
 * ```tsx
 * // Basic sidebar
 * <Sidebar
 *   items={navItems}
 *   onItemClick={handleItemClick}
 * />
 *
 * // Sidebar with action button
 * <Sidebar
 *   items={navItems}
 *   actionLabel="Add New"
 *   actionClick={handleAddClick}
 *   actionIcon={<PlusIcon />}
 *   actionColor="primary"
 * />
 *
 * // Sidebar with custom layout
 * <Sidebar
 *   items={navItems}
 *   layoutConfig={{
 *     desktopWidth: "w-[300px]",
 *     showOnMobile: true
 *   }}
 * />
 * ```
 */
export declare const Sidebar: ({ items, appLogo, classNames, bgImage, onItemClick, ref, actionLabel, actionIcon, actionColor, actionClick, showDivider, isVisible, isDesktop, isTablet, isCollapsed, toggleCollapsed, containerClasses, navigationClasses, itemContainerClasses, showBurgerButton, }: Partial<SidebarProps>) => JSX.Element | null;
