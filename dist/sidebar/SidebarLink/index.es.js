import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@heroui/react";
import { useState, useEffect } from "react";
import { Tooltip } from "../../tooltip/Tooltip/index.es.js";
import { mergeTailwindClasses } from "../../utils/string/index.es.js";
const DelayedText = ({
  text,
  shouldShow,
  delay = 100
}) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if (!shouldShow) {
      setIsVisible(false);
      return;
    }
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timeout);
  }, [shouldShow, delay]);
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: `transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`,
      children: text
    }
  );
};
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
          "bg-primary/5 text-primary border-primary/10 border": item.isActive,
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
        !shouldShowCollapsed && /* @__PURE__ */ jsx("span", { className: "flex-1 font-medium", children: /* @__PURE__ */ jsx(DelayedText, { text: item.label, shouldShow: !shouldShowCollapsed, delay: 100 }) }),
        item.endContent !== null && /* @__PURE__ */ jsx(
          "div",
          {
            className: mergeTailwindClasses(
              "transition-all duration-300 ease-in-out overflow-hidden group-hover:opacity-100",
              {
                "opacity-60 max-w-full": !shouldShowCollapsed,
                "opacity-0 max-w-0": shouldShowCollapsed
              }
            ),
            children: item.endContent
          }
        )
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
