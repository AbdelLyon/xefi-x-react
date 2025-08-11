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
import { forwardRef, useState, useCallback, useEffect } from "react";
import { Alert as Alert$1 } from "@heroui/react";
import { mergeTailwindClasses } from "../../utils/string/index.es.js";
const Alert = forwardRef(
  (_a, ref) => {
    var _b = _a, {
      onVisibleChange,
      onClose,
      isVisible = true,
      isClosable = false,
      autoCloseDelay,
      icon,
      actions,
      dismissOnEscape = true,
      color = "default",
      classNames,
      className,
      children
    } = _b, props = __objRest(_b, [
      "onVisibleChange",
      "onClose",
      "isVisible",
      "isClosable",
      "autoCloseDelay",
      "icon",
      "actions",
      "dismissOnEscape",
      "color",
      "classNames",
      "className",
      "children"
    ]);
    const [internalVisible, setInternalVisible] = useState(isVisible);
    const handleClose = useCallback(() => {
      setInternalVisible(false);
      onClose == null ? void 0 : onClose();
      onVisibleChange == null ? void 0 : onVisibleChange(false);
    }, [onClose, onVisibleChange]);
    const handleVisibilityChange = (visible) => {
      setInternalVisible(visible);
      onVisibleChange == null ? void 0 : onVisibleChange(visible);
    };
    useEffect(() => {
      setInternalVisible(isVisible);
    }, [isVisible]);
    useEffect(() => {
      if (!autoCloseDelay || !internalVisible) {
        return;
      }
      const timer = setTimeout(() => {
        handleClose();
      }, autoCloseDelay);
      return () => clearTimeout(timer);
    }, [autoCloseDelay, internalVisible, handleClose]);
    useEffect(() => {
      if (!dismissOnEscape || !internalVisible || !isClosable) {
        return;
      }
      const handleKeyDown = (event) => {
        if (event.key === "Escape") {
          handleClose();
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [dismissOnEscape, internalVisible, isClosable, handleClose]);
    if (!internalVisible) {
      return null;
    }
    return /* @__PURE__ */ jsxs(
      Alert$1,
      __spreadProps(__spreadValues({
        ref,
        color,
        isClosable,
        onVisibleChange: handleVisibilityChange,
        onClose: handleClose,
        startContent: icon,
        endContent: actions,
        className: mergeTailwindClasses(
          // Custom transitions for auto-dismiss
          autoCloseDelay && "transition-all duration-300 ease-in-out",
          className
        ),
        classNames: {
          base: mergeTailwindClasses(classNames == null ? void 0 : classNames.base),
          mainWrapper: mergeTailwindClasses(classNames == null ? void 0 : classNames.mainWrapper),
          description: mergeTailwindClasses(classNames == null ? void 0 : classNames.description),
          iconWrapper: mergeTailwindClasses(classNames == null ? void 0 : classNames.iconWrapper)
        }
      }, props), {
        children: [
          children,
          actions && /* @__PURE__ */ jsx("div", { className: mergeTailwindClasses(
            "mt-3 flex items-center gap-2",
            classNames == null ? void 0 : classNames.actionsWrapper
          ), children: actions })
        ]
      })
    );
  }
);
Alert.displayName = "Alert";
export {
  Alert
};
