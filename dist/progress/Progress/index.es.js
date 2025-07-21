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
import { Progress as Progress$1 } from "@heroui/react";
import { ProgressLabel } from "../ProgressLabel/index.es.js";
import { defaultProgressFormatOptions, validateProgressValue } from "../progressUtils/index.es.js";
import { mergeTailwindClasses } from "../../utils/utils/index.es.js";
const Progress = forwardRef(
  (_a, ref) => {
    var _b = _a, {
      value = 0,
      minValue = 0,
      maxValue = 100,
      color = "primary",
      size = "md",
      label,
      labelPosition = "top",
      valueLabel,
      showValueLabel = true,
      formatOptions = defaultProgressFormatOptions,
      classNames = {},
      locale,
      isIndeterminate = false,
      className
    } = _b, props = __objRest(_b, [
      "value",
      "minValue",
      "maxValue",
      "color",
      "size",
      "label",
      "labelPosition",
      "valueLabel",
      "showValueLabel",
      "formatOptions",
      "classNames",
      "locale",
      "isIndeterminate",
      "className"
    ]);
    const normalizedValue = validateProgressValue(value, minValue, maxValue);
    const progressProps = __spreadProps(__spreadValues({
      value: normalizedValue,
      minValue,
      maxValue,
      color,
      size,
      isIndeterminate,
      showValueLabel: false
    }, props), {
      classNames: __spreadProps(__spreadValues({}, classNames), {
        base: mergeTailwindClasses("w-full", classNames.base)
      })
    });
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: mergeTailwindClasses(
          "flex w-full max-w-md flex-col gap-2",
          classNames.container,
          className
        ),
        children: [
          /* @__PURE__ */ jsx(
            ProgressLabel,
            {
              label,
              value: normalizedValue,
              maxValue,
              valueLabel,
              showValueLabel: showValueLabel && !isIndeterminate,
              formatOptions,
              position: labelPosition,
              className: classNames.label,
              locale
            }
          ),
          /* @__PURE__ */ jsx(Progress$1, __spreadValues({}, progressProps))
        ]
      }
    );
  }
);
Progress.displayName = "Progress";
export {
  Progress
};
