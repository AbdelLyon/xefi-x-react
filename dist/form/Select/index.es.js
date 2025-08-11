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
import { Select as Select$1, SelectItem } from "@heroui/react";
import { mergeTailwindClasses } from "../../utils/string/index.es.js";
const defaultClassNames = {
  base: "max-w-xs",
  trigger: "border border-border bg-transparant data-[focus-visible=true]:outline-0 data-[focus=true]:border-outline data-[hover=true]:bg-transparant data-[hover=true]:border-outline",
  value: "text-small",
  popoverContent: "bg-white dark:bg-background"
};
const Select = forwardRef(
  (_a, ref) => {
    var _b = _a, { options = [], value, defaultValue, classNames } = _b, props = __objRest(_b, ["options", "value", "defaultValue", "classNames"]);
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
      )
    };
    return /* @__PURE__ */ jsx(
      Select$1,
      __spreadProps(__spreadValues({
        ref,
        classNames: mergedClassNames,
        selectedKeys: value,
        defaultSelectedKeys: defaultValue
      }, props), {
        children: options.map(
          (option) => /* @__PURE__ */ jsx(
            SelectItem,
            {
              description: option.description,
              startContent: option.icon,
              className: "text-small",
              children: option.label
            },
            option.key
          )
        )
      })
    );
  }
);
Select.displayName = "Select";
export {
  Select
};
