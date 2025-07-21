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
import { defaultChartTheme } from "../chartConfig/index.es.js";
const createDefaultChartOptions = (config = {}) => {
  const {
    responsive = true,
    maintainAspectRatio = false,
    title,
    showLegend = true,
    showTooltip = true,
    legendPosition = "top",
    customTooltip
  } = config;
  return {
    responsive,
    maintainAspectRatio,
    plugins: {
      title: title ? {
        display: true,
        text: title,
        font: defaultChartTheme.fonts.title,
        padding: defaultChartTheme.spacing.padding
      } : void 0,
      legend: {
        display: showLegend,
        position: legendPosition,
        labels: {
          font: defaultChartTheme.fonts.legend
        }
      },
      tooltip: showTooltip ? __spreadValues({
        enabled: true,
        backgroundColor: defaultChartTheme.colors.background,
        titleColor: defaultChartTheme.colors.foreground,
        bodyColor: "#4b5563",
        borderColor: "#e5e7eb",
        borderWidth: defaultChartTheme.borders.width,
        padding: defaultChartTheme.spacing.tooltip,
        cornerRadius: defaultChartTheme.borders.radius,
        bodyFont: defaultChartTheme.fonts.body,
        titleFont: defaultChartTheme.fonts.title
      }, customTooltip && {
        callbacks: {
          label: customTooltip
        }
      }) : { enabled: false }
    }
  };
};
const mergeChartOptions = (defaultOptions, userOptions) => {
  if (!userOptions) {
    return defaultOptions;
  }
  return __spreadProps(__spreadValues(__spreadValues({}, defaultOptions), userOptions), {
    plugins: __spreadValues(__spreadValues({}, (defaultOptions == null ? void 0 : defaultOptions.plugins) || {}), (userOptions == null ? void 0 : userOptions.plugins) || {})
  });
};
export {
  createDefaultChartOptions,
  mergeChartOptions
};
