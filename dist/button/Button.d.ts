import { ButtonProps as HeroUIButtonProps, PressEvent } from '@heroui/react';
import { ReactNode } from 'react';
import { Color, Variant, Size, BaseComponentProps, AccessibilityProps } from '../types';
/**
 * Enhanced Button props extending HeroUI Button with additional features
 */
export interface ButtonProps extends Omit<HeroUIButtonProps, "color" | "variant" | "size" | "aria-label" | "aria-disabled" | "onPress" | "onClick" | "startContent" | "endContent">, BaseComponentProps, Pick<AccessibilityProps, "aria-label" | "aria-labelledby" | "aria-describedby"> {
    /** Visual variant of the button */
    variant?: Variant;
    /** Color theme of the button */
    color?: Color;
    /** Size of the button */
    size?: Size;
    /** Whether button is in loading state */
    loading?: boolean;
    /** Icon to display on the left side */
    leftIcon?: ReactNode;
    /** Icon to display on the right side */
    rightIcon?: ReactNode;
    /** Whether button should take full width */
    fullWidth?: boolean;
    /** Click handler */
    onClick?: (event: PressEvent) => void;
    /** Custom loading spinner */
    loadingSpinner?: ReactNode;
    /** Loading text to show alongside spinner */
    loadingText?: string;
    /** Whether to show ripple effect */
    disableRipple?: boolean;
    /** Animation type for the button */
    disableAnimation?: boolean;
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
export declare const Button: import('react').ForwardRefExoticComponent<Omit<ButtonProps, "ref"> & import('react').RefAttributes<HTMLButtonElement>>;
