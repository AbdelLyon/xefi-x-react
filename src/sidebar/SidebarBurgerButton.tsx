import React from "react"
import { Button } from "@heroui/react"
import { IconMenu2 } from "@tabler/icons-react"

/**
 * Props for SidebarBurgerButton component
 */
export interface SidebarBurgerButtonProps {
  /** Whether the sidebar is collapsed */
  isCollapsed: boolean
  /** Toggle function for sidebar collapse state */
  onToggle: () => void
  /** Whether in desktop mode */
  isDesktop: boolean
  /** Whether in tablet mode */
  isTablet: boolean
  /** Custom className */
  className?: string
}

/**
 * Modern burger button component for sidebar toggle
 * Only visible on desktop and tablet, hidden on mobile
 *
 * @example
 * ```tsx
 * <SidebarBurgerButton
 *   isCollapsed={isCollapsed}
 *   onToggle={toggleCollapsed}
 *   isDesktop={isDesktop}
 *   isTablet={isTablet}
 * />
 * ```
 */
export const SidebarBurgerButton: React.FC<SidebarBurgerButtonProps> = ({
  isCollapsed,
  onToggle,
  isDesktop,
  isTablet,
  className,
}) => {
  // Only show on desktop and tablet
  if (!isDesktop && !isTablet) {
    return null
  }

  return (
    <div
      className={`flex ${isCollapsed ? "justify-center" : "justify-end"} p-3 ${className || ""}`}
    >
      <Button
        isIconOnly
        variant="light"
        size="sm"
        onPress={onToggle}
        className="h-8 min-w-8 text-foreground-600 transition-all duration-300 ease-out hover:scale-105 hover:bg-default-100 hover:text-foreground"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <div className="relative size-4">
          <div 
            className={`absolute inset-0 transition-all duration-300 ease-out ${
              isCollapsed ? 'rotate-0 opacity-100' : 'rotate-90 opacity-70'
            }`}
          >
            <IconMenu2 size={16} />
          </div>
        </div>
      </Button>
    </div>
  )
}
