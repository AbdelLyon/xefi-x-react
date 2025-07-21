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
  Divider,
} from "@heroui/react"
import { mergeTailwindClasses } from "@/utils"
import type { Item } from "@/types/navigation"
import { useResponsive } from "@/hooks"

export type NavbarProps = {
  appName?: ReactNode
  appLogo?: ReactNode
  profile?: ReactNode
  navigationItems?: Item[]
  menuItems?: Item[]
  contentProps?: NavbarContentProps
  menuProps?: NavbarMenuProps
  onItemClick?: (item: Item) => void
  isMenuOpen?: boolean
  onMenuOpenChange?: (isOpen: boolean) => void
  classNames?: {
    item?: string
  }
} & Omit<NavbarRootProps, "children">

export const Navbar = forwardRef<HTMLElement, NavbarProps>(
  (
    {
      appName,
      appLogo,
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
          base: "bg-white dark:bg-background",
          wrapper: "max-w-full",
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

        {!isMobile && (appName !== null || appLogo !== null) && (
          <NavbarContent justify="start">
            {!isTablet && appLogo !== null && (
              <NavbarItem className="relative w-[247px] text-foreground">
                {appLogo}
                <Divider
                  orientation="vertical"
                  className="absolute right-[1px] top-1/2 h-[80%] -translate-y-1/2 transform bg-border-200 dark:border-border"
                />
              </NavbarItem>
            )}
            {appName !== null && (
              <NavbarItem className="text-foreground">{appName}</NavbarItem>
            )}
          </NavbarContent>
        )}

        <NavbarContent justify="end" {...contentProps}>
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
