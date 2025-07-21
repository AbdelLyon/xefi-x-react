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
import { useState } from "react";
const useDataGridState = ({
  columns,
  onSortChange,
  onGridScrollEnd
}) => {
  const [sortConfig, setSortConfig] = useState({
    field: null,
    direction: "asc"
  });
  const processedColumns = columns.map(
    (column, index) => __spreadProps(__spreadValues({}, column), {
      key: typeof column.field === "string" ? String(column.field) : String(index),
      header: column.header
    })
  );
  const extractColumnHeader = (column) => {
    return typeof column.header === "string" && column.header.length > 0 ? column.header : typeof column.key === "string" && column.key.length > 0 ? column.key : "Column";
  };
  const formatSortHeader = (header) => {
    return typeof header === "string" && header.length > 0 ? `Sort by ${header}` : "Sort column";
  };
  const extractCellValue = (columnKey, row, columns2) => {
    const column = columns2.find((c, index) => {
      const generatedKey = typeof c.field === "string" ? String(c.field) : String(index);
      return generatedKey === String(columnKey);
    });
    if (column === void 0) {
      return null;
    }
    if (column.cell !== void 0) {
      return column.cell(row);
    }
    if (typeof column.field === "string" && column.field.length > 0 && column.field in row) {
      const value = row[column.field];
      return typeof value === "string" || typeof value === "number" ? String(value) : null;
    }
    return null;
  };
  const extractCellClassName = (columnKey, row, columns2) => {
    const column = columns2.find((c, index) => {
      const generatedKey = typeof c.field === "string" ? String(c.field) : String(index);
      return generatedKey === String(columnKey);
    });
    if (column === void 0) {
      return "";
    }
    let cellClassName = "";
    if (column.className !== void 0) {
      cellClassName = column.className;
    }
    if (column.cellClassName !== void 0) {
      const dynamicClasses = column.cellClassName(row);
      cellClassName = cellClassName ? `${cellClassName} ${dynamicClasses}` : dynamicClasses;
    }
    return cellClassName;
  };
  const onSort = (column) => {
    const matchedColumn = columns.find((c, index) => {
      const generatedKey = typeof c.field === "string" ? String(c.field) : String(index);
      return generatedKey === column.key;
    });
    const columnField = matchedColumn == null ? void 0 : matchedColumn.field;
    if (columnField !== void 0 && columnField !== "actions") {
      const newDirection = sortConfig.direction === "asc" ? "desc" : "asc";
      setSortConfig({
        field: columnField,
        direction: newDirection
      });
      onSortChange == null ? void 0 : onSortChange(columnField, newDirection);
    }
  };
  const handleGridScroll = (e) => {
    const element = e.currentTarget;
    if (element.scrollTop + element.clientHeight >= element.scrollHeight) {
      onGridScrollEnd == null ? void 0 : onGridScrollEnd();
    }
  };
  return {
    sortConfig,
    onSort,
    extractCellValue,
    extractCellClassName,
    extractColumnHeader,
    formatSortHeader,
    processedColumns,
    handleGridScroll
  };
};
export {
  useDataGridState
};
