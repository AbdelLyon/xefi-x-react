import { ReactNode } from 'react';
import { ChipProps as HeroUIChipProps } from '@heroui/react';
import { BaseComponentProps, Color, Size, Variant } from '../types';
/**
 * Badge props extending HeroUI Chip with additional badge-specific features
 */
export interface BadgeProps extends Omit<HeroUIChipProps, "color" | "size" | "variant" | "content">, BaseComponentProps {
    /** Badge content */
    children?: ReactNode;
    /** Badge color theme */
    color?: Color;
    /** Badge variant */
    variant?: Extract<Variant, "solid" | "flat" | "bordered" | "light" | "faded">;
    /** Badge size */
    size?: Extract<Size, "sm" | "md" | "lg">;
    /** Content to attach badge to */
    content?: ReactNode;
    /** Show dot indicator instead of content */
    dot?: boolean;
    /** Badge visibility */
    isInvisible?: boolean;
    /** Maximum count to display */
    max?: number;
    /** Whether to show badge when count is zero */
    showZero?: boolean;
    /** Placement relative to content */
    placement?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
    /** Shape of the badge */
    shape?: "rectangle" | "circle";
    /** Custom styling for different parts */
    classNames?: {
        base?: string;
        badge?: string;
        content?: string;
    };
}
/**
 * Modern Badge component built on top of HeroUI Chip
 * Provides flexible positioning, counting, and styling options
 *
 * @example
 * ```tsx
 * // Simple badge
 * <Badge color="primary">New</Badge>
 *
 * // Badge with content
 * <Badge content={<NotificationIcon />} color="danger" dot>
 *   <Button>Messages</Button>
 * </Badge>
 *
 * // Count badge with maximum
 * <Badge content={<MailIcon />} color="danger" max={99}>
 *   {unreadCount}
 * </Badge>
 * ```
 */
export declare const Badge: import('react').ForwardRefExoticComponent<Omit<BadgeProps, "ref"> & import('react').RefAttributes<HTMLDivElement>>;
