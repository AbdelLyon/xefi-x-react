import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@heroui/react";
import { Tooltip } from "../../tooltip/Tooltip/index.es.js";
import { mergeTailwindClasses } from "../../utils/utils/index.es.js";
const SidebarLink = ({
  item,
  isDesktop,
  isTablet,
  onItemClick,
  className
}) => {
  const linkContent = /* @__PURE__ */ jsxs(
    Link,
    {
      className: mergeTailwindClasses(
        "flex items-center px-3 h-11 text-slate-50 dark:text-slate-50 hover:text-white hover:bg-[#292b2b99] rounded-md cursor-pointer text-sm transition-all duration-200",
        {
          "border-l-2 border-primary bg-[#292b2b99] text-white": item.isActive,
          "border-l-0 border-l-primary justify-center": isTablet && item.isActive,
          "gap-3 px-3": isDesktop,
          "w-full flex justify-center": isTablet
        },
        className
      ),
      onPress: () => onItemClick == null ? void 0 : onItemClick(item),
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: mergeTailwindClasses({
              "": isDesktop,
              "flex items-center justify-center size-9": isTablet && !item.isActive,
              "flex items-center justify-center size-9 bg-primary/10": isTablet && item.isActive
            }),
            children: item.startContent
          }
        ),
        isDesktop && item.label,
        item.endContent !== null && /* @__PURE__ */ jsx(
          "div",
          {
            className: mergeTailwindClasses({
              "": isDesktop,
              "absolute right-1 top-1": isTablet
            }),
            children: item.endContent
          }
        )
      ]
    },
    item.key
  );
  if (isTablet) {
    return /* @__PURE__ */ jsx(
      Tooltip,
      {
        trigger: linkContent,
        content: item.label,
        placement: "right",
        delay: 0,
        closeDelay: 0,
        className: "border border-border px-2 py-1 shadow-lg"
      },
      item.key
    );
  }
  return linkContent;
};
export {
  SidebarLink
};
