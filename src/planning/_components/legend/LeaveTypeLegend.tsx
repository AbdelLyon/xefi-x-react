import { Popover } from "@xefi/x-react/popover";
import { Tooltip } from "@xefi/x-react/tooltip";
import { t } from "i18next";
import { ReactNode } from "react";

import { LeaveType } from "@/models/Leave";
import { formatArrayWithZeroLast } from "@/utils/ui";

interface MorePopupProps {
  id?: string;
  trigger: ReactNode;
  leaveTypes: LeaveType[];
}

interface LeaveTypeLegendItemProps {
  label: string;
  color: string;
}

interface LeaveTypeLegendProps {
  leaveTypes: LeaveType[];
}

const MorePopup = ({ trigger, leaveTypes }: MorePopupProps) => {
  return (
    <Popover
      trigger={trigger}
      classNames={{
        content: "p-0 dark:bg-background",
      }}
    >
      <p className="mb-2 w-full border-b border-border py-2 text-center text-base font-semibold text-red-600">
        {t("leaveType")}
      </p>
      <div className="grid grid-cols-1 gap-y-3 p-3">
        {leaveTypes.map((type, index) => (
          <div className="flex items-center" key={index}>
            <div
              className="mr-2 h-3 w-4 rounded-full shadow-sm"
              style={{ background: type.color }}
            />
            <p style={{ fontSize: 11 }} className="opacity-70">
              {type.name ?? ""}
            </p>
          </div>
        ))}
      </div>
    </Popover>
  );
};

const LeaveTypeLegendItem = ({ label, color }: LeaveTypeLegendItemProps) => {
  return (
    label !== undefined && (
      <div className="flex items-center gap-x-2 rounded p-0.5 transition-colors duration-200">
        <div
          className="h-2 w-5 min-w-[16px] rounded-full shadow-sm"
          style={{ background: color }}
        />
        <Tooltip
          content={label}
          trigger={
            <span style={{ fontSize: 11 }} className="truncate opacity-70">
              {label}
            </span>
          }
        />
      </div>
    )
  );
};

export const LeaveTypeLegend = ({ leaveTypes }: LeaveTypeLegendProps) => {
  const sortedLeaveTypes = formatArrayWithZeroLast(leaveTypes);
  const slicedLeaveTypes = sortedLeaveTypes.slice(0, 8);

  return (
    <div>
      <h2 className="mb-2 text-base font-semibold text-red-600">
        {t("leaveTypes")}
      </h2>
      <div className="flex items-center">
        <div className="grid grid-cols-2 gap-x-2">
          {leaveTypes.length > 0 &&
            slicedLeaveTypes.map((type, index) => (
              <div key={index}>
                <LeaveTypeLegendItem label={type.name} color={type.color} />
              </div>
            ))}
          {sortedLeaveTypes.length > 8 && (
            <MorePopup
              leaveTypes={sortedLeaveTypes?.slice(8)}
              trigger={
                <button className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-blue-600 transition-all duration-200">
                  <span>Voir plus</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};
