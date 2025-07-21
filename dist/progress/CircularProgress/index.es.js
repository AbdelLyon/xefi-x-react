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
import { forwardRef, useState, useEffect } from "react";
import { CircularProgress as CircularProgress$1 } from "@heroui/react";
const defaultProps = {
  color: "primary",
  size: "md",
  strokeWidth: 3,
  showValueLabel: false,
  formatOptions: { style: "percent" },
  value: 0,
  minValue: 0,
  maxValue: 100
};
const defaultIncrementProps = {
  autoIncrement: false,
  incrementInterval: 500,
  incrementStep: 10
};
const CircularProgress = forwardRef(
  (_a, ref) => {
    var _b = _a, {
      autoIncrement = defaultIncrementProps.autoIncrement,
      incrementInterval = defaultIncrementProps.incrementInterval,
      incrementStep = defaultIncrementProps.incrementStep,
      onValueChange,
      value = defaultProps.value,
      minValue = defaultProps.minValue,
      maxValue = defaultProps.maxValue,
      formatOptions = defaultProps.formatOptions,
      valueLabel,
      classNames,
      showValueLabel,
      color,
      size
    } = _b, props = __objRest(_b, [
      "autoIncrement",
      "incrementInterval",
      "incrementStep",
      "onValueChange",
      "value",
      "minValue",
      "maxValue",
      "formatOptions",
      "valueLabel",
      "classNames",
      "showValueLabel",
      "color",
      "size"
    ]);
    const [currentValue, setCurrentValue] = useState(value);
    useEffect(() => {
      if (!autoIncrement) {
        setCurrentValue(value);
        return;
      }
      const interval = setInterval(() => {
        setCurrentValue((v) => {
          const newValue = v >= maxValue ? minValue : v + incrementStep;
          onValueChange == null ? void 0 : onValueChange(newValue);
          return newValue;
        });
      }, incrementInterval);
      return () => clearInterval(interval);
    }, [
      autoIncrement,
      value,
      incrementInterval,
      incrementStep,
      maxValue,
      minValue,
      onValueChange
    ]);
    const getValueLabel = () => {
      if (valueLabel !== void 0) {
        return valueLabel;
      }
      const percentage = (currentValue - minValue) / (maxValue - minValue);
      return new Intl.NumberFormat(void 0, formatOptions).format(percentage);
    };
    const circularProgressProps = __spreadProps(__spreadValues(__spreadValues({}, defaultProps), props), {
      ref,
      value: currentValue,
      minValue,
      maxValue,
      formatOptions,
      valueLabel: getValueLabel(),
      showValueLabel,
      color,
      size,
      classNames
    });
    return /* @__PURE__ */ jsx(CircularProgress$1, __spreadValues({}, circularProgressProps));
  }
);
CircularProgress.displayName = "CircularProgress";
export {
  CircularProgress
};
