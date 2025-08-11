import { DateValue } from "@internationalized/date";
import { RangeValue } from "@xefi/x-react/datepicker";
import dayjs from "dayjs";
import { useCallback, useMemo, useState } from "react";

import { Filter } from "@/services/types";
import { usePlanningStore } from "@/store/usePlanningStore";

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
  setDateRangeFilter: (range: { start: DateValue; end: DateValue; } | null) => void;
  resetAllFilters: () => void;
  resetOnlySelectionFilters: () => void;
  hasActiveFilters: boolean;
}

const FILTER_FIELD_MAPPINGS = {
  sites: "site.id",
  teams: "tags.id",
  users: "id",
} as const;

export const useFilters = () => {
  const { filters, setFilters, setUsers, setPage, setViewMode } = usePlanningStore();

  const [filterState, setFilterState] = useState<FilterState>({
    selectedSites: new Set(),
    selectedTeams: new Set(),
    selectedUsers: new Set(),
    dateRange: null,
  });

  const [resetKey, setResetKey] = useState(0);

  const syncedState = useMemo(() => {
    const state: FilterState = {
      selectedSites: new Set(),
      selectedTeams: new Set(),
      selectedUsers: new Set(),
      dateRange: null,
    };

    filters.forEach(filter => {
      switch (filter.field) {
        case 'site.id':
          if (Array.isArray(filter.value)) {
            state.selectedSites = new Set(filter.value.map(String));
          }
          break;
        case 'tags.id':
          if (Array.isArray(filter.value)) {
            state.selectedTeams = new Set(filter.value.map(String));
          }
          break;
        case 'id':
          if (Array.isArray(filter.value)) {
            state.selectedUsers = new Set(filter.value.map(String));
          }
          break;
      }
    });

    return state;
  }, [filters]);

  const buildFiltersFromState = useCallback((state: FilterState): Filter[] => {
    const filters: Filter[] = [];

    Object.entries(state).forEach(([key, value]) => {
      if (key.startsWith('selected') && value instanceof Set && value.size > 0) {
        const filterKey = key.replace('selected', '').toLowerCase() + 's' as keyof typeof FILTER_FIELD_MAPPINGS;
        const field = FILTER_FIELD_MAPPINGS[filterKey];

        if (field) {
          filters.push({
            field,
            operator: "in",
            value: Array.from(value).map(Number),
          });
        }
      }
    });

    if (state.dateRange?.start && state.dateRange?.end) {
      filters.push(
        {
          field: "start_date",
          operator: ">=",
          value: dayjs(state.dateRange.start.toString()).format("YYYY-MM-DD"),
        },
        {
          field: "end_date",
          operator: "<=",
          value: dayjs(state.dateRange.end.toString()).format("YYYY-MM-DD"),
        },
      );
    }

    return filters;
  }, []);

  const applyFilters = useCallback((newState: FilterState) => {
    const newFilters = buildFiltersFromState(newState);
    setFilters(newFilters);
    setUsers([]);
    setPage(1);
    setFilterState(newState);
  }, [buildFiltersFromState, setFilters, setUsers, setPage]);

  const createSelectionHandler = useCallback((filterKey: 'selectedSites' | 'selectedTeams' | 'selectedUsers') => {
    return (keys: Set<string> | null) => {
      const newState = { ...filterState };

      if (!keys) {
        newState[filterKey] = new Set<string>();
      } else {
        newState[filterKey] = new Set<string>(keys);
      }

      applyFilters(newState);
    };
  }, [filterState, applyFilters]);

  const setSiteFilter = createSelectionHandler('selectedSites');
  const setTeamFilter = createSelectionHandler('selectedTeams');
  const setUserFilter = createSelectionHandler('selectedUsers');

  const setDateRangeFilter = useCallback((range: { start: DateValue; end: DateValue; } | null) => {
    const newState = { ...filterState, dateRange: range };

    if (range?.start && range?.end) {
      setViewMode("dateSelected");
    }

    applyFilters(newState);
  }, [filterState, applyFilters, setViewMode]);

  const resetAllFilters = useCallback(() => {
    const emptyState: FilterState = {
      selectedSites: new Set(),
      selectedTeams: new Set(),
      selectedUsers: new Set(),
      dateRange: null,
    };

    applyFilters(emptyState);
    setResetKey(prev => prev + 1);
  }, [applyFilters]);

  const resetOnlySelectionFilters = useCallback(() => {
    const newState: FilterState = {
      ...filterState,
      selectedSites: new Set(),
      selectedTeams: new Set(),
      selectedUsers: new Set(),
    };

    applyFilters(newState);
    setResetKey(prev => prev + 1);
  }, [filterState, applyFilters]);

  const hasActiveFilters =
    filterState.selectedSites.size > 0 ||
    filterState.selectedTeams.size > 0 ||
    filterState.selectedUsers.size > 0 ||
    filterState.dateRange !== null;

  return {
    ...syncedState,
    resetKey,
    hasActiveFilters,

    setSiteFilter,
    setTeamFilter,
    setUserFilter,
    setDateRangeFilter,
    resetAllFilters,
    resetOnlySelectionFilters,
  };
};