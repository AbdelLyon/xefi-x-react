import { useResponsive } from "@/hooks"

/**
 * Configuration for sidebar layout
 */
export interface SidebarLayoutConfig {
  /** Desktop sidebar width */
  desktopWidth: string
  /** Tablet sidebar width */
  tabletWidth: string
  /** Whether to show sidebar on mobile */
  showOnMobile: boolean
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
  tabletWidth: "w-[70px]",
  showOnMobile: false,
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

  const isVisible = isDesktop || isTablet || (isMobile && finalConfig.showOnMobile)
  
  const width = isDesktop ? finalConfig.desktopWidth : finalConfig.tabletWidth
  
  const containerClasses = [
    "fixed left-0 h-screen flex flex-col bg-[#181818] border-r border-border",
    width,
  ].join(" ")

  const navigationClasses = [
    "flex-1",
    isDesktop ? "p-4" : "pt-2 px-2",
  ].join(" ")

  const itemContainerClasses = [
    "flex flex-col",
    isDesktop ? "gap-2" : "gap-4 items-center",
  ].join(" ")

  return {
    isVisible,
    isDesktop,
    isTablet,
    width,
    containerClasses,
    navigationClasses,
    itemContainerClasses,
  }
}