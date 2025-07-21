import { forwardRef } from "react"
import type { JSX, ReactNode } from "react"
import type { ChipProps as HeroUIChipProps } from "@heroui/react"
import { Chip as HeroUIChip } from "@heroui/react"
import { mergeTailwindClasses } from "@/utils"
import type { BaseComponentProps, Color, Size, Variant } from "@/types"

/**
 * Badge props extending HeroUI Chip with additional badge-specific features
 */
export interface BadgeProps
  extends Omit<HeroUIChipProps, "color" | "size" | "variant" | "content">,
    BaseComponentProps {
  /** Badge content */
  children?: ReactNode
  /** Badge color theme */
  color?: Color
  /** Badge variant */
  variant?: Extract<Variant, "solid" | "flat" | "bordered" | "light" | "faded">
  /** Badge size */
  size?: Extract<Size, "sm" | "md" | "lg">
  /** Content to attach badge to */
  content?: ReactNode
  /** Show dot indicator instead of content */
  dot?: boolean
  /** Badge visibility */
  isInvisible?: boolean
  /** Maximum count to display */
  max?: number
  /** Whether to show badge when count is zero */
  showZero?: boolean
  /** Placement relative to content */
  placement?: "top-right" | "top-left" | "bottom-right" | "bottom-left"
  /** Shape of the badge */
  shape?: "rectangle" | "circle"
  /** Custom styling for different parts */
  classNames?: {
    base?: string
    badge?: string
    content?: string
  }
}

/**
 * Modern Badge component built on top of HeroUI Chip
 * Provides flexible positioning, counting, and styling options
 *
 * @example
 * ```tsx
 * // Simple badge
 * <Badge color="primary">New</Badge>
 *
 * // Badge with content
 * <Badge content={<NotificationIcon />} color="danger" dot>
 *   <Button>Messages</Button>
 * </Badge>
 *
 * // Count badge with maximum
 * <Badge content={<MailIcon />} color="danger" max={99}>
 *   {unreadCount}
 * </Badge>
 * ```
 */
export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      children,
      color = "primary",
      variant = "solid",
      size = "md",
      shape = "circle",
      placement = "top-right",
      content,
      dot = false,
      isInvisible = false,
      max = 99,
      showZero = false,
      classNames,
      className,
      ...props
    },
    ref
  ): JSX.Element => {
    // Handle count display logic
    const getDisplayContent = (): ReactNode => {
      if (dot) {
        return null
      }

      if (typeof children === "number") {
        const count = children as number
        if (count === 0 && !showZero) {
          return null
        }
        if (count > max) {
          return `${max}+`
        }
        return count
      }

      return children
    }

    // Check if badge should be visible
    const shouldShow =
      !isInvisible &&
      (dot ||
        showZero ||
        (typeof children === "number" && children > 0) ||
        (children && typeof children !== "number"))

    const displayContent = getDisplayContent()

    // Placement classes for absolute positioning
    const placementClasses = {
      "top-right": "absolute -top-1 -right-1 z-10",
      "top-left": "absolute -top-1 -left-1 z-10",
      "bottom-right": "absolute -bottom-1 -right-1 z-10",
      "bottom-left": "absolute -bottom-1 -left-1 z-10",
    }

    // Badge component using HeroUI Chip
    const badgeElement = shouldShow ? (
      <HeroUIChip
        color={color}
        variant={variant}
        size={size}
        radius={shape === "rectangle" ? "sm" : "full"}
        className={mergeTailwindClasses(
          // Dot styles
          dot && "h-3 w-3 min-w-0 text-transparent",

          // Placement when used with content
          content && placementClasses[placement],

          // Custom badge classes
          classNames?.badge,

          // Standalone badge classes
          !content && className
        )}
        classNames={{
          base: mergeTailwindClasses(
            "border-2 border-background",
            dot && "p-0"
          ),
          content: mergeTailwindClasses(dot && "hidden"),
        }}
        {...props}
      >
        {displayContent}
      </HeroUIChip>
    ) : null

    // If no content to wrap around, return standalone badge
    if (!content) {
      return badgeElement || <></>
    }

    // Return badge positioned relative to content
    return (
      <div
        ref={ref}
        className={mergeTailwindClasses(
          "relative inline-flex items-center justify-center",
          classNames?.base,
          className
        )}
        {...props}
      >
        <div className={classNames?.content}>{content}</div>
        {badgeElement}
      </div>
    )
  }
)

Badge.displayName = "Badge"
