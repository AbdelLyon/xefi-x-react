import React, { useEffect, type JSX, type ReactNode } from "react"
import { mergeTailwindClasses } from "@/utils"
import type { Item } from "@/types/navigation"
import type { Color } from "@/types"
import { IconPlus } from "@tabler/icons-react"
import { SidebarLink } from "./SidebarLink"
import { SidebarAction } from "./SidebarAction"
import { SidebarHeader } from "./SidebarHeader"
import { type SidebarLayoutConfig } from "./useSidebarLayout"

/**
 * Props for Sidebar component
 */
export interface SidebarProps {
  /** Navigation items to display */
  items?: Item[]
  isVisible?: boolean
  isDesktop?: boolean
  isTablet?: boolean
  isCollapsed?: boolean
  toggleCollapsed: () => void
  containerClasses: string
  navigationClasses: string
  itemContainerClasses: string
  /** App logo component */
  appLogo?: ReactNode
  /** Root className */
  className?: string
  /** Custom CSS classes for different parts */
  classNames?: {
    base?: string
    item?: string
    action?: string
    sidebarHeader?: string
  }
  /** Background image or content */
  bgImage?: ReactNode
  /** Ref for the sidebar element */
  ref?: React.RefObject<HTMLElement>
  /** Callback when item is clicked */
  onItemClick?: (item: Item) => void
  /** Action button label */
  actionLabel?: string
  /** Action button icon */
  actionIcon?: React.ReactElement<{ className?: string }>
  /** Action button color */
  actionColor?: Color
  /** Action button click handler */
  actionClick?: () => void
  /** Whether to show divider after action button */
  showDivider?: boolean
  /** Layout configuration */
  layoutConfig?: Partial<SidebarLayoutConfig>
  /** Whether to show burger button */
  showBurgerButton?: boolean
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
  appLogo,
  classNames = {},
  bgImage,
  onItemClick,
  ref,
  actionLabel,
  actionIcon = <IconPlus className="rounded-md" />,
  actionColor = "primary",
  actionClick,
  showDivider = true,
  isVisible,
  isDesktop,
  isTablet,
  isCollapsed,
  toggleCollapsed,
  containerClasses,
  navigationClasses,
  itemContainerClasses,

  showBurgerButton = true,
}: Partial<SidebarProps>): JSX.Element | null => {
  const shouldShowCollapsed = (isDesktop && isCollapsed) || isTablet

  // Set CSS variable for layout communication
  useEffect(() => {
    if (!isVisible) {
      document.documentElement.style.setProperty("--sidebar-width", "0px")
      return
    }
    const sidebarWidth = shouldShowCollapsed ? "70px" : "270px"
    document.documentElement.style.setProperty("--sidebar-width", sidebarWidth)
  }, [shouldShowCollapsed, isVisible])

  if (!isVisible) {
    return null
  }

  return (
    <aside
      ref={ref}
      className={mergeTailwindClasses(containerClasses, classNames.base)}
    >
      {/* Header Section with Logo and Burger */}
      {(appLogo || showBurgerButton) && (
        <SidebarHeader
          appLogo={appLogo}
          isCollapsed={shouldShowCollapsed}
          onToggle={toggleCollapsed}
          isDesktop={isDesktop}
          isTablet={isTablet}
          showBurgerButton={showBurgerButton}
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
  )
}
