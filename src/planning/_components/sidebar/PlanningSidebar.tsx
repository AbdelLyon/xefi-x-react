"use client";

import { IconChevronDown } from "@xefi/x-react/icons";
import { Tooltip } from "@xefi/x-react/tooltip";
import { useEffect, useState } from "react";

import { Indicator } from "@/components/Indicator";
import { Group } from "@/models/User";
import { usePlanningStore } from "@/store/usePlanningStore";

import { useLeaveBalances } from "../../_hooks/useLeaveBalances";

import { BalanceHeader } from "./BalanceHeader";
import { GroupItem } from "./GroupItem";
import { SidebarSkeleton } from "./SidebarSkeleton";
import { TabControls } from "./TabControls";

interface PlanningSidebarProps {
  isFetchingNextPage: boolean;
  handleLoadMore: () => void;
  hasNextPage: boolean;
  isLoading?: boolean;
  currentGroups: Group[];
}

export const PlanningSidebar: React.FC<PlanningSidebarProps> = ({
  handleLoadMore,
  isFetchingNextPage,
  hasNextPage,
  isLoading,
  currentGroups,
}) => {
  const {
    expandedSites,
    toggleSiteExpanded,
    expandedTeams,
    toggleTeamExpanded,
    selectedTab,
    setSelectedTab,
    setFilters,
    setUsers,
    setPage,
    setIsTagsDisplay,
  } = usePlanningStore();

  const [showBalances, setShowBalances] = useState<boolean>(false);

  const { getLeaveBalance, getLeavesTaken } = useLeaveBalances();

  const handleTabChange = (key: string) => {
    const newTab = key as "sites" | "équipes";
    const isTeams = newTab === "équipes";

    setSelectedTab(newTab);
    setIsTagsDisplay(isTeams);
    setFilters([]);
    setUsers([]);
    setPage(1);
  };

  const handleGroupToggle = (groupId: string) => {
    if (selectedTab === "sites") {
      toggleSiteExpanded(groupId);
    } else {
      toggleTeamExpanded(groupId);
    }
  };

  useEffect(() => {
    const firstGroupWithUsers = currentGroups.find(
      (group) => group.users.length > 0,
    );

    if (!firstGroupWithUsers) return;

    const expandedState =
      selectedTab === "sites"
        ? expandedSites[firstGroupWithUsers.id]
        : expandedTeams[firstGroupWithUsers.id];

    if (expandedState === undefined) {
      if (selectedTab === "sites") {
        toggleSiteExpanded(firstGroupWithUsers.id);
      } else {
        toggleTeamExpanded(firstGroupWithUsers.id);
      }
    }
  }, [
    currentGroups,
    selectedTab,
    expandedSites,
    expandedTeams,
    toggleSiteExpanded,
    toggleTeamExpanded,
  ]);

  const currentExpandedState =
    selectedTab === "sites" ? expandedSites : expandedTeams;

  return (
    <div className={`flex w-[240px] flex-col bg-background`}>
      <div className="sticky top-0 z-40 h-28 bg-background">
        <TabControls
          selectedTab={selectedTab}
          onTabChange={handleTabChange}
          showBalances={showBalances}
          onToggleBalances={() => setShowBalances(!showBalances)}
        />
        <BalanceHeader showBalances={showBalances} />
      </div>

      <div className="flex-1 overflow-auto">
        {isLoading ? (
          <SidebarSkeleton showBalances={showBalances} />
        ) : (
          <>
            {currentGroups.map((group) => (
              <GroupItem
                key={group.id}
                id={group.id}
                name={group.name}
                users={group.users}
                isExpanded={currentExpandedState[group.id] || false}
                onToggle={() => handleGroupToggle(group.id)}
                showBalances={showBalances}
                getLeaveBalance={getLeaveBalance}
                getLeavesTaken={getLeavesTaken}
                isFetchingNextPage={isFetchingNextPage}
              />
            ))}

            {hasNextPage && !isFetchingNextPage && (
              <div className="mt-2 flex justify-center">
                <Tooltip
                  content="Charger plus de collaborateurs"
                  placement="bottom"
                  trigger={
                    <div className="animate-bounce cursor-pointer rounded-full p-1 transition-colors hover:bg-primary/20">
                      <IconChevronDown
                        size={19}
                        className="text-primary"
                        onClick={handleLoadMore}
                      />
                    </div>
                  }
                />
              </div>
            )}

            {isFetchingNextPage && (
              <div className="border-t border-border/20 bg-background/95">
                <Indicator
                  classNames={{
                    base: "px-4 py-4",
                    content: "size-2",
                  }}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
