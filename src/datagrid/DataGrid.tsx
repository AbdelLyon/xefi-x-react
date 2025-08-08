import { useDataGridState } from "@/datagrid/useDataGridState"
import { mergeTailwindClasses } from "@/utils"
import {
  Table as DataTable,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Pagination,
  Select,
  SelectItem,
} from "@heroui/react"
import { IconCaretDownFilled, IconCaretUpFilled } from "@tabler/icons-react"
import type { JSX } from "react"
import { DataGridSkeleton } from "./DataGridSkeleton"
import { TruncatedText } from "@/utils"
import type { DataGridProps } from "@/types/datagrid"
import { GRID_VARIANTS } from "./variants"
import { useInfiniteScroll, usePagination } from "@/hooks"
import { useMemo } from "react"

export function DataGrid<T extends { id: string | number }>({
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
  classNames,
  paginationType = "infinite",
  rowsPerPageOptions = [10, 25, 50, 100],
  defaultRowsPerPage = 10,
  showRowsPerPageSelector = true,
  totalItems,
  currentPage,
  onPageChange,
  onRowsPerPageChange,
  onFetchPage,
  paginationProps,
  ...props
}: DataGridProps<T>): JSX.Element {
  const {
    sortConfig,
    processedColumns,
    formatSortHeader,
    extractCellValue,
    extractCellClassName,
    extractColumnHeader,
    onSort,
  } = useDataGridState({
    onSortChange,
    columns,
  })

  const { loaderRef, scrollContainerRef } = useInfiniteScroll({
    hasMore: hasMoreData,
    onLoadMore: (): void => {
      fetchNextPage?.()
    },
  })

  const pagination = usePagination({
    totalItems: totalItems ?? rows.length,
    defaultPage: currentPage ?? 1,
    defaultRowsPerPage,
    rowsPerPageOptions,
    onPageChange: (page: number) => {
      onPageChange?.(page)
      void onFetchPage?.(page, pagination.rowsPerPage)
    },
    onRowsPerPageChange: (rowsPerPage: number) => {
      onRowsPerPageChange?.(rowsPerPage)
      void onFetchPage?.(1, rowsPerPage)
    },
  })

  const displayedRows = useMemo(() => {
    if (paginationType === "paginated") {
      if (onFetchPage) {
        return rows
      }
      return rows.slice(pagination.startIndex, pagination.endIndex)
    }
    return rows
  }, [
    rows,
    paginationType,
    pagination.startIndex,
    pagination.endIndex,
    onFetchPage,
  ])

  const variantClasses = GRID_VARIANTS[variant]

  if (isLoading) {
    return (
      <DataGridSkeleton
        columns={columns.length}
        checkboxSelection={props.showSelectionCheckboxes}
        variant={variant}
        rows={skeletonRowsCount ?? 10}
        className={classNames?.base as string}
      />
    )
  }

  const paginationComponent = paginationType === "paginated" && (
    <div className="mt-4 flex items-center justify-between">
      {/* Sélecteur lignes par page - à gauche */}
      {showRowsPerPageSelector && (
        <div className="flex items-center gap-2">
          <span className="text-[0.8125rem] opacity-70">Lignes par page:</span>
          <Select
            size="sm"
            selectedKeys={[pagination.rowsPerPage.toString()]}
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0] as string
              pagination.setRowsPerPage(Number(selected))
            }}
            className="w-20"
            aria-label="Sélectionner le nombre de lignes par page"
          >
            {rowsPerPageOptions.map((option) => (
              <SelectItem key={option.toString()}>
                {option.toString()}
              </SelectItem>
            ))}
          </Select>
        </div>
      )}

      {/* Pagination - au centre */}
      <div className="flex justify-center">
        <Pagination
          total={pagination.totalPages}
          page={pagination.currentPage}
          onChange={pagination.setPage}
          aria-label="Navigation de pagination"
          {...paginationProps}
        />
      </div>

      {/* Info résultats - à droite */}
      <div className="flex items-center">
        <span className="text-[0.8125rem] opacity-70">
          Affichage {pagination.startIndex + 1}-{pagination.endIndex} de{" "}
          {totalItems ?? rows.length} résultats
        </span>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col">
      <DataTable
        {...props}
        aria-label="data-grid"
        aria-labelledby="data-grid"
        className={mergeTailwindClasses(
          "overflow-hidden rounded-xl border border-border/60 dark:bg-background/95 backdrop-blur-sm shadow-sm",
          "p-4 transition-all duration-300 hover:shadow-md hover:border-border/70",
          "!pr-1.5",
          props.className
        )}
        shadow={props.shadow ?? "none"}
        radius={props.radius ?? "none"}
        baseRef={paginationType === "infinite" ? scrollContainerRef : undefined}
        classNames={{
          wrapper: mergeTailwindClasses(
            "bg-white/80 backdrop-blur-sm border-0 p-0 dark:bg-background/90",
            "rounded-lg transition-colors duration-300",
            "!pr-1.5",
            classNames?.wrapper
          ),
          th: mergeTailwindClasses(
            variantClasses.th,
            props.showSelectionCheckboxes && "first:w-10 first:max-w-10",
            classNames?.th
          ),
          tr: mergeTailwindClasses(variantClasses.tr, classNames?.tr),
          td: mergeTailwindClasses(
            variantClasses.td,
            props.showSelectionCheckboxes && "first:w-10 first:max-w-10",
            classNames?.td
          ),
          base: mergeTailwindClasses(
            "w-full relative",
            paginationType === "paginated"
              ? "overflow-hidden"
              : "overflow-auto",
            "table-fixed backdrop-blur-sm rounded-lg",
            paginationType === "infinite"
              ? "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border/20"
              : "",
            paginationType === "infinite"
              ? "hover:scrollbar-thumb-border/30 transition-all duration-300"
              : "",
            classNames?.base
          ),
        }}
        bottomContent={
          paginationType === "infinite" && hasMoreData ? (
            <div className="flex w-full justify-center py-2">
              <div className="flex items-center gap-3 rounded-full bg-content1-100 px-6 py-1 backdrop-blur-sm">
                <Spinner
                  ref={loaderRef}
                  size="sm"
                  color="primary"
                  className={mergeTailwindClasses(
                    "transition-all duration-500",
                    isFetching ? "opacity-100 scale-100" : "opacity-0 scale-75"
                  )}
                />
                <span
                  className={mergeTailwindClasses(
                    "text-[0.8125rem] opacity-70 transition-all duration-500",
                    isFetching ? "opacity-100" : "opacity-70"
                  )}
                >
                  {isFetching ? "Chargement..." : "Scroll pour plus"}
                </span>
              </div>
            </div>
          ) : paginationType === "infinite" &&
            !childrenProps?.tableBodyProps?.emptyContent ? (
            <div className="p-6 text-center">
              <span className="text-[0.8125rem] font-medium">
                Toutes les données ont été chargées
              </span>
            </div>
          ) : null
        }
      >
        <TableHeader
          aria-label="table header"
          aria-labelledby="table header"
          columns={processedColumns}
          className={variantClasses.thead}
          {...childrenProps?.tableHeaderProps}
        >
          {(column): JSX.Element => (
            <TableColumn
              aria-labelledby="table header"
              key={column.key}
              aria-label={extractColumnHeader(column)}
              className={mergeTailwindClasses(
                "relative",
                column.className,
                childrenProps?.tableColumnProps?.className
              )}
              {...childrenProps?.tableColumnProps}
            >
              <div
                className={mergeTailwindClasses(
                  "flex min-w-0 w-max items-center gap-2 transition-all duration-300",
                  "opacity-80 hover:opacity-100",
                  column.sortable !== false
                    ? "cursor-pointer px-2 py-1 -mx-2 -my-1"
                    : "",
                  sortConfig.field === column.key ? "opacity-100" : ""
                )}
                onClick={
                  column.sortable !== false
                    ? (): void => onSort(column)
                    : undefined
                }
                role={column.sortable !== false ? "button" : undefined}
                aria-label={
                  column.sortable !== false
                    ? formatSortHeader(column.header)
                    : undefined
                }
              >
                <TruncatedText
                  className={mergeTailwindClasses(
                    "truncate text-[0.8125rem] font-semibold text-foreground transition-all duration-200",
                    sortConfig.field === column.key
                      ? "opacity-80 font-bold"
                      : "group-hover:opacity-100"
                  )}
                  tooltipClassName="border border-bordTr/50 px-3 py-2 shadow-xl backdrop-blur-md bg-white/95 dark:bg-background/95 rounded-lg"
                  placement="top"
                >
                  {column.header}
                </TruncatedText>
                {column.sortable !== false && (
                  <div className="flex size-5 flex-shrink-0 flex-col items-center justify-center">
                    <IconCaretUpFilled
                      size={14}
                      className={mergeTailwindClasses(
                        "transition-all duration-300 -mb-0.5",
                        sortConfig.field === column.key &&
                          sortConfig.direction === "asc"
                          ? "opacity-100 drop-shadow-sm"
                          : "opacity-40 hover:opacity-60"
                      )}
                    />
                    <IconCaretDownFilled
                      size={14}
                      className={mergeTailwindClasses(
                        "transition-all duration-300 -mt-0.5",
                        sortConfig.field === column.key &&
                          sortConfig.direction === "desc"
                          ? "opacity-100 scale-110 drop-shadow-sm"
                          : "opacity-40 hover:opacity-60"
                      )}
                    />
                  </div>
                )}
              </div>
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          items={displayedRows}
          aria-label="table body"
          aria-labelledby="table body"
          loadingContent={
            <Spinner
              ref={paginationType === "infinite" ? loaderRef : undefined}
              size="sm"
              color="primary"
            />
          }
          {...childrenProps?.tableBodyProps}
        >
          {(row: T): JSX.Element => {
            return (
              <TableRow
                aria-label="row"
                aria-labelledby="row"
                key={row.id}
                {...childrenProps?.tableRowProps}
                className={mergeTailwindClasses(
                  variantClasses.tr,
                  childrenProps?.tableRowProps?.className
                )}
              >
                {(columnKey): JSX.Element => {
                  const cellClasses = extractCellClassName(
                    columnKey,
                    row,
                    columns
                  )

                  return (
                    <TableCell
                      {...childrenProps?.tableCellProps}
                      className={mergeTailwindClasses(
                        "relative min-w-0",
                        childrenProps?.tableCellProps?.className,
                        cellClasses
                      )}
                      aria-label="cell"
                    >
                      <TruncatedText
                        className={mergeTailwindClasses(
                          "w-full truncate text-[0.8125rem] text-foreground/90 transition-colors duration-200 group-hover:text-foreground"
                        )}
                        tooltipClassName="border border-border/50 px-3 py-2 shadow-xl backdrop-blur-md bg-white/95 dark:bg-background/95 rounded-lg"
                        placement="top"
                      >
                        {extractCellValue(columnKey, row, columns)}
                      </TruncatedText>
                    </TableCell>
                  )
                }}
              </TableRow>
            )
          }}
        </TableBody>
      </DataTable>
      {paginationComponent}
    </div>
  )
}
