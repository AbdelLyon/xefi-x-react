import { mergeTailwindClasses } from "@/utils";
import type { JSX } from "react";
import { GRID_VARIANTS } from "./variants";
import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import type { DataGridComponentProps } from "@/types/datagrid";

interface DataGridSkeletonProps {
  columns: number;
  rows: number;
  checkboxSelection?: boolean;
  variant?: "bordered" | "striped" | "unstyled";
  className?: string;
  childrenProps?: DataGridComponentProps<unknown>;
}

export const DataGridSkeleton = ({
  rows = 10,
  checkboxSelection = true,
  variant = "unstyled",
  className,
  childrenProps,
}: DataGridSkeletonProps): JSX.Element => {
  const variantClasses = GRID_VARIANTS[variant];

  return (
    <Table
      radius="sm"
      aria-label="Loading data"
      aria-labelledby="loading-table"
      className={mergeTailwindClasses(
        "w-full relative overflow-hidden dark:bg-background border border-border rounded-md",
        "table-fixed",
        className,
      )}
      classNames={{
        th: mergeTailwindClasses(
          "first:pl-3 px-3 text-left whitespace-nowrap",
          checkboxSelection && "first:w-12 first:min-w-12",
        ),
        td: mergeTailwindClasses(
          "first:pl-3 px-3 py-2 text-left",
          "truncate max-w-0",
          checkboxSelection && "first:w-12 first:min-w-12 first:max-w-12",
        ),
      }}
    >
      <TableHeader
        aria-label="Loading table header"
        aria-labelledby="loading-table-header"
        className={variantClasses.thead}
        {...childrenProps?.tableHeaderProps}
      >
        {Array(8)
          .fill(null)
          .map(
            (_, index): JSX.Element => (
              <TableColumn
                key={index}
                aria-labelledby="loading-column"
                aria-label="Loading column"
                className={mergeTailwindClasses(
                  childrenProps?.tableColumnProps?.className,
                )}
                {...childrenProps?.tableColumnProps}
              >
                <div className="flex items-center gap-2">
                  {index === 0 && checkboxSelection ? (
                    <Skeleton className="size-4 rounded-md" />
                  ) : (
                    <Skeleton className="h-4 w-24 rounded-md" />
                  )}
                  <div className="relative size-4 opacity-0">
                    <div className="absolute -top-1">
                      <Skeleton className="size-4 rounded-md opacity-30" />
                    </div>
                    <div className="absolute top-1">
                      <Skeleton className="size-4 rounded-md opacity-30" />
                    </div>
                  </div>
                </div>
              </TableColumn>
            ),
          )}
      </TableHeader>

      <TableBody
        aria-label="Loading table body"
        aria-labelledby="loading-table-body"
      >
        {Array(rows - 1)
          .fill(null)
          .map(
            (_, rowIndex): JSX.Element => (
              <TableRow
                key={rowIndex}
                {...childrenProps?.tableRowProps}
                className={mergeTailwindClasses(
                  variantClasses.tr,
                  childrenProps?.tableRowProps?.className,
                )}
                aria-labelledby="loading-row"
                aria-label="Loading row"
              >
                {Array(8)
                  .fill(null)
                  .map(
                    (_, colIndex): JSX.Element => (
                      <TableCell
                        key={colIndex}
                        className={mergeTailwindClasses(
                          "relative min-w-0",
                          childrenProps?.tableCellProps?.className,
                        )}
                      >
                        <div className="w-full truncate">
                          {colIndex === 0 && checkboxSelection ? (
                            <Skeleton className="size-4 rounded-md" />
                          ) : (
                            <Skeleton className="h-4 w-24 rounded-md" />
                          )}
                        </div>
                      </TableCell>
                    ),
                  )}
              </TableRow>
            ),
          )}
      </TableBody>
    </Table>
  );
};
