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
import { useId } from "react";
import { useCallbackRef } from "../useCallbackRef/index.es.js";
import { useControlledState } from "../useControlledState/index.es.js";
import { chainCallbacks } from "../../utils/object/index.es.js";
const useDisclosure = (props = {}) => {
  const {
    id: idProp,
    defaultOpen = false,
    isOpen: isOpenProp,
    onClose: onCloseProp,
    onOpen: onOpenProp,
    onChange
  } = props;
  const onOpenPropCallbackRef = useCallbackRef(onOpenProp);
  const onClosePropCallbackRef = useCallbackRef(onCloseProp);
  const [isOpen, setIsOpen] = useControlledState(
    isOpenProp,
    defaultOpen,
    onChange != null ? onChange : () => {
    }
  );
  const reactId = useId();
  const id = idProp != null ? idProp : reactId;
  const isControlled = isOpenProp !== void 0;
  const onClose = () => {
    if (!isControlled) {
      setIsOpen(false);
    }
    onClosePropCallbackRef == null ? void 0 : onClosePropCallbackRef();
  };
  const onOpen = () => {
    if (!isControlled) {
      setIsOpen(true);
    }
    onOpenPropCallbackRef == null ? void 0 : onOpenPropCallbackRef();
  };
  const onOpenChange = () => {
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  };
  const getButtonProps = (props2 = {}) => __spreadProps(__spreadValues({}, props2), {
    "aria-expanded": isOpen,
    "aria-controls": id,
    onClick: chainCallbacks(props2.onClick, onOpenChange)
  });
  const getDisclosureProps = (props2 = {}) => __spreadProps(__spreadValues({}, props2), {
    hidden: !isOpen,
    id
  });
  return {
    isOpen,
    onOpen,
    onClose,
    onOpenChange,
    isControlled,
    getButtonProps,
    getDisclosureProps
  };
};
export {
  useDisclosure
};
