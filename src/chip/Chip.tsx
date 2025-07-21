import {
  Chip as ChipRoot,
  type ChipProps as HeroUIChipProps,
} from "@heroui/react"
import type { JSX } from "react"
import { forwardRef, useState, useCallback } from "react"
import { mergeTailwindClasses } from "@/utils"
import {
  chipClassConfig,
  getChipVariantClasses,
  getChipSizeClasses,
  getChipColorClasses,
  createChipProps,
  validateChipConfig,
  generateChipKey,
  type ChipConfig,
} from "./chipConfig"
import type { StylableComponent } from "@/utils/typeUtils"

/**
 * Enhanced Chip component interface
 */
export interface ChipProps
  extends Omit<HeroUIChipProps, "variant" | "color" | "size" | "classNames">,
    StylableComponent {
  /** Chip variant */
  variant?: "solid" | "bordered" | "light" | "flat" | "faded" | "shadow" | "dot"
  /** Chip color theme */
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger"
  /** Chip size */
  size?: "sm" | "md" | "lg"
  /** Whether chip is selectable */
  selectable?: boolean
  /** Whether chip is selected (for selectable chips) */
  isSelected?: boolean
  /** Selection change handler */
  onSelectionChange?: (isSelected: boolean) => void
  /** Custom close handler with animation support */
  onClose?: () => void | Promise<void>
  /** Whether to show animation on interactions */
  animated?: boolean
  /** Custom class names for different parts */
  classNames?: {
    base?: string
    content?: string
    dot?: string
    avatar?: string
    closeButton?: string
  }
  /** Validation mode for development */
  validateConfig?: boolean
  /** Custom click handler */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
  /** Tooltip content */
  tooltip?: string
}

/**
 * Enhanced Chip component built on top of HeroUI Chip
 * Provides selection states, animations, and professional styling
 */
export const Chip = forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      children,
      variant = "solid",
      color = "default",
      size = "md",
      selectable = false,
      isSelected = false,
      onSelectionChange,
      animated = true,
      validateConfig = process.env.NODE_ENV !== "production",
      classNames,
      onClick,
      onClose,
      tooltip,
      ...props
    }: ChipProps,
    ref
  ): JSX.Element => {
    const [isClosing, setIsClosing] = useState(false)
    const [internalSelected, setInternalSelected] = useState(isSelected)

    // Validate configuration in development
    if (validateConfig) {
      const config: ChipConfig = { children, variant, color, size, ...props }
      const validation = validateChipConfig(config)
      if (!validation.valid) {
        console.warn(
          "[Chip] Configuration validation errors:",
          validation.errors
        )
      }
    }

    // Get class configurations
    const variantClasses = getChipVariantClasses(variant)
    const sizeClasses = getChipSizeClasses(size)
    const colorClasses = getChipColorClasses(color, variant)

    // Merge all class configurations
    const mergedClasses = chipClassConfig.mergeClasses({
      ...variantClasses,
      ...sizeClasses,
      ...classNames,
    })

    // Handle click for selectable chips
    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        if (selectable) {
          const newSelected = !internalSelected
          setInternalSelected(newSelected)
          onSelectionChange?.(newSelected)
        }
        onClick?.(event)
      },
      [selectable, internalSelected, onSelectionChange, onClick]
    )

    // Handle close with animation
    const handleClose = useCallback(async () => {
      if (animated) {
        setIsClosing(true)
        // Wait for animation to complete
        await new Promise((resolve) => setTimeout(resolve, 200))
      }
      await onClose?.()
    }, [animated, onClose])

    // Create final props
    const finalProps = createChipProps(props, {
      variant,
      color,
      size,
    })

    const chipElement = (
      <ChipRoot
        ref={ref}
        {...finalProps}
        className={mergeTailwindClasses(
          mergedClasses.base,
          colorClasses,
          selectable && "cursor-pointer hover:opacity-80",
          selectable && internalSelected && "ring-2 ring-offset-1 ring-current",
          animated && "transition-all duration-200",
          isClosing && "scale-95 opacity-0",
          props.className
        )}
        classNames={mergedClasses}
        onClick={handleClick}
        onClose={onClose ? handleClose : undefined}
      >
        {children}
      </ChipRoot>
    )

    // Add tooltip if provided
    if (tooltip) {
      return <div title={tooltip}>{chipElement}</div>
    }

    return chipElement
  }
)

/**
 * ChipGroup component for managing multiple chips
 */
export interface ChipGroupProps extends StylableComponent {
  /** Array of chip data */
  chips: (ChipProps & { key?: string })[]
  /** Whether chips are selectable */
  selectable?: boolean
  /** Selection mode */
  selectionMode?: "single" | "multiple"
  /** Selected chip keys */
  selectedKeys?: Set<string>
  /** Selection change handler */
  onSelectionChange?: (keys: Set<string>) => void
  /** Group spacing */
  spacing?: "sm" | "md" | "lg"
  /** Group orientation */
  orientation?: "horizontal" | "vertical"
  /** Whether to wrap chips */
  wrap?: boolean
  /** Whether group is disabled */
  isDisabled?: boolean
}

/**
 * ChipGroup component for organizing multiple chips
 */
export const ChipGroup = forwardRef<HTMLDivElement, ChipGroupProps>(
  (
    {
      chips,
      selectable = false,
      selectionMode = "multiple",
      selectedKeys = new Set(),
      onSelectionChange,
      spacing = "md",
      orientation = "horizontal",
      wrap = true,
      isDisabled = false,
      className,
      ...props
    },
    ref
  ): JSX.Element => {
    const [internalSelectedKeys, setInternalSelectedKeys] =
      useState(selectedKeys)

    const spacingClasses = {
      sm: orientation === "horizontal" ? "gap-1" : "gap-1",
      md: orientation === "horizontal" ? "gap-2" : "gap-2",
      lg: orientation === "horizontal" ? "gap-3" : "gap-3",
    }

    const handleChipSelection = useCallback(
      (chipKey: string, isSelected: boolean) => {
        if (!selectable || isDisabled) {
          return
        }

        let newSelectedKeys = new Set(internalSelectedKeys)

        if (selectionMode === "single") {
          newSelectedKeys = isSelected ? new Set([chipKey]) : new Set()
        } else {
          if (isSelected) {
            newSelectedKeys.add(chipKey)
          } else {
            newSelectedKeys.delete(chipKey)
          }
        }

        setInternalSelectedKeys(newSelectedKeys)
        onSelectionChange?.(newSelectedKeys)
      },
      [
        selectable,
        isDisabled,
        selectionMode,
        internalSelectedKeys,
        onSelectionChange,
      ]
    )

    return (
      <div
        ref={ref}
        className={mergeTailwindClasses(
          "flex",
          orientation === "horizontal" ? "flex-row" : "flex-col",
          wrap && "flex-wrap",
          spacingClasses[spacing],
          isDisabled && "opacity-50 pointer-events-none",
          className
        )}
        {...props}
      >
        {chips.map((chip, index) => {
          const chipKey = chip.key || generateChipKey(chip.children, index)
          const isSelected = internalSelectedKeys.has(chipKey)

          return (
            <Chip
              key={chipKey}
              {...chip}
              selectable={selectable}
              isSelected={isSelected}
              onSelectionChange={(selected) =>
                handleChipSelection(chipKey, selected)
              }
            />
          )
        })}
      </div>
    )
  }
)

ChipGroup.displayName = "ChipGroup"

Chip.displayName = "Chip"
