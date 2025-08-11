import { jsx } from "react/jsx-runtime";
import { Buttons } from "../../../../../buttons/Buttons/index.es.js";
import { mergeTailwindClasses } from "../../../../../utils/string/index.es.js";
const ViewModeSelector = ({
  value,
  options = [],
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
      buttons: options == null ? void 0 : options.map((option) => ({
        key: option.key,
        label: option.label,
        disabled: option.disabled || disabled,
        onPress: () => handleModeChange(option.key),
        isSelected: value === option.key
      }))
    }
  );
};
export {
  ViewModeSelector
};
