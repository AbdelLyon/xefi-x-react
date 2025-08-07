import React, { type ReactNode } from "react";
import { Divider } from "@heroui/react";
import { mergeTailwindClasses } from "@/utils";
import { SidebarBurgerButton } from "./SidebarBurgerButton";

/**
 * Props for SidebarHeader component
 */
export interface SidebarHeaderProps {
  /** App logo component */
  appLogo?: ReactNode;
  /** App name component */
  appName?: ReactNode;
  /** Whether the sidebar is collapsed */
  isCollapsed: boolean;
  /** Toggle function for sidebar collapse state */
  onToggle: () => void;
  /** Whether in desktop mode */
  isDesktop: boolean;
  /** Whether in tablet mode */
  isTablet: boolean;
  /** Whether to show burger button */
  showBurgerButton?: boolean;
  /** Custom className */
  className?: string;
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
  appName,
  isCollapsed,
  onToggle,
  isDesktop,
  isTablet,
  showBurgerButton = true,
  className,
}) => {
  const shouldShowCollapsed = isTablet || (isDesktop && isCollapsed);
  
  return (
    <div className={mergeTailwindClasses("flex flex-col", className)}>
      {/* Header content with logo and burger */}
      <div className={mergeTailwindClasses(
        "flex items-center transition-all duration-300",
        {
          "justify-between p-3": shouldShowCollapsed,
          "justify-between p-4": !shouldShowCollapsed,
        }
      )}>
        {/* Logo/Name section - Mode expanded */}
        {!shouldShowCollapsed && (
          <div className="flex items-center gap-2 text-foreground">
            {appLogo}
            {appName}
          </div>
        )}
        
        {/* Name only in collapsed mode (no logo) */}
        {shouldShowCollapsed && (
          <div className="flex items-center text-foreground font-medium">
            {appName}
          </div>
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
  );
};