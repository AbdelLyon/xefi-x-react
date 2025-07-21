import { ReactNode } from 'react';
import { NavbarContentProps, NavbarMenuProps, NavbarProps as NavbarRootProps } from '@heroui/react';
import { Item } from '../types/navigation';
export type NavbarProps = {
    appName?: ReactNode;
    appLogo?: ReactNode;
    profile?: ReactNode;
    navigationItems?: Item[];
    menuItems?: Item[];
    contentProps?: NavbarContentProps;
    menuProps?: NavbarMenuProps;
    onItemClick?: (item: Item) => void;
    isMenuOpen?: boolean;
    onMenuOpenChange?: (isOpen: boolean) => void;
    classNames?: {
        item?: string;
    };
} & Omit<NavbarRootProps, "children">;
export declare const Navbar: import('react').ForwardRefExoticComponent<Omit<NavbarProps, "ref"> & import('react').RefAttributes<HTMLElement>>;
