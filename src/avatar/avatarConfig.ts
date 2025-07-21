/**
 * Avatar component configuration
 * Provides standardized styling and behavior patterns
 */

import { createClassNamesConfig, type ComponentClassNames } from "@/utils/classNames";
import type { ReactNode } from "react";

/**
 * Default class names for avatar components
 */
export const defaultAvatarClassNames = {
  base: "flex-shrink-0",
  img: "object-cover",
  fallback: "font-normal text-center uppercase",
  name: "text-inherit",
  icon: "text-inherit",
} as const;

/**
 * Avatar size class configurations
 */
export const avatarSizeClasses = {
  sm: {
    base: "w-8 h-8 text-xs",
    name: "text-xs",
  },
  md: {
    base: "w-10 h-10 text-sm", 
    name: "text-sm",
  },
  lg: {
    base: "w-12 h-12 text-base",
    name: "text-base",
  },
  xl: {
    base: "w-16 h-16 text-lg",
    name: "text-lg",
  },
} as const;

/**
 * Avatar color class configurations
 */
export const avatarColorClasses = {
  default: {
    base: "bg-default text-default-foreground",
  },
  primary: {
    base: "bg-primary text-primary-foreground", 
  },
  secondary: {
    base: "bg-secondary text-secondary-foreground",
  },
  success: {
    base: "bg-success text-success-foreground",
  },
  warning: {
    base: "bg-warning text-warning-foreground",
  },
  danger: {
    base: "bg-danger text-danger-foreground",
  },
} as const;

/**
 * Avatar status indicator classes
 */
export const avatarStatusClasses = {
  online: "bg-success border-2 border-white dark:border-background",
  offline: "bg-default-300 border-2 border-white dark:border-background",
  away: "bg-warning border-2 border-white dark:border-background",
  busy: "bg-danger border-2 border-white dark:border-background",
} as const;

/**
 * Create avatar class configuration
 */
export const avatarClassConfig = createClassNamesConfig(defaultAvatarClassNames);

/**
 * Get avatar size classes
 */
export const getAvatarSizeClasses = (size: keyof typeof avatarSizeClasses = "md") => {
  return avatarSizeClasses[size] || avatarSizeClasses.md;
};

/**
 * Get avatar color classes  
 */
export const getAvatarColorClasses = (color: keyof typeof avatarColorClasses = "default") => {
  return avatarColorClasses[color] || avatarColorClasses.default;
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
export const generateInitials = (name: string, maxLength: number = 2): string => {
  if (!name || typeof name !== "string") {return "";}
  
  const words = name.trim().split(/\\s+/);
  
  if (words.length === 1) {
    return words[0].substring(0, maxLength).toUpperCase();
  }
  
  return words
    .slice(0, maxLength) 
    .map(word => word.charAt(0))
    .join("")
    .toUpperCase();
};

/**
 * Validate avatar configuration
 */
export const validateAvatarConfig = (config: AvatarConfig): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  // Must have at least one display method
  if (!config.src && !config.name && !config.icon) {
    errors.push("Avatar must have either src, name, or icon");
  }
  
  // Validate image URL if provided
  if (config.src && typeof config.src !== "string") {
    errors.push("Avatar src must be a valid string URL");
  }
  
  // Validate name if provided
  if (config.name && typeof config.name !== "string") {
    errors.push("Avatar name must be a string");
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Default avatar behavior configuration
 */
export const defaultAvatarBehavior = {
  size: "md" as const,
  color: "default" as const,
  radius: "full" as const,
  isBordered: false,
  isDisabled: false,
  showFallback: true,
  fallbackSrc: undefined,
} as const;

/**
 * Create avatar props with defaults
 */
export const createAvatarProps = <T extends Record<string, unknown>>(
  userProps: T,
  overrides?: Partial<typeof defaultAvatarBehavior>
) => {
  return {
    ...defaultAvatarBehavior,
    ...overrides,
    ...userProps,
  };
};