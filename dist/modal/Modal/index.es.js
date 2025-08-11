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
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { forwardRef, useState, useCallback } from "react";
import { useDisclosure, Modal as Modal$1, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@heroui/react";
import { mergeTailwindClasses } from "../../utils/string/index.es.js";
const defaultClassNames = {
  closeButton: "absolute right-4 top-4",
  base: "bg-background border border-border shadow-lg dark:shadow-none rounded-lg",
  header: "flex flex-col gap-1",
  footer: "flex justify-end gap-2"
};
const defaultButtonProps = {
  color: "primary",
  radius: "sm"
};
const isValidButtonLabel = (label) => typeof label === "string" && label.length > 0;
const ModalButtons = ({
  buttonCloseLabel = "Close",
  buttonActionLabel,
  buttonCloseProps,
  buttonActionProps,
  onAction,
  onClose
}) => {
  var _a;
  const handleAction = () => __async(null, null, function* () {
    try {
      yield onAction == null ? void 0 : onAction();
      onClose();
    } catch (error) {
      console.error("Modal action failed:", error);
    }
  });
  const hasValidCloseLabel = isValidButtonLabel(buttonCloseLabel);
  const hasValidActionButton = isValidButtonLabel(buttonActionLabel) && onAction !== void 0;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    hasValidCloseLabel && /* @__PURE__ */ jsx(
      Button,
      __spreadProps(__spreadValues(__spreadValues({
        className: mergeTailwindClasses(
          "border-primary/50",
          buttonCloseProps == null ? void 0 : buttonCloseProps.className
        ),
        variant: (_a = buttonCloseProps == null ? void 0 : buttonCloseProps.variant) != null ? _a : "bordered",
        onPress: onClose
      }, defaultButtonProps), buttonCloseProps), {
        children: buttonCloseLabel
      })
    ),
    hasValidActionButton && /* @__PURE__ */ jsx(
      Button,
      __spreadProps(__spreadValues(__spreadValues({
        onPress: handleAction
      }, defaultButtonProps), buttonActionProps), {
        children: buttonActionLabel
      })
    )
  ] });
};
const Modal = forwardRef(
  (_a, ref) => {
    var _b = _a, {
      trigger,
      title,
      footer,
      children,
      onAction,
      buttonCloseLabel,
      buttonActionLabel,
      buttonCloseProps,
      buttonActionProps,
      defaultBackdrop = "opaque",
      onOpenChange,
      classNames
    } = _b, props = __objRest(_b, [
      "trigger",
      "title",
      "footer",
      "children",
      "onAction",
      "buttonCloseLabel",
      "buttonActionLabel",
      "buttonCloseProps",
      "buttonActionProps",
      "defaultBackdrop",
      "onOpenChange",
      "classNames"
    ]);
    const { isOpen, onOpen, onClose } = useDisclosure({
      onChange: onOpenChange
    });
    const [backdrop, setBackdrop] = useState(defaultBackdrop);
    const handleOpen = useCallback(
      (backdropType = defaultBackdrop) => {
        setBackdrop(backdropType);
        onOpen();
      },
      [defaultBackdrop, onOpen]
    );
    const modalClassNames = {
      closeButton: mergeTailwindClasses(
        defaultClassNames.closeButton,
        classNames == null ? void 0 : classNames.closeButton
      ),
      base: mergeTailwindClasses(defaultClassNames.base, classNames == null ? void 0 : classNames.base),
      header: mergeTailwindClasses(
        defaultClassNames.header,
        classNames == null ? void 0 : classNames.header
      ),
      body: mergeTailwindClasses(classNames == null ? void 0 : classNames.body),
      footer: mergeTailwindClasses(
        defaultClassNames.footer,
        classNames == null ? void 0 : classNames.footer
      ),
      backdrop: mergeTailwindClasses(classNames == null ? void 0 : classNames.backdrop)
    };
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      trigger ? /* @__PURE__ */ jsx("div", { onClick: () => handleOpen(), children: trigger }) : null,
      /* @__PURE__ */ jsx(
        Modal$1,
        __spreadProps(__spreadValues({
          ref,
          backdrop,
          classNames: modalClassNames,
          isOpen,
          onClose
        }, props), {
          children: /* @__PURE__ */ jsx(ModalContent, { children: () => /* @__PURE__ */ jsxs(Fragment, { children: [
            title !== void 0 && /* @__PURE__ */ jsx(ModalHeader, { className: modalClassNames.header, children: title }),
            /* @__PURE__ */ jsx(ModalBody, { className: modalClassNames.body, children }),
            /* @__PURE__ */ jsx(ModalFooter, { className: modalClassNames.footer, children: footer !== void 0 ? footer : /* @__PURE__ */ jsx(
              ModalButtons,
              {
                buttonCloseLabel,
                buttonActionLabel,
                buttonCloseProps,
                buttonActionProps,
                onAction,
                onClose
              }
            ) })
          ] }) })
        })
      )
    ] });
  }
);
Modal.displayName = "Modal";
export {
  Modal
};
