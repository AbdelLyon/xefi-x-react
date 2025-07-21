import { ColumnDefinition, ExtendedColumn } from '../types/datagrid';
import { Key } from 'react';
type RowIdentifier = string | number;
type DataGridRow = {
    id: RowIdentifier;
};
type SortOrder = "asc" | "desc";
interface SortConfig<T> {
    field: keyof T | null;
    direction: SortOrder;
}
export interface DataGridState<T> {
    sortConfig: SortConfig<T>;
    processedColumns: ExtendedColumn<T>[];
    onSort: (column: ExtendedColumn<T>) => void;
    extractCellValue: (columnKey: Key, row: T, columns: ColumnDefinition<T>[]) => React.ReactNode;
    extractCellClassName: (columnKey: Key, row: T, columns: ColumnDefinition<T>[]) => string;
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
export declare const useDataGridState: <T extends DataGridRow>({ columns, onSortChange, onGridScrollEnd, }: Pick<DataGridProps<T>, "columns" | "onSortChange" | "onGridScrollEnd">) => DataGridState<T>;
export {};
