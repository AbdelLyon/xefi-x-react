import React from "react";
import { Button } from "@heroui/react";
import { IconMenu2, IconX } from "@tabler/icons-react";

/**
 * Props for SidebarBurgerButton component
 */
export interface SidebarBurgerButtonProps {
  /** Whether the sidebar is collapsed */
  isCollapsed: boolean;
  /** Toggle function for sidebar collapse state */
  onToggle: () => void;
  /** Whether in desktop mode */
  isDesktop: boolean;
  /** Whether in tablet mode */
  isTablet: boolean;
  /** Custom className */
  className?: string;
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
    return null;
  }

  return (
    <div className={`flex ${isCollapsed ? 'justify-center' : 'justify-end'} p-3 border-b border-divider/50 ${className || ''}`}>
      <Button
        isIconOnly
        variant="light"
        size="sm"
        onPress={onToggle}
        className="min-w-8 h-8 text-foreground-600 hover:text-foreground hover:bg-default-100 transition-all duration-200"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <div className="relative w-4 h-4">
          {/* Animated burger icon */}
          <div className={`absolute inset-0 transition-all duration-300 ${isCollapsed ? 'opacity-100 rotate-0' : 'opacity-0 rotate-180'}`}>
            <IconMenu2 size={16} />
          </div>
          <div className={`absolute inset-0 transition-all duration-300 ${isCollapsed ? 'opacity-0 -rotate-180' : 'opacity-100 rotate-0'}`}>
            <IconX size={16} />
          </div>
        </div>
      </Button>
    </div>
  );
};