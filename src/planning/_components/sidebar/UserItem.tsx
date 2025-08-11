"use client";

import { Divider } from "@xefi/x-react/divider";
import { IconTrash } from "@xefi/x-react/icons";
import { addToast } from "@xefi/x-react/toast";
import { mergeTailwindClasses } from "@xefi/x-react/utils";
import { t } from "i18next";
import React, { useCallback, useMemo } from "react";

import { useDirectorActionMutation } from "@/app/teams/_hooks/useDirectorActionMutation";
import { AppModal } from "@/components/AppModal";
import { User } from "@/models/User";
import { usePlanningStore } from "@/store/usePlanningStore";
import { useUserStore } from "@/store/useUserStore";

interface UserItemProps {
  user: User;
  groupId: string;
  index: number;
  showBalances: boolean;
  getLeaveBalance: (userId: number, isLastYear: boolean) => number;
  getLeavesTaken: (userId: number) => number;
}

const formatBalance = (value: number): string => {
  return value % 1 === 0 ? value.toString() : value.toFixed(1);
};

export const UserItem: React.FC<UserItemProps> = ({
  user,
  groupId,
  index,
  showBalances,
  getLeaveBalance,
  getLeavesTaken,
}) => {
  const { hoveredUser, setHoveredUser } = usePlanningStore();

  const { currentUser } = useUserStore();
  const isDirector = currentUser?.profile?.label === "DIRECTOR";

  const directorActionMutation = useDirectorActionMutation();

  const balances = useMemo(
    () => ({
      cpLastYear: getLeaveBalance(user.id, true),
      cpCurrentYear: getLeaveBalance(user.id, false),
      cpTaken: getLeavesTaken(user.id),
    }),
    [user.id, getLeaveBalance, getLeavesTaken],
  );

  const isHovered = hoveredUser === user.id;
  const uniqueKey = `${groupId}_user_${user.id}_${index}`;

  const handleClick = useCallback(() => {
    setHoveredUser(user.id);
  }, [user.id, setHoveredUser]);

  const containerClass = useMemo(
    () =>
      mergeTailwindClasses(
        "flex h-8 w-full items-center justify-between px-3 transition-colors duration-150",
        isHovered ? "bg-primary/10" : "hover:bg-primary/5",
      ),
    [isHovered],
  );

  const fullName = `${user.lastname} ${user.firstname}`;

  const handleRemoveUser = async (user: User) => {
    directorActionMutation.mutate(
      { userIds: [user.id], action: "detach" },
      {
        onSuccess: () => {
          addToast({
            title: t("notifications.success.delete"),
          });
        },
        onError: () => {
          addToast({
            title: t("notifications.error"),
          });
        },
      },
    );
  };

  return (
    <div
      key={uniqueKey}
      className="group relative flex h-8 w-full cursor-pointer items-center justify-center border-b border-border/60 transition-colors duration-150 last:border-0"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={`Sélectionner ${fullName}`}
    >
      {isHovered && (
        <Divider
          orientation="vertical"
          className="absolute left-0 z-10 h-8 bg-primary"
        />
      )}

      <div className={containerClass}>
        <div className="flex w-full items-center justify-between">
          <span className="truncate text-xs font-medium" title={fullName}>
            {fullName}
          </span>

          {user.directors_exists && isDirector && (
            <AppModal
              title={t("teams.removeUser")}
              buttonCloseLabel={t("cancel", { ns: "common" })}
              buttonActionLabel={t("delete", { ns: "common" })}
              onAction={() => handleRemoveUser(user)}
              trigger={
                <IconTrash className="cursor-pointer p-1 opacity-60 hover:opacity-80" />
              }
              buttonActionProps={{
                isLoading: directorActionMutation.isPending,
              }}
            >
              <div className="text-center opacity-80">
                <p>{t("confirmContinue", { ns: "common" })}</p>
              </div>
            </AppModal>
          )}
        </div>

        <div
          className={mergeTailwindClasses(
            "flex items-center text-[11px] text-foreground-500 transition-opacity duration-300",
            showBalances ? "opacity-100" : "opacity-0",
          )}
          aria-hidden={!showBalances}
        >
          {showBalances && (
            <>
              <span
                className="w-6 text-center tabular-nums"
                title="Congés payés année précédente"
              >
                {formatBalance(balances.cpLastYear)}
              </span>
              <span
                className="w-6 text-center tabular-nums"
                title="Congés payés année courante"
              >
                {formatBalance(balances.cpCurrentYear)}
              </span>
              <span
                className="w-6 text-center tabular-nums"
                title="Congés pris"
              >
                {formatBalance(balances.cpTaken)}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
