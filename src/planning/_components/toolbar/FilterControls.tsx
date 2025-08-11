"use client";

import { DateValue } from "@internationalized/date";
import { RangeValue } from "@xefi/x-react/datepicker";
import {
  IconInfoCircle,
  IconMapPin,
  IconUsers,
  IconUsersGroup,
} from "@xefi/x-react/icons";
import { Tooltip } from "@xefi/x-react/tooltip";
import React from "react";

import { LocalizedDateRangePicker } from "@/components/LocalizedDateRangePicker";
import { ResetFilters } from "@/components/ResetFilters";
import { SearchFilter } from "@/components/SearchFilter";
import { Filter } from "@/services/types";
import { usePlanningStore } from "@/store/usePlanningStore";

import { usePlanningQueries } from "../../_hooks/usePlanningQueries";

interface FilterControlsProps {
  selectedSites: Set<string>;
  selectedTeams: Set<string>;
  selectedUsers: Set<string>;
  dateRange: RangeValue<DateValue> | null;
  onSiteSelection: (keys: Set<React.Key> | React.Key | null) => void;
  onTeamSelection: (keys: Set<React.Key> | React.Key | null) => void;
  onUserSelection: (keys: Set<React.Key> | React.Key | null) => void;
  onDateRangeChange: (
    range: {
      start: DateValue;
      end: DateValue;
    } | null,
  ) => void;
  onResetFilters: () => void;
  resetKey: number;
}

export const FilterControls = ({
  selectedSites,
  selectedTeams,
  selectedUsers,
  dateRange,
  onSiteSelection,
  onTeamSelection,
  onUserSelection,
  onDateRangeChange,
  onResetFilters,
  resetKey,
}: FilterControlsProps) => {
  const { selectedTab } = usePlanningStore();

  const {
    siteOptions,
    teamOptions,
    userOptions,
    fetchNextSitePage,
    fetchNextTeamPage,
    fetchNextUserPage,
    hasNextSitePage,
    hasNextTeamPage,
    hasNextUserPage,
    isFetchingNextSitePage,
    isFetchingTeam,
    isFetchingSite,
    isFetchingUser,
    hasErrors,
    handleSiteSearchChange,
    handleTeamSearchChange,
    handleUserSearchChange,
  } = usePlanningQueries();

  const hasActiveFilters =
    selectedSites.size > 0 ||
    selectedTeams.size > 0 ||
    selectedUsers.size > 0 ||
    dateRange !== null;

  const getSelectedIdsFromFilter = (filter: Filter | null): Set<number> => {
    if (!filter) return new Set();

    if (Array.isArray(filter.value)) {
      return new Set(filter.value.map((id) => Number(id)));
    } else {
      return new Set([Number(filter.value)]);
    }
  };

  return (
    <div className="mb-2 flex flex-1 flex-wrap items-end gap-2">
      {selectedTab === "équipes" ? (
        <SearchFilter
          items={teamOptions}
          resetToken={resetKey}
          isError={hasErrors}
          className="w-[240px]"
          placeholder="Rechercher une équipe..."
          selectionIcon={<IconUsersGroup size={16} />}
          isLoading={false}
          isFetching={isFetchingTeam}
          fetchNextPage={fetchNextTeamPage}
          hasNextPage={hasNextTeamPage}
          setSearch={handleTeamSearchChange}
          setFilter={(filter) => {
            if (filter) {
              const ids = getSelectedIdsFromFilter(filter);
              onTeamSelection(ids);
            } else {
              onTeamSelection(null);
            }
          }}
          makeFilter={(ids) => ({
            field: "tags.id",
            operator: "in" as const,
            value: ids,
          })}
        />
      ) : (
        <SearchFilter
          items={siteOptions}
          resetToken={resetKey}
          className="w-[240px]"
          placeholder="Rechercher un site..."
          selectionIcon={<IconMapPin size={16} />}
          isFetching={isFetchingSite}
          fetchNextPage={fetchNextSitePage}
          isLoading={isFetchingNextSitePage}
          hasNextPage={hasNextSitePage}
          setSearch={handleSiteSearchChange}
          isError={hasErrors}
          setFilter={(filter) => {
            if (filter) {
              const ids = getSelectedIdsFromFilter(filter);
              onSiteSelection(ids);
            } else {
              onSiteSelection(null);
            }
          }}
          makeFilter={(ids) => ({
            field: "site.id",
            operator: "in" as const,
            value: ids,
          })}
        />
      )}

      <SearchFilter
        items={userOptions}
        resetToken={resetKey}
        isError={hasErrors}
        className="w-[280px]"
        placeholder="Rechercher un collaborateur..."
        selectionIcon={<IconUsers size={16} />}
        isFetching={isFetchingUser}
        fetchNextPage={fetchNextUserPage}
        hasNextPage={hasNextUserPage}
        setSearch={handleUserSearchChange}
        setFilter={(filter) => {
          if (filter) {
            const ids = getSelectedIdsFromFilter(filter);
            onUserSelection(ids);
          } else {
            onUserSelection(null);
          }
        }}
        makeFilter={(ids) => ({
          field: "id",
          operator: "in" as const,
          value: ids,
        })}
      />

      <LocalizedDateRangePicker
        value={dateRange}
        className="h-10 w-60"
        onChange={onDateRangeChange}
        color="primary"
        visibleMonths={2}
        CalendarTopContent={
          <div className="flex justify-center">
            <Tooltip
              content="Pour des questions de visibilité, nous vous conseillons de garder une amplitude maximum de 2 mois"
              trigger={
                <IconInfoCircle
                  className="absolute z-40 mt-4 text-blue-500"
                  size={16}
                  aria-label="Date range picker info"
                />
              }
            />
          </div>
        }
      />
      <ResetFilters
        handleResetFilters={onResetFilters}
        hasActiveFilters={hasActiveFilters}
      />
    </div>
  );
};
