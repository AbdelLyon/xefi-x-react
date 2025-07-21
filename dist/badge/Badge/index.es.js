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
import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { forwardRef } from "react";
import { Chip } from "@heroui/react";
import { mergeTailwindClasses } from "../../utils/utils/index.es.js";
const Badge = forwardRef(
  (_a, ref) => {
    var _b = _a, {
      children,
      color = "primary",
      variant = "solid",
      size = "md",
      shape = "circle",
      placement = "top-right",
      content,
      dot = false,
      isInvisible = false,
      max = 99,
      showZero = false,
      classNames,
      className
    } = _b, props = __objRest(_b, [
      "children",
      "color",
      "variant",
      "size",
      "shape",
      "placement",
      "content",
      "dot",
      "isInvisible",
      "max",
      "showZero",
      "classNames",
      "className"
    ]);
    const getDisplayContent = () => {
      if (dot) {
        return null;
      }
      if (typeof children === "number") {
        const count = children;
        if (count === 0 && !showZero) {
          return null;
        }
        if (count > max) {
          return `${max}+`;
        }
        return count;
      }
      return children;
    };
    const shouldShow = !isInvisible && (dot || showZero || typeof children === "number" && children > 0 || children && typeof children !== "number");
    const displayContent = getDisplayContent();
    const placementClasses = {
      "top-right": "absolute -top-1 -right-1 z-10",
      "top-left": "absolute -top-1 -left-1 z-10",
      "bottom-right": "absolute -bottom-1 -right-1 z-10",
      "bottom-left": "absolute -bottom-1 -left-1 z-10"
    };
    const badgeElement = shouldShow ? /* @__PURE__ */ jsx(
      Chip,
      __spreadProps(__spreadValues({
        color,
        variant,
        size,
        radius: shape === "rectangle" ? "sm" : "full",
        className: mergeTailwindClasses(
          // Dot styles
          dot && "h-3 w-3 min-w-0 text-transparent",
          // Placement when used with content
          content && placementClasses[placement],
          // Custom badge classes
          classNames == null ? void 0 : classNames.badge,
          // Standalone badge classes
          !content && className
        ),
        classNames: {
          base: mergeTailwindClasses(
            "border-2 border-background",
            dot && "p-0"
          ),
          content: mergeTailwindClasses(dot && "hidden")
        }
      }, props), {
        children: displayContent
      })
    ) : null;
    if (!content) {
      return badgeElement || /* @__PURE__ */ jsx(Fragment, {});
    }
    return /* @__PURE__ */ jsxs(
      "div",
      __spreadProps(__spreadValues({
        ref,
        className: mergeTailwindClasses(
          "relative inline-flex items-center justify-center",
          classNames == null ? void 0 : classNames.base,
          className
        )
      }, props), {
        children: [
          /* @__PURE__ */ jsx("div", { className: classNames == null ? void 0 : classNames.content, children: content }),
          badgeElement
        ]
      })
    );
  }
);
Badge.displayName = "Badge";
export {
  Badge
};
