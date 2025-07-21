import type { JSX } from "react"
import { forwardRef, useState } from "react"
import type { InputProps as InputRootProps } from "@heroui/react"
import { Input as InputRoot } from "@heroui/react"
import { IconEye, IconEyeOff } from "@tabler/icons-react"
import {
  inputClassConfig,
  getInputVariantClasses,
  getInputSizeClasses,
  getInputColorClasses,
} from "./inputConfig"

type ValidationError = string | string[]

interface InputClassNames {
  base?: string
  mainWrapper?: string
  inputWrapper?: string
  innerWrapper?: string
  input?: string
  clearButton?: string
  label?: string
  description?: string
  errorMessage?: string
}

type InputProps = Omit<InputRootProps, "classNames"> & {
  containerClasses?: string
  customValidation?: (value: string) => boolean | string
  classNames?: InputClassNames
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = "bordered",
      color = "default",
      size = "md",
      radius = "md",
      labelPlacement = "inside",
      fullWidth = true,
      customValidation,
      validate,
      type,
      ...props
    },
    ref
  ): JSX.Element => {
    const [inputType, setInputType] = useState(type)

    const combinedValidate = (
      value: string
    ): ValidationError | true | null | undefined => {
      if (customValidation) {
        const customResult = customValidation(value)
        if (typeof customResult === "string") {
          return customResult
        }
        if (customResult) {
          return "Validation failed"
        }
      }
      return validate?.(value) ?? true
    }

    const endContent =
      type === "password" ? (
        <button
          className="opacity-40 focus:outline-none"
          type="button"
          onClick={(): void =>
            setInputType(inputType === "password" ? "text" : "password")
          }
        >
          {inputType === "password" ? (
            <IconEye className="pointer-events-none" />
          ) : (
            <IconEyeOff className="pointer-events-none" />
          )}
        </button>
      ) : undefined

    const { classNames: propClassNames, ...restProps } = props

    // Get class configurations based on props
    const variantClasses = getInputVariantClasses(variant)
    const sizeClasses = getInputSizeClasses(size)
    const colorClasses = getInputColorClasses(color)

    // Merge all class configurations
    const mergedClasses = inputClassConfig.mergeClasses({
      ...variantClasses,
      ...sizeClasses,
      ...colorClasses,
      ...propClassNames,
    })

    return (
      <InputRoot
        ref={ref}
        variant={variant}
        color={color}
        size={size}
        radius={radius}
        labelPlacement={labelPlacement}
        fullWidth={fullWidth}
        validate={combinedValidate}
        classNames={mergedClasses}
        endContent={endContent}
        type={inputType}
        {...restProps}
      />
    )
  }
)

Input.displayName = "Input"
