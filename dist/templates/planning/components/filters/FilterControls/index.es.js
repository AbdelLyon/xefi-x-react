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
import { jsxs, jsx } from "react/jsx-runtime";
import { IconSearch, IconX, IconCalendar, IconFilter } from "@tabler/icons-react";
import { useCallback, useMemo } from "react";
import { Select } from "../../../../../form/Select/index.es.js";
import { DatePicker } from "../../../../../datepicker/DatePicker/index.es.js";
import { Tooltip } from "../../../../../tooltip/Tooltip/index.es.js";
import { mergeTailwindClasses } from "../../../../../utils/string/index.es.js";
const FilterControls = ({
  filters,
  onFilterChange,
  dateRange,
  onDateRangeChange,
  showDateRangeFilter = true,
  disabled = false,
  className = ""
}) => {
  const handleFilterChange = useCallback((key, value) => {
    onFilterChange(key, value);
  }, [onFilterChange]);
  const renderFilter = useCallback((filter) => {
    const commonProps = {
      disabled,
      className: "w-full"
    };
    switch (filter.type) {
      case "select":
        return /* @__PURE__ */ jsx(
          Select,
          __spreadProps(__spreadValues({}, commonProps), {
            label: filter.label,
            placeholder: filter.placeholder || `Sélectionner ${filter.label.toLowerCase()}`,
            selectedKeys: filter.value ? /* @__PURE__ */ new Set([filter.value]) : /* @__PURE__ */ new Set(),
            onSelectionChange: (keys) => {
              const value = Array.from(keys)[0];
              handleFilterChange(filter.key, value || null);
            },
            items: filter.options || [],
            renderValue: (items) => {
              var _a;
              const item = Array.from(items)[0];
              const option = (_a = filter.options) == null ? void 0 : _a.find((opt) => opt.key === (item == null ? void 0 : item.key));
              return (option == null ? void 0 : option.label) || filter.placeholder;
            },
            children: (option) => /* @__PURE__ */ jsx(Select.Item, { textValue: option.label, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              option.color && /* @__PURE__ */ jsx(
                "div",
                {
                  className: "size-3 rounded-full",
                  style: { backgroundColor: option.color }
                }
              ),
              option.label
            ] }) }, option.key)
          })
        );
      case "multiselect":
        return /* @__PURE__ */ jsx(
          Select,
          __spreadProps(__spreadValues({}, commonProps), {
            label: filter.label,
            placeholder: filter.placeholder || `Sélectionner ${filter.label.toLowerCase()}`,
            selectionMode: "multiple",
            selectedKeys: new Set(filter.value || []),
            onSelectionChange: (keys) => {
              handleFilterChange(filter.key, Array.from(keys));
            },
            items: filter.options || [],
            renderValue: (items) => {
              const count = Array.from(items).length;
              return count > 0 ? `${count} sélectionné${count > 1 ? "s" : ""}` : filter.placeholder;
            },
            children: (option) => /* @__PURE__ */ jsx(Select.Item, { textValue: option.label, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              option.color && /* @__PURE__ */ jsx(
                "div",
                {
                  className: "size-3 rounded-full",
                  style: { backgroundColor: option.color }
                }
              ),
              option.label
            ] }) }, option.key)
          })
        );
      case "search":
        return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(
            "input",
            __spreadProps(__spreadValues({}, commonProps), {
              type: "text",
              placeholder: filter.placeholder || `Rechercher ${filter.label.toLowerCase()}`,
              value: filter.value || "",
              onChange: (e) => handleFilterChange(filter.key, e.target.value),
              className: mergeTailwindClasses(
                "w-full rounded-lg border border-border bg-background px-4 py-2 pl-10 text-sm",
                "focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "dark:border-default-800 dark:bg-default-900"
              )
            })
          ),
          /* @__PURE__ */ jsx(IconSearch, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-foreground-500" }),
          filter.value && /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handleFilterChange(filter.key, ""),
              className: "absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-default-100",
              disabled,
              children: /* @__PURE__ */ jsx(IconX, { className: "size-3" })
            }
          ),
          /* @__PURE__ */ jsx("label", { className: "absolute -top-2 left-3 bg-background px-1 text-xs font-medium text-foreground-600", children: filter.label })
        ] });
      case "toggle":
        return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              id: filter.key,
              checked: filter.value || false,
              onChange: (e) => handleFilterChange(filter.key, e.target.checked),
              disabled,
              className: "rounded border-border text-primary focus:ring-primary"
            }
          ),
          /* @__PURE__ */ jsx(
            "label",
            {
              htmlFor: filter.key,
              className: "text-sm font-medium text-foreground-700",
              children: filter.label
            }
          )
        ] });
      default:
        return null;
    }
  }, [handleFilterChange, disabled]);
  const dateRangeFilter = useMemo(() => {
    if (!showDateRangeFilter) {
      return null;
    }
    return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx(
        DatePicker,
        {
          label: "Période personnalisée",
          placeholder: "Sélectionner une période",
          value: dateRange,
          onChange: onDateRangeChange,
          disabled,
          className: "w-full",
          variant: "bordered",
          startContent: /* @__PURE__ */ jsx(IconCalendar, { className: "size-4 text-foreground-500" }),
          isRange: true
        }
      ),
      dateRange && onDateRangeChange && /* @__PURE__ */ jsx(Tooltip, { content: "Effacer la période", children: /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => onDateRangeChange(null),
          className: "absolute right-10 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-default-100",
          disabled,
          children: /* @__PURE__ */ jsx(IconX, { className: "size-3" })
        }
      ) })
    ] });
  }, [showDateRangeFilter, dateRange, onDateRangeChange, disabled]);
  if (filters.length === 0 && !showDateRangeFilter) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { className: mergeTailwindClasses(
    "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    className
  ), children: [
    dateRangeFilter,
    filters.map((filter) => /* @__PURE__ */ jsx("div", { className: "space-y-1", children: renderFilter(filter) }, filter.key)),
    filters.length === 0 && !showDateRangeFilter && /* @__PURE__ */ jsxs("div", { className: "col-span-full flex items-center justify-center py-8 text-sm text-foreground-500", children: [
      /* @__PURE__ */ jsx(IconFilter, { className: "mr-2 size-4" }),
      "Aucun filtre disponible"
    ] })
  ] });
};
export {
  FilterControls
};
