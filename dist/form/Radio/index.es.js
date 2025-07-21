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
import { RadioGroup as RadioGroup$1, Radio } from "@heroui/react";
import { mergeTailwindClasses } from "../../utils/utils/index.es.js";
const RadioGroup = forwardRef(
  (_a, ref) => {
    var _b = _a, {
      items,
      groupClasses,
      itemClasses,
      label = "Select an option",
      defaultValue
    } = _b, props = __objRest(_b, [
      "items",
      "groupClasses",
      "itemClasses",
      "label",
      "defaultValue"
    ]);
    const defaultGroupClasses = {
      base: "w-full",
      label: "text-medium font-semibold"
    };
    const defaultItemClasses = {
      base: "w-full",
      label: "text-small",
      wrapper: "",
      control: ""
    };
    return /* @__PURE__ */ jsx(
      RadioGroup$1,
      __spreadProps(__spreadValues({
        ref,
        label,
        defaultValue
      }, props), {
        classNames: {
          base: mergeTailwindClasses(
            defaultGroupClasses.base,
            groupClasses == null ? void 0 : groupClasses.base
          ),
          label: mergeTailwindClasses(
            defaultGroupClasses.label,
            groupClasses == null ? void 0 : groupClasses.label
          )
        },
        children: items.map(
          (item) => {
            var _a2, _b2, _c;
            return /* @__PURE__ */ jsx(
              Radio,
              __spreadProps(__spreadValues({}, item), {
                classNames: {
                  base: mergeTailwindClasses(
                    defaultItemClasses.base,
                    itemClasses == null ? void 0 : itemClasses.base,
                    item.className
                  ),
                  label: mergeTailwindClasses(
                    defaultItemClasses.label,
                    itemClasses == null ? void 0 : itemClasses.label,
                    (_a2 = item.classNames) == null ? void 0 : _a2.label
                  ),
                  wrapper: mergeTailwindClasses(
                    defaultItemClasses.wrapper,
                    itemClasses == null ? void 0 : itemClasses.wrapper,
                    (_b2 = item.classNames) == null ? void 0 : _b2.wrapper
                  ),
                  control: mergeTailwindClasses(
                    defaultItemClasses.control,
                    itemClasses == null ? void 0 : itemClasses.control,
                    (_c = item.classNames) == null ? void 0 : _c.control
                  )
                },
                children: item.label
              }),
              item.value
            );
          }
        )
      })
    );
  }
);
RadioGroup.displayName = "RadioGroup";
export {
  RadioGroup
};
