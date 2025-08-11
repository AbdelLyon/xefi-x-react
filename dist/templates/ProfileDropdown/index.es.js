var __defProp = Object.defineProperty;
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
import { jsx } from "react/jsx-runtime";
import { forwardRef } from "react";
import { UserAvatar } from "../../avatar/Avatar/index.es.js";
import { Dropdown } from "../../dropdown/Dropdown/index.es.js";
import { mergeTailwindClasses } from "../../utils/string/index.es.js";
const defaultTriggerClassNames = {
  default: "bg-background transition-all duration-200 hover:bg-content1-100",
  bordered: "bg-background border border-border transition-all duration-200 hover:bg-content1-100",
  shadow: "bg-background shadow-md transition-all duration-200 hover:shadow-lg hover:bg-content1-100",
  flat: "bg-background transition-all duration-200 hover:bg-content1-100"
};
const sizeClasses = {
  sm: "px-1.5 py-0.5",
  md: "px-2 py-1",
  lg: "px-2.5 py-1.5"
};
const ProfileDropdown = forwardRef(
  (_a, ref) => {
    var _b = _a, {
      user,
      sections,
      onActionPress,
      avatarProps = {},
      trigger,
      size = "md",
      variant = "default",
      showUserInfo = true,
      placement = "bottom-end",
      classNames
    } = _b, dropdownProps = __objRest(_b, [
      "user",
      "sections",
      "onActionPress",
      "avatarProps",
      "trigger",
      "size",
      "variant",
      "showUserInfo",
      "placement",
      "classNames"
    ]);
    const dropdownSections = sections.map(
      (section) => ({
        key: section.key,
        label: section.title,
        showDivider: section.showDivider,
        items: section.actions.map((action) => ({
          key: action.key,
          label: action.label,
          href: action.href,
          startContent: action.icon,
          shortcut: action.shortcut,
          className: mergeTailwindClasses(
            "data-[hover=true]:bg-content1-200 rounded-lg",
            action.color === "danger" && "text-danger data-[hover=true]:bg-danger-50",
            action.color === "primary" && "text-primary data-[hover=true]:bg-primary-50",
            action.color === "secondary" && "text-secondary data-[hover=true]:bg-secondary-50",
            action.color === "success" && "text-success data-[hover=true]:bg-success-50",
            action.color === "warning" && "text-warning data-[hover=true]:bg-warning-50"
          ),
          onClick: action.onClick || (() => {
          })
        }))
      })
    );
    const defaultTrigger = /* @__PURE__ */ jsx(
      UserAvatar,
      __spreadValues({
        name: user.name,
        description: showUserInfo ? user.description : void 0,
        status: user.status,
        showStatus: user.showStatus,
        clickable: true,
        className: mergeTailwindClasses(
          "cursor-pointer rounded-lg w-full",
          defaultTriggerClassNames[variant],
          sizeClasses[size],
          classNames == null ? void 0 : classNames.trigger
        ),
        avatarProps: __spreadValues({
          size: size === "lg" ? "md" : "sm",
          src: user.avatarSrc
        }, avatarProps.avatarProps)
      }, avatarProps)
    );
    return /* @__PURE__ */ jsx(
      Dropdown,
      __spreadValues({
        ref,
        trigger: trigger || defaultTrigger,
        sections: dropdownSections,
        placement,
        onItemPress: onActionPress,
        classNames: __spreadValues({
          base: mergeTailwindClasses("before:bg-default-200", classNames == null ? void 0 : classNames.base),
          content: mergeTailwindClasses(
            "p-0 border border-border bg-background shadow-lg rounded-lg",
            classNames == null ? void 0 : classNames.content
          ),
          trigger: mergeTailwindClasses("w-full", classNames == null ? void 0 : classNames.trigger)
        }, classNames)
      }, dropdownProps)
    );
  }
);
ProfileDropdown.displayName = "ProfileDropdown";
export {
  ProfileDropdown
};
