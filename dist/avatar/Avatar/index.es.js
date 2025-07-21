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
import { jsx, jsxs } from "react/jsx-runtime";
import { forwardRef } from "react";
import { Avatar as Avatar$1, useAvatarGroup, AvatarGroupProvider, User } from "@heroui/react";
const Avatar = forwardRef(
  (props, ref) => {
    return /* @__PURE__ */ jsx(Avatar$1, __spreadValues({ ref }, props));
  }
);
Avatar.displayName = "Avatar";
const AvatarGroup = forwardRef(
  (props, ref) => {
    const {
      Component,
      clones,
      context,
      remainingCount,
      renderCount = (count) => /* @__PURE__ */ jsx(Avatar, { name: `+${count}` }),
      getAvatarGroupProps
    } = useAvatarGroup(__spreadValues({
      ref
    }, props));
    return /* @__PURE__ */ jsx(Component, __spreadProps(__spreadValues({}, getAvatarGroupProps()), { children: /* @__PURE__ */ jsxs(AvatarGroupProvider, { value: context, children: [
      clones,
      remainingCount > 0 && renderCount(remainingCount)
    ] }) }));
  }
);
AvatarGroup.displayName = "AvatarGroup";
const UserAvatar = forwardRef(
  (props, ref) => {
    return /* @__PURE__ */ jsx(User, __spreadValues({ ref }, props));
  }
);
UserAvatar.displayName = "UserAvatar";
Avatar.displayName = "Avatar";
export {
  Avatar,
  AvatarGroup,
  UserAvatar
};
