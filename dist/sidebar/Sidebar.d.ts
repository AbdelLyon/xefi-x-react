import { default as React, JSX, ReactNode } from 'react';
import { Item } from '../types/navigation';
import { Color } from '../types/types';
export interface SidebarProps {
    items?: Item[];
    className?: string;
    classNames?: {
        base?: string;
        item?: string;
        action?: string;
    };
    bgImage?: ReactNode;
    ref?: React.RefObject<HTMLElement>;
    onItemClick?: (item: Item) => void;
    actionLabel?: string;
    actionIcon?: React.ReactElement<{
        className?: string;
    }>;
    actionColor?: Color;
    actionClick?: () => void;
    showDivider?: boolean;
}
export declare const Sidebar: ({ items, classNames, bgImage, onItemClick, ref, actionLabel, actionIcon, actionColor, actionClick, showDivider, }: SidebarProps) => JSX.Element | null;
