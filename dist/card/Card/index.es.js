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
import { Card as Card$1, CardHeader, CardBody, CardFooter } from "@heroui/react";
import { mergeTailwindClasses } from "../../utils/string/index.es.js";
const Card = forwardRef(
  (_a, ref) => {
    var _b = _a, {
      children,
      shadow = "none",
      radius = "sm",
      classNames,
      header,
      footer,
      footerProps
    } = _b, props = __objRest(_b, [
      "children",
      "shadow",
      "radius",
      "classNames",
      "header",
      "footer",
      "footerProps"
    ]);
    return /* @__PURE__ */ jsxs(
      Card$1,
      __spreadProps(__spreadValues({
        ref,
        shadow,
        radius,
        className: mergeTailwindClasses(
          "border border-border dark:bg-background data-[hover=true]:bg-content1-100/30 dark:data-[hover=true]:bg-content1-200/20 transition-all bg-gradient-to-b p-2 from-content1 to-content1-100/10 dark:from-background-200/20 dark:to-background",
          classNames == null ? void 0 : classNames.base
        )
      }, props), {
        children: [
          header !== void 0 && /* @__PURE__ */ jsx(CardHeader, { className: mergeTailwindClasses(classNames == null ? void 0 : classNames.header), children: header }),
          /* @__PURE__ */ jsx(CardBody, { className: mergeTailwindClasses(classNames == null ? void 0 : classNames.body), children }),
          footer !== void 0 && /* @__PURE__ */ jsx(CardFooter, __spreadProps(__spreadValues({ className: mergeTailwindClasses(classNames == null ? void 0 : classNames.footer) }, footerProps), { children: footer }))
        ]
      })
    );
  }
);
Card.displayName = "Card";
export {
  Card
};
