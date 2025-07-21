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
import { GRID_VARIANTS } from "../variants/index.es.js";
import { Table, TableHeader, TableColumn, Skeleton, TableBody, TableRow, TableCell } from "@heroui/react";
import { mergeTailwindClasses } from "../../utils/utils/index.es.js";
const DataGridSkeleton = ({
  rows = 10,
  checkboxSelection = true,
  variant = "unstyled",
  className,
  childrenProps
}) => {
  const variantClasses = GRID_VARIANTS[variant];
  return /* @__PURE__ */ jsxs(
    Table,
    {
      radius: "sm",
      "aria-label": "Loading data",
      "aria-labelledby": "loading-table",
      className: mergeTailwindClasses(
        "w-full relative overflow-hidden dark:bg-background border border-border rounded-md",
        "table-fixed",
        className
      ),
      classNames: {
        th: mergeTailwindClasses(
          "first:pl-3 px-3 text-left whitespace-nowrap",
          checkboxSelection && "first:w-12 first:min-w-12"
        ),
        td: mergeTailwindClasses(
          "first:pl-3 px-3 py-2 text-left",
          "truncate max-w-0",
          checkboxSelection && "first:w-12 first:min-w-12 first:max-w-12"
        )
      },
      children: [
        /* @__PURE__ */ jsx(
          TableHeader,
          __spreadProps(__spreadValues({
            "aria-label": "Loading table header",
            "aria-labelledby": "loading-table-header",
            className: variantClasses.thead
          }, childrenProps == null ? void 0 : childrenProps.tableHeaderProps), {
            children: Array(8).fill(null).map(
              (_, index) => {
                var _a;
                return /* @__PURE__ */ jsx(
                  TableColumn,
                  __spreadProps(__spreadValues({
                    "aria-labelledby": "loading-column",
                    "aria-label": "Loading column",
                    className: mergeTailwindClasses(
                      (_a = childrenProps == null ? void 0 : childrenProps.tableColumnProps) == null ? void 0 : _a.className
                    )
                  }, childrenProps == null ? void 0 : childrenProps.tableColumnProps), {
                    children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                      index === 0 && checkboxSelection ? /* @__PURE__ */ jsx(Skeleton, { className: "size-4 rounded-md" }) : /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-24 rounded-md" }),
                      /* @__PURE__ */ jsxs("div", { className: "relative size-4 opacity-0", children: [
                        /* @__PURE__ */ jsx("div", { className: "absolute -top-1", children: /* @__PURE__ */ jsx(Skeleton, { className: "size-4 rounded-md opacity-30" }) }),
                        /* @__PURE__ */ jsx("div", { className: "absolute top-1", children: /* @__PURE__ */ jsx(Skeleton, { className: "size-4 rounded-md opacity-30" }) })
                      ] })
                    ] })
                  }),
                  index
                );
              }
            )
          })
        ),
        /* @__PURE__ */ jsx(
          TableBody,
          {
            "aria-label": "Loading table body",
            "aria-labelledby": "loading-table-body",
            children: Array(rows - 1).fill(null).map(
              (_, rowIndex) => {
                var _a;
                return /* @__PURE__ */ jsx(
                  TableRow,
                  __spreadProps(__spreadValues({}, childrenProps == null ? void 0 : childrenProps.tableRowProps), {
                    className: mergeTailwindClasses(
                      variantClasses.tr,
                      (_a = childrenProps == null ? void 0 : childrenProps.tableRowProps) == null ? void 0 : _a.className
                    ),
                    "aria-labelledby": "loading-row",
                    "aria-label": "Loading row",
                    children: Array(8).fill(null).map(
                      (_2, colIndex) => {
                        var _a2;
                        return /* @__PURE__ */ jsx(
                          TableCell,
                          {
                            className: mergeTailwindClasses(
                              "relative min-w-0",
                              (_a2 = childrenProps == null ? void 0 : childrenProps.tableCellProps) == null ? void 0 : _a2.className
                            ),
                            children: /* @__PURE__ */ jsx("div", { className: "w-full truncate", children: colIndex === 0 && checkboxSelection ? /* @__PURE__ */ jsx(Skeleton, { className: "size-4 rounded-md" }) : /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-24 rounded-md" }) })
                          },
                          colIndex
                        );
                      }
                    )
                  }),
                  rowIndex
                );
              }
            )
          }
        )
      ]
    }
  );
};
export {
  DataGridSkeleton
};
