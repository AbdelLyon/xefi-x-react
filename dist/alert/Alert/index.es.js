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
import { Alert as Alert$1 } from "@heroui/react";
const Alert = forwardRef(
  (_a, ref) => {
    var _b = _a, {
      onVisibleChange,
      onClose,
      isVisible = true,
      isClosable = false
    } = _b, otherProps = __objRest(_b, [
      "onVisibleChange",
      "onClose",
      "isVisible",
      "isClosable"
    ]);
    const handleVisibilityChange = (visible) => {
      onVisibleChange == null ? void 0 : onVisibleChange(visible);
    };
    const handleClose = () => {
      onClose == null ? void 0 : onClose();
      handleVisibilityChange(false);
    };
    if (!isVisible) {
      return null;
    }
    return /* @__PURE__ */ jsx(
      Alert$1,
      __spreadProps(__spreadValues({}, otherProps), {
        ref,
        isClosable,
        onVisibleChange: handleVisibilityChange,
        onClose: handleClose
      })
    );
  }
);
Alert.displayName = "Alert";
export {
  Alert
};
