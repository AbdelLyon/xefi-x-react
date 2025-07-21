import type { ReactNode, ElementType, JSX } from "react";

export interface TypographyProps {
  children: ReactNode;
  as?: ElementType;
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "base"
    | "small"
    | "caption"
    | "overline";
  weight?: "light" | "normal" | "medium" | "semibold" | "bold";
  align?: "left" | "center" | "right" | "justify";
  color?: string;
  truncate?: boolean;
  className?: string;
}

import { forwardRef } from "react";
import { mergeTailwindClasses } from "@/utils/utils";

const VARIANT_STYLES = {
  h1: "text-4xl md:text-5xl font-bold",
  h2: "text-3xl md:text-4xl font-bold",
  h3: "text-2xl md:text-3xl font-bold",
  h4: "text-xl md:text-2xl font-semibold",
  h5: "text-lg md:text-xl font-semibold",
  h6: "text-base md:text-lg font-semibold",
  base: "text-base",
  small: "text-sm",
  caption: "text-xs",
  overline: "text-xs uppercase tracking-wider",
};

const WEIGHT_STYLES = {
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

const ALIGN_STYLES = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  (
    {
      children,
      as: Component = "p",
      variant = "base",
      weight,
      align,
      color,
      truncate,
      className,
      ...props
    },
    ref,
  ): JSX.Element => {
    const classes = mergeTailwindClasses(
      VARIANT_STYLES[variant],
      weight && WEIGHT_STYLES[weight],
      align && ALIGN_STYLES[align],
      color !== undefined && `text-${color}`,
      truncate !== undefined && "truncate",
      className,
    );

    return (
      <Component ref={ref} className={classes} {...props}>
        {children}
      </Component>
    );
  },
);

Typography.displayName = "Typography";
