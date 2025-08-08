import { JSX } from 'react';
import { DataGridProps } from '../types/datagrid';
export declare function DataGrid<T extends {
    id: string | number;
}>({ rows, columns, onSortChange, variant, isLoading, isFetching, hasMoreData, fetchNextPage, childrenProps, skeletonRowsCount, classNames, paginationType, rowsPerPageOptions, defaultRowsPerPage, showRowsPerPageSelector, totalItems, currentPage, onPageChange, onRowsPerPageChange, onFetchPage, ...props }: DataGridProps<T>): JSX.Element;
