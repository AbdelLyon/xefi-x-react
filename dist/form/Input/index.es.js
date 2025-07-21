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
import { forwardRef, useState } from "react";
import { Input as Input$1 } from "@heroui/react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { mergeTailwindClasses } from "../../utils/utils/index.es.js";
const Input = forwardRef(
  (_a, ref) => {
    var _b = _a, {
      variant = "bordered",
      color = "default",
      size = "md",
      radius = "md",
      labelPlacement = "inside",
      fullWidth = true,
      customValidation,
      validate,
      type
    } = _b, props = __objRest(_b, [
      "variant",
      "color",
      "size",
      "radius",
      "labelPlacement",
      "fullWidth",
      "customValidation",
      "validate",
      "type"
    ]);
    const [inputType, setInputType] = useState(type);
    const combinedValidate = (value) => {
      var _a3;
      if (customValidation) {
        const customResult = customValidation(value);
        if (typeof customResult === "string") {
          return customResult;
        }
        if (customResult) {
          return "Validation failed";
        }
      }
      return (_a3 = validate == null ? void 0 : validate(value)) != null ? _a3 : true;
    };
    const endContent = type === "password" ? /* @__PURE__ */ jsx(
      "button",
      {
        className: "opacity-40 focus:outline-none",
        type: "button",
        onClick: () => setInputType(inputType === "password" ? "text" : "password"),
        children: inputType === "password" ? /* @__PURE__ */ jsx(IconEye, { className: "pointer-events-none" }) : /* @__PURE__ */ jsx(IconEyeOff, { className: "pointer-events-none" })
      }
    ) : void 0;
    const _a2 = props, { classNames: propClassNames } = _a2, restProps = __objRest(_a2, ["classNames"]);
    const getVariantStyles = () => {
      switch (variant) {
        case "bordered":
          return [
            "border-1",
            "bg-white",
            "dark:bg-background",
            "border-border",
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
            "h-12",
            "after:bg-outline",
            "data-[hover=true]:after:scale-x-100",
            "data-[hover=true]:after:bg-outline",
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
    return /* @__PURE__ */ jsx(
      Input$1,
      __spreadValues({
        ref,
        variant,
        color,
        size,
        radius,
        labelPlacement,
        fullWidth,
        validate: combinedValidate,
        classNames: __spreadProps(__spreadValues({}, propClassNames), {
          inputWrapper: mergeTailwindClasses(
            getVariantStyles(),
            propClassNames == null ? void 0 : propClassNames.inputWrapper
          )
        }),
        endContent,
        type: inputType
      }, restProps)
    );
  }
);
Input.displayName = "Input";
export {
  Input
};
