"use client";

import { Buttons } from "@xefi/x-react/buttons";
import React from "react";

import { ViewMode } from "@/store/usePlanningStore";

interface ViewModeSelectorProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export const ViewModeSelector: React.FC<ViewModeSelectorProps> = ({
  viewMode,
  onViewModeChange,
}) => {
  return (
    <Buttons
      buttons={[
        {
          key: "twomonths",
          label: "2 Mois",
          buttonProps: {
            className: "border border-border",
            variant: viewMode === "twomonths" ? "solid" : "bordered",
            color: viewMode === "twomonths" ? "primary" : "default",
            onClick: () => onViewModeChange("twomonths"),
          },
        },
        {
          key: "month",
          label: "Mois",
          buttonProps: {
            className: "border border-border",
            variant: viewMode === "month" ? "solid" : "bordered",
            color: viewMode === "month" ? "primary" : "default",
            onClick: () => onViewModeChange("month"),
          },
        },
        {
          key: "week",
          label: "Semaine",
          buttonProps: {
            className: "border border-border",
            variant: viewMode === "week" ? "solid" : "bordered",
            color: viewMode === "week" ? "primary" : "default",
            onClick: () => onViewModeChange("week"),
          },
        },
      ]}
      variant="bordered"
      radius="sm"
      size="sm"
    />
  );
};
