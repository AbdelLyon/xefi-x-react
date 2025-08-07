import { jsxs, jsx } from "react/jsx-runtime";
import { Divider } from "@heroui/react";
import { SidebarBurgerButton } from "../SidebarBurgerButton/index.es.js";
import { mergeTailwindClasses } from "../../utils/utils/index.es.js";
const SidebarHeader = ({
  appLogo,
  isCollapsed,
  onToggle,
  isDesktop,
  isTablet,
  showBurgerButton = true,
  className
}) => {
  const shouldShowCollapsed = isTablet || isDesktop && isCollapsed;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: mergeTailwindClasses(
        "flex flex-col items-center justify-center border-b-none dark:border-b dark:border-border shadow-lg bg-white dark:bg:content1 dark:shadow-non",
        className
      ),
      children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: mergeTailwindClasses(
              "flex items-center justify-between transition-all duration-300",
              "h-16 px-4",
              // Height 16 (64px) to match Hero UI navbar height
              {
                "px-3": shouldShowCollapsed,
                "px-4": !shouldShowCollapsed
              }
            ),
            children: [
              !shouldShowCollapsed && appLogo && /* @__PURE__ */ jsx("div", { className: "flex items-center text-foreground", children: appLogo }),
              shouldShowCollapsed && appLogo && /* @__PURE__ */ jsx("div", { className: "flex items-center text-foreground", children: appLogo }),
              showBurgerButton && /* @__PURE__ */ jsx(
                SidebarBurgerButton,
                {
                  isCollapsed,
                  onToggle,
                  isDesktop,
                  isTablet
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx(Divider, { className: "bg-divider/50" })
      ]
    }
  );
};
export {
  SidebarHeader
};
