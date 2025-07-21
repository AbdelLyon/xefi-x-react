import { jsxs, jsx } from "react/jsx-runtime";
import { IconPlus } from "@tabler/icons-react";
import { SidebarLink } from "../SidebarLink/index.es.js";
import { SidebarAction } from "../SidebarAction/index.es.js";
import { useSidebarLayout } from "../useSidebarLayout/index.es.js";
import { mergeTailwindClasses } from "../../utils/utils/index.es.js";
const Sidebar = ({
  items = [],
  classNames = {},
  bgImage,
  onItemClick,
  ref,
  actionLabel,
  actionIcon = /* @__PURE__ */ jsx(IconPlus, { className: "rounded-md" }),
  actionColor = "primary",
  actionClick,
  showDivider = true,
  layoutConfig
}) => {
  const {
    isVisible,
    isDesktop,
    isTablet,
    containerClasses,
    navigationClasses,
    itemContainerClasses
  } = useSidebarLayout(layoutConfig);
  if (!isVisible) {
    return null;
  }
  return /* @__PURE__ */ jsxs(
    "aside",
    {
      ref,
      className: mergeTailwindClasses(
        containerClasses,
        classNames.base
      ),
      children: [
        actionClick && /* @__PURE__ */ jsx(
          SidebarAction,
          {
            actionLabel,
            actionIcon,
            actionColor,
            actionClick,
            isDesktop,
            isTablet,
            showDivider,
            className: classNames.action
          }
        ),
        /* @__PURE__ */ jsx("nav", { className: navigationClasses, children: /* @__PURE__ */ jsx("div", { className: itemContainerClasses, children: items.map((item) => /* @__PURE__ */ jsx(
          SidebarLink,
          {
            item,
            isDesktop,
            isTablet,
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
