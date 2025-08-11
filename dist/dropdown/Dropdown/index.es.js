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
import { Dropdown as Dropdown$1, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@heroui/react";
import { mergeTailwindClasses } from "../../utils/string/index.es.js";
const Dropdown = (_a) => {
  var _b = _a, {
    trigger,
    sections,
    dropdownMenuProps,
    classNames
  } = _b, props = __objRest(_b, [
    "trigger",
    "sections",
    "dropdownMenuProps",
    "classNames"
  ]);
  return /* @__PURE__ */ jsxs(
    Dropdown$1,
    __spreadProps(__spreadValues({
      showArrow: true,
      classNames: __spreadValues({
        base: "before:bg-default-200",
        content: "p-0 border border-border bg-background"
      }, classNames)
    }, props), {
      children: [
        /* @__PURE__ */ jsx(DropdownTrigger, { children: trigger }),
        /* @__PURE__ */ jsx(DropdownMenu, __spreadProps(__spreadValues({ className: "p-3" }, dropdownMenuProps), { children: sections.map(
          (section) => /* @__PURE__ */ jsx(
            DropdownSection,
            {
              showDivider: section.showDivider,
              "aria-label": section.label,
              children: section.items.map((item) => {
                const _a2 = item, { key, label } = _a2, remainingProps = __objRest(_a2, ["key", "label"]);
                return /* @__PURE__ */ jsx(
                  DropdownItem,
                  __spreadProps(__spreadValues({
                    className: mergeTailwindClasses(
                      "data-[hover=true]:bg-content1-300",
                      remainingProps.className
                    )
                  }, remainingProps), {
                    children: label
                  }),
                  key
                );
              })
            },
            section.key
          )
        ) }))
      ]
    })
  );
};
export {
  Dropdown
};
