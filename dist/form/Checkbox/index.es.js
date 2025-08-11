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
import { jsxs, jsx } from "react/jsx-runtime";
import { forwardRef, useState, useCallback, useMemo } from "react";
import { CheckboxGroup as CheckboxGroup$1, Checkbox } from "@heroui/react";
import { Checkbox as Checkbox2 } from "@heroui/react";
import { validateCheckboxGroup } from "../checkboxConfig/index.es.js";
import { validateComponentProps } from "../../utils/typeUtils/index.es.js";
import { mergeTailwindClasses } from "../../utils/string/index.es.js";
const CheckboxGroup = forwardRef(
  (_a, ref) => {
    var _b = _a, {
      items,
      size = "md",
      color = "primary",
      state = "default",
      orientation = "vertical",
      spacing = "md",
      maxSelections,
      minSelections,
      showSelectAll = false,
      selectAllLabel = "Select All",
      customValidate,
      onValidationChange,
      classNames,
      validateConfig = process.env.NODE_ENV !== "production",
      value,
      onValueChange
    } = _b, props = __objRest(_b, [
      "items",
      "size",
      "color",
      "state",
      "orientation",
      "spacing",
      "maxSelections",
      "minSelections",
      "showSelectAll",
      "selectAllLabel",
      "customValidate",
      "onValidationChange",
      "classNames",
      "validateConfig",
      "value",
      "onValueChange"
    ]);
    const [selectedValues, setSelectedValues] = useState(value || []);
    const [groupState, setGroupState] = useState(state);
    const [validationErrors, setValidationErrors] = useState([]);
    if (validateConfig) {
      const validation = validateComponentProps(
        __spreadValues({ items, orientation, spacing }, props),
        {
          orientation: (v) => ["horizontal", "vertical"].includes(v),
          spacing: (v) => ["sm", "md", "lg"].includes(v)
        }
      );
      if (!validation.valid) {
        console.warn(
          "[CheckboxGroup] Configuration validation errors:",
          validation.errors
        );
      }
    }
    const spacingClasses = {
      sm: orientation === "horizontal" ? "gap-2" : "gap-1",
      md: orientation === "horizontal" ? "gap-4" : "gap-2",
      lg: orientation === "horizontal" ? "gap-6" : "gap-3"
    };
    const validateGroup = useCallback(
      (values) => __async(null, null, function* () {
        let isValid = true;
        const errors = [];
        const builtIn = validateCheckboxGroup(values, {
          minSelections,
          maxSelections,
          required: props.isRequired
        });
        if (!builtIn.valid) {
          isValid = false;
          errors.push(...builtIn.errors);
        }
        if (customValidate) {
          try {
            const result = yield customValidate(values);
            if (typeof result === "string") {
              isValid = false;
              errors.push(result);
            } else if (!result) {
              isValid = false;
              errors.push("Group validation failed");
            }
          } catch (e) {
            isValid = false;
            errors.push("Group validation error occurred");
          }
        }
        setGroupState(isValid ? "default" : "invalid");
        setValidationErrors(errors);
        onValidationChange == null ? void 0 : onValidationChange(isValid, errors);
        return { isValid, errors };
      }),
      [
        customValidate,
        items,
        minSelections,
        maxSelections,
        props.isRequired,
        onValidationChange
      ]
    );
    const handleValueChange = useCallback(
      (newValues) => __async(null, null, function* () {
        setSelectedValues(newValues);
        yield validateGroup(newValues);
        onValueChange == null ? void 0 : onValueChange(newValues);
      }),
      [validateGroup, onValueChange]
    );
    const handleSelectAll = useCallback(() => __async(null, null, function* () {
      const all = items.map((i) => i.value);
      const newValues = selectedValues.length === items.length ? [] : all;
      yield handleValueChange(newValues);
    }), [items, selectedValues, handleValueChange]);
    const enhancedItems = useMemo(
      () => items.map((item) => __spreadProps(__spreadValues({}, item), {
        size,
        color,
        state: groupState
      })),
      [items, size, color, groupState]
    );
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: mergeTailwindClasses(
          "flex flex-col gap-2",
          classNames == null ? void 0 : classNames.wrapper
        ),
        children: [
          /* @__PURE__ */ jsxs(
            CheckboxGroup$1,
            __spreadProps(__spreadValues({
              ref,
              value: selectedValues,
              onValueChange: handleValueChange,
              className: mergeTailwindClasses(
                "flex",
                orientation === "horizontal" ? "flex-row flex-wrap" : "flex-col",
                spacingClasses[spacing],
                classNames == null ? void 0 : classNames.items
              ),
              classNames: {
                wrapper: mergeTailwindClasses(
                  "flex flex-col gap-2",
                  classNames == null ? void 0 : classNames.wrapper
                ),
                label: mergeTailwindClasses(
                  "text-medium font-semibold text-foreground-700",
                  groupState === "invalid" && "text-danger",
                  classNames == null ? void 0 : classNames.label
                ),
                description: mergeTailwindClasses(
                  "text-small text-foreground-500",
                  classNames == null ? void 0 : classNames.description
                ),
                errorMessage: mergeTailwindClasses(
                  "text-small text-danger",
                  classNames == null ? void 0 : classNames.errorMessage
                )
              }
            }, props), {
              children: [
                showSelectAll && /* @__PURE__ */ jsx(
                  Checkbox,
                  {
                    value: "__select_all__",
                    "aria-label": String(selectAllLabel),
                    size,
                    color,
                    isSelected: selectedValues.length === items.length,
                    isIndeterminate: selectedValues.length > 0 && selectedValues.length < items.length,
                    onChange: () => handleSelectAll()
                  }
                ),
                enhancedItems.map((item) => {
                  const _a2 = item, { onChange, validate } = _a2, rest = __objRest(_a2, ["onChange", "validate"]);
                  return /* @__PURE__ */ jsx(
                    Checkbox,
                    __spreadProps(__spreadValues({}, rest), {
                      isSelected: selectedValues.includes(item.value),
                      onChange: (event) => onChange == null ? void 0 : onChange(event.target.checked),
                      validate: (value2) => {
                        if (!validate) {
                          return true;
                        }
                        const result = validate(value2);
                        if (result instanceof Promise) {
                          return void 0;
                        }
                        if (typeof result === "string") {
                          return result;
                        }
                        return result === false ? null : true;
                      }
                    }),
                    item.value
                  );
                })
              ]
            })
          ),
          validationErrors.length > 0 && /* @__PURE__ */ jsx("div", { className: "ml-2", children: validationErrors.map((error, i) => /* @__PURE__ */ jsx(
            "div",
            {
              className: mergeTailwindClasses(
                "text-xs text-danger",
                classNames == null ? void 0 : classNames.errorMessage
              ),
              children: error
            },
            i
          )) })
        ]
      }
    );
  }
);
CheckboxGroup.displayName = "CheckboxGroup";
export {
  Checkbox2 as Checkbox,
  CheckboxGroup
};
