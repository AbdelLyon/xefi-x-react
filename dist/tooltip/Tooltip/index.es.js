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
import { jsx } from "react/jsx-runtime";
import { Tooltip as Tooltip$1 } from "@heroui/react";
const Tooltip = (_a) => {
  var _b = _a, {
    trigger,
    content,
    size = "md",
    color = "default",
    radius = "sm",
    shadow = "sm",
    placement = "top",
    delay = 0,
    closeDelay = 500,
    offset = 7,
    containerPadding = 12,
    crossOffset = 0,
    showArrow = false,
    shouldFlip = true,
    triggerScaleOnOpen = true,
    isKeyboardDismissDisabled = false,
    isDismissable = false,
    shouldCloseOnBlur = true,
    isDisabled = false,
    disableAnimation = false
  } = _b, props = __objRest(_b, [
    "trigger",
    "content",
    "size",
    "color",
    "radius",
    "shadow",
    "placement",
    "delay",
    "closeDelay",
    "offset",
    "containerPadding",
    "crossOffset",
    "showArrow",
    "shouldFlip",
    "triggerScaleOnOpen",
    "isKeyboardDismissDisabled",
    "isDismissable",
    "shouldCloseOnBlur",
    "isDisabled",
    "disableAnimation"
  ]);
  return /* @__PURE__ */ jsx(
    Tooltip$1,
    __spreadProps(__spreadValues({
      content,
      size,
      color,
      radius,
      shadow,
      placement,
      delay,
      closeDelay,
      offset,
      containerPadding,
      crossOffset,
      showArrow,
      shouldFlip,
      triggerScaleOnOpen,
      isKeyboardDismissDisabled,
      isDismissable,
      shouldCloseOnBlur,
      isDisabled,
      disableAnimation
    }, props), {
      children: trigger
    })
  );
};
export {
  Tooltip
};
