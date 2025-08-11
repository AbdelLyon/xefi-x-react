import { useCallback } from "react";

import { usePlanningStore } from "@/store/usePlanningStore";

export const useLeaveBalances = () => {
  const { users, leaveTypesN1 } = usePlanningStore();

  const getLeaveBalance = useCallback(
    (userId: number, isLastYear: boolean): number => {
      const user = users.find((u) => u.id === userId);
      if (!user?.user_leave_counts) return 0;

      const cpLeaveType = leaveTypesN1.find(
        (lt) =>
          lt.name.includes("Congés payés") &&
          (isLastYear ? lt.name.includes("N-1") : !lt.name.includes("N-1"))
      );

      if (!cpLeaveType) return 0;

      const leaveCount = user.user_leave_counts.find(
        (count) =>
          count.leave_type_id === cpLeaveType.id &&
          count.is_last_year === isLastYear
      );

      return leaveCount?.balance || 0;
    },
    [users, leaveTypesN1]
  );

  const getLeavesTaken = useCallback(
    (userId: number): number => {
      const user = users.find((u) => u.id === userId);
      if (!user?.user_leave_counts) return 0;

      const recLeaveType = leaveTypesN1.find((lt) =>
        lt.name.includes("Récupération")
      );

      if (!recLeaveType) {
        const cpLeaveType = leaveTypesN1.find(
          (lt) => lt.name.includes("Congés payés") && !lt.name.includes("N-1")
        );

        if (!cpLeaveType) return 0;

        const leaveCount = user.user_leave_counts.find(
          (count) =>
            count.leave_type_id === cpLeaveType.id && !count.is_last_year
        );

        return leaveCount?.taken || 0;
      }

      const leaveCount = user.user_leave_counts.find(
        (count) =>
          count.leave_type_id === recLeaveType.id && !count.is_last_year
      );

      return leaveCount?.balance || 0;
    },
    [users, leaveTypesN1]
  );

  return {
    getLeaveBalance,
    getLeavesTaken,
  };
};