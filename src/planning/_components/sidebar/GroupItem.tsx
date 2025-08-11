"use client";

import { IconChevronDown } from "@xefi/x-react/icons";
import { Skeleton } from "@xefi/x-react/skeleton";
import { mergeTailwindClasses } from "@xefi/x-react/utils";
import React from "react";

import { User } from "@/models/User";

import { UserItem } from "./UserItem";

interface GroupItemProps {
  id: string;
  name: string;
  users?: User[];
  isExpanded: boolean;
  onToggle: () => void;
  showBalances: boolean;
  getLeaveBalance: (userId: number, isLastYear: boolean) => number;
  getLeavesTaken: (userId: number) => number;
  isFetchingNextPage: boolean;
}

export const GroupItem: React.FC<GroupItemProps> = ({
  id,
  name,
  users,
  isExpanded,
  onToggle,
  showBalances,
  getLeaveBalance,
  getLeavesTaken,
  isFetchingNextPage,
}) => {
  if (!users || users.length === 0) return null;

  return (
    <div key={id}>
      <div
        className={mergeTailwindClasses(
          "relative flex cursor-pointer items-center justify-between truncate border-y border-white bg-content1-100/50 px-2 py-1.5 transition-colors duration-300 hover:opacity-80 dark:border-background dark:bg-content1/60",
          isExpanded ? "text-primary" : "",
        )}
        onClick={onToggle}
      >
        <div className="flex min-w-0 items-center">
          <IconChevronDown
            className={`mr-2 shrink-0 transition-transform duration-300 ease-in-out ${
              isExpanded ? "rotate-0 text-primary" : "-rotate-90"
            }`}
            size={16}
          />
          <span className="truncate text-xs">{name}</span>
        </div>
        {isFetchingNextPage ? (
          <Skeleton
            data-testid="indicator"
            classNames={{
              base: "p-1 rounded-full size-4",
            }}
          />
        ) : (
          <small className="pl-2 text-xs">({users.length})</small>
        )}
      </div>

      <div
        className={`relative flex flex-col items-center overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? "max-h-none opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {users.map((user, index) => (
          <UserItem
            key={`${id}_user_${user.id}_${index}`}
            user={user}
            groupId={id}
            index={index}
            showBalances={showBalances}
            getLeaveBalance={getLeaveBalance}
            getLeavesTaken={getLeavesTaken}
          />
        ))}
      </div>
    </div>
  );
};
