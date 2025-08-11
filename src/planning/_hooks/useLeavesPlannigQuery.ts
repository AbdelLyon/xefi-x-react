import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

import { User } from "@/models/User";
import { leaveQueryService } from "@/services/api/leave/LeaveQueryService";
import { PostSearchRequest } from "@/services/types";

export const useLeavesPlannigQuery = (periodDays: dayjs.Dayjs[], users: User[]) => {
   return useQuery({
      queryKey: [
         "leaves",
         periodDays.map((d) => d.format("YYYY-MM-DD")),
         users?.map((u) => u.id),
      ],
      queryFn: async () => {
         if (users.length === 0 || periodDays.length === 0) {
            return [];
         }

         const searchRequest: PostSearchRequest = {
            includes: [{ relation: "leave_type" }, { relation: "status" }],
            filters: [
               {
                  field: "start_date",
                  operator: "<=",
                  value: periodDays[periodDays.length - 1].format("YYYY-MM-DD"),
               },
               {
                  field: "end_date",
                  operator: ">=",
                  value: periodDays[0].format("YYYY-MM-DD"),
               },
               {
                  field: "user_id",
                  operator: "in",
                  value: users.map((u) => u.id),
               },
            ],
            sort: [{ field: "start_date", direction: "asc" as const }],
         };

         const response = await leaveQueryService.search(searchRequest);
         return response.data || [];
      },
      enabled: periodDays.length > 0 && users?.length > 0,
      placeholderData: (prev) => prev,
   });
};