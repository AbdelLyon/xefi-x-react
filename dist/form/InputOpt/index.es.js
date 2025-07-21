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
import { jsxs, jsx } from "react/jsx-runtime";
import { forwardRef } from "react";
import { InputOtp as InputOtp$1 } from "@heroui/react";
import { mergeTailwindClasses } from "../../utils/utils/index.es.js";
const InputOtp = forwardRef(
  (_a, ref) => {
    var _b = _a, { length = 6, label, labelClasses, containerClasses } = _b, props = __objRest(_b, ["length", "label", "labelClasses", "containerClasses"]);
    const defaultLabelClasses = "text-default-500 text-small mb-2";
    const defaultContainerClasses = "flex flex-col";
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: mergeTailwindClasses(
          defaultContainerClasses,
          containerClasses
        ),
        children: [
          label !== void 0 && /* @__PURE__ */ jsx(
            "p",
            {
              className: mergeTailwindClasses(defaultLabelClasses, labelClasses),
              children: label
            }
          ),
          /* @__PURE__ */ jsx(InputOtp$1, __spreadValues({ length }, props))
        ]
      }
    );
  }
);
InputOtp.displayName = "InputOtp";
export {
  InputOtp
};
