import { ComponentClassNames } from '../utils/classNames';
import { ReactNode } from 'react';
/**
 * Default class names for avatar components
 */
export declare const defaultAvatarClassNames: {
    readonly base: "flex-shrink-0";
    readonly img: "object-cover";
    readonly fallback: "font-normal text-center uppercase";
    readonly name: "text-inherit";
    readonly icon: "text-inherit";
};
/**
 * Avatar size class configurations
 */
export declare const avatarSizeClasses: {
    readonly sm: {
        readonly base: "w-8 h-8 text-xs";
        readonly name: "text-xs";
    };
    readonly md: {
        readonly base: "w-10 h-10 text-sm";
        readonly name: "text-sm";
    };
    readonly lg: {
        readonly base: "w-12 h-12 text-base";
        readonly name: "text-base";
    };
    readonly xl: {
        readonly base: "w-16 h-16 text-lg";
        readonly name: "text-lg";
    };
};
/**
 * Avatar color class configurations
 */
export declare const avatarColorClasses: {
    readonly default: {
        readonly base: "bg-default text-default-foreground";
    };
    readonly primary: {
        readonly base: "bg-primary text-primary-foreground";
    };
    readonly secondary: {
        readonly base: "bg-secondary text-secondary-foreground";
    };
    readonly success: {
        readonly base: "bg-success text-success-foreground";
    };
    readonly warning: {
        readonly base: "bg-warning text-warning-foreground";
    };
    readonly danger: {
        readonly base: "bg-danger text-danger-foreground";
    };
};
/**
 * Avatar status indicator classes
 */
export declare const avatarStatusClasses: {
    readonly online: "bg-success border-2 border-white dark:border-background";
    readonly offline: "bg-default-300 border-2 border-white dark:border-background";
    readonly away: "bg-warning border-2 border-white dark:border-background";
    readonly busy: "bg-danger border-2 border-white dark:border-background";
};
/**
 * Create avatar class configuration
 */
export declare const avatarClassConfig: {
    defaultClasses: {
        readonly base: "flex-shrink-0";
        readonly img: "object-cover";
        readonly fallback: "font-normal text-center uppercase";
        readonly name: "text-inherit";
        readonly icon: "text-inherit";
    };
    mergeClasses: (customClasses?: Partial<Record<"base" | "img" | "name" | "icon" | "fallback", string>> | undefined) => Record<"base" | "img" | "name" | "icon" | "fallback", string>;
};
/**
 * Get avatar size classes
 */
export declare const getAvatarSizeClasses: (size?: keyof typeof avatarSizeClasses) => {
    readonly base: "w-8 h-8 text-xs";
    readonly name: "text-xs";
} | {
    readonly base: "w-10 h-10 text-sm";
    readonly name: "text-sm";
} | {
    readonly base: "w-12 h-12 text-base";
    readonly name: "text-base";
} | {
    readonly base: "w-16 h-16 text-lg";
    readonly name: "text-lg";
};
/**
 * Get avatar color classes
 */
export declare const getAvatarColorClasses: (color?: keyof typeof avatarColorClasses) => {
    readonly base: "bg-default text-default-foreground";
} | {
    readonly base: "bg-primary text-primary-foreground";
} | {
    readonly base: "bg-secondary text-secondary-foreground";
} | {
    readonly base: "bg-success text-success-foreground";
} | {
    readonly base: "bg-warning text-warning-foreground";
} | {
    readonly base: "bg-danger text-danger-foreground";
};
/**
 * Avatar configuration interface
 */
export interface AvatarConfig {
    /** Avatar image source */
    src?: string;
    /** Alternative text for image */
    alt?: string;
    /** Name to display as fallback */
    name?: string;
    /** Icon to display as fallback */
    icon?: ReactNode;
    /** Avatar size */
    size?: keyof typeof avatarSizeClasses;
    /** Avatar color theme */
    color?: keyof typeof avatarColorClasses;
    /** Avatar shape */
    radius?: "none" | "sm" | "md" | "lg" | "full";
    /** Whether avatar is bordered */
    isBordered?: boolean;
    /** Whether avatar is disabled */
    isDisabled?: boolean;
    /** Status indicator */
    status?: keyof typeof avatarStatusClasses;
    /** Custom class names */
    classNames?: ComponentClassNames<typeof defaultAvatarClassNames>;
}
/**
 * Avatar group configuration
 */
export interface AvatarGroupConfig {
    /** Maximum avatars to show */
    max?: number;
    /** Avatar size for all items */
    size?: keyof typeof avatarSizeClasses;
    /** Whether avatars are bordered */
    isBordered?: boolean;
    /** Whether group is disabled */
    isDisabled?: boolean;
    /** Custom render function for overflow count */
    renderCount?: (count: number) => ReactNode;
    /** Grid layout for avatars */
    isGrid?: boolean;
    /** Spacing between avatars */
    spacing?: "sm" | "md" | "lg";
}
/**
 * Generate initials from name
 */
export declare const generateInitials: (name: string, maxLength?: number) => string;
/**
 * Validate avatar configuration
 */
export declare const validateAvatarConfig: (config: AvatarConfig) => {
    valid: boolean;
    errors: string[];
};
/**
 * Default avatar behavior configuration
 */
export declare const defaultAvatarBehavior: {
    readonly size: "md";
    readonly color: "default";
    readonly radius: "full";
    readonly isBordered: false;
    readonly isDisabled: false;
    readonly showFallback: true;
    readonly fallbackSrc: undefined;
};
/**
 * Create avatar props with defaults
 */
export declare const createAvatarProps: <T extends Record<string, unknown>>(userProps: T, overrides?: Partial<typeof defaultAvatarBehavior>) => {
    size: "md";
    color: "default";
    radius: "full";
    isBordered: false;
    isDisabled: false;
    showFallback: true;
    fallbackSrc: undefined;
} & T;
