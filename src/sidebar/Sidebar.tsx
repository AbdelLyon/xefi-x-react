import React, { cloneElement, type JSX, type ReactNode } from "react";
import { mergeTailwindClasses } from "@/utils";
import type { Item } from "@/types/navigation";
import { useResponsive } from "@/hooks";
import { Tooltip } from "@/tooltip";
import { Divider, Link } from "@heroui/react";
import { Button } from "@heroui/react";
import type { Color } from "@/types/types";
import { IconPlus } from "@tabler/icons-react";

export interface SidebarProps {
  items?: Item[];
  className?: string;
  classNames?: {
    base?: string;
    item?: string;
    action?: string;
  };
  bgImage?: ReactNode;
  ref?: React.RefObject<HTMLElement>;
  onItemClick?: (item: Item) => void;
  actionLabel?: string;
  actionIcon?: React.ReactElement<{ className?: string }>;
  actionColor?: Color;
  actionClick?: () => void;
  showDivider?: boolean;
}

export const Sidebar = ({
  items = [],
  classNames,
  bgImage,
  onItemClick,
  ref,
  actionLabel,
  actionIcon = <IconPlus className="rounded-md" />,
  actionColor = "primary",
  actionClick,
  showDivider = true,
}: SidebarProps): JSX.Element | null => {
  const { isDesktop, isTablet } = useResponsive();

  if (!isDesktop && !isTablet) {
    return null;
  }

  const renderLink = (item: Item): JSX.Element => {
    const linkContent = (
      <Link
        key={item.key}
        className={mergeTailwindClasses(
          "flex items-center px-3 h-11 text-slate-50 dark:text-slate-50 hover:text-white hover:bg-[#292b2b99] rounded-md cursor-pointer text-sm transition-all duration-200",
          {
            "border-l-2 border-primary bg-[#292b2b99] text-white":
              item.isActive,
            "border-l-0 border-l-primary justify-center":
              isTablet && item.isActive,
            "gap-3 px-3": isDesktop,
            "w-full flex justify-center": isTablet,
          },
          classNames?.item,
        )}
        onPress={(): void => onItemClick?.(item)}
      >
        <div
          className={mergeTailwindClasses({
            "": isDesktop,
            "flex items-center justify-center size-9":
              isTablet && !item.isActive,
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
    );

    // Wrap in tooltip only in tablet mode
    return isTablet ? (
      <Tooltip
        trigger={linkContent}
        key={item.key}
        content={item.label}
        placement="right"
        delay={0}
        closeDelay={0}
        className="border border-border px-2 py-1 shadow-lg"
      />
    ) : (
      linkContent
    );
  };

  const renderActionButton = (): JSX.Element | null => {
    if (!actionClick) {
      return null;
    }

    const desktopIcon = cloneElement(actionIcon, {
      className: mergeTailwindClasses(
        "text-primary",
        actionIcon.props.className || "",
      ),
    });

    const tabletIcon = cloneElement(actionIcon, {
      className: mergeTailwindClasses(
        "text-white",
        actionIcon.props.className || "",
      ),
    });

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
              classNames?.action,
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
    );
  };

  return (
    <aside
      ref={ref}
      className={mergeTailwindClasses(
        "fixed left-0 h-screen flex flex-col bg-[#181818] border-r border-border",
        {
          "w-[270px]": isDesktop,
          "w-[70px]": isTablet,
        },
        classNames?.base,
      )}
    >
      {renderActionButton()}
      <nav
        className={mergeTailwindClasses("flex-1", {
          "p-4": isDesktop,
          "pt-2 px-2": isTablet,
        })}
      >
        <div
          className={mergeTailwindClasses("flex flex-col", {
            "gap-2": isDesktop,
            "gap-4 items-center": isTablet,
          })}
        >
          {items.map(renderLink)}
        </div>
      </nav>
      {bgImage}
    </aside>
  );
};
