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
import { useState, useCallback } from "react";
import { useResponsive } from "../../hooks/useResponsive/index.es.js";
const defaultConfig = {
  desktopWidth: "w-[270px]",
  desktopCollapsedWidth: "w-[70px]",
  tabletWidth: "w-[70px]",
  showOnMobile: false,
  defaultCollapsed: false
};
const useSidebarLayout = (config = {}) => {
  const finalConfig = __spreadValues(__spreadValues({}, defaultConfig), config);
  const { isDesktop, isTablet, isMobile } = useResponsive();
  const [isCollapsed, setIsCollapsed] = useState(finalConfig.defaultCollapsed);
  const toggleCollapsed = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);
  const isVisible = isDesktop || isTablet || isMobile && finalConfig.showOnMobile;
  const getWidth = () => {
    if (isMobile) {
      return finalConfig.desktopWidth;
    }
    if (isTablet) {
      return finalConfig.tabletWidth;
    }
    return isCollapsed ? finalConfig.desktopCollapsedWidth : finalConfig.desktopWidth;
  };
  const width = getWidth();
  const shouldShowCollapsed = isDesktop && isCollapsed || isTablet;
  const containerClasses = [
    "fixed left-0 top-0 h-screen flex flex-col bg-background",
    "border-r border-border transition-all duration-300 ease-in-out z-40",
    width
  ].join(" ");
  const navigationClasses = [
    "flex-1 transition-all duration-300 ease-in-out",
    shouldShowCollapsed ? "pt-4 px-3" : "p-4"
  ].join(" ");
  const itemContainerClasses = [
    "flex flex-col transition-all duration-300 ease-in-out",
    shouldShowCollapsed ? "gap-3 items-center" : "gap-2"
  ].join(" ");
  return {
    isVisible,
    isDesktop,
    isTablet,
    isCollapsed,
    toggleCollapsed,
    width,
    containerClasses,
    navigationClasses,
    itemContainerClasses
  };
};
export {
  useSidebarLayout
};
