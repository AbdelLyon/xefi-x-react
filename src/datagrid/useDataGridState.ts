import type { ColumnDefinition, ExtendedColumn } from "@/types/datagrid";
import type { Key } from "react";
import { useState } from "react";

type RowIdentifier = string | number;
type DataGridRow = { id: RowIdentifier };
type SortOrder = "asc" | "desc";

interface SortConfig<T> {
  field: keyof T | null;
  direction: SortOrder;
}

export interface DataGridState<T> {
  sortConfig: SortConfig<T>;
  processedColumns: ExtendedColumn<T>[];
  onSort: (column: ExtendedColumn<T>) => void;
  extractCellValue: (
    columnKey: Key,
    row: T,
    columns: ColumnDefinition<T>[],
  ) => React.ReactNode;
  extractCellClassName: (
    columnKey: Key,
    row: T,
    columns: ColumnDefinition<T>[],
  ) => string;
  extractColumnHeader: (column: ExtendedColumn<T>) => string;
  formatSortHeader: (header: React.ReactNode) => string;
  handleGridScroll: (e: React.UIEvent<HTMLDivElement>) => void;
}

interface DataGridProps<T> {
  rows: T[];
  columns: ColumnDefinition<T>[];
  onRowSelectionChange?: (selectedRows: T[]) => void;
  onSortChange?: (field: keyof T, order: SortOrder) => void;
  onGridScrollEnd?: () => void;
}

export const useDataGridState = <T extends DataGridRow>({
  columns,
  onSortChange,
  onGridScrollEnd,
}: Pick<
  DataGridProps<T>,
  "columns" | "onSortChange" | "onGridScrollEnd"
>): DataGridState<T> => {
  const [sortConfig, setSortConfig] = useState<SortConfig<T>>({
    field: null,
    direction: "asc",
  });

  const processedColumns = columns.map(
    (column, index): ExtendedColumn<T> => ({
      ...column,
      key:
        typeof column.field === "string" ? String(column.field) : String(index),
      header: column.header,
    }),
  );

  const extractColumnHeader = (column: ExtendedColumn<T>): string => {
    return typeof column.header === "string" && column.header.length > 0
      ? column.header
      : typeof column.key === "string" && column.key.length > 0
        ? column.key
        : "Column";
  };

  const formatSortHeader = (header: React.ReactNode): string => {
    return typeof header === "string" && header.length > 0
      ? `Sort by ${header}`
      : "Sort column";
  };

  const extractCellValue = (
    columnKey: Key,
    row: T,
    columns: ColumnDefinition<T>[],
  ): React.ReactNode => {
    const column = columns.find((c, index) => {
      const generatedKey =
        typeof c.field === "string" ? String(c.field) : String(index);
      return generatedKey === String(columnKey);
    });

    if (column === undefined) {
      return null;
    }

    if (column.cell !== undefined) {
      return column.cell(row);
    }

    if (
      typeof column.field === "string" &&
      column.field.length > 0 &&
      column.field in row
    ) {
      const value = row[column.field as keyof T];
      return typeof value === "string" || typeof value === "number"
        ? String(value)
        : null;
    }

    return null;
  };

  const extractCellClassName = (
    columnKey: Key,
    row: T,
    columns: ColumnDefinition<T>[],
  ): string => {
    const column = columns.find((c, index) => {
      const generatedKey =
        typeof c.field === "string" ? String(c.field) : String(index);
      return generatedKey === String(columnKey);
    });

    if (column === undefined) {
      return "";
    }

    let cellClassName = "";

    if (column.className !== undefined) {
      cellClassName = column.className;
    }

    if (column.cellClassName !== undefined) {
      const dynamicClasses = column.cellClassName(row);
      cellClassName = cellClassName
        ? `${cellClassName} ${dynamicClasses}`
        : dynamicClasses;
    }

    return cellClassName;
  };

  const onSort = (column: ExtendedColumn<T>): void => {
    const matchedColumn = columns.find((c, index) => {
      const generatedKey =
        typeof c.field === "string" ? String(c.field) : String(index);
      return generatedKey === column.key;
    });

    const columnField = matchedColumn?.field;

    if (columnField !== undefined && columnField !== "actions") {
      const newDirection = sortConfig.direction === "asc" ? "desc" : "asc";

      setSortConfig({
        field: columnField,
        direction: newDirection,
      });

      onSortChange?.(columnField, newDirection);
    }
  };

  const handleGridScroll = (e: React.UIEvent<HTMLDivElement>): void => {
    const element = e.currentTarget;

    if (element.scrollTop + element.clientHeight >= element.scrollHeight) {
      onGridScrollEnd?.();
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
    handleGridScroll,
  };
};
