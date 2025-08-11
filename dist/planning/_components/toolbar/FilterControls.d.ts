import { DateValue } from '@internationalized/date';
import { RangeValue } from '@xefi/x-react/datepicker';
import { default as React } from 'react';
interface FilterControlsProps {
    selectedSites: Set<string>;
    selectedTeams: Set<string>;
    selectedUsers: Set<string>;
    dateRange: RangeValue<DateValue> | null;
    onSiteSelection: (keys: Set<React.Key> | React.Key | null) => void;
    onTeamSelection: (keys: Set<React.Key> | React.Key | null) => void;
    onUserSelection: (keys: Set<React.Key> | React.Key | null) => void;
    onDateRangeChange: (range: {
        start: DateValue;
        end: DateValue;
    } | null) => void;
    onResetFilters: () => void;
    resetKey: number;
}
export declare const FilterControls: ({ selectedSites, selectedTeams, selectedUsers, dateRange, onSiteSelection, onTeamSelection, onUserSelection, onDateRangeChange, onResetFilters, resetKey, }: FilterControlsProps) => import("react/jsx-runtime").JSX.Element;
export {};
