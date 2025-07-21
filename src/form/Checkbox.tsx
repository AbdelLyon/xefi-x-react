import { forwardRef, useState, useCallback, useMemo } from "react"
import type { CheckboxGroupProps as HeroUICheckboxGroupProps } from "@heroui/react"
import { Checkbox, CheckboxGroup as CheckboxGroupRoot } from "@heroui/react"
import { mergeTailwindClasses } from "@/utils"
import {
  validateCheckboxGroup,
  type CheckboxItemConfig,
} from "./checkboxConfig"
import { type FormFieldState, type FormFieldSize } from "./formConfig"
import type { JSX, ReactNode } from "react"
import type { StylableComponent } from "@/utils/typeUtils"
import { validateComponentProps } from "@/utils/typeUtils"

export interface CheckboxGroupProps
  extends Omit<
      HeroUICheckboxGroupProps,
      "children" | "classNames" | "validate"
    >,
    StylableComponent {
  items: CheckboxItemConfig[]
  size?: FormFieldSize
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger"
  state?: FormFieldState
  orientation?: "horizontal" | "vertical"
  spacing?: "sm" | "md" | "lg"
  maxSelections?: number
  minSelections?: number
  showSelectAll?: boolean
  selectAllLabel?: ReactNode
  customValidate?: (
    selectedValues: string[]
  ) => boolean | string | Promise<boolean | string>
  onValidationChange?: (isValid: boolean, errors: string[]) => void
  classNames?: {
    wrapper?: string
    label?: string
    description?: string
    errorMessage?: string
    items?: string
  }
  validateConfig?: boolean
}

export const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(
  (
    {
      items,
      size = "md",
      color = "primary",
      state = "default",
      orientation = "vertical",
      spacing = "md",
      maxSelections,
      minSelections,
      showSelectAll = false,
      selectAllLabel = "Select All",
      customValidate,
      onValidationChange,
      classNames,
      validateConfig = process.env.NODE_ENV !== "production",
      value,
      onValueChange,
      ...props
    },
    ref
  ): JSX.Element => {
    const [selectedValues, setSelectedValues] = useState<string[]>(value || [])
    const [groupState, setGroupState] = useState<FormFieldState>(state)
    const [validationErrors, setValidationErrors] = useState<string[]>([])

    // ✅ Prop validation en dev
    if (validateConfig) {
      const validation = validateComponentProps(
        { items, orientation, spacing, ...props },
        {
          orientation: (v: unknown) =>
            ["horizontal", "vertical"].includes(v as string),
          spacing: (v: unknown) => ["sm", "md", "lg"].includes(v as string),
        }
      )
      if (!validation.valid) {
        console.warn(
          "[CheckboxGroup] Configuration validation errors:",
          validation.errors
        )
      }
    }

    const spacingClasses = {
      sm: orientation === "horizontal" ? "gap-2" : "gap-1",
      md: orientation === "horizontal" ? "gap-4" : "gap-2",
      lg: orientation === "horizontal" ? "gap-6" : "gap-3",
    }

    const validateGroup = useCallback(
      async (values: string[]) => {
        let isValid = true
        const errors: string[] = []

        const builtIn = validateCheckboxGroup(values, {
          items,
          minSelections,
          maxSelections,
          required: props.isRequired,
        })
        if (!builtIn.valid) {
          isValid = false
          errors.push(...builtIn.errors)
        }

        if (customValidate) {
          try {
            const result = await customValidate(values)
            if (typeof result === "string") {
              isValid = false
              errors.push(result)
            } else if (!result) {
              isValid = false
              errors.push("Group validation failed")
            }
          } catch {
            isValid = false
            errors.push("Group validation error occurred")
          }
        }

        setGroupState(isValid ? "default" : "invalid")
        setValidationErrors(errors)
        onValidationChange?.(isValid, errors)

        return { isValid, errors }
      },
      [
        customValidate,
        items,
        minSelections,
        maxSelections,
        props.isRequired,
        onValidationChange,
      ]
    )

    const handleValueChange = useCallback(
      async (newValues: string[]) => {
        setSelectedValues(newValues)
        await validateGroup(newValues)
        onValueChange?.(newValues)
      },
      [validateGroup, onValueChange]
    )

    const handleSelectAll = useCallback(async () => {
      const all = items.map((i) => i.value)
      const newValues = selectedValues.length === items.length ? [] : all
      await handleValueChange(newValues)
    }, [items, selectedValues, handleValueChange])

    const enhancedItems = useMemo(
      () =>
        items.map((item) => ({
          ...item,
          size,
          color,
          state: groupState,
        })),
      [items, size, color, groupState]
    )

    return (
      <div
        className={mergeTailwindClasses(
          "flex flex-col gap-2",
          classNames?.wrapper
        )}
      >
        <CheckboxGroupRoot
          ref={ref}
          value={selectedValues}
          onValueChange={handleValueChange}
          className={mergeTailwindClasses(
            "flex",
            orientation === "horizontal" ? "flex-row flex-wrap" : "flex-col",
            spacingClasses[spacing],
            classNames?.items
          )}
          classNames={{
            wrapper: mergeTailwindClasses(
              "flex flex-col gap-2",
              classNames?.wrapper
            ),
            label: mergeTailwindClasses(
              "text-medium font-semibold text-foreground-700",
              groupState === "invalid" && "text-danger",
              classNames?.label
            ),
            description: mergeTailwindClasses(
              "text-small text-foreground-500",
              classNames?.description
            ),
            errorMessage: mergeTailwindClasses(
              "text-small text-danger",
              classNames?.errorMessage
            ),
          }}
          {...props}
        >
          {showSelectAll && (
            <Checkbox
              value="__select_all__"
              aria-label={String(selectAllLabel)}
              size={size}
              color={color}
              isSelected={selectedValues.length === items.length}
              isIndeterminate={
                selectedValues.length > 0 &&
                selectedValues.length < items.length
              }
              onChange={() => handleSelectAll()}
            />
          )}

          {enhancedItems.map((item) => {
            const { onChange, validate, ...rest } = item
            return (
              <Checkbox
                key={item.value}
                {...rest}
                isSelected={selectedValues.includes(item.value)}
                onChange={(event) => onChange?.(event.target.checked)}
                validate={(value) => {
                  if (!validate) {
                    return true
                  }
                  const result = validate(value)
                  if (result instanceof Promise) {
                    return undefined
                  }
                  if (typeof result === "string") {
                    return result
                  }
                  return result === false ? null : true
                }}
              />
            )
          })}
        </CheckboxGroupRoot>

        {validationErrors.length > 0 && (
          <div className="ml-2">
            {validationErrors.map((error, i) => (
              <div
                key={i}
                className={mergeTailwindClasses(
                  "text-xs text-danger",
                  classNames?.errorMessage
                )}
              >
                {error}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
)

CheckboxGroup.displayName = "CheckboxGroup"

export { Checkbox }
