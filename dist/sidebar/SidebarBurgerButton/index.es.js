import { jsx, jsxs } from "react/jsx-runtime";
import { Button } from "@heroui/react";
import { IconMenu2, IconX } from "@tabler/icons-react";
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
  return /* @__PURE__ */ jsx("div", { className: `flex ${isCollapsed ? "justify-center" : "justify-end"} p-3 border-b border-divider/50 ${className || ""}`, children: /* @__PURE__ */ jsx(
    Button,
    {
      isIconOnly: true,
      variant: "light",
      size: "sm",
      onPress: onToggle,
      className: "min-w-8 h-8 text-foreground-600 hover:text-foreground hover:bg-default-100 transition-all duration-200",
      "aria-label": isCollapsed ? "Expand sidebar" : "Collapse sidebar",
      children: /* @__PURE__ */ jsxs("div", { className: "relative w-4 h-4", children: [
        /* @__PURE__ */ jsx("div", { className: `absolute inset-0 transition-all duration-300 ${isCollapsed ? "opacity-100 rotate-0" : "opacity-0 rotate-180"}`, children: /* @__PURE__ */ jsx(IconMenu2, { size: 16 }) }),
        /* @__PURE__ */ jsx("div", { className: `absolute inset-0 transition-all duration-300 ${isCollapsed ? "opacity-0 -rotate-180" : "opacity-100 rotate-0"}`, children: /* @__PURE__ */ jsx(IconX, { size: 16 }) })
      ] })
    }
  ) });
};
export {
  SidebarBurgerButton
};
