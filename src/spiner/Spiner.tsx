import type { JSX } from "react";
import { forwardRef } from "react";
import type { SpinnerProps as SpinnerRootProps } from "@heroui/react";
import { Spinner as SpinnerRoot } from "@heroui/react";
import type { Color } from "@/types";

interface SpinnerProps extends Omit<SpinnerRootProps, "label" | "labelColor"> {
  color?: Color;
  size?: "sm" | "md" | "lg";
  disableAnimation?: boolean;
  strokeWidth?: number;
}

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  (
    { color = "default", size = "md", strokeWidth = 4, ...props },
    ref,
  ): JSX.Element => {
    return (
      <SpinnerRoot
        ref={ref}
        color={color}
        size={size}
        strokeWidth={strokeWidth}
        {...props}
      />
    );
  },
);

Spinner.displayName = "Spinner";
