"use client"

import { Buttons } from "@/buttons"
import { mergeTailwindClasses } from "@/utils"

interface ViewModeSelectorProps {
  value: string
  options: Array<{
    key: string
    label: string
    disabled?: boolean
  }>
  onChange?: (mode: string) => void
  disabled?: boolean
  className?: string
}

export const ViewModeSelector: React.FC<ViewModeSelectorProps> = ({
  value,
  options,
  onChange,
  disabled = false,
  className = ""
}) => {
  const handleModeChange = (mode: string) => {
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
    >
      {options.map((option) => (
        <Buttons.Item
          key={option.key}
          isSelected={value === option.key}
          isDisabled={option.disabled || disabled}
          onPress={() => handleModeChange(option.key)}
          className={mergeTailwindClasses(
            "px-3 py-1.5 text-sm font-medium transition-all",
            value === option.key 
              ? "bg-background shadow-sm text-foreground" 
              : "text-foreground-600 hover:text-foreground-800",
            "rounded-md"
          )}
        >
          {option.label}
        </Buttons.Item>
      ))}
    </Buttons>
  )
}