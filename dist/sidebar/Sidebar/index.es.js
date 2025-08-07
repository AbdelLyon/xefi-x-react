import { jsxs, jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { IconPlus } from "@tabler/icons-react";
import { SidebarLink } from "../SidebarLink/index.es.js";
import { SidebarAction } from "../SidebarAction/index.es.js";
import { SidebarHeader } from "../SidebarHeader/index.es.js";
import { mergeTailwindClasses } from "../../utils/utils/index.es.js";
const Sidebar = ({
  items = [],
  appLogo,
  classNames = {},
  bgImage,
  onItemClick,
  ref,
  actionLabel,
  actionIcon = /* @__PURE__ */ jsx(IconPlus, { className: "rounded-md" }),
  actionColor = "primary",
  actionClick,
  showDivider = true,
  config,
  showBurgerButton = true
}) => {
  const shouldShowCollapsed = config.isDesktop && config.isCollapsed || config.isTablet;
  useEffect(() => {
    if (!config.isVisible) {
      document.documentElement.style.setProperty("--sidebar-width", "0px");
      return;
    }
    const sidebarWidth = shouldShowCollapsed ? "70px" : "270px";
    document.documentElement.style.setProperty("--sidebar-width", sidebarWidth);
  }, [shouldShowCollapsed, config.isVisible]);
  if (!config.isVisible) {
    return null;
  }
  return /* @__PURE__ */ jsxs(
    "aside",
    {
      ref,
      className: mergeTailwindClasses(config.containerClasses, classNames.base),
      children: [
        (appLogo || showBurgerButton) && /* @__PURE__ */ jsx(
          SidebarHeader,
          {
            appLogo,
            isCollapsed: shouldShowCollapsed,
            onToggle: config.toggleCollapsed,
            isDesktop: config.isDesktop,
            isTablet: config.isTablet,
            showBurgerButton
          }
        ),
        actionClick && /* @__PURE__ */ jsx(
          SidebarAction,
          {
            actionLabel,
            actionIcon,
            actionColor,
            actionClick,
            isDesktop: config.isDesktop,
            isTablet: config.isTablet,
            isCollapsed: config.isCollapsed,
            showDivider,
            className: classNames.action
          }
        ),
        /* @__PURE__ */ jsx("nav", { className: config.navigationClasses, children: /* @__PURE__ */ jsx("div", { className: config.itemContainerClasses, children: items.map((item) => /* @__PURE__ */ jsx(
          SidebarLink,
          {
            item,
            isDesktop: config.isDesktop,
            isTablet: config.isTablet,
            isCollapsed: config.isCollapsed,
            onItemClick,
            className: classNames.item
          },
          item.key
        )) }) }),
        bgImage
      ]
    }
  );
};
export {
  Sidebar
};
