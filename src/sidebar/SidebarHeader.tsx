import React, { type ReactNode } from "react"
import { Divider } from "@heroui/react"
import { mergeTailwindClasses } from "@/utils"
import { SidebarBurgerButton } from "./SidebarBurgerButton"

/**
 * Props for SidebarHeader component
 */
export interface SidebarHeaderProps {
  /** App logo component */
  appLogo?: ReactNode
  /** Whether the sidebar is collapsed */
  isCollapsed: boolean
  /** Toggle function for sidebar collapse state */
  onToggle: () => void
  /** Whether in desktop mode */
  isDesktop: boolean
  /** Whether in tablet mode */
  isTablet: boolean
  /** Whether to show burger button */
  showBurgerButton?: boolean
  /** Custom className */
  className?: string
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
export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  appLogo,
  isCollapsed,
  onToggle,
  isDesktop,
  isTablet,
  showBurgerButton = true,
  className,
}) => {
  const shouldShowCollapsed = isTablet || (isDesktop && isCollapsed)

  return (
    <div
      className={mergeTailwindClasses(
        "flex flex-col items-center justify-center border-b-none dark:border-b dark:border-border shadow-lg bg-white dark:bg-content1 dark:shadow-non",
        className
      )}
    >
      {/* Header content with logo and burger - Same height as navbar */}
      <div
        className={mergeTailwindClasses(
          "flex items-center justify-between transition-all duration-300",
          "h-16 px-4", // Height 16 (64px) to match Hero UI navbar height
          {
            "px-3": shouldShowCollapsed,
            "px-4": !shouldShowCollapsed,
          }
        )}
      >
        {/* Logo section - Mode expanded */}
        {!shouldShowCollapsed && appLogo && (
          <div className="flex items-center text-foreground">{appLogo}</div>
        )}

        {/* Logo in collapsed mode (if provided) */}
        {shouldShowCollapsed && appLogo && (
          <div className="flex items-center text-foreground">{appLogo}</div>
        )}

        {/* Burger button - always visible when showBurgerButton is true */}
        {showBurgerButton && (
          <SidebarBurgerButton
            isCollapsed={isCollapsed}
            onToggle={onToggle}
            isDesktop={isDesktop}
            isTablet={isTablet}
          />
        )}
      </div>

      {/* Divider */}
      <Divider className="bg-divider/50" />
    </div>
  )
}
