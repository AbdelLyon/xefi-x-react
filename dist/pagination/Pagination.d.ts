import { PaginationProps as PaginationRootProps } from '@heroui/react';
export interface PaginationProps extends PaginationRootProps {
    containerClasses?: string;
}
export declare const Pagination: import('react').ForwardRefExoticComponent<Omit<PaginationProps, "ref"> & import('react').RefAttributes<HTMLUListElement>>;
