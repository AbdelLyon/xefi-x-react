import type { JSX, ReactNode } from "react"
import { forwardRef } from "react"
import type { AvatarGroupProps, AvatarProps, UserProps } from "@heroui/react"
import {
  Avatar as AvatarRoot,
  User as UserRoot,
  useAvatarGroup,
  AvatarGroupProvider,
} from "@heroui/react"
import type { StylableComponent } from "@/utils/typeUtils"
import { mergeTailwindClasses } from "@/utils"
import { avatarStatusClasses } from "./avatarConfig"

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (props, ref): JSX.Element => {
    return <AvatarRoot ref={ref} {...props} />
  }
)

Avatar.displayName = "Avatar"

/**
 * Enhanced AvatarGroup component interface
 */
export interface EnhancedAvatarGroupProps
  extends Omit<AvatarGroupProps, "renderCount">,
    StylableComponent {
  /** Custom render function for overflow count */
  renderCount?: (count: number) => ReactNode
  /** Spacing between avatars */
  spacing?: "sm" | "md" | "lg"
  /** Whether to show tooltip on hover */
  showTooltip?: boolean
  /** Animation on hover */
  animated?: boolean
}

/**
 * Enhanced AvatarGroup component with better spacing and animations
 *
 * @example
 * ```tsx
 * <AvatarGroup max={4} spacing="md" animated>
 *   <Avatar name="John Doe" />
 *   <Avatar name="Jane Smith" />
 *   <Avatar name="Bob Johnson" />
 * </AvatarGroup>
 * ```
 */
export const AvatarGroup = forwardRef<HTMLDivElement, EnhancedAvatarGroupProps>(
  (
    {
      spacing = "md",
      animated = false,
      renderCount = (count): JSX.Element => (
        <Avatar
          name={`+${count}`}
          className={mergeTailwindClasses(
            "bg-default-200 text-default-800 text-xs font-medium"
          )}
        />
      ),
      className,
      ...props
    },
    ref
  ): JSX.Element => {
    const { Component, clones, context, remainingCount, getAvatarGroupProps } =
      useAvatarGroup({
        ref,
        ...props,
        renderCount,
      })

    const spacingClasses = {
      sm: "-space-x-1",
      md: "-space-x-2",
      lg: "-space-x-3",
    }

    return (
      <Component
        {...getAvatarGroupProps()}
        className={mergeTailwindClasses(
          "flex items-center",
          spacingClasses[spacing],
          animated && "transition-all duration-200 hover:space-x-1",
          className
        )}
      >
        <AvatarGroupProvider value={context}>
          {clones}
          {remainingCount > 0 && renderCount(remainingCount)}
        </AvatarGroupProvider>
      </Component>
    )
  }
)

AvatarGroup.displayName = "AvatarGroup"

/**
 * Enhanced UserAvatar component interface
 */
export interface UserAvatarProps extends UserProps, StylableComponent {
  /** Whether to show user status */
  showStatus?: boolean
  /** User status */
  status?: "online" | "offline" | "away" | "busy"
  /** Whether user info is clickable */
  clickable?: boolean
  /** Custom click handler */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

/**
 * Enhanced UserAvatar component with status and interaction support
 *
 * @example
 * ```tsx
 * <UserAvatar
 *   name="John Doe"
 *   description="Software Engineer"
 *   avatarProps={{ src: "/avatar.jpg" }}
 *   status="online"
 *   showStatus
 *   clickable
 *   onClick={() => console.log('User clicked')}
 * />
 * ```
 */
export const UserAvatar = forwardRef<HTMLDivElement, UserAvatarProps>(
  (
    {
      showStatus = false,
      status,
      clickable = false,
      onClick,
      className,
      avatarProps,
      ...props
    },
    ref
  ): JSX.Element => {
    return (
      <UserRoot
        ref={ref}
        className={mergeTailwindClasses(
          clickable &&
            "cursor-pointer hover:bg-content1 rounded-lg p-2 -m-2 transition-colors",
          className
        )}
        avatarProps={{
          ...avatarProps,
          ...(showStatus &&
            status && {
              className: mergeTailwindClasses(
                "relative",
                avatarProps?.className
              ),
            }),
        }}
        onClick={onClick}
        {...props}
      >
        {/* Render children with potential status indicator */}
        {showStatus && status && (
          <span
            className={mergeTailwindClasses(
              "absolute bottom-0 right-0 w-3 h-3 rounded-full",
              avatarStatusClasses[status],
              "translate-x-1 translate-y-1"
            )}
            aria-label={`Status: ${status}`}
          />
        )}
      </UserRoot>
    )
  }
)

UserAvatar.displayName = "UserAvatar"
