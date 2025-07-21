import type { ReactNode, ForwardedRef, JSX } from "react";
import { forwardRef } from "react";
import { mergeTailwindClasses } from "@/utils/utils";

interface ContainerProps {
  children: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  className?: string;
}

export const Container = forwardRef(
  (
    { children, maxWidth = "lg", className }: ContainerProps,
    ref: ForwardedRef<HTMLDivElement>,
  ): JSX.Element => {
    const containerClasses = mergeTailwindClasses(
      "mx-auto px-4",
      {
        "max-w-screen-sm": maxWidth === "sm",
        "max-w-screen-md": maxWidth === "md",
        "max-w-screen-lg": maxWidth === "lg",
        "max-w-screen-xl": maxWidth === "xl",
        "max-w-screen-2xl": maxWidth === "2xl",
        "max-w-full": maxWidth === "full",
      },
      className,
    );

    return (
      <div ref={ref} className={containerClasses}>
        {children}
      </div>
    );
  },
);

Container.displayName = "Container";
