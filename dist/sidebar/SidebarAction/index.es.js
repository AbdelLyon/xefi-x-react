import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Button, Divider } from "@heroui/react";
import { Tooltip } from "../../tooltip/Tooltip/index.es.js";
import { mergeTailwindClasses } from "../../utils/utils/index.es.js";
const SidebarAction = ({
  actionLabel,
  actionIcon,
  actionColor,
  actionClick,
  isDesktop,
  isTablet,
  isCollapsed = false,
  showDivider,
  className
}) => {
  const shouldShowCollapsed = isTablet || isDesktop && isCollapsed;
  const actionButton = /* @__PURE__ */ jsx(
    Button,
    {
      color: actionColor,
      className: mergeTailwindClasses(
        "transition-all duration-300 font-medium rounded-lg",
        {
          "w-[90%] h-10 justify-start gap-3 px-4": !shouldShowCollapsed,
          "size-10 min-w-10 p-0 flex items-center justify-center": shouldShowCollapsed
        },
        className
      ),
      startContent: !shouldShowCollapsed ? actionIcon : void 0,
      onPress: actionClick,
      children: shouldShowCollapsed ? /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center w-5 h-5", children: actionIcon }) : actionLabel
    }
  );
  const buttonWithTooltip = shouldShowCollapsed ? /* @__PURE__ */ jsx(
    Tooltip,
    {
      content: actionLabel,
      placement: "right",
      delay: 300,
      closeDelay: 100,
      className: "bg-content1 border border-divider px-3 py-2 shadow-lg rounded-lg",
      children: actionButton
    }
  ) : actionButton;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: mergeTailwindClasses(
      "flex transition-all duration-300",
      {
        "justify-center mb-4 mt-4": shouldShowCollapsed,
        "justify-center mb-6 mt-6": !shouldShowCollapsed
      }
    ), children: buttonWithTooltip }),
    showDivider && /* @__PURE__ */ jsx(
      Divider,
      {
        className: mergeTailwindClasses(
          "bg-divider/50 mx-auto mb-4 transition-all duration-300",
          {
            "w-[90%]": !shouldShowCollapsed,
            "w-10": shouldShowCollapsed
          }
        )
      }
    )
  ] });
};
export {
  SidebarAction
};
