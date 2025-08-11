import { useQuery } from "@tanstack/react-query";

import { leaveTypeService } from "@/services/api/leave/LeaveTypeService";
import { usePlanningStore } from "@/store/usePlanningStore";


const normalizeColor = (color: string) => color.replace(/0xFF|0xff/g, "#");

export const useLeaveTypes = () => {
  const { setLeaveTypes, setLeaveTypesN1 } = usePlanningStore();

  const { error, data, isLoading } = useQuery({
    queryKey: ["leaveTypes"],
    queryFn: async () => {
      const response = await leaveTypeService.search({});
      const { data } = response;

      const normalizedLeaveTypes = data.map((lt) => ({
        ...lt,
        color: normalizeColor(lt.color),
      }));

      const n1Types = data
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

  return {
    leaveTypes: data?.normalizedLeaveTypes ?? [],
    leaveTypesN1: data?.n1Types ?? [],
    isLoadingLeaveTypes: isLoading,
    leaveTypesError: error,
  };
};