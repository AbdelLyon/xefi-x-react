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
import { Chart as Chart$1, getElementAtEvent } from "react-chartjs-2";
import { defaultChartClasses, registerChartComponents } from "../chartConfig/index.es.js";
import { mergeChartOptions, createDefaultChartOptions } from "../chartOptions/index.es.js";
import { mergeTailwindClasses } from "../../utils/utils/index.es.js";
registerChartComponents();
const Chart = forwardRef(
  (_a, ref) => {
    var _b = _a, {
      type,
      data,
      options: userOptions,
      getElementSelected,
      classNames = {},
      responsive = true,
      maintainAspectRatio = false,
      title,
      showLegend = true,
      showTooltip = true,
      legendPosition = "top",
      customTooltip
    } = _b, props = __objRest(_b, [
      "type",
      "data",
      "options",
      "getElementSelected",
      "classNames",
      "responsive",
      "maintainAspectRatio",
      "title",
      "showLegend",
      "showTooltip",
      "legendPosition",
      "customTooltip"
    ]);
    const mergedClassNames = {
      root: mergeTailwindClasses(defaultChartClasses.root, classNames.root),
      canvas: mergeTailwindClasses(
        defaultChartClasses.canvas,
        classNames.canvas
      ),
      title: mergeTailwindClasses(defaultChartClasses.title, classNames.title),
      legend: mergeTailwindClasses(
        defaultChartClasses.legend,
        classNames.legend
      ),
      tooltip: mergeTailwindClasses(
        defaultChartClasses.tooltip,
        classNames.tooltip
      )
    };
    const handleClick = (event) => {
      if (!getElementSelected) {
        return;
      }
      const chartElement = event.currentTarget;
      const clickedElements = getElementAtEvent(
        chartElement,
        event
      );
      if (clickedElements.length > 0) {
        getElementSelected(clickedElements);
      }
    };
    const defaultOptions = createDefaultChartOptions({
      responsive,
      maintainAspectRatio,
      title,
      showLegend,
      showTooltip,
      legendPosition,
      customTooltip
    });
    const finalOptions = mergeChartOptions(defaultOptions, userOptions);
    return /* @__PURE__ */ jsx("div", { ref, className: mergedClassNames.root, children: /* @__PURE__ */ jsx(
      Chart$1,
      __spreadValues({
        data,
        options: finalOptions,
        type,
        onClick: handleClick,
        className: mergedClassNames.canvas
      }, props)
    ) });
  }
);
Chart.displayName = "Chart";
export {
  Chart
};
