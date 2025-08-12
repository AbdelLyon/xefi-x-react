import { jsx } from "react/jsx-runtime";
import { IconCalendar } from "@tabler/icons-react";
import { Tooltip } from "../../../../../tooltip/Tooltip/index.es.js";
import { Button } from "../../../../../button/Button/index.es.js";
const TodayButton = ({
  onClick,
  disabled = false,
  label = "Aujourd'hui",
  className = ""
}) => {
  return /* @__PURE__ */ jsx(
    Tooltip,
    {
      content: "Aller à aujourd'hui",
      trigger: /* @__PURE__ */ jsx(
        Button,
        {
          variant: "light",
          size: "sm",
          leftIcon: /* @__PURE__ */ jsx(IconCalendar, { className: "size-4" }),
          onClick,
          isDisabled: disabled,
          className: `hover:bg-default-100 ${className}`,
          children: label
        }
      )
    }
  );
};
export {
  TodayButton
};
