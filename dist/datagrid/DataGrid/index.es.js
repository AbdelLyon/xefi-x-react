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
import { jsx, jsxs } from "react/jsx-runtime";
import { useDataGridState } from "../useDataGridState/index.es.js";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner } from "@heroui/react";
import { IconCaretUpFilled, IconCaretDownFilled } from "@tabler/icons-react";
import { DataGridSkeleton } from "../DataGridSkeleton/index.es.js";
import { GRID_VARIANTS } from "../variants/index.es.js";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll/index.es.js";
import { TruncatedText } from "../../utils/TruncatedText/index.es.js";
import { mergeTailwindClasses } from "../../utils/utils/index.es.js";
function DataGrid(_a) {
  var _b = _a, {
    rows,
    columns,
    onSortChange,
    variant = "unstyled",
    isLoading = false,
    isFetching = false,
    hasMoreData = true,
    fetchNextPage,
    childrenProps,
    skeletonRowsCount,
    classNames
  } = _b, props = __objRest(_b, [
    "rows",
    "columns",
    "onSortChange",
    "variant",
    "isLoading",
    "isFetching",
    "hasMoreData",
    "fetchNextPage",
    "childrenProps",
    "skeletonRowsCount",
    "classNames"
  ]);
  var _a2, _b2, _c;
  const {
    sortConfig,
    processedColumns,
    formatSortHeader,
    extractCellValue,
    extractCellClassName,
    extractColumnHeader,
    onSort
  } = useDataGridState({
    onSortChange,
    columns
  });
  const { loaderRef, scrollContainerRef } = useInfiniteScroll({
    hasMore: hasMoreData,
    onLoadMore: () => {
      fetchNextPage == null ? void 0 : fetchNextPage();
    }
  });
  const variantClasses = GRID_VARIANTS[variant];
  if (isLoading) {
    return /* @__PURE__ */ jsx(
      DataGridSkeleton,
      {
        columns: columns.length,
        checkboxSelection: props.showSelectionCheckboxes,
        variant,
        rows: skeletonRowsCount != null ? skeletonRowsCount : 10,
        className: classNames == null ? void 0 : classNames.base
      }
    );
  }
  return /* @__PURE__ */ jsxs(
    Table,
    __spreadProps(__spreadValues({}, props), {
      "aria-label": "data-grid",
      "aria-labelledby": "data-grid",
      className: mergeTailwindClasses(
        "overflow-hidden rounded-xl border border-border/60 dark:bg-background/95 backdrop-blur-sm shadow-sm",
        "p-4 transition-all duration-300 hover:shadow-md hover:border-border/70",
        "!pr-1.5",
        props.className
      ),
      shadow: (_a2 = props.shadow) != null ? _a2 : "none",
      radius: (_b2 = props.radius) != null ? _b2 : "none",
      baseRef: scrollContainerRef,
      classNames: {
        wrapper: mergeTailwindClasses(
          "bg-white/80 backdrop-blur-sm border-0 p-0 dark:bg-background/90",
          "rounded-lg transition-colors duration-300",
          "!pr-1.5",
          classNames == null ? void 0 : classNames.wrapper
        ),
        th: mergeTailwindClasses(
          variantClasses.th,
          props.showSelectionCheckboxes && "first:w-10 first:max-w-10",
          classNames == null ? void 0 : classNames.th
        ),
        tr: mergeTailwindClasses(variantClasses.tr, classNames == null ? void 0 : classNames.tr),
        td: mergeTailwindClasses(
          variantClasses.td,
          props.showSelectionCheckboxes && "first:w-10 first:max-w-10",
          classNames == null ? void 0 : classNames.td
        ),
        base: mergeTailwindClasses(
          "w-full relative overflow-auto",
          "table-fixed backdrop-blur-sm rounded-lg",
          "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border/20",
          "hover:scrollbar-thumb-border/30 transition-all duration-300",
          classNames == null ? void 0 : classNames.base
        )
      },
      bottomContent: hasMoreData ? /* @__PURE__ */ jsx("div", { className: "flex w-full justify-center py-2", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 rounded-full bg-content1-100 px-6 py-1 backdrop-blur-sm", children: [
        /* @__PURE__ */ jsx(
          Spinner,
          {
            ref: loaderRef,
            size: "sm",
            color: "primary",
            className: mergeTailwindClasses(
              "transition-all duration-500",
              isFetching ? "opacity-100 scale-100" : "opacity-0 scale-75"
            )
          }
        ),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: mergeTailwindClasses(
              "text-[0.8125rem] text-muted-foreground transition-all duration-500",
              isFetching ? "opacity-100" : "opacity-70"
            ),
            children: isFetching ? "Chargement..." : "Scroll pour plus"
          }
        )
      ] }) }) : !((_c = childrenProps == null ? void 0 : childrenProps.tableBodyProps) == null ? void 0 : _c.emptyContent) ? /* @__PURE__ */ jsx("div", { className: "p-6 text-center", children: /* @__PURE__ */ jsx("span", { className: "text-[0.8125rem] font-medium", children: "Toutes les données ont été chargées" }) }) : null,
      children: [
        /* @__PURE__ */ jsx(
          TableHeader,
          __spreadProps(__spreadValues({
            "aria-label": "table header",
            "aria-labelledby": "table header",
            columns: processedColumns,
            className: variantClasses.thead
          }, childrenProps == null ? void 0 : childrenProps.tableHeaderProps), {
            children: (column) => {
              var _a3;
              return /* @__PURE__ */ jsx(
                TableColumn,
                __spreadProps(__spreadValues({
                  "aria-labelledby": "table header",
                  "aria-label": extractColumnHeader(column),
                  className: mergeTailwindClasses(
                    "relative",
                    column.className,
                    (_a3 = childrenProps == null ? void 0 : childrenProps.tableColumnProps) == null ? void 0 : _a3.className
                  )
                }, childrenProps == null ? void 0 : childrenProps.tableColumnProps), {
                  children: /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: mergeTailwindClasses(
                        "flex min-w-0 w-max items-center gap-2 transition-all duration-300",
                        "opacity-80 hover:opacity-100",
                        column.sortable !== false ? "cursor-pointer px-2 py-1 -mx-2 -my-1" : "",
                        sortConfig.field === column.key ? "opacity-100" : ""
                      ),
                      onClick: column.sortable !== false ? () => onSort(column) : void 0,
                      role: column.sortable !== false ? "button" : void 0,
                      "aria-label": column.sortable !== false ? formatSortHeader(column.header) : void 0,
                      children: [
                        /* @__PURE__ */ jsx(
                          TruncatedText,
                          {
                            className: mergeTailwindClasses(
                              "truncate text-[0.8125rem] font-semibold text-foreground transition-all duration-200",
                              sortConfig.field === column.key ? "opacity-80 font-bold" : "group-hover:opacity-100"
                            ),
                            tooltipClassName: "border border-bordTr/50 px-3 py-2 shadow-xl backdrop-blur-md bg-white/95 dark:bg-background/95 rounded-lg",
                            placement: "top",
                            children: column.header
                          }
                        ),
                        column.sortable !== false && /* @__PURE__ */ jsxs("div", { className: "flex size-5 flex-shrink-0 flex-col items-center justify-center", children: [
                          /* @__PURE__ */ jsx(
                            IconCaretUpFilled,
                            {
                              size: 14,
                              className: mergeTailwindClasses(
                                "transition-all duration-300 -mb-0.5",
                                sortConfig.field === column.key && sortConfig.direction === "asc" ? "opacity-100 drop-shadow-sm" : "opacity-40 hover:opacity-60"
                              )
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            IconCaretDownFilled,
                            {
                              size: 14,
                              className: mergeTailwindClasses(
                                "transition-all duration-300 -mt-0.5",
                                sortConfig.field === column.key && sortConfig.direction === "desc" ? "opacity-100 scale-110 drop-shadow-sm" : "opacity-40 hover:opacity-60"
                              )
                            }
                          )
                        ] })
                      ]
                    }
                  )
                }),
                column.key
              );
            }
          })
        ),
        /* @__PURE__ */ jsx(
          TableBody,
          __spreadProps(__spreadValues({
            isLoading,
            items: rows,
            "aria-label": "table body",
            "aria-labelledby": "table body",
            loadingContent: /* @__PURE__ */ jsx(Spinner, { ref: loaderRef, size: "sm", color: "primary" })
          }, childrenProps == null ? void 0 : childrenProps.tableBodyProps), {
            children: (row) => {
              var _a3;
              return /* @__PURE__ */ jsx(
                TableRow,
                __spreadProps(__spreadValues({
                  "aria-label": "row",
                  "aria-labelledby": "row"
                }, childrenProps == null ? void 0 : childrenProps.tableRowProps), {
                  className: mergeTailwindClasses(
                    variantClasses.tr,
                    (_a3 = childrenProps == null ? void 0 : childrenProps.tableRowProps) == null ? void 0 : _a3.className
                  ),
                  children: (columnKey) => {
                    var _a4;
                    const cellClasses = extractCellClassName(
                      columnKey,
                      row,
                      columns
                    );
                    return /* @__PURE__ */ jsx(
                      TableCell,
                      __spreadProps(__spreadValues({}, childrenProps == null ? void 0 : childrenProps.tableCellProps), {
                        className: mergeTailwindClasses(
                          "relative min-w-0",
                          (_a4 = childrenProps == null ? void 0 : childrenProps.tableCellProps) == null ? void 0 : _a4.className,
                          cellClasses
                        ),
                        "aria-label": "cell",
                        children: /* @__PURE__ */ jsx(
                          TruncatedText,
                          {
                            className: mergeTailwindClasses(
                              "w-full truncate text-[0.8125rem] text-foreground/90 transition-colors duration-200 group-hover:text-foreground"
                            ),
                            tooltipClassName: "border border-border/50 px-3 py-2 shadow-xl backdrop-blur-md bg-white/95 dark:bg-background/95 rounded-lg",
                            placement: "top",
                            children: extractCellValue(columnKey, row, columns)
                          }
                        )
                      })
                    );
                  }
                }),
                row.id
              );
            }
          })
        )
      ]
    })
  );
}
export {
  DataGrid
};
