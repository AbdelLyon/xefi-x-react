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
    /* @__PURE__ */ jsxs("div", { className: mergeTailwindClasses(
      "flex items-center transition-all duration-300",
      {
        "justify-between p-3": shouldShowCollapsed,
        "justify-between p-4": !shouldShowCollapsed
      }
    ), children: [
      !shouldShowCollapsed && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-foreground", children: [
        appLogo,
        appName
      ] }),
      shouldShowCollapsed && /* @__PURE__ */ jsx("div", { className: "flex items-center text-foreground font-medium", children: appName }),
      showBurgerButton && /* @__PURE__ */ jsx(
        SidebarBurgerButton,
        {
          isCollapsed,
          onToggle,
          isDesktop,
          isTablet
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Divider, { className: "bg-divider/50" })
  ] });
};
export {
  SidebarHeader
};
