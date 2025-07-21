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
  onItemClick,
  className,
}: SidebarLinkProps): JSX.Element => {
  const linkContent = (
    <Link
      key={item.key}
      className={mergeTailwindClasses(
        "flex items-center px-3 h-11 text-slate-50 dark:text-slate-50 hover:text-white hover:bg-[#292b2b99] rounded-md cursor-pointer text-sm transition-all duration-200",
        {
          "border-l-2 border-primary bg-[#292b2b99] text-white": item.isActive,
          "border-l-0 border-l-primary justify-center": isTablet && item.isActive,
          "gap-3 px-3": isDesktop,
          "w-full flex justify-center": isTablet,
        },
        className,
      )}
      onPress={() => onItemClick?.(item)}
    >
      <div
        className={mergeTailwindClasses({
          "": isDesktop,
          "flex items-center justify-center size-9": isTablet && !item.isActive,
          "flex items-center justify-center size-9 bg-primary/10":
            isTablet && item.isActive,
        })}
      >
        {item.startContent}
      </div>
      
      {isDesktop && item.label}
      
      {item.endContent !== null && (
        <div
          className={mergeTailwindClasses({
            "": isDesktop,
            "absolute right-1 top-1": isTablet,
          })}
        >
          {item.endContent}
        </div>
      )}
    </Link>
  )

  // Wrap in tooltip for tablet mode
  if (isTablet) {
    return (
      <Tooltip
        trigger={linkContent}
        key={item.key}
        content={item.label}
        placement="right"
        delay={0}
        closeDelay={0}
        className="border border-border px-2 py-1 shadow-lg"
      />
    )
  }

  return linkContent
}