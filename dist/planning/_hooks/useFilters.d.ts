import { DateValue } from '@internationalized/date';
import { RangeValue } from '@xefi/x-react/datepicker';
export interface FilterState {
    selectedSites: Set<string>;
    selectedTeams: Set<string>;
    selectedUsers: Set<string>;
    dateRange: RangeValue<DateValue> | null;
}
export interface FilterActions {
    setSiteFilter: (keys: Set<string> | null) => void;
    setTeamFilter: (keys: Set<string> | null) => void;
    setUserFilter: (keys: Set<string> | null) => void;
    setDateRangeFilter: (range: {
        start: DateValue;
        end: DateValue;
    } | null) => void;
    resetAllFilters: () => void;
    resetOnlySelectionFilters: () => void;
    hasActiveFilters: boolean;
}
export declare const useFilters: () => {
    resetKey: number;
    hasActiveFilters: boolean;
    setSiteFilter: (keys: Set<string> | null) => void;
    setTeamFilter: (keys: Set<string> | null) => void;
    setUserFilter: (keys: Set<string> | null) => void;
    setDateRangeFilter: (range: {
        start: DateValue;
        end: DateValue;
    } | null) => void;
    resetAllFilters: () => void;
    resetOnlySelectionFilters: () => void;
    selectedSites: Set<string>;
    selectedTeams: Set<string>;
    selectedUsers: Set<string>;
    dateRange: RangeValue<DateValue> | null;
};
