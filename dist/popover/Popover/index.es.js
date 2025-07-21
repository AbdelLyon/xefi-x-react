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
import { Popover as Popover$1, PopoverTrigger, PopoverContent } from "@heroui/react";
const Popover = (_a) => {
  var _b = _a, {
    trigger,
    children,
    contentClassName,
    popoverContentProps,
    radius = "sm",
    motionProps = {
      variants: {
        enter: {
          y: 0,
          opacity: 1,
          transition: {
            y: { duration: 0.1 },
            opacity: { duration: 0.15 }
          }
        },
        exit: {
          y: "10%",
          opacity: 0,
          transition: {
            y: { duration: 0 },
            opacity: { duration: 0.1 }
          }
        }
      }
    },
    offset = 10,
    placement = "bottom"
  } = _b, props = __objRest(_b, [
    "trigger",
    "children",
    "contentClassName",
    "popoverContentProps",
    "radius",
    "motionProps",
    "offset",
    "placement"
  ]);
  return /* @__PURE__ */ jsxs(
    Popover$1,
    __spreadProps(__spreadValues({
      motionProps,
      offset,
      placement,
      radius,
      isOpen: props.isOpen
    }, props), {
      children: [
        /* @__PURE__ */ jsx(PopoverTrigger, { children: trigger }),
        /* @__PURE__ */ jsx(PopoverContent, __spreadProps(__spreadValues({ className: contentClassName }, popoverContentProps), { children }))
      ]
    })
  );
};
export {
  Popover
};
