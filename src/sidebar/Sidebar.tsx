import React, { type JSX, type ReactNode } from "react";
import { mergeTailwindClasses } from "@/utils";
import type { Item } from "@/types/navigation";
import type { Color } from "@/types";
import { IconPlus } from "@tabler/icons-react";
import { SidebarLink } from "./SidebarLink";
import { SidebarAction } from "./SidebarAction";
import { SidebarBurgerButton } from "./SidebarBurgerButton";
import { useSidebarLayout, type SidebarLayoutConfig } from "./useSidebarLayout";

/**
 * Props for Sidebar component
 */
export interface SidebarProps {
  /** Navigation items to display */
  items?: Item[];
  /** Root className */
  className?: string;
  /** Custom CSS classes for different parts */
  classNames?: {
    base?: string;
    item?: string;
    action?: string;
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
  actionIcon?: React.ReactElement<{ className?: string }>;
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
export const Sidebar = ({
  items = [],
  classNames = {},
  bgImage,
  onItemClick,
  ref,
  actionLabel,
  actionIcon = <IconPlus className="rounded-md" />,
  actionColor = "primary",
  actionClick,
  showDivider = true,
  layoutConfig,
  showBurgerButton = true,
}: SidebarProps): JSX.Element | null => {
  const {
    isVisible,
    isDesktop,
    isTablet,
    isCollapsed,
    toggleCollapsed,
    containerClasses,
    navigationClasses,
    itemContainerClasses,
  } = useSidebarLayout(layoutConfig);

  // Don't render if not visible on current breakpoint
  if (!isVisible) {
    return null;
  }

  const shouldShowCollapsed = (isDesktop && isCollapsed) || isTablet;

  return (
    <aside
      ref={ref}
      className={mergeTailwindClasses(
        containerClasses,
        classNames.base,
      )}
    >
      {/* Burger Button Section */}
      {showBurgerButton && (
        <SidebarBurgerButton
          isCollapsed={shouldShowCollapsed}
          onToggle={toggleCollapsed}
          isDesktop={isDesktop}
          isTablet={isTablet}
        />
      )}

      {/* Action Button Section */}
      {actionClick && (
        <SidebarAction
          actionLabel={actionLabel}
          actionIcon={actionIcon}
          actionColor={actionColor}
          actionClick={actionClick}
          isDesktop={isDesktop}
          isTablet={isTablet}
          isCollapsed={isCollapsed}
          showDivider={showDivider}
          className={classNames.action}
        />
      )}

      {/* Navigation Section */}
      <nav className={navigationClasses}>
        <div className={itemContainerClasses}>
          {items.map((item) => (
            <SidebarLink
              key={item.key}
              item={item}
              isDesktop={isDesktop}
              isTablet={isTablet}
              isCollapsed={isCollapsed}
              onItemClick={onItemClick}
              className={classNames.item}
            />
          ))}
        </div>
      </nav>

      {/* Background Image */}
      {bgImage}
    </aside>
  );
};