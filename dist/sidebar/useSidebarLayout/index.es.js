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
import { useResponsive } from "../../hooks/useResponsive/index.es.js";
const defaultConfig = {
  desktopWidth: "w-[270px]",
  tabletWidth: "w-[70px]",
  showOnMobile: false
};
const useSidebarLayout = (config = {}) => {
  const finalConfig = __spreadValues(__spreadValues({}, defaultConfig), config);
  const { isDesktop, isTablet, isMobile } = useResponsive();
  const isVisible = isDesktop || isTablet || isMobile && finalConfig.showOnMobile;
  const width = isDesktop ? finalConfig.desktopWidth : finalConfig.tabletWidth;
  const containerClasses = [
    "fixed left-0 h-screen flex flex-col bg-[#181818] border-r border-border",
    width
  ].join(" ");
  const navigationClasses = [
    "flex-1",
    isDesktop ? "p-4" : "pt-2 px-2"
  ].join(" ");
  const itemContainerClasses = [
    "flex flex-col",
    isDesktop ? "gap-2" : "gap-4 items-center"
  ].join(" ");
  return {
    isVisible,
    isDesktop,
    isTablet,
    width,
    containerClasses,
    navigationClasses,
    itemContainerClasses
  };
};
export {
  useSidebarLayout
};
