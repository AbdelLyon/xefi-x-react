import { DropdownProps, UserProps } from '@heroui/react';
export interface ProfileUser {
    name: string;
    description?: string;
    avatarSrc?: string;
    status?: "online" | "offline" | "away" | "busy";
    showStatus?: boolean;
}
export interface ProfileAction {
    key: string;
    label: string;
    href?: string;
    icon?: React.ReactNode;
    shortcut?: string;
    color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
    variant?: "solid" | "bordered" | "light" | "flat" | "faded" | "shadow";
    onClick?: () => void;
}
export interface ProfileSection {
    key: string;
    title?: string;
    showDivider?: boolean;
    actions: ProfileAction[];
}
interface ProfileDropdownProps extends Omit<DropdownProps, "children" | "trigger"> {
    user: ProfileUser;
    sections: ProfileSection[];
    onActionPress?: (action: ProfileAction) => void;
    avatarProps?: Partial<UserProps>;
    trigger?: React.ReactNode;
    size?: "sm" | "md" | "lg";
    variant?: "default" | "bordered" | "shadow" | "flat";
    showUserInfo?: boolean;
    placement?: "bottom" | "bottom-start" | "bottom-end" | "top" | "top-start" | "top-end";
}
export declare const ProfileDropdown: import('react').ForwardRefExoticComponent<Omit<ProfileDropdownProps, "ref"> & import('react').RefAttributes<HTMLDivElement>>;
export {};
