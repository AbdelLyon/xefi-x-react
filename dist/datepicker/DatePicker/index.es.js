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
import { forwardRef } from "react";
import { DatePicker as DatePicker$1, DateRangePicker as DateRangePicker$1 } from "@heroui/react";
import { mergeTailwindClasses } from "../../utils/string/index.es.js";
const getVariantStyles = (variant = "bordered") => {
  switch (variant) {
    case "bordered":
      return "bg-white dark:bg-background data-[hover=true]:border-outline group-data-[focus=true]:border-outline h-12 group-data-[focus=true]:bg-content1";
    case "flat":
      return "border-none border-1 bg-default-100 dark:bg-default-50 data-[hover=true]:bg-content1-300-200 group-data-[focus=true]:bg-default-100 h-12";
    case "faded":
      return "border-transparent bg-default-100 dark:bg-default-50 data-[hover=true]:bg-content1-300-200 group-data-[focus=true]:border-outline h-12";
    case "underlined":
      return "border-b-1 rounded-none bg-transparent border-border data-[hover=true]:border-outline group-data-[focus=true]:border-outline h-12";
    default:
      return "bg-white dark:bg-background data-[hover=true]:border-outline group-data-[focus=true]:border-outline h-12";
  }
};
const DatePicker = forwardRef(
  (_a, ref) => {
    var _b = _a, {
      variant = "bordered",
      color = "default",
      size = "md",
      radius = "md",
      labelPlacement = "inside",
      fullWidth = true,
      isRequired = false,
      isReadOnly = false,
      isDisabled = false
    } = _b, props = __objRest(_b, [
      "variant",
      "color",
      "size",
      "radius",
      "labelPlacement",
      "fullWidth",
      "isRequired",
      "isReadOnly",
      "isDisabled"
    ]);
    const _a2 = props, { classNames: propClassNames } = _a2, restProps = __objRest(_a2, ["classNames"]);
    return /* @__PURE__ */ jsx(
      DatePicker$1,
      __spreadValues({
        ref,
        variant,
        color,
        size,
        radius,
        labelPlacement,
        fullWidth,
        isRequired,
        isReadOnly,
        isDisabled,
        classNames: __spreadProps(__spreadValues({}, propClassNames), {
          inputWrapper: mergeTailwindClasses(
            getVariantStyles(variant),
            propClassNames == null ? void 0 : propClassNames.inputWrapper
          )
        })
      }, restProps)
    );
  }
);
const DateRangePicker = forwardRef(
  (_c, ref) => {
    var _d = _c, {
      variant = "bordered",
      color = "default",
      size = "md",
      radius = "md",
      labelPlacement = "inside",
      fullWidth = true,
      isRequired = false,
      isReadOnly = false,
      isDisabled = false
    } = _d, props = __objRest(_d, [
      "variant",
      "color",
      "size",
      "radius",
      "labelPlacement",
      "fullWidth",
      "isRequired",
      "isReadOnly",
      "isDisabled"
    ]);
    const _a = props, { classNames: propClassNames } = _a, restProps = __objRest(_a, ["classNames"]);
    return /* @__PURE__ */ jsx(
      DateRangePicker$1,
      __spreadValues({
        ref,
        variant,
        color,
        size,
        radius,
        labelPlacement,
        fullWidth,
        isRequired,
        isReadOnly,
        isDisabled,
        classNames: __spreadProps(__spreadValues({}, propClassNames), {
          base: mergeTailwindClasses(
            getVariantStyles(variant),
            propClassNames == null ? void 0 : propClassNames.base
          )
        })
      }, restProps)
    );
  }
);
DatePicker.displayName = "DatePicker";
DateRangePicker.displayName = "DateRangePicker";
export {
  DatePicker,
  DateRangePicker
};
