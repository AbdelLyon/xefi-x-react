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
import { Accordion as Accordion$1, AccordionItem } from "@heroui/react";
import { validateAccordionItem, getAccordionSizeClasses, getAccordionVariantClasses } from "../accordionConfig/index.es.js";
import { mergeTailwindClasses } from "../../utils/utils/index.es.js";
const Accordion = forwardRef(
  (_a, ref) => {
    var _b = _a, {
      items,
      classNames,
      validateItems = process.env.NODE_ENV !== "production",
      size = "md",
      variant = "light"
    } = _b, accordionProps = __objRest(_b, [
      "items",
      "classNames",
      "validateItems",
      "size",
      "variant"
    ]);
    if (validateItems) {
      items.forEach((item, index) => {
        const validation = validateAccordionItem(item);
        if (!validation.valid) {
          console.warn(
            `[Accordion] Item at index ${index} has validation errors:`,
            validation.errors
          );
        }
      });
    }
    const variantClasses = getAccordionVariantClasses(variant);
    const sizeClasses = getAccordionSizeClasses(size);
    const mergedClasses = {
      base: mergeTailwindClasses(
        "rounded-md",
        variantClasses.base || "",
        classNames == null ? void 0 : classNames.base
      ),
      item: mergeTailwindClasses(
        "w-full shadow-none",
        variantClasses.item || "",
        classNames == null ? void 0 : classNames.item
      ),
      itemTitle: mergeTailwindClasses(
        "text-lg font-semibold",
        sizeClasses.itemTitle || "",
        classNames == null ? void 0 : classNames.itemTitle
      ),
      itemContent: mergeTailwindClasses(
        "text-sm",
        sizeClasses.itemContent || "",
        classNames == null ? void 0 : classNames.itemContent
      ),
      itemIndicator: mergeTailwindClasses(
        "",
        classNames == null ? void 0 : classNames.itemIndicator
      )
    };
    const finalProps = __spreadValues({
      variant,
      size
    }, accordionProps);
    return /* @__PURE__ */ jsx(
      Accordion$1,
      __spreadProps(__spreadValues({
        ref
      }, finalProps), {
        className: mergeTailwindClasses(
          mergedClasses.base,
          accordionProps.className
        ),
        itemClasses: {
          base: mergedClasses.item,
          title: mergedClasses.itemTitle,
          content: mergedClasses.itemContent,
          indicator: mergedClasses.itemIndicator
        },
        children: items.map((item) => {
          const _a2 = item, { key, title, content } = _a2, itemProps = __objRest(_a2, ["key", "title", "content"]);
          return /* @__PURE__ */ jsx(AccordionItem, __spreadProps(__spreadValues({ title }, itemProps), { children: content }), key);
        })
      })
    );
  }
);
Accordion.displayName = "Accordion";
export {
  Accordion
};
