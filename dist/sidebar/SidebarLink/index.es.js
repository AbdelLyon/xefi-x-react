import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@heroui/react";
import { Tooltip } from "../../tooltip/Tooltip/index.es.js";
import { mergeTailwindClasses } from "../../utils/utils/index.es.js";
const SidebarLink = ({
  item,
  isDesktop,
  isTablet,
  isCollapsed = false,
  onItemClick,
  className
}) => {
  const shouldShowCollapsed = isTablet || isDesktop && isCollapsed;
  const linkContent = /* @__PURE__ */ jsxs(
    Link,
    {
      className: mergeTailwindClasses(
        "group relative flex items-center px-3 h-11 text-slate-50 dark:text-slate-50 hover:text-white hover:bg-[#292b2b99] rounded-md cursor-pointer text-sm transition-all duration-200",
        {
          "bg-primary/10 text-primary border-primary/20 border": item.isActive,
          "justify-center px-2": shouldShowCollapsed,
          "gap-3 px-3": !shouldShowCollapsed
        },
        className
      ),
      onPress: () => onItemClick == null ? void 0 : onItemClick(item),
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: mergeTailwindClasses(
              "flex items-center justify-center transition-all duration-200",
              {
                "size-8 rounded-md": shouldShowCollapsed,
                "size-5": !shouldShowCollapsed,
                "bg-primary/20": shouldShowCollapsed && item.isActive
              }
            ),
            children: item.startContent
          }
        ),
        !shouldShowCollapsed && /* @__PURE__ */ jsx("span", { className: "flex-1 font-medium transition-opacity delay-300 duration-400", children: item.label }),
        item.endContent !== null && !shouldShowCollapsed && /* @__PURE__ */ jsx("div", { className: "opacity-60 transition-opacity delay-200 duration-300 group-hover:opacity-100", children: item.endContent })
      ]
    },
    item.key
  );
  if (shouldShowCollapsed) {
    return /* @__PURE__ */ jsx(
      Tooltip,
      {
        trigger: linkContent,
        content: item.label,
        placement: "right",
        delay: 300,
        closeDelay: 100,
        className: "rounded-lg border border-border bg-content1 px-3 py-2 shadow-lg"
      },
      item.key
    );
  }
  return linkContent;
};
export {
  SidebarLink
};
