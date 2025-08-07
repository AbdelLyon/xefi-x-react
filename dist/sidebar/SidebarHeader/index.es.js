import { jsxs, jsx } from "react/jsx-runtime";
import { Divider } from "@heroui/react";
import { SidebarBurgerButton } from "../SidebarBurgerButton/index.es.js";
import { mergeTailwindClasses } from "../../utils/utils/index.es.js";
const SidebarHeader = ({
  appLogo,
  appName,
  isCollapsed,
  onToggle,
  isDesktop,
  isTablet,
  showBurgerButton = true,
  className
}) => {
  const shouldShowCollapsed = isTablet || isDesktop && isCollapsed;
  return /* @__PURE__ */ jsxs("div", { className: mergeTailwindClasses("flex flex-col", className), children: [
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
          !shouldShowCollapsed && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-foreground", children: [
            appLogo,
            appName
          ] }),
          shouldShowCollapsed && /* @__PURE__ */ jsx("div", { className: "flex items-center font-medium text-foreground", children: appName }),
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
  ] });
};
export {
  SidebarHeader
};
