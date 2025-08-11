"use client";

import { Button } from "@xefi/x-react/button";
import React from "react";

interface TodayButtonProps {
  onGoToToday: () => void;
}

export const TodayButton: React.FC<TodayButtonProps> = ({ onGoToToday }) => {
  return (
    <Button
      variant="bordered"
      color="default"
      className="w-24 rounded-md border border-border opacity-70 transition hover:opacity-100"
      radius="sm"
      size="sm"
      onClick={onGoToToday}
    >
      Aujourd&apos;hui
    </Button>
  );
};
