import type {
  ButtonProps as HeroUIButtonProps,
  PressEvent,
} from "@heroui/react"
import { Button as HeroUIButton, Spinner } from "@heroui/react"
import type { JSX, ReactNode } from "react"
import { forwardRef } from "react"
import { mergeTailwindClasses } from "@/utils"
import type {
  Color,
  Variant,
  Size,
  BaseComponentProps,
  AccessibilityProps,
} from "@/types"

/**
 * Enhanced Button props extending HeroUI Button with additional features
 */
export interface ButtonProps
  extends Omit<
      HeroUIButtonProps,
      | "color"
      | "variant"
      | "size"
      | "aria-label"
      | "aria-disabled"
      | "onPress"
      | "onClick"
      | "startContent"
      | "endContent"
    >,
    BaseComponentProps,
    Pick<
      AccessibilityProps,
      "aria-label" | "aria-labelledby" | "aria-describedby"
    > {
  /** Visual variant of the button */
  variant?: Variant
  /** Color theme of the button */
  color?: Color
  /** Size of the button */
  size?: Size
  /** Whether button is in loading state */
  loading?: boolean
  /** Icon to display on the left side */
  leftIcon?: ReactNode
  /** Icon to display on the right side */
  rightIcon?: ReactNode
  /** Whether button should take full width */
  fullWidth?: boolean
  /** Click handler */
  onClick?: (event: PressEvent) => void
  /** Custom loading spinner */
  loadingSpinner?: ReactNode
  /** Loading text to show alongside spinner */
  loadingText?: string
  /** Whether to show ripple effect */
  disableRipple?: boolean
  /** Animation type for the button */
  disableAnimation?: boolean
}

/**
 * Enhanced Button component built on top of HeroUI Button
 *
 * @example
 * ```tsx
 * // Basic button
 * <Button color="primary">Click me</Button>
 *
 * // Button with icons
 * <Button
 *   leftIcon={<PlusIcon />}
 *   rightIcon={<ChevronIcon />}
 *   variant="bordered"
 * >
 *   Add Item
 * </Button>
 *
 * // Loading button
 * <Button loading loadingText="Processing...">
 *   Submit
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "solid",
      color = "primary",
      size = "md",
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      children,
      disabled,
      className,
      onClick,
      loadingSpinner,
      loadingText,
      disableRipple = false,
      disableAnimation = false,
      ...props
    },
    ref
  ): JSX.Element => {
    const isDisabled = disabled || loading

    const handlePress = (e: PressEvent): void => {
      if (loading) {
        return
      }
      e.continuePropagation()
      onClick?.(e)
    }

    // Custom loading spinner or default
    const spinner = loadingSpinner || (
      <Spinner
        size={size === "sm" ? "sm" : "md"}
        color="current"
        classNames={{
          circle1: "border-b-current",
          circle2: "border-b-current",
        }}
      />
    )

    // Determine content based on loading state
    const buttonContent = loading && loadingText ? loadingText : children

    return (
      <HeroUIButton
        ref={ref}
        variant={variant}
        onPress={handlePress}
        color={color}
        size={size as "sm" | "md" | "lg"}
        isDisabled={isDisabled}
        disableRipple={disableRipple || loading}
        disableAnimation={disableAnimation}
        startContent={loading ? spinner : leftIcon}
        endContent={!loading ? rightIcon : undefined}
        className={mergeTailwindClasses(
          fullWidth && "w-full",
          loading && "cursor-wait relative",
          className
        )}
        {...props}
      >
        {buttonContent}
      </HeroUIButton>
    )
  }
)

Button.displayName = "Button"
