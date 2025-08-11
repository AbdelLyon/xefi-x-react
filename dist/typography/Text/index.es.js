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
import { mergeTailwindClasses } from "../../utils/string/index.es.js";
const VARIANT_STYLES = {
  h1: "text-4xl md:text-5xl font-bold",
  h2: "text-3xl md:text-4xl font-bold",
  h3: "text-2xl md:text-3xl font-bold",
  h4: "text-xl md:text-2xl font-semibold",
  h5: "text-lg md:text-xl font-semibold",
  h6: "text-base md:text-lg font-semibold",
  base: "text-base",
  small: "text-sm",
  caption: "text-xs",
  overline: "text-xs uppercase tracking-wider"
};
const WEIGHT_STYLES = {
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold"
};
const ALIGN_STYLES = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify"
};
const Text = forwardRef(
  (_a, ref) => {
    var _b = _a, {
      children,
      as: Component = "p",
      variant = "base",
      weight,
      align,
      color,
      truncate,
      className
    } = _b, props = __objRest(_b, [
      "children",
      "as",
      "variant",
      "weight",
      "align",
      "color",
      "truncate",
      "className"
    ]);
    const classes = mergeTailwindClasses(
      VARIANT_STYLES[variant],
      weight && WEIGHT_STYLES[weight],
      align && ALIGN_STYLES[align],
      color !== void 0 && `text-${color}`,
      truncate !== void 0 && "truncate",
      className
    );
    return /* @__PURE__ */ jsx(Component, __spreadProps(__spreadValues({ ref, className: classes }, props), { children }));
  }
);
Text.displayName = "Text";
export {
  Text
};
