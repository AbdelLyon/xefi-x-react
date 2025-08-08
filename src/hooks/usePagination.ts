import { useState, useCallback, useMemo } from 'react';

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

export function usePagination({
  totalItems,
  defaultPage = 1,
  defaultRowsPerPage = 10,
  rowsPerPageOptions = [10, 25, 50, 100],
  onPageChange,
  onRowsPerPageChange,
}: UsePaginationOptions): UsePaginationReturn {
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [rowsPerPage, setRowsPerPageState] = useState(defaultRowsPerPage);

  const totalPages = Math.max(1, Math.ceil(totalItems / rowsPerPage));

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalItems);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const setPage = useCallback((page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
    onPageChange?.(validPage);
  }, [totalPages, onPageChange]);

  const setRowsPerPage = useCallback((newRowsPerPage: number) => {
    if (rowsPerPageOptions.includes(newRowsPerPage)) {
      setRowsPerPageState(newRowsPerPage);
      setCurrentPage(1);
      onRowsPerPageChange?.(newRowsPerPage);
      onPageChange?.(1);
    }
  }, [rowsPerPageOptions, onRowsPerPageChange, onPageChange]);

  const nextPage = useCallback(() => {
    if (!isLastPage) {
      setPage(currentPage + 1);
    }
  }, [currentPage, isLastPage, setPage]);

  const previousPage = useCallback(() => {
    if (!isFirstPage) {
      setPage(currentPage - 1);
    }
  }, [currentPage, isFirstPage, setPage]);

  const goToFirstPage = useCallback(() => {
    setPage(1);
  }, [setPage]);

  const goToLastPage = useCallback(() => {
    setPage(totalPages);
  }, [setPage, totalPages]);

  return useMemo(() => ({
    currentPage,
    rowsPerPage,
    totalPages,
    startIndex,
    endIndex,
    isFirstPage,
    isLastPage,
    setPage,
    setRowsPerPage,
    nextPage,
    previousPage,
    goToFirstPage,
    goToLastPage,
  }), [
    currentPage,
    rowsPerPage,
    totalPages,
    startIndex,
    endIndex,
    isFirstPage,
    isLastPage,
    setPage,
    setRowsPerPage,
    nextPage,
    previousPage,
    goToFirstPage,
    goToLastPage,
  ]);
}