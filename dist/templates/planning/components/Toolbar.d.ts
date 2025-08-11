import { RangeValue } from '../../../datepicker';
import { FilterConfig, ActiveFilter, ToolbarAction, ImportExportConfig, ViewMode } from '../types/planning.types';
interface ToolbarProps {
    enabled?: boolean;
    className?: string;
    filters?: FilterConfig[];
    activeFilters?: ActiveFilter[];
    onFilterChange?: (key: string, value: string | string[] | boolean | null) => void;
    onFilterClear?: (key: string) => void;
    onFiltersClearAll?: () => void;
    viewMode?: ViewMode;
    viewModes?: Array<{
        key: ViewMode;
        label: string;
        disabled?: boolean;
    }>;
    onViewModeChange?: (mode: ViewMode) => void;
    showToday?: boolean;
    onTodayClick?: () => void;
    actions?: ToolbarAction[];
    importExport?: ImportExportConfig;
    switches?: Array<{
        key: string;
        label: string;
        checked: boolean;
        onChange: (checked: boolean) => void;
    }>;
    dateRange?: RangeValue;
    onDateRangeChange?: (range: RangeValue) => void;
    showDateRangeFilter?: boolean;
    isLoading?: boolean;
}
export declare const Toolbar: React.FC<ToolbarProps>;
export {};
