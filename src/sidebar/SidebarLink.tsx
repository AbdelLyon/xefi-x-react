import type { JSX } from "react"
import { Link } from "@heroui/react"
import { mergeTailwindClasses } from "@/utils"
import type { Item } from "@/types/navigation"
import { Tooltip } from "@/tooltip"

/**
 * Props for SidebarLink component
 */
export interface SidebarLinkProps {
  item: Item
  isDesktop: boolean
  isTablet: boolean
  isCollapsed?: boolean
  onItemClick?: (item: Item) => void
  className?: string
}

/**
 * Individual sidebar link component with tooltip support
 */
export const SidebarLink = ({
  item,
  isDesktop,
  isTablet,
  isCollapsed = false,
  onItemClick,
  className,
}: SidebarLinkProps): JSX.Element => {
  const shouldShowCollapsed = isTablet || (isDesktop && isCollapsed)

  const linkContent = (
    <Link
      key={item.key}
      className={mergeTailwindClasses(
        "group relative flex items-center h-11 text-foreground-600 hover:text-foreground hover:bg-default-100/50 rounded-lg cursor-pointer text-sm transition-all duration-200",
        {
          "bg-primary/10 text-primary border-primary/20 border": item.isActive,
          "justify-center px-2": shouldShowCollapsed,
          "gap-3 px-3": !shouldShowCollapsed,
        },
        className
      )}
      onPress={() => onItemClick?.(item)}
    >
      <div
        className={mergeTailwindClasses(
          "flex items-center justify-center transition-all duration-200",
          {
            "size-8 rounded-md": shouldShowCollapsed,
            "size-5": !shouldShowCollapsed,
            "bg-primary/20": shouldShowCollapsed && item.isActive,
          }
        )}
      >
        {item.startContent}
      </div>

      {!shouldShowCollapsed && (
        <span className="flex-1 font-medium">{item.label}</span>
      )}

      {item.endContent !== null && !shouldShowCollapsed && (
        <div className="opacity-60 transition-opacity group-hover:opacity-100">
          {item.endContent}
        </div>
      )}
    </Link>
  )

  // Wrap in tooltip for collapsed mode
  if (shouldShowCollapsed) {
    return (
      <Tooltip
        trigger={linkContent}
        key={item.key}
        content={item.label}
        placement="right"
        delay={300}
        closeDelay={100}
        className="rounded-lg border border-border bg-content1 px-3 py-2 shadow-lg"
      />
    )
  }

  return linkContent
}
