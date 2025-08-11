"use client";

import { IconEye, IconEyeClosed } from "@xefi/x-react/icons";
import { TabItem, Tabs } from "@xefi/x-react/tabs";
import { Tooltip } from "@xefi/x-react/tooltip";
import React from "react";

import { AddTagOrUsers } from "@/app/teams/_components/AddTagOrUsers/AddTagOrUsers";

interface TabControlsProps {
  selectedTab: "sites" | "équipes";
  onTabChange: (key: string) => void;
  showBalances: boolean;
  onToggleBalances: () => void;
}

export const TabControls: React.FC<TabControlsProps> = ({
  selectedTab,
  onTabChange,
  showBalances,
  onToggleBalances,
}) => {
  const tabs: TabItem[] = [
    {
      key: "sites",
      title: "Sites",
      content: null,
    },
    {
      key: "équipes",
      title: "Équipes",
      content: null,
    },
  ];

  return (
    <div className="relative">
      <Tabs
        items={tabs}
        defaultActiveTab={selectedTab}
        onTabChange={onTabChange}
        variant="bordered"
        className="w-full rounded-tl-md bg-gradient-to-b from-content1-100 to-content1-100/40 p-3 px-2 dark:from-content1-100/10 dark:to-content1-100/70"
        size="sm"
        radius="sm"
        color="primary"
      />
      <div className="absolute right-2 top-5 flex items-center gap-1.5">
        <AddTagOrUsers isPlanningPage />
        <Tooltip
          content={showBalances ? "Masquer les soldes" : "Afficher les soldes"}
          trigger={
            <button
              className="flex size-6 items-center justify-center rounded-md bg-primary/90 text-white transition-colors duration-300 hover:bg-primary"
              onClick={onToggleBalances}
            >
              {showBalances ? (
                <IconEyeClosed size={16} />
              ) : (
                <IconEye size={16} />
              )}
            </button>
          }
        />
      </div>
    </div>
  );
};
