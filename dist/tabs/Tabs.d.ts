import { ReactNode } from 'react';
import { TabsProps as HeroUITabsProps } from '@heroui/react';
import { BaseComponentProps, Color, Radius } from '../types';
/**
 * Tab item configuration
 */
export interface TabItem {
    /** Unique key for the tab */
    key: string;
    /** Tab title content */
    title: ReactNode;
    /** Tab panel content */
    content: ReactNode;
    /** Whether tab is disabled */
    disabled?: boolean;
    /** External link href */
    href?: string;
    /** Link target */
    target?: string;
    /** Title value for accessibility */
    titleValue?: string;
}
/**
 * Enhanced Tabs component props
 */
export interface TabsProps extends Omit<HeroUITabsProps, "children" | "color" | "size" | "radius">, BaseComponentProps {
    /** Tab items to display */
    items: TabItem[];
    /** Default active tab key */
    defaultActiveTab?: string;
    /** Tab change callback */
    onTabChange?: (key: string) => void;
    /** Custom content renderer */
    renderTabContent?: (item: TabItem) => ReactNode;
    /** Tab color theme */
    color?: Color;
    /** Tab size */
    size?: "sm" | "md" | "lg";
    /** Tab border radius */
    radius?: Radius;
    /** Tab placement */
    placement?: "top" | "bottom" | "start" | "end";
    /** Tab variant */
    variant?: "solid" | "underlined" | "bordered" | "light";
    /** Custom CSS classes for different parts */
    classNames?: HeroUITabsProps["classNames"];
}
/**
 * Enhanced Tabs component built on top of HeroUI Tabs
 * Provides simplified API with item-based configuration
 *
 * @example
 * ```tsx
 * const tabItems = [
 *   {
 *     key: "photos",
 *     title: "Photos",
 *     content: <PhotosPanel />
 *   },
 *   {
 *     key: "videos",
 *     title: "Videos",
 *     content: <VideosPanel />,
 *     disabled: true
 *   }
 * ];
 *
 * <Tabs
 *   items={tabItems}
 *   defaultActiveTab="photos"
 *   onTabChange={(key) => console.log(key)}
 *   color="primary"
 *   variant="underlined"
 * />
 * ```
 */
export declare const Tabs: import('react').ForwardRefExoticComponent<Omit<TabsProps, "ref"> & import('react').RefAttributes<HTMLDivElement>>;
