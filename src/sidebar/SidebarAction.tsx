import type { JSX } from "react"
import { cloneElement } from "react"
import { Button, Divider } from "@heroui/react"
import { mergeTailwindClasses } from "@/utils"
import type { Color } from "@/types"
import { Tooltip } from "@/tooltip"

/**
 * Props for SidebarAction component
 */
export interface SidebarActionProps {
  actionLabel?: string
  actionIcon: JSX.Element
  actionColor: Color
  actionClick: () => void
  isDesktop: boolean
  isTablet: boolean
  isCollapsed?: boolean
  showDivider: boolean
  className?: string
}

/**
 * Sidebar action button with responsive design
 */
export const SidebarAction = ({
  actionLabel,
  actionIcon,
  actionColor,
  actionClick,
  isDesktop,
  isTablet,
  isCollapsed = false,
  showDivider,
  className,
}: SidebarActionProps): JSX.Element => {
  const shouldShowCollapsed = isTablet || (isDesktop && isCollapsed);
  
  const actionButton = (
    <Button
      color={actionColor}
      className={mergeTailwindClasses(
        "transition-all duration-300 font-medium rounded-lg",
        {
          "w-[90%] h-10 justify-start gap-3 px-4": !shouldShowCollapsed,
          "size-10 min-w-10 p-0 flex items-center justify-center": shouldShowCollapsed,
        },
        className,
      )}
      startContent={!shouldShowCollapsed ? actionIcon : undefined}
      onPress={actionClick}
    >
      {shouldShowCollapsed ? (
        <div className="flex items-center justify-center w-5 h-5">
          {actionIcon}
        </div>
      ) : (
        actionLabel
      )}
    </Button>
  );

  const buttonWithTooltip = shouldShowCollapsed ? (
    <Tooltip
      content={actionLabel}
      placement="right"
      delay={300}
      closeDelay={100}
      className="bg-content1 border border-divider px-3 py-2 shadow-lg rounded-lg"
    >
      {actionButton}
    </Tooltip>
  ) : actionButton;

  return (
    <>
      <div className={mergeTailwindClasses(
        "flex transition-all duration-300",
        {
          "justify-center mb-4 mt-4": shouldShowCollapsed,
          "justify-center mb-6 mt-6": !shouldShowCollapsed,
        }
      )}>
        {buttonWithTooltip}
      </div>
      
      {showDivider && (
        <Divider
          className={mergeTailwindClasses(
            "bg-divider/50 mx-auto mb-4 transition-all duration-300",
            {
              "w-[90%]": !shouldShowCollapsed,
              "w-10": shouldShowCollapsed,
            },
          )}
        />
      )}
    </>
  )
}