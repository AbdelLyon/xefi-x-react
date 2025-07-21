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
import { Chip as Chip$1 } from "@heroui/react";
import { forwardRef } from "react";
const Chip = forwardRef(
  (_a, ref) => {
    var _b = _a, {
      children,
      avatar,
      startContent,
      endContent,
      variant = "solid",
      color = "default",
      size = "md",
      radius = "full",
      isDisabled = false,
      className,
      classNames,
      onClose
    } = _b, props = __objRest(_b, [
      "children",
      "avatar",
      "startContent",
      "endContent",
      "variant",
      "color",
      "size",
      "radius",
      "isDisabled",
      "className",
      "classNames",
      "onClose"
    ]);
    return /* @__PURE__ */ jsx(
      Chip$1,
      __spreadProps(__spreadValues({
        ref,
        avatar,
        startContent,
        endContent,
        variant,
        color,
        size,
        radius,
        isDisabled,
        className,
        classNames,
        onClose
      }, props), {
        children
      })
    );
  }
);
Chip.displayName = "Chip";
export {
  Chip
};
