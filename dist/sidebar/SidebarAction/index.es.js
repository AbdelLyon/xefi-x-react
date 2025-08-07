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
      children: shouldShowCollapsed ? /* @__PURE__ */ jsx("div", { className: "flex size-5 items-center justify-center", children: actionIcon }) : actionLabel
    }
  );
  const buttonWithTooltip = shouldShowCollapsed ? /* @__PURE__ */ jsx(
    Tooltip,
    {
      trigger: actionButton,
      content: actionLabel,
      placement: "right",
      delay: 300,
      closeDelay: 100
    }
  ) : actionButton;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: mergeTailwindClasses("flex transition-all duration-300", {
          "justify-center mb-4 mt-4": shouldShowCollapsed,
          "justify-center mb-6 mt-6": !shouldShowCollapsed
        }),
        children: buttonWithTooltip
      }
    ),
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
