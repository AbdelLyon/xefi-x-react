var __defProp = Object.defineProperty;
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
import { jsxs, jsx } from "react/jsx-runtime";
import { forwardRef, useState } from "react";
import { Slider } from "@heroui/react";
const defaultFormatValue = (value, formatOptions) => {
  return value.map(
    (v) => formatOptions ? new Intl.NumberFormat(void 0, formatOptions).format(v) : v
  ).join(" – ");
};
const LabelComponent = ({
  position,
  content,
  className
}) => {
  if (position === "none") {
    return null;
  }
  return /* @__PURE__ */ jsx(
    "p",
    {
      className: `text-small font-medium text-default-500 ${className} ${position === "top" ? "order-first" : "order-last"}`,
      children: content
    }
  );
};
const RangeSlider = forwardRef(
  ({
    sliderProps,
    initialValue = [0, 100],
    formatOptions,
    label,
    labelPosition = "bottom",
    formatValue,
    renderLabel,
    onChange,
    containerClassName,
    labelClassName
  }, ref) => {
    const [value, setValue] = useState(initialValue);
    const handleChange = (newValue) => {
      const typedValue = Array.isArray(newValue) ? newValue : [newValue];
      setValue(typedValue);
      onChange == null ? void 0 : onChange(typedValue);
    };
    const formattedValue = formatValue ? formatValue(value) : defaultFormatValue(value, formatOptions);
    const labelContent = renderLabel ? renderLabel(value) : `${label}: ${formattedValue}`;
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: `flex h-max w-full max-w-md flex-col items-start justify-center gap-2 ${containerClassName}`,
        children: [
          /* @__PURE__ */ jsx(
            LabelComponent,
            {
              position: labelPosition,
              content: labelContent,
              className: labelClassName
            }
          ),
          /* @__PURE__ */ jsx(
            Slider,
            __spreadValues({
              value,
              onChange: handleChange,
              label,
              className: "max-w-md",
              formatOptions
            }, sliderProps)
          )
        ]
      }
    );
  }
);
RangeSlider.displayName = "RangeSlider";
export {
  RangeSlider
};
