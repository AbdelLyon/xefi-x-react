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
import { Select, SelectItem } from "@heroui/react";
import { mergeTailwindClasses } from "../../utils/utils/index.es.js";
const defaultClassNames = {
  base: "max-w-xs",
  trigger: "border border-border bg-transparent data-[focus-visible=true]:outline-0 data-[focus=true]:border-outline data-[hover=true]:bg-transparent data-[hover=true]:border-outline min-h-unit-10",
  listbox: "data-[focus=true]:outline-0",
  value: "flex items-center justify-center",
  popoverContent: "bg-white dark:bg-background"
};
const LanguageSelect = forwardRef(
  (_a, ref) => {
    var _b = _a, {
      languages = [],
      value,
      defaultValue,
      classNames,
      size = "md",
      "aria-label": ariaLabel = "Sélectionner une langue"
    } = _b, props = __objRest(_b, [
      "languages",
      "value",
      "defaultValue",
      "classNames",
      "size",
      "aria-label"
    ]);
    const mergedClassNames = {
      base: mergeTailwindClasses(defaultClassNames.base, classNames == null ? void 0 : classNames.base),
      trigger: mergeTailwindClasses(
        defaultClassNames.trigger,
        classNames == null ? void 0 : classNames.trigger
      ),
      value: mergeTailwindClasses(defaultClassNames.value, classNames == null ? void 0 : classNames.value),
      popoverContent: mergeTailwindClasses(
        defaultClassNames.popoverContent,
        classNames == null ? void 0 : classNames.popoverContent
      ),
      listbox: mergeTailwindClasses(
        defaultClassNames.listbox,
        classNames == null ? void 0 : classNames.listbox
      )
    };
    return /* @__PURE__ */ jsx(
      Select,
      __spreadProps(__spreadValues({
        ref,
        classNames: mergedClassNames,
        selectedKeys: value,
        defaultSelectedKeys: defaultValue,
        size,
        "aria-label": ariaLabel,
        renderValue: (items) => {
          if (!items.length) {
            return null;
          }
          const selectedItem = items[0];
          const selectedLanguage = languages.find(
            (lang) => lang.code === selectedItem.key
          );
          return /* @__PURE__ */ jsx("div", { className: "flex w-full items-center justify-center", children: selectedLanguage == null ? void 0 : selectedLanguage.flag });
        }
      }, props), {
        children: languages.map(
          (language) => /* @__PURE__ */ jsx(
            SelectItem,
            {
              "aria-label": `Langue: ${language.label || language.code}`,
              className: "text-small",
              children: /* @__PURE__ */ jsx("div", { className: "flex w-full items-center justify-center", children: language.flag })
            },
            language.code
          )
        )
      })
    );
  }
);
LanguageSelect.displayName = "LanguageSelect";
export {
  LanguageSelect
};
