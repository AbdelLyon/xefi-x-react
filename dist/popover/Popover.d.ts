import { JSX, ReactNode } from 'react';
import { PopoverProps, PopoverContentProps } from '@heroui/react';
import { Radius } from '../types/types';
export type PropsPopover = {
    trigger: ReactNode;
    children: ReactNode;
    contentClassName?: string;
    popoverContentProps?: PopoverContentProps;
    radius?: Radius;
} & Omit<PopoverProps, "content" | "children">;
export declare const Popover: ({ trigger, children, contentClassName, popoverContentProps, radius, motionProps, offset, placement, ...props }: PropsPopover) => JSX.Element;
