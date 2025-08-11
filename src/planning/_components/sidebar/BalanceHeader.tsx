"use client";

import React from "react";

interface BalanceHeaderProps {
  showBalances: boolean;
}

export const BalanceHeader: React.FC<BalanceHeaderProps> = ({
  showBalances,
}) => {
  return (
    <div
      className="mb-2 mt-4 flex items-end justify-end space-x-2 font-semibold text-foreground-500 transition-opacity duration-200"
      style={{ opacity: showBalances ? 1 : 0 }}
    >
      <div className="text-[11px]">N-1</div>
      <div className="text-[11px]">N</div>
      <div className="text-[11px]">Pris</div>
    </div>
  );
};
