import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { cloneElement } from "react";
import { Button, Divider, Link } from "@heroui/react";
import { IconPlus } from "@tabler/icons-react";
import { useResponsive } from "../../hooks/useResponsive/index.es.js";
import { Tooltip } from "../../tooltip/Tooltip/index.es.js";
import { mergeTailwindClasses } from "../../utils/utils/index.es.js";
const Sidebar = ({
  items = [],
  classNames,
  bgImage,
  onItemClick,
  ref,
  actionLabel,
  actionIcon = /* @__PURE__ */ jsx(IconPlus, { className: "rounded-md" }),
  actionColor = "primary",
  actionClick,
  showDivider = true
}) => {
  const { isDesktop, isTablet } = useResponsive();
  if (!isDesktop && !isTablet) {
    return null;
  }
  const renderLink = (item) => {
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
          classNames == null ? void 0 : classNames.item
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
    return isTablet ? /* @__PURE__ */ jsx(
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
    ) : linkContent;
  };
  const renderActionButton = () => {
    if (!actionClick) {
      return null;
    }
    const desktopIcon = cloneElement(actionIcon, {
      className: mergeTailwindClasses(
        "text-primary",
        actionIcon.props.className || ""
      )
    });
    const tabletIcon = cloneElement(actionIcon, {
      className: mergeTailwindClasses(
        "text-white",
        actionIcon.props.className || ""
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
            classNames == null ? void 0 : classNames.action
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
  return /* @__PURE__ */ jsxs(
    "aside",
    {
      ref,
      className: mergeTailwindClasses(
        "fixed left-0 h-screen flex flex-col bg-[#181818] border-r border-border",
        {
          "w-[270px]": isDesktop,
          "w-[70px]": isTablet
        },
        classNames == null ? void 0 : classNames.base
      ),
      children: [
        renderActionButton(),
        /* @__PURE__ */ jsx(
          "nav",
          {
            className: mergeTailwindClasses("flex-1", {
              "p-4": isDesktop,
              "pt-2 px-2": isTablet
            }),
            children: /* @__PURE__ */ jsx(
              "div",
              {
                className: mergeTailwindClasses("flex flex-col", {
                  "gap-2": isDesktop,
                  "gap-4 items-center": isTablet
                }),
                children: items.map(renderLink)
              }
            )
          }
        ),
        bgImage
      ]
    }
  );
};
export {
  Sidebar
};
