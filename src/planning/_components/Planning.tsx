import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { leaveTypeService } from "@/services/api/leave/LeaveTypeService";
import { usePlanningStore } from "@/store/usePlanningStore";

import { useLeavesPlannigQuery } from "../_hooks/useLeavesPlannigQuery";
import { usePeriodDays } from "../_hooks/usePlanningBodyData";
import { usePlanningGroups } from "../_hooks/usePlanningGroups";
import { usePlanningUsers } from "../_hooks/usePlanningUsers";
import { useTeamSelection } from "../_hooks/useTeamSelection";

import { PlanningBody } from "./body/PlanningBody";
import { PlanningHeader } from "./header/PlanningHeader";
import { PlanningSidebar } from "./sidebar/PlanningSidebar";
import { PlanningToolbar } from "./toolbar/PlanningToolbar";

export const Planning = () => {
  const { setLeaveTypes, setLeaveTypesN1 } = usePlanningStore();

  const [selectedTeams, setSelectedTeams] = useState<Set<string>>(new Set());

  const normalizeColor = (color: string) => color.replace(/0xFF|0xff/g, "#");

  const { data: leaveTypes, isLoading : isLoadingLeavesType } = useQuery({
    queryKey: ["leaveTypes"],
    queryFn: async () => {
      const response = await leaveTypeService.getLeaveTypesForPlanning();

      const normalizedLeaveTypes = response.map((lt) => ({
        ...lt,
        color: normalizeColor(lt.color),
      }));

      const n1Types = response
        .filter(({ needs_count }) => needs_count)
        .flatMap((lt) => {
          const baseType = { ...lt, color: normalizeColor(lt.color) };
          return lt.is_pay
            ? [{ ...baseType, name: `${lt.name} N-1` }, baseType]
            : [baseType];
        });

      setLeaveTypes(normalizedLeaveTypes);
      setLeaveTypesN1(n1Types);
      return { normalizedLeaveTypes, n1Types };
    },
  });

  const {
    users,
    allUserLength,
    handleLoadMore,
    hasNextPage,
    isFetchingNextPage,
    isLoadingUsers,
  } = usePlanningUsers();

  const periodDays = usePeriodDays();
  const { data: leaves = [], isLoading: isLoadingLeaves } =
    useLeavesPlannigQuery(periodDays, users);

  const { teams } = useTeamSelection({ selectedTeams });
  const { currentGroups } = usePlanningGroups({ teams, users });

  const isLoading = isLoadingUsers || isLoadingLeaves || isLoadingLeavesType;

  return (
    <div className="flex w-full flex-col bg-background text-foreground">
      <PlanningToolbar
        leaveTypes={leaveTypes?.normalizedLeaveTypes ?? []}
        setSelectedTeams={setSelectedTeams}
        selectedTeams={selectedTeams}
      />

      <div className="h-[630px] overflow-y-auto rounded-lg border border-border">
        <div className="flex">
          <PlanningSidebar
            handleLoadMore={handleLoadMore}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
            isLoading={isLoading}
            currentGroups={currentGroups}
          />

          <div className="relative flex-1 rounded-t-lg">
            <div className="sticky top-0 z-40 bg-background">
              <PlanningHeader />
            </div>

            <div className="overflow-x-auto">
              <PlanningBody
                isLoading={isLoading}
                leaves={leaves}
                periodDays={periodDays}
                currentGroups={currentGroups}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2 flex w-full justify-end">
        <p className="text-xs opacity-70">
          Collaborateurs: {users.length} / {allUserLength}
        </p>
      </div>
    </div>
  );
};
