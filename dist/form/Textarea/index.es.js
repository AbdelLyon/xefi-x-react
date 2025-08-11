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
import { Textarea as Textarea$1 } from "@heroui/react";
import { mergeTailwindClasses } from "../../utils/string/index.es.js";
const Textarea = forwardRef(
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
      isDisabled = false,
      containerClasses,
      width,
      height,
      style,
      customValidation,
      validate
    } = _b, props = __objRest(_b, [
      "variant",
      "color",
      "size",
      "radius",
      "labelPlacement",
      "fullWidth",
      "isRequired",
      "isReadOnly",
      "isDisabled",
      "containerClasses",
      "width",
      "height",
      "style",
      "customValidation",
      "validate"
    ]);
    const combinedStyle = __spreadValues({
      width: typeof width === "number" ? `${width}px` : width,
      height: typeof height === "number" ? `${height}px` : height
    }, style);
    const combinedValidate = (value) => {
      var _a3;
      if (customValidation) {
        const customResult = customValidation(value);
        if (typeof customResult === "string") {
          return customResult;
        }
        if (customResult === false) {
          return "Validation failed";
        }
      }
      return (_a3 = validate == null ? void 0 : validate(value)) != null ? _a3 : true;
    };
    const _a2 = props, { classNames: propClassNames } = _a2, restProps = __objRest(_a2, ["classNames"]);
    const getVariantStyles = () => {
      switch (variant) {
        case "bordered":
          return [
            "border-1",
            "bg-white",
            "dark:bg-background",
            "data-[hover=true]:border-outline",
            "group-data-[focus=true]:border-outline",
            "group-data-[focus=true]:bg-content1",
            "h-12"
          ].join(" ");
        case "flat":
          return [
            "border-none",
            "bg-default-100",
            "dark:bg-default-50",
            "data-[hover=true]:bg-content1-300-200",
            "group-data-[focus=true]:bg-default-100",
            "h-12"
          ].join(" ");
        case "faded":
          return [
            "border-1",
            "border-transparent",
            "bg-default-100",
            "dark:bg-default-50",
            "data-[hover=true]:bg-content1-300-200",
            "group-data-[focus=true]:border-outline",
            "h-12"
          ].join(" ");
        case "underlined":
          return [
            "relative",
            "border-b-1",
            "rounded-none",
            "bg-transparent",
            "border-border",
            // Underline effect
            "after:bg-outline",
            // Hover
            "data-[hover=true]:after:scale-x-100",
            "data-[hover=true]:after:bg-outline",
            // Focus
            "group-data-[focus=true]:after:scale-x-100",
            "group-data-[focus=true]:after:bg-outline"
          ].join(" ");
        default:
          return [
            "border-1",
            "bg-white",
            "dark:bg-background",
            "data-[hover=true]:border-outline",
            "group-data-[focus=true]:border-outline",
            "h-12"
          ].join(" ");
      }
    };
    return /* @__PURE__ */ jsx("div", { className: mergeTailwindClasses("w-full", containerClasses), children: /* @__PURE__ */ jsx(
      Textarea$1,
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
        validate: combinedValidate,
        style: combinedStyle,
        classNames: __spreadProps(__spreadValues({}, propClassNames), {
          inputWrapper: mergeTailwindClasses(
            getVariantStyles(),
            propClassNames == null ? void 0 : propClassNames.inputWrapper
          ),
          input: mergeTailwindClasses("text-base", propClassNames == null ? void 0 : propClassNames.input)
        })
      }, restProps)
    ) });
  }
);
Textarea.displayName = "Textarea";
export {
  Textarea
};
