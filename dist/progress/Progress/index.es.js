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
const defaultProps = {
  size: "md",
  color: "primary",
  radius: "full",
  minValue: 0,
  maxValue: 100,
  formatOptions: { style: "percent" },
  showValueLabel: true
};
const Progress = forwardRef(
  (_a, ref) => {
    var _b = _a, {
      label,
      labelPosition = "top",
      containerClassName,
      labelClassName,
      value = 0,
      maxValue = 100,
      formatOptions = defaultProps.formatOptions,
      valueLabel,
      showValueLabel = defaultProps.showValueLabel,
      classNames
    } = _b, props = __objRest(_b, [
      "label",
      "labelPosition",
      "containerClassName",
      "labelClassName",
      "value",
      "maxValue",
      "formatOptions",
      "valueLabel",
      "showValueLabel",
      "classNames"
    ]);
    const getValueLabel = () => {
      const formattedValue = new Intl.NumberFormat(
        void 0,
        formatOptions
      ).format(value / maxValue);
      if (typeof valueLabel === "string" && valueLabel.trim() !== "") {
        return valueLabel;
      }
      return formattedValue;
    };
    const labelComponent = labelPosition === "none" ? void 0 : /* @__PURE__ */ jsxs(
      "div",
      {
        className: `
      flex items-center justify-between
      text-small font-medium text-default-500
      ${labelClassName != null ? labelClassName : ""}
      ${labelPosition === "top" ? "order-first" : "order-last"}
    `,
        children: [
          label !== void 0 && /* @__PURE__ */ jsx("span", { children: label }),
          showValueLabel && /* @__PURE__ */ jsx("span", { children: getValueLabel() })
        ]
      }
    );
    const progressProps = __spreadProps(__spreadValues({
      value,
      maxValue,
      formatOptions,
      showValueLabel
    }, props), {
      classNames: __spreadProps(__spreadValues({}, classNames), {
        base: `w-full ${typeof (classNames == null ? void 0 : classNames.base) === "string" && classNames.base}`
      })
    });
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: `flex w-full max-w-md flex-col gap-2 ${containerClassName}`,
        children: [
          labelComponent,
          /* @__PURE__ */ jsx(Progress$1, __spreadValues(__spreadValues({}, defaultProps), progressProps))
        ]
      }
    );
  }
);
Progress.displayName = "Progress";
export {
  Progress
};
