import type {
  TableBodyProps,
  TableCellProps,
  TableColumnProps,
  TableHeaderProps,
  TableProps,
  TableRowProps,
} from "@heroui/react";

export interface SortConfig<T> {
  key: keyof T | null;
  direction: "asc" | "desc";
}

export type SortDirection = "asc" | "desc";

interface ColumnBase<T> {
  header: React.ReactNode;
  footer?: (data: T[]) => React.ReactNode;
  className?: string;
  cellClassName?: (row: T) => string;
  sortable?: boolean;
}

interface FieldColumn<T> extends ColumnBase<T> {
  field: keyof T;
  cell?: (row: T) => React.ReactNode;
}

interface ActionColumn<T> extends ColumnBase<T> {
  field?: "actions";
  cell?: (row: T) => React.ReactNode;
}

export type ColumnDefinition<T> = FieldColumn<T> | ActionColumn<T>;

export type ExtendedColumn<T> = ColumnDefinition<T> & {
  key: string;
  header: React.ReactNode;
};

export interface DataGridComponentProps<T> {
  tableHeaderProps?: Omit<TableHeaderProps<T>, "columns" | "children">;
  tableBodyProps?: Omit<TableBodyProps<T>, "items" | "children">;
  tableRowProps?: Omit<TableRowProps, "children">;
  tableCellProps?: Omit<TableCellProps, "children">;
  tableColumnProps?: Omit<TableColumnProps<T>, "key" | "children">;
}

export interface GridScrollEndParams {
  visibleRows: number;
  visibleStartIndex: number;
  visibleEndIndex: number;
}

export interface GridScrollEndEvent extends UIEvent {
  target: HTMLDivElement;
}

export interface GridCallbackDetails {
  reason: "scroll" | "resize";
}

export interface GridScrollEndCallback {
  params: GridScrollEndParams;
  details: GridCallbackDetails;
}

export interface InfiniteScrollOptions {
  enabled?: boolean;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  debounceTime?: number;
}

export type GridVariant = "bordered" | "striped" | "unstyled";

export interface DataGridBaseProps<T> {
  childrenProps?: DataGridComponentProps<T>;
  rows: T[];
  columns: ColumnDefinition<T>[];
  className?: string;
  footerContent?: React.ReactNode;
  variant?: GridVariant;
  isLoading?: boolean;
  isFetching?: boolean;
}

export interface DataGridInfiniteScrollProps {
  isLoadingMore?: boolean;
  hasMoreData?: boolean;
  infiniteScrollOptions?: InfiniteScrollOptions;
  loadingMoreContent?: React.ReactNode;
  noMoreDataContent?: React.ReactNode;
  skeletonRowsCount?: number;
}

export interface DataGridPaginationProps {
  paginationType?: 'paginated' | 'infinite';
  rowsPerPageOptions?: number[];
  defaultRowsPerPage?: number;
  showRowsPerPageSelector?: boolean;
  totalItems?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  onRowsPerPageChange?: (rowsPerPage: number) => void;
  onFetchPage?: (page: number, rowsPerPage: number) => Promise<void> | void;
}

export interface DataGridCallbacks<T> {
  onSortChange?: (column: keyof T, direction: SortDirection) => void;
  onGridScrollEnd?: () => void;
  fetchNextPage?: () => void;
}

export interface DataGridProps<T extends { id: string | number }>
  extends DataGridBaseProps<T>,
    DataGridCallbacks<T>,
    DataGridInfiniteScrollProps,
    DataGridPaginationProps,
    Omit<TableProps, "onSortChange"> {}
