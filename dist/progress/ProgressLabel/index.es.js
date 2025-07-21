import { jsxs, jsx } from "react/jsx-runtime";
import { useMemo } from "react";
import { formatProgressValue } from "../progressUtils/index.es.js";
import { mergeTailwindClasses } from "../../utils/utils/index.es.js";
const ProgressLabel = ({
  label,
  value,
  maxValue,
  valueLabel,
  showValueLabel,
  formatOptions,
  position,
  className,
  locale
}) => {
  const formattedValue = useMemo(() => {
    if (position === "none") {
      return null;
    }
    const hasCustomLabel = typeof valueLabel === "string" && valueLabel.trim() !== "";
    return hasCustomLabel ? valueLabel : formatProgressValue(value, maxValue, formatOptions, locale);
  }, [value, maxValue, valueLabel, formatOptions, locale, position]);
  if (position === "none") {
    return null;
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: mergeTailwindClasses(
        "flex items-center justify-between text-small font-medium text-default-500",
        {
          "order-first": position === "top",
          "order-last": position === "bottom"
        },
        className
      ),
      children: [
        label !== void 0 && /* @__PURE__ */ jsx("span", { children: label }),
        showValueLabel && /* @__PURE__ */ jsx("span", { children: formattedValue })
      ]
    }
  );
};
export {
  ProgressLabel
};
