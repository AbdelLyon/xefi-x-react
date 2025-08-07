import { JSX } from 'react';
import { Color } from '../types';
/**
 * Props for SidebarAction component
 */
export interface SidebarActionProps {
    actionLabel?: string;
    actionIcon: JSX.Element;
    actionColor: Color;
    actionClick: () => void;
    isDesktop?: boolean;
    isTablet?: boolean;
    isCollapsed?: boolean;
    showDivider: boolean;
    className?: string;
}
/**
 * Sidebar action button with responsive design
 */
export declare const SidebarAction: ({ actionLabel, actionIcon, actionColor, actionClick, isDesktop, isTablet, isCollapsed, showDivider, className, }: SidebarActionProps) => JSX.Element;
