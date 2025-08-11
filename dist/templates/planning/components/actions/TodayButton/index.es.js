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
  return /* @__PURE__ */ jsx(Tooltip, { content: "Aller à aujourd'hui", children: /* @__PURE__ */ jsx(
    Button,
    {
      variant: "light",
      size: "sm",
      startContent: /* @__PURE__ */ jsx(IconCalendar, { className: "size-4" }),
      onPress: onClick,
      isDisabled: disabled,
      className: `hover:bg-default-100 ${className}`,
      children: label
    }
  ) });
};
export {
  TodayButton
};
