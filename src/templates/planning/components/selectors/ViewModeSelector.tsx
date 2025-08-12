import { Buttons } from "@/buttons"
import { mergeTailwindClasses } from "@/utils"
import type { ViewMode } from "../../types/planning.types"

interface ViewModeSelectorProps {
  value: string
  options: { key: string; label: string; disabled?: boolean }[]

  onChange?: ((mode: ViewMode) => void) | undefined
  disabled?: boolean
  className?: string
}

export const ViewModeSelector: React.FC<ViewModeSelectorProps> = ({
  value,
  options = [],
  onChange,
  disabled = false,
  className = "",
}) => {
  const handleModeChange = (mode: ViewMode) => {
    if (!disabled && onChange) {
      onChange(mode)
    }
  }

  return (
    <Buttons
      className={mergeTailwindClasses(
        "rounded-lg bg-default-100 p-1",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
      variant="light"
      size="sm"
      buttons={options?.map((option) => ({
        key: option.key,
        label: option.label,
        disabled: option.disabled || disabled,
        onPress: () => handleModeChange(option.key as ViewMode),
        isSelected: value === option.key,
      }))}
    ></Buttons>
  )
}
