import React, { useEffect, type JSX, type ReactNode } from "react"
import { mergeTailwindClasses } from "@/utils"
import type { Item } from "@/types/navigation"
import type { Color } from "@/types"
import { IconPlus } from "@tabler/icons-react"
import { SidebarLink } from "./SidebarLink"
import { SidebarAction } from "./SidebarAction"
import { SidebarHeader } from "./SidebarHeader"
import type { UseSidebarLayoutReturn } from "./useSidebarLayout"
import { type SidebarLayoutConfig } from "./useSidebarLayout"

/**
 * Props for Sidebar component
 */
export interface SidebarProps {
  /** Navigation items to display */
  items?: Item[]
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
  config: UseSidebarLayoutReturn
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
  config,

  showBurgerButton = true,
}: SidebarProps): JSX.Element | null => {
  const shouldShowCollapsed =
    (config.isDesktop && config.isCollapsed) || config.isTablet

  // Set CSS variable for layout communication
  useEffect(() => {
    if (!config.isVisible) {
      document.documentElement.style.setProperty("--sidebar-width", "0px")
      return
    }
    const sidebarWidth = shouldShowCollapsed ? "70px" : "270px"
    document.documentElement.style.setProperty("--sidebar-width", sidebarWidth)
  }, [shouldShowCollapsed, config.isVisible])

  if (!config.isVisible) {
    return null
  }

  return (
    <aside
      ref={ref}
      className={mergeTailwindClasses(config.containerClasses, classNames.base)}
    >
      {/* Header Section with Logo and Burger */}
      {(appLogo || showBurgerButton) && (
        <SidebarHeader
          appLogo={appLogo}
          isCollapsed={shouldShowCollapsed}
          onToggle={config.toggleCollapsed}
          isDesktop={config.isDesktop}
          isTablet={config.isTablet}
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
          isDesktop={config.isDesktop}
          isTablet={config.isTablet}
          isCollapsed={config.isCollapsed}
          showDivider={showDivider}
          className={classNames.action}
        />
      )}

      {/* Navigation Section */}
      <nav className={config.navigationClasses}>
        <div className={config.itemContainerClasses}>
          {items.map((item) => (
            <SidebarLink
              key={item.key}
              item={item}
              isDesktop={config.isDesktop}
              isTablet={config.isTablet}
              isCollapsed={config.isCollapsed}
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
