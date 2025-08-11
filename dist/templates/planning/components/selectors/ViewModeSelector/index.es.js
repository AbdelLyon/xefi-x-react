import { jsx } from "react/jsx-runtime";
import { Buttons } from "../../../../../buttons/Buttons/index.es.js";
import { mergeTailwindClasses } from "../../../../../utils/string/index.es.js";
const ViewModeSelector = ({
  value,
  options,
  onChange,
  disabled = false,
  className = ""
}) => {
  const handleModeChange = (mode) => {
    if (!disabled && onChange) {
      onChange(mode);
    }
  };
  return /* @__PURE__ */ jsx(
    Buttons,
    {
      className: mergeTailwindClasses(
        "rounded-lg bg-default-100 p-1",
        disabled && "opacity-50 pointer-events-none",
        className
      ),
      variant: "light",
      size: "sm",
      children: options.map((option) => /* @__PURE__ */ jsx(
        Buttons.Item,
        {
          isSelected: value === option.key,
          isDisabled: option.disabled || disabled,
          onPress: () => handleModeChange(option.key),
          className: mergeTailwindClasses(
            "px-3 py-1.5 text-sm font-medium transition-all",
            value === option.key ? "bg-background shadow-sm text-foreground" : "text-foreground-600 hover:text-foreground-800",
            "rounded-md"
          ),
          children: option.label
        },
        option.key
      ))
    }
  );
};
export {
  ViewModeSelector
};
