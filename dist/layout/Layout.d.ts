import { NavbarProps } from '../navbar/Navbar';
import { SidebarProps } from '../sidebar/Sidebar';
import { JSX } from 'react';
export type LayoutProps = {
    children: React.ReactNode;
    navbar?: NavbarProps;
    sidebar?: SidebarProps;
    className?: string;
};
export declare const Layout: ({ children, navbar, sidebar, className, }: LayoutProps) => JSX.Element;
