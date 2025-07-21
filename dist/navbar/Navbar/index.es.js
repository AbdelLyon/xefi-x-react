var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
import { jsxs, jsx } from "react/jsx-runtime";
import { forwardRef } from "react";
import { Navbar as Navbar$1, NavbarContent, NavbarMenuToggle, NavbarItem, Divider, Link, NavbarMenu, NavbarMenuItem } from "@heroui/react";
import { useResponsive } from "../../hooks/useResponsive/index.es.js";
import { mergeTailwindClasses } from "../../utils/utils/index.es.js";
const Navbar = forwardRef(
  (_a, ref) => {
    var _b = _a, {
      appName,
      appLogo,
      profile,
      navigationItems = [],
      menuItems = [],
      contentProps,
      menuProps,
      onItemClick,
      className,
      classNames,
      isMenuOpen,
      onMenuOpenChange
    } = _b, props = __objRest(_b, [
      "appName",
      "appLogo",
      "profile",
      "navigationItems",
      "menuItems",
      "contentProps",
      "menuProps",
      "onItemClick",
      "className",
      "classNames",
      "isMenuOpen",
      "onMenuOpenChange"
    ]);
    const { isDesktop, isMobile, isTablet } = useResponsive();
    const handleItemPress = (item) => {
      var _a2;
      (_a2 = item.onPress) == null ? void 0 : _a2.call(item);
      onItemClick == null ? void 0 : onItemClick(item);
      onMenuOpenChange == null ? void 0 : onMenuOpenChange(false);
    };
    return /* @__PURE__ */ jsxs(
      Navbar$1,
      __spreadProps(__spreadValues({
        ref,
        className,
        classNames: __spreadValues({
          base: "bg-white dark:bg-background",
          wrapper: "max-w-full"
        }, classNames),
        isMenuOpen,
        onMenuOpenChange
      }, props), {
        children: [
          isMobile && /* @__PURE__ */ jsx(NavbarContent, { children: /* @__PURE__ */ jsx(
            NavbarMenuToggle,
            {
              "aria-label": isMenuOpen === true ? "Close menu" : "Open menu"
            }
          ) }),
          !isMobile && (appName !== null || appLogo !== null) && /* @__PURE__ */ jsxs(NavbarContent, { justify: "start", children: [
            !isTablet && appLogo !== null && /* @__PURE__ */ jsxs(NavbarItem, { className: "relative w-[247px] text-foreground", children: [
              appLogo,
              /* @__PURE__ */ jsx(
                Divider,
                {
                  orientation: "vertical",
                  className: "absolute right-[1px] top-1/2 h-[80%] -translate-y-1/2 transform bg-border-200 dark:border-border"
                }
              )
            ] }),
            appName !== null && /* @__PURE__ */ jsx(NavbarItem, { className: "text-foreground", children: appName })
          ] }),
          /* @__PURE__ */ jsxs(NavbarContent, __spreadProps(__spreadValues({ justify: "end" }, contentProps), { children: [
            isDesktop && navigationItems.map(
              (item) => /* @__PURE__ */ jsx(NavbarItem, { children: /* @__PURE__ */ jsxs(
                Link,
                {
                  className: mergeTailwindClasses(
                    "p-2 hover:bg-content1 rounded-md text-foreground",
                    {
                      "border-l-2 border-primary bg-content1 text-primary": item.isActive
                    },
                    classNames == null ? void 0 : classNames.item
                  ),
                  onPress: () => handleItemPress(item),
                  children: [
                    item.startContent,
                    item.label,
                    item.endContent
                  ]
                }
              ) }, item.key)
            ),
            profile !== null && /* @__PURE__ */ jsx(NavbarItem, { children: profile })
          ] })),
          !isDesktop && /* @__PURE__ */ jsx(NavbarMenu, __spreadProps(__spreadValues({}, menuProps), { children: menuItems.map(
            (item) => /* @__PURE__ */ jsx(NavbarMenuItem, { children: /* @__PURE__ */ jsxs(
              Link,
              {
                className: mergeTailwindClasses(
                  "flex items-center gap-3 p-3 text-foreground hover:bg-content1 rounded-md cursor-pointer",
                  {
                    "border-l-2 border-primary bg-content1 text-primary": item.isActive
                  },
                  classNames == null ? void 0 : classNames.item
                ),
                onPress: () => onItemClick == null ? void 0 : onItemClick(item),
                children: [
                  item.startContent,
                  item.label,
                  item.endContent
                ]
              },
              item.key
            ) }, item.key)
          ) }))
        ]
      })
    );
  }
);
Navbar.displayName = "Navbar";
export {
  Navbar
};
