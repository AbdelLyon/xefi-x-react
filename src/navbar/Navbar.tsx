import type { JSX, ReactNode } from "react"
import { forwardRef } from "react"
import type {
  NavbarContentProps,
  NavbarMenuProps,
  NavbarProps as NavbarRootProps,
  PressEvent,
} from "@heroui/react"
import {
  Navbar as NavbarRoot,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarItem,
  NavbarMenuItem,
  Link,
} from "@heroui/react"
import { mergeTailwindClasses } from "@/utils"
import type { Item } from "@/types/navigation"
import { useResponsive } from "@/hooks"

export type NavbarProps = {
  appName?: ReactNode
  profile?: ReactNode
  navigationItems?: Item[]
  menuItems?: Item[]
  contentProps?: NavbarContentProps
  menuProps?: NavbarMenuProps
  onItemClick?: (item: Item) => void
  isMenuOpen?: boolean
  onMenuOpenChange?: (isOpen: boolean) => void
  /** Whether the sidebar is collapsed on desktop */
  isSidebarCollapsed?: boolean
  classNames?: {
    item?: string
  }
} & Omit<NavbarRootProps, "children">

export const Navbar = forwardRef<HTMLElement, NavbarProps>(
  (
    {
      appName,
      profile,
      navigationItems = [],
      menuItems = [],
      contentProps,
      menuProps,
      onItemClick,
      className,
      classNames,
      isMenuOpen,
      onMenuOpenChange,
      isSidebarCollapsed = false,
      ...props
    },
    ref
  ): JSX.Element => {
    const { isDesktop, isMobile, isTablet } = useResponsive()

    const handleItemPress = (item: Item, event: PressEvent): void => {
      item.onClick?.(event)
      onItemClick?.(item)
      onMenuOpenChange?.(false)
    }

    return (
      <NavbarRoot
        ref={ref}
        className={className}
        classNames={{
          base: "border-b-none dark:border-b dark:border-border shadow-lg bg-white dark:bg:content1 dark:shadow-none",
          wrapper: mergeTailwindClasses(
            "max-w-full transition-all duration-300",
            isDesktop
              ? isSidebarCollapsed
                ? "pl-[70px]"
                : "pl-[270px]"
              : isTablet
                ? "pl-[70px]"
                : "pl-0"
          ),
          ...classNames,
        }}
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={onMenuOpenChange}
        {...props}
      >
        {isMobile && (
          <NavbarContent>
            <NavbarMenuToggle
              aria-label={isMenuOpen === true ? "Close menu" : "Open menu"}
            />
          </NavbarContent>
        )}

        <NavbarContent justify="start" {...contentProps}>
          {/* App Name - always visible on the left */}
          {appName && (
            <NavbarItem className="font-semibold text-foreground">
              {appName}
            </NavbarItem>
          )}
          
          {isDesktop &&
            navigationItems.map(
              (item): JSX.Element => (
                <NavbarItem key={item.key}>
                  <Link
                    className={mergeTailwindClasses(
                      "p-2 hover:bg-content1 rounded-md text-foreground",
                      item.isActive &&
                        "border-l-2 border-primary bg-content1 text-primary",
                      classNames?.item
                    )}
                    onPress={(ev): void => handleItemPress(item, ev)}
                  >
                    {item.startContent}
                    {item.label}
                    {item.endContent}
                  </Link>
                </NavbarItem>
              )
            )}
        </NavbarContent>

        <NavbarContent justify="end">
          {profile !== null && <NavbarItem>{profile}</NavbarItem>}
        </NavbarContent>

        {/* Mobile Menu */}
        {!isDesktop && (
          <NavbarMenu {...menuProps}>
            {menuItems.map(
              (item): JSX.Element => (
                <NavbarMenuItem key={item.key}>
                  <Link
                    key={item.key}
                    className={mergeTailwindClasses(
                      "flex items-center gap-3 p-3 text-foreground hover:bg-content1 rounded-md cursor-pointer",
                      item.isActive &&
                        "border-l-2 border-primary bg-content1 text-primary",
                      classNames?.item
                    )}
                    onPress={(): void => onItemClick?.(item)}
                  >
                    {item.startContent}
                    {item.label}
                    {item.endContent}
                  </Link>
                </NavbarMenuItem>
              )
            )}
          </NavbarMenu>
        )}
      </NavbarRoot>
    )
  }
)

Navbar.displayName = "Navbar"
