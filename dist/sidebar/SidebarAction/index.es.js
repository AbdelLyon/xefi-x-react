import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { cloneElement } from "react";
import { Button, Divider } from "@heroui/react";
import { mergeTailwindClasses } from "../../utils/utils/index.es.js";
const SidebarAction = ({
  actionLabel,
  actionIcon,
  actionColor,
  actionClick,
  isDesktop,
  isTablet,
  showDivider,
  className
}) => {
  var _a, _b;
  const desktopIcon = cloneElement(actionIcon, {
    className: mergeTailwindClasses(
      "text-primary",
      ((_a = actionIcon.props) == null ? void 0 : _a.className) || ""
    )
  });
  const tabletIcon = cloneElement(actionIcon, {
    className: mergeTailwindClasses(
      "text-white",
      ((_b = actionIcon.props) == null ? void 0 : _b.className) || ""
    )
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "mt-6 flex justify-center", children: /* @__PURE__ */ jsx(
      Button,
      {
        color: actionColor,
        radius: "none",
        className: mergeTailwindClasses(
          "transition-all h-10 rounded-md mb-6 font-semibold",
          {
            "w-[90%] justify-start px-3": isDesktop,
            "size-10 p-0 flex items-center justify-center": isTablet
          },
          className
        ),
        startContent: isDesktop ? /* @__PURE__ */ jsx("div", { className: "mr-2 rounded-sm bg-white", children: desktopIcon }) : null,
        onPress: actionClick,
        children: isDesktop ? actionLabel : /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center rounded-sm", children: tabletIcon })
      }
    ) }),
    showDivider && /* @__PURE__ */ jsx(
      Divider,
      {
        className: mergeTailwindClasses(
          "border bg-[#39393893] mx-auto mb-3",
          {
            "w-[90%]": isDesktop,
            "w-10": isTablet
          }
        )
      }
    )
  ] });
};
export {
  SidebarAction
};
