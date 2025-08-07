import { jsx } from "react/jsx-runtime";
import { Button } from "@heroui/react";
import { IconMenu3 } from "@tabler/icons-react";
const SidebarBurgerButton = ({
  isCollapsed,
  onToggle,
  isDesktop,
  isTablet,
  className
}) => {
  if (!isDesktop && !isTablet) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `flex ${isCollapsed ? "justify-center" : "justify-end"} p-3 ${className || ""}`,
      children: /* @__PURE__ */ jsx(
        Button,
        {
          isIconOnly: true,
          variant: "light",
          size: "sm",
          onPress: onToggle,
          className: "h-8 min-w-8 text-foreground-600 transition-all duration-200 hover:bg-default-100 hover:text-foreground",
          "aria-label": isCollapsed ? "Expand sidebar" : "Collapse sidebar",
          children: /* @__PURE__ */ jsx("div", { className: "relative size-4", children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 transition-all duration-300", children: /* @__PURE__ */ jsx(IconMenu3, { size: 16 }) }) })
        }
      )
    }
  );
};
export {
  SidebarBurgerButton
};
