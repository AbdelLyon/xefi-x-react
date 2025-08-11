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
import { jsx } from "react/jsx-runtime";
import { Chip as Chip$1 } from "@heroui/react";
import { forwardRef, useState, useCallback } from "react";
import { validateChipConfig, chipClassConfig, getChipSizeClasses, getChipVariantClasses, createChipProps, getChipColorClasses, generateChipKey } from "../chipConfig/index.es.js";
import { mergeTailwindClasses } from "../../utils/string/index.es.js";
const Chip = forwardRef(
  (_a, ref) => {
    var _b = _a, {
      children,
      variant = "solid",
      color = "default",
      size = "md",
      selectable = false,
      isSelected = false,
      onSelectionChange,
      animated = true,
      validateConfig = process.env.NODE_ENV !== "production",
      classNames,
      onClick,
      onClose,
      tooltip
    } = _b, props = __objRest(_b, [
      "children",
      "variant",
      "color",
      "size",
      "selectable",
      "isSelected",
      "onSelectionChange",
      "animated",
      "validateConfig",
      "classNames",
      "onClick",
      "onClose",
      "tooltip"
    ]);
    const [isClosing, setIsClosing] = useState(false);
    const [internalSelected, setInternalSelected] = useState(isSelected);
    if (validateConfig) {
      const config = __spreadValues({ children }, props);
      const validation = validateChipConfig(config);
      if (!validation.valid) {
        console.warn(
          "[Chip] Configuration validation errors:",
          validation.errors
        );
      }
    }
    const variantClasses = getChipVariantClasses(variant);
    const sizeClasses = getChipSizeClasses(size);
    const colorClasses = getChipColorClasses(color, variant);
    const mergedClasses = chipClassConfig.mergeClasses(__spreadValues(__spreadValues(__spreadValues({}, variantClasses), sizeClasses), classNames));
    const handleClick = useCallback(
      (event) => {
        if (selectable) {
          const newSelected = !internalSelected;
          setInternalSelected(newSelected);
          onSelectionChange == null ? void 0 : onSelectionChange(newSelected);
        }
        onClick == null ? void 0 : onClick(event);
      },
      [selectable, internalSelected, onSelectionChange, onClick]
    );
    const handleClose = useCallback(() => __async(null, null, function* () {
      if (animated) {
        setIsClosing(true);
        yield new Promise((resolve) => setTimeout(resolve, 200));
      }
      yield onClose == null ? void 0 : onClose();
    }), [animated, onClose]);
    const finalProps = createChipProps(props, {
      variant,
      color,
      size
    });
    const chipElement = /* @__PURE__ */ jsx(
      Chip$1,
      __spreadProps(__spreadValues({
        ref
      }, finalProps), {
        className: mergeTailwindClasses(
          mergedClasses.base,
          colorClasses,
          selectable && "cursor-pointer hover:opacity-80",
          selectable && internalSelected && "ring-2 ring-offset-1 ring-current",
          animated && "transition-all duration-200",
          isClosing && "scale-95 opacity-0",
          props.className
        ),
        classNames: mergedClasses,
        onClick: handleClick,
        onClose: onClose ? handleClose : void 0,
        children
      })
    );
    if (tooltip) {
      return /* @__PURE__ */ jsx("div", { title: tooltip, children: chipElement });
    }
    return chipElement;
  }
);
const ChipGroup = forwardRef(
  (_c, ref) => {
    var _d = _c, {
      chips,
      selectable = false,
      selectionMode = "multiple",
      selectedKeys = /* @__PURE__ */ new Set(),
      onSelectionChange,
      spacing = "md",
      orientation = "horizontal",
      wrap = true,
      isDisabled = false,
      className
    } = _d, props = __objRest(_d, [
      "chips",
      "selectable",
      "selectionMode",
      "selectedKeys",
      "onSelectionChange",
      "spacing",
      "orientation",
      "wrap",
      "isDisabled",
      "className"
    ]);
    const [internalSelectedKeys, setInternalSelectedKeys] = useState(selectedKeys);
    const spacingClasses = {
      sm: orientation === "horizontal" ? "gap-1" : "gap-1",
      md: orientation === "horizontal" ? "gap-2" : "gap-2",
      lg: orientation === "horizontal" ? "gap-3" : "gap-3"
    };
    const handleChipSelection = useCallback(
      (chipKey, isSelected) => {
        if (!selectable || isDisabled) {
          return;
        }
        let newSelectedKeys = new Set(internalSelectedKeys);
        if (selectionMode === "single") {
          newSelectedKeys = isSelected ? /* @__PURE__ */ new Set([chipKey]) : /* @__PURE__ */ new Set();
        } else {
          if (isSelected) {
            newSelectedKeys.add(chipKey);
          } else {
            newSelectedKeys.delete(chipKey);
          }
        }
        setInternalSelectedKeys(newSelectedKeys);
        onSelectionChange == null ? void 0 : onSelectionChange(newSelectedKeys);
      },
      [
        selectable,
        isDisabled,
        selectionMode,
        internalSelectedKeys,
        onSelectionChange
      ]
    );
    return /* @__PURE__ */ jsx(
      "div",
      __spreadProps(__spreadValues({
        ref,
        className: mergeTailwindClasses(
          "flex",
          orientation === "horizontal" ? "flex-row" : "flex-col",
          wrap && "flex-wrap",
          spacingClasses[spacing],
          isDisabled && "opacity-50 pointer-events-none",
          className
        )
      }, props), {
        children: chips.map((chip, index) => {
          const chipKey = chip.key || generateChipKey(chip.children, index);
          const isSelected = internalSelectedKeys.has(chipKey);
          return /* @__PURE__ */ jsx(
            Chip,
            __spreadProps(__spreadValues({}, chip), {
              selectable,
              isSelected,
              onSelectionChange: (selected) => handleChipSelection(chipKey, selected)
            }),
            chipKey
          );
        })
      })
    );
  }
);
ChipGroup.displayName = "ChipGroup";
Chip.displayName = "Chip";
export {
  Chip,
  ChipGroup
};
