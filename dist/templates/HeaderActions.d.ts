import { Selection } from '@heroui/react';
import { Language } from './LanguageSelect';
import { ProfileUser, ProfileSection, ProfileAction } from './ProfileDropdown';
export interface HeaderActionsProps {
    className?: string;
    gap?: "0" | "1" | "2" | "3" | "4" | "6" | "8";
    align?: "start" | "center" | "end" | "between" | "around" | "evenly";
    showThemeToggle?: boolean;
    themeToggleProps?: {
        className?: string;
        size?: number;
    };
    showLanguageSelect?: boolean;
    languages?: Language[];
    selectedLanguage?: Selection;
    onLanguageChange?: (selection: Selection) => void;
    languageSelectProps?: {
        className?: string;
        size?: "sm" | "md" | "lg";
        placeholder?: string;
        "aria-label"?: string;
    };
    showProfileDropdown?: boolean;
    user?: ProfileUser;
    profileSections?: ProfileSection[];
    onProfileAction?: (action: ProfileAction) => void;
    profileDropdownProps?: {
        className?: string;
        size?: "sm" | "md" | "lg";
        variant?: "default" | "bordered" | "shadow" | "flat";
        showUserInfo?: boolean;
        placement?: "bottom" | "bottom-start" | "bottom-end" | "top" | "top-start" | "top-end";
    };
}
export declare const HeaderActions: import('react').ForwardRefExoticComponent<HeaderActionsProps & import('react').RefAttributes<HTMLDivElement>>;
