import { JSX } from 'react';
import { Item } from '../types/navigation';
/**
 * Props for SidebarLink component
 */
export interface SidebarLinkProps {
    item: Item;
    isDesktop?: boolean;
    isTablet?: boolean;
    isCollapsed?: boolean;
    onItemClick?: (item: Item) => void;
    className?: string;
}
/**
 * Individual sidebar link component with tooltip support
 */
export declare const SidebarLink: ({ item, isDesktop, isTablet, isCollapsed, onItemClick, className, }: SidebarLinkProps) => JSX.Element;
