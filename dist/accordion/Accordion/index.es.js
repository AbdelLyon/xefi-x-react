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
import { forwardRef, createElement } from "react";
import { Accordion as Accordion$1, AccordionItem } from "@heroui/react";
import { mergeTailwindClasses } from "../../utils/utils/index.es.js";
const Accordion = forwardRef(
  (_a, ref) => {
    var _b = _a, { items, itemClasses } = _b, accordionProps = __objRest(_b, ["items", "itemClasses"]);
    const defaultItemClasses = {
      base: mergeTailwindClasses("w-full shadow-none ", {
        "bg-white dark:bg-content1 border-1 border-border rounded-md": accordionProps.variant === "splitted"
      }),
      title: "text-lg font-semibold"
    };
    const defaultClassName = mergeTailwindClasses(
      "rounded-md",
      {
        "border-1 border-border": accordionProps.variant === "bordered"
      },
      accordionProps.className
    );
    return /* @__PURE__ */ jsx(
      Accordion$1,
      __spreadProps(__spreadValues({
        ref
      }, accordionProps), {
        className: defaultClassName,
        itemClasses: __spreadProps(__spreadValues(__spreadValues({}, defaultItemClasses), itemClasses), {
          base: mergeTailwindClasses(
            defaultItemClasses.base,
            itemClasses == null ? void 0 : itemClasses.base
          ),
          title: mergeTailwindClasses(
            defaultItemClasses.title,
            itemClasses == null ? void 0 : itemClasses.title
          )
        }),
        children: items.map((item) => {
          const _a2 = item, { content } = _a2, itemProps = __objRest(_a2, ["content"]);
          return /* @__PURE__ */ createElement(
            AccordionItem,
            __spreadProps(__spreadValues({}, itemProps), {
              key: itemProps.key,
              children: content
            })
          );
        })
      })
    );
  }
);
Accordion.displayName = "Accordion";
export {
  Accordion
};
