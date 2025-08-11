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
import { jsx, jsxs } from "react/jsx-runtime";
import { forwardRef } from "react";
import { Avatar as Avatar$1, useAvatarGroup, AvatarGroupProvider, User } from "@heroui/react";
import { avatarStatusClasses } from "../avatarConfig/index.es.js";
import { mergeTailwindClasses } from "../../utils/string/index.es.js";
const Avatar = forwardRef(
  (props, ref) => {
    return /* @__PURE__ */ jsx(Avatar$1, __spreadValues({ ref }, props));
  }
);
Avatar.displayName = "Avatar";
const AvatarGroup = forwardRef(
  (_a, ref) => {
    var _b = _a, {
      spacing = "md",
      animated = false,
      renderCount = (count) => /* @__PURE__ */ jsx(
        Avatar,
        {
          name: `+${count}`,
          className: mergeTailwindClasses(
            "bg-default-200 text-default-800 text-xs font-medium"
          )
        }
      ),
      className
    } = _b, props = __objRest(_b, [
      "spacing",
      "animated",
      "renderCount",
      "className"
    ]);
    const { Component, clones, context, remainingCount, getAvatarGroupProps } = useAvatarGroup(__spreadProps(__spreadValues({
      ref
    }, props), {
      renderCount
    }));
    const spacingClasses = {
      sm: "-space-x-1",
      md: "-space-x-2",
      lg: "-space-x-3"
    };
    return /* @__PURE__ */ jsx(
      Component,
      __spreadProps(__spreadValues({}, getAvatarGroupProps()), {
        className: mergeTailwindClasses(
          "flex items-center",
          spacingClasses[spacing],
          animated && "transition-all duration-200 hover:space-x-1",
          className
        ),
        children: /* @__PURE__ */ jsxs(AvatarGroupProvider, { value: context, children: [
          clones,
          remainingCount > 0 && renderCount(remainingCount)
        ] })
      })
    );
  }
);
AvatarGroup.displayName = "AvatarGroup";
const UserAvatar = forwardRef(
  (_c, ref) => {
    var _d = _c, {
      showStatus = false,
      status,
      clickable = false,
      onClick,
      className,
      avatarProps
    } = _d, props = __objRest(_d, [
      "showStatus",
      "status",
      "clickable",
      "onClick",
      "className",
      "avatarProps"
    ]);
    return /* @__PURE__ */ jsx(
      User,
      __spreadProps(__spreadValues({
        ref,
        className: mergeTailwindClasses(
          clickable && "cursor-pointer hover:bg-content1 rounded-lg p-2 -m-2 transition-colors",
          className
        ),
        avatarProps: __spreadValues(__spreadValues({}, avatarProps), showStatus && status && {
          className: mergeTailwindClasses(
            "relative",
            avatarProps == null ? void 0 : avatarProps.className
          )
        }),
        onClick
      }, props), {
        children: showStatus && status && /* @__PURE__ */ jsx(
          "span",
          {
            className: mergeTailwindClasses(
              "absolute bottom-0 right-0 w-3 h-3 rounded-full",
              avatarStatusClasses[status],
              "translate-x-1 translate-y-1"
            ),
            "aria-label": `Status: ${status}`
          }
        )
      })
    );
  }
);
UserAvatar.displayName = "UserAvatar";
export {
  Avatar,
  AvatarGroup,
  UserAvatar
};
