export interface UsePaginationOptions {
    totalItems: number;
    defaultPage?: number;
    defaultRowsPerPage?: number;
    rowsPerPageOptions?: number[];
    onPageChange?: (page: number) => void;
    onRowsPerPageChange?: (rowsPerPage: number) => void;
}
export interface UsePaginationReturn {
    currentPage: number;
    rowsPerPage: number;
    totalPages: number;
    startIndex: number;
    endIndex: number;
    isFirstPage: boolean;
    isLastPage: boolean;
    setPage: (page: number) => void;
    setRowsPerPage: (rowsPerPage: number) => void;
    nextPage: () => void;
    previousPage: () => void;
    goToFirstPage: () => void;
    goToLastPage: () => void;
}
export declare function usePagination({ totalItems, defaultPage, defaultRowsPerPage, rowsPerPageOptions, onPageChange, onRowsPerPageChange, }: UsePaginationOptions): UsePaginationReturn;
