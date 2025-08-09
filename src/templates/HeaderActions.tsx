import type { JSX } from "react"
import { forwardRef } from "react"
import type { Selection } from "@heroui/react"
import { ToggleTheme } from "@/theme"
import { LanguageSelect, type Language } from "@/templates/LanguageSelect"
import {
  ProfileDropdown,
  type ProfileUser,
  type ProfileSection,
  type ProfileAction,
} from "@/templates/ProfileDropdown"
import { mergeTailwindClasses } from "@/utils"

export interface HeaderActionsProps {
  className?: string
  gap?: "0" | "1" | "2" | "3" | "4" | "6" | "8"
  align?: "start" | "center" | "end" | "between" | "around" | "evenly"

  // Theme toggle props
  showThemeToggle?: boolean
  themeToggleProps?: {
    className?: string
    size?: number
  }

  // Language select props
  showLanguageSelect?: boolean
  languages?: Language[]
  selectedLanguage?: Selection
  onLanguageChange?: (selection: Selection) => void
  languageSelectProps?: {
    className?: string
    size?: "sm" | "md" | "lg"
    placeholder?: string
    "aria-label"?: string
  }

  // Profile dropdown props
  showProfileDropdown?: boolean
  user?: ProfileUser
  profileSections?: ProfileSection[]
  onProfileAction?: (action: ProfileAction) => void
  profileDropdownProps?: {
    className?: string
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
}

const gapClasses = {
  "0": "gap-0",
  "1": "gap-1",
  "2": "gap-2",
  "3": "gap-3",
  "4": "gap-4",
  "6": "gap-6",
  "8": "gap-8",
} as const

const alignClasses = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
} as const

export const HeaderActions = forwardRef<HTMLDivElement, HeaderActionsProps>(
  (
    {
      className,
      gap = "2",
      align = "end",

      showThemeToggle = true,
      themeToggleProps = {},

      showLanguageSelect = true,
      languages = [],
      selectedLanguage,
      onLanguageChange,
      languageSelectProps = {},

      showProfileDropdown = true,
      user,
      profileSections = [],
      onProfileAction,
      profileDropdownProps = {},
    },
    ref
  ): JSX.Element => {
    const containerClasses = mergeTailwindClasses(
      "flex items-center",
      gapClasses[gap],
      alignClasses[align],
      className
    )

    return (
      <div ref={ref} className={containerClasses}>
        {/* Theme Toggle - à gauche */}
        {showThemeToggle && (
          <ToggleTheme
            className={mergeTailwindClasses(
              "flex-shrink-0",
              themeToggleProps.className
            )}
            size={themeToggleProps.size}
          />
        )}

        {/* Language Select - au centre */}
        {showLanguageSelect && languages.length > 0 && (
          <LanguageSelect
            languages={languages}
            value={selectedLanguage}
            onSelectionChange={onLanguageChange}
            size={languageSelectProps.size}
            placeholder={languageSelectProps.placeholder}
            aria-label={languageSelectProps["aria-label"]}
            classNames={{
              base: mergeTailwindClasses(
                "flex-shrink-0 w-20",
                languageSelectProps.className
              ),
            }}
          />
        )}

        {/* Profile Dropdown - à droite */}
        {showProfileDropdown && user && (
          <ProfileDropdown
            user={user}
            sections={profileSections}
            onActionPress={onProfileAction}
            size={profileDropdownProps.size}
            variant={profileDropdownProps.variant}
            showUserInfo={profileDropdownProps.showUserInfo}
            placement={profileDropdownProps.placement}
            classNames={{
              base: mergeTailwindClasses(
                "flex-shrink-0",
                profileDropdownProps.className
              ),
            }}
          />
        )}
      </div>
    )
  }
)

HeaderActions.displayName = "HeaderActions"
