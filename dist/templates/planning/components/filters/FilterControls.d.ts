import { RangeValue } from '../../../../datepicker';
import { FilterConfig } from '../../types/planning.types';
interface FilterControlsProps {
    filters: FilterConfig[];
    onFilterChange: (key: string, value: string | string[] | boolean | null) => void;
    dateRange?: RangeValue;
    onDateRangeChange?: (range: RangeValue) => void;
    showDateRangeFilter?: boolean;
    disabled?: boolean;
    className?: string;
}
export declare const FilterControls: React.FC<FilterControlsProps>;
export {};
