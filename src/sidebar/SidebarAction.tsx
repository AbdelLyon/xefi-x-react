import type { JSX } from "react"
import { cloneElement } from "react"
import { Button, Divider } from "@heroui/react"
import { mergeTailwindClasses } from "@/utils"
import type { Color } from "@/types"

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
  showDivider,
  className,
}: SidebarActionProps): JSX.Element => {
  // Clone icon with appropriate styling for each mode
  const desktopIcon = cloneElement(actionIcon, {
    className: mergeTailwindClasses(
      "text-primary",
      actionIcon.props?.className || "",
    ),
  })

  const tabletIcon = cloneElement(actionIcon, {
    className: mergeTailwindClasses(
      "text-white",
      actionIcon.props?.className || "",
    ),
  })

  return (
    <>
      <div className="mt-6 flex justify-center">
        <Button
          color={actionColor}
          radius="none"
          className={mergeTailwindClasses(
            "transition-all h-10 rounded-md mb-6 font-semibold",
            {
              "w-[90%] justify-start px-3": isDesktop,
              "size-10 p-0 flex items-center justify-center": isTablet,
            },
            className,
          )}
          startContent={
            isDesktop ? (
              <div className="mr-2 rounded-sm bg-white">{desktopIcon}</div>
            ) : null
          }
          onPress={actionClick}
        >
          {isDesktop ? (
            actionLabel
          ) : (
            <div className="flex items-center justify-center rounded-sm">
              {tabletIcon}
            </div>
          )}
        </Button>
      </div>
      
      {showDivider && (
        <Divider
          className={mergeTailwindClasses(
            "border bg-[#39393893] mx-auto mb-3",
            {
              "w-[90%]": isDesktop,
              "w-10": isTablet,
            },
          )}
        />
      )}
    </>
  )
}