import { JSX } from 'react';
import { DataGridComponentProps } from '../types/datagrid';
interface DataGridSkeletonProps {
    columns: number;
    rows: number;
    checkboxSelection?: boolean;
    variant?: "bordered" | "striped" | "unstyled";
    className?: string;
    childrenProps?: DataGridComponentProps<unknown>;
}
export declare const DataGridSkeleton: ({ rows, checkboxSelection, variant, className, childrenProps, }: DataGridSkeletonProps) => JSX.Element;
export {};
