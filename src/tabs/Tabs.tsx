import type { JSX, ReactNode } from "react";
import { forwardRef, useCallback } from "react";
import type { TabsProps as HeroUITabsProps } from "@heroui/react";
import { Tabs as HeroUITabs, Tab } from "@heroui/react";
import type { BaseComponentProps, Color, Radius } from "@/types";
import { getTabsVariantClasses, defaultTabsClassNames } from "./tabsUtils";

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
export interface TabsProps 
  extends Omit<HeroUITabsProps, "children" | "color" | "size" | "radius">,
    BaseComponentProps {
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
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      items,
      defaultActiveTab,
      onTabChange,
      renderTabContent,
      color = "primary",
      size = "md",
      radius = "md",
      placement = "top",
      variant = "solid",
      classNames,
      ...props
    },
    ref,
  ): JSX.Element => {
    // Handle tab selection change
    const handleSelectionChange = useCallback((key: React.Key): void => {
      onTabChange?.(key.toString());
    }, [onTabChange]);

    // Content renderer with fallback
    const contentRenderer = useCallback((item: TabItem): ReactNode => {
      return renderTabContent ? renderTabContent(item) : item.content;
    }, [renderTabContent]);

    // Merge variant-specific styles with custom classNames
    const variantStyles = getTabsVariantClasses(variant);
    const finalClassNames = {
      ...defaultTabsClassNames,
      ...variantStyles,
      ...classNames,
    };

    return (
      <HeroUITabs
        ref={ref}
        color={color}
        size={size}
        radius={radius}
        placement={placement}
        variant={variant}
        defaultSelectedKey={defaultActiveTab}
        classNames={finalClassNames}
        onSelectionChange={handleSelectionChange}
        {...props}
      >
        {items.map((item) => (
          <Tab
            key={item.key}
            title={item.title}
            titleValue={item.titleValue}
            href={item.href}
            target={item.target}
            isDisabled={item.disabled}
          >
            {contentRenderer(item)}
          </Tab>
        ))}
      </HeroUITabs>
    );
  },
);

Tabs.displayName = "Tabs";