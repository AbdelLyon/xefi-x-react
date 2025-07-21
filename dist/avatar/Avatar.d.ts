import { ReactNode } from 'react';
import { AvatarGroupProps, AvatarProps, UserProps } from '@heroui/react';
import { StylableComponent } from '../utils/typeUtils';
export declare const Avatar: import('react').ForwardRefExoticComponent<Omit<AvatarProps, "ref"> & import('react').RefAttributes<HTMLDivElement>>;
/**
 * Enhanced AvatarGroup component interface
 */
export interface EnhancedAvatarGroupProps extends Omit<AvatarGroupProps, "renderCount">, StylableComponent {
    /** Custom render function for overflow count */
    renderCount?: (count: number) => ReactNode;
    /** Spacing between avatars */
    spacing?: "sm" | "md" | "lg";
    /** Whether to show tooltip on hover */
    showTooltip?: boolean;
    /** Animation on hover */
    animated?: boolean;
}
/**
 * Enhanced AvatarGroup component with better spacing and animations
 *
 * @example
 * ```tsx
 * <AvatarGroup max={4} spacing="md" animated>
 *   <Avatar name="John Doe" />
 *   <Avatar name="Jane Smith" />
 *   <Avatar name="Bob Johnson" />
 * </AvatarGroup>
 * ```
 */
export declare const AvatarGroup: import('react').ForwardRefExoticComponent<Omit<EnhancedAvatarGroupProps, "ref"> & import('react').RefAttributes<HTMLDivElement>>;
/**
 * Enhanced UserAvatar component interface
 */
export interface UserAvatarProps extends UserProps, StylableComponent {
    /** Whether to show user status */
    showStatus?: boolean;
    /** User status */
    status?: "online" | "offline" | "away" | "busy";
    /** Whether user info is clickable */
    clickable?: boolean;
    /** Custom click handler */
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}
/**
 * Enhanced UserAvatar component with status and interaction support
 *
 * @example
 * ```tsx
 * <UserAvatar
 *   name="John Doe"
 *   description="Software Engineer"
 *   avatarProps={{ src: "/avatar.jpg" }}
 *   status="online"
 *   showStatus
 *   clickable
 *   onClick={() => console.log('User clicked')}
 * />
 * ```
 */
export declare const UserAvatar: import('react').ForwardRefExoticComponent<Omit<UserAvatarProps, "ref"> & import('react').RefAttributes<HTMLDivElement>>;
