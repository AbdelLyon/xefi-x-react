import type { Color, LinkColor } from "./types";
import type { PressEvent } from "@heroui/react";

export type Item = {
  key: string;
  label?: string;
  onClick?: (event: PressEvent) => void;
  isActive?: boolean;
  href?: string;
  linkColor?: LinkColor;
  buttonColor?: Color;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
};
