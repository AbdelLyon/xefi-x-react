import type { JSX } from "react"
import { forwardRef } from "react"
import type { DropdownProps, UserProps } from "@heroui/react"
import { UserAvatar } from "@/avatar"
import { Dropdown, type DropdownSectionConfig } from "@/dropdown"
import { mergeTailwindClasses } from "@/utils"

export interface ProfileUser {
  name: string
  description?: string
  avatarSrc?: string
  status?: "online" | "offline" | "away" | "busy"
  showStatus?: boolean
}

export interface ProfileAction {
  key: string
  label: string
  href?: string
  icon?: React.ReactNode
  shortcut?: string
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger"
  variant?: "solid" | "bordered" | "light" | "flat" | "faded" | "shadow"
  onClick?: () => void
}

export interface ProfileSection {
  key: string
  title?: string
  showDivider?: boolean
  actions: ProfileAction[]
}

interface ProfileDropdownProps
  extends Omit<DropdownProps, "children" | "trigger"> {
  user: ProfileUser
  sections: ProfileSection[]
  onActionPress?: (action: ProfileAction) => void
  avatarProps?: Partial<UserProps>
  trigger?: React.ReactNode
  size?: "sm" | "md" | "lg"
  variant?: "default" | "bordered" | "shadow" | "flat"
  showUserInfo?: boolean
  placement?:
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "top"
    | "top-start"
    | "top-end"
}

const defaultTriggerClassNames = {
  default: "bg-background transition-all duration-200 hover:bg-content1-100",
  bordered:
    "bg-background border border-border transition-all duration-200 hover:bg-content1-100",
  shadow:
    "bg-background shadow-md transition-all duration-200 hover:shadow-lg hover:bg-content1-100",
  flat: "bg-background transition-all duration-200 hover:bg-content1-100",
} as const

const sizeClasses = {
  sm: "px-1.5 py-0.5",
  md: "px-2 py-1",
  lg: "px-2.5 py-1.5",
} as const

export const ProfileDropdown = forwardRef<HTMLDivElement, ProfileDropdownProps>(
  (
    {
      user,
      sections,
      onActionPress,
      avatarProps = {},
      trigger,
      size = "md",
      variant = "default",
      showUserInfo = true,
      placement = "bottom-end",
      classNames,
      ...dropdownProps
    },
    ref
  ): JSX.Element => {
    const dropdownSections: DropdownSectionConfig[] = sections.map(
      (section) => ({
        key: section.key,
        label: section.title,
        showDivider: section.showDivider,
        items: section.actions.map((action) => ({
          key: action.key,
          label: action.label,
          href: action.href,
          startContent: action.icon,
          shortcut: action.shortcut,
          className: mergeTailwindClasses(
            "data-[hover=true]:bg-content1-200 rounded-lg",
            action.color === "danger" &&
              "text-danger data-[hover=true]:bg-danger-50",
            action.color === "primary" &&
              "text-primary data-[hover=true]:bg-primary-50",
            action.color === "secondary" &&
              "text-secondary data-[hover=true]:bg-secondary-50",
            action.color === "success" &&
              "text-success data-[hover=true]:bg-success-50",
            action.color === "warning" &&
              "text-warning data-[hover=true]:bg-warning-50"
          ),
          onClick: action.onClick || (() => {}),
        })),
      })
    )

    const defaultTrigger = (
      <UserAvatar
        name={user.name}
        description={showUserInfo ? user.description : undefined}
        status={user.status}
        showStatus={user.showStatus}
        clickable
        className={mergeTailwindClasses(
          "cursor-pointer rounded-lg w-full",
          defaultTriggerClassNames[variant],
          sizeClasses[size],
          classNames?.trigger
        )}
        avatarProps={{
          size: size === "lg" ? "md" : "sm",
          src: user.avatarSrc,
          ...avatarProps.avatarProps,
        }}
        {...avatarProps}
      />
    )

    return (
      <Dropdown
        ref={ref}
        trigger={trigger || defaultTrigger}
        sections={dropdownSections}
        placement={placement}
        onItemPress={onActionPress}
        classNames={{
          base: mergeTailwindClasses("before:bg-default-200", classNames?.base),
          content: mergeTailwindClasses(
            "p-0 border border-border bg-background shadow-lg rounded-lg",
            classNames?.content
          ),
          trigger: mergeTailwindClasses("w-full", classNames?.trigger),
          ...classNames,
        }}
        {...dropdownProps}
      />
    )
  }
)

ProfileDropdown.displayName = "ProfileDropdown"
