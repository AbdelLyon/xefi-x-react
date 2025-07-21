import type { JSX, ReactNode } from "react";
import type { PopoverProps, PopoverContentProps } from "@heroui/react";
import {
  Popover as PopoverRoot,
  PopoverTrigger,
  PopoverContent,
} from "@heroui/react";
import type { Radius } from "@/types";

export type PropsPopover = {
  trigger: ReactNode;
  children: ReactNode;
  contentClassName?: string;
  popoverContentProps?: PopoverContentProps;
  radius?: Radius;
} & Omit<PopoverProps, "content" | "children">;

export const Popover = ({
  trigger,
  children,
  contentClassName,
  popoverContentProps,
  radius = "sm",
  motionProps = {
    variants: {
      enter: {
        y: 0,
        opacity: 1,
        transition: {
          y: { duration: 0.1 },
          opacity: { duration: 0.15 },
        },
      },
      exit: {
        y: "10%",
        opacity: 0,
        transition: {
          y: { duration: 0 },
          opacity: { duration: 0.1 },
        },
      },
    },
  },
  offset = 10,
  placement = "bottom",
  ...props
}: PropsPopover): JSX.Element => {
  return (
    <PopoverRoot
      motionProps={motionProps}
      offset={offset}
      placement={placement}
      radius={radius}
      isOpen={props.isOpen}
      {...props}
    >
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent className={contentClassName} {...popoverContentProps}>
        {children}
      </PopoverContent>
    </PopoverRoot>
  );
};
