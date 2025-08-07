import { useResponsive } from "@/hooks"
import { useState, useCallback } from "react"

/**
 * Configuration for sidebar layout
 */
export interface SidebarLayoutConfig {
  /** Desktop sidebar width when expanded */
  desktopWidth: string
  /** Desktop sidebar width when collapsed */
  desktopCollapsedWidth: string
  /** Tablet sidebar width */
  tabletWidth: string
  /** Whether to show sidebar on mobile */
  showOnMobile: boolean
  /** Whether the sidebar starts collapsed */
  defaultCollapsed: boolean
}

/**
 * Return type for sidebar layout hook
 */
export interface UseSidebarLayoutReturn {
  /** Whether sidebar should be visible */
  isVisible: boolean
  /** Whether in desktop mode */
  isDesktop: boolean
  /** Whether in tablet mode */
  isTablet: boolean
  /** Whether sidebar is collapsed */
  isCollapsed: boolean
  /** Toggle sidebar collapse state */
  toggleCollapsed: () => void
  /** Current sidebar width */
  width: string
  /** CSS classes for sidebar container */
  containerClasses: string
  /** CSS classes for navigation */
  navigationClasses: string
  /** CSS classes for item container */
  itemContainerClasses: string
}

/**
 * Default sidebar layout configuration
 */
const defaultConfig: SidebarLayoutConfig = {
  desktopWidth: "w-[270px]",
  desktopCollapsedWidth: "w-[70px]",
  tabletWidth: "w-[70px]",
  showOnMobile: false,
  defaultCollapsed: false,
}

/**
 * Custom hook for managing sidebar layout and responsive behavior
 * 
 * @example
 * ```tsx
 * const {
 *   isVisible,
 *   isDesktop,
 *   isTablet,
 *   containerClasses,
 *   navigationClasses
 * } = useSidebarLayout();
 * 
 * if (!isVisible) return null;
 * ```
 */
export const useSidebarLayout = (
  config: Partial<SidebarLayoutConfig> = {},
): UseSidebarLayoutReturn => {
  const finalConfig = { ...defaultConfig, ...config }
  const { isDesktop, isTablet, isMobile } = useResponsive()
  const [isCollapsed, setIsCollapsed] = useState(finalConfig.defaultCollapsed)

  const toggleCollapsed = useCallback(() => {
    setIsCollapsed(prev => !prev)
  }, [])

  const isVisible = isDesktop || isTablet || (isMobile && finalConfig.showOnMobile)
  
  // Determine width based on device type and collapsed state
  const getWidth = () => {
    if (isMobile) return finalConfig.desktopWidth
    if (isTablet) return finalConfig.tabletWidth
    return isCollapsed ? finalConfig.desktopCollapsedWidth : finalConfig.desktopWidth
  }
  
  const width = getWidth()
  const shouldShowCollapsed = (isDesktop && isCollapsed) || isTablet
  
  const containerClasses = [
    "fixed left-0 top-0 h-screen flex flex-col bg-background",
    "border-r border-divider transition-all duration-300 ease-in-out z-40",
    width,
  ].join(" ")

  const navigationClasses = [
    "flex-1 transition-all duration-300 ease-in-out",
    shouldShowCollapsed ? "pt-4 px-3" : "p-4",
  ].join(" ")

  const itemContainerClasses = [
    "flex flex-col transition-all duration-300 ease-in-out",
    shouldShowCollapsed ? "gap-3 items-center" : "gap-2",
  ].join(" ")

  return {
    isVisible,
    isDesktop,
    isTablet,
    isCollapsed,
    toggleCollapsed,
    width,
    containerClasses,
    navigationClasses,
    itemContainerClasses,
  }
}