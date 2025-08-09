import type { JSX } from "react";
import { forwardRef } from "react";
import type { DividerProps } from "@heroui/react";
import { Divider as HerouiDivider } from "@heroui/react";

export const Divider = forwardRef<HTMLHRElement, DividerProps>(
  (props, ref): JSX.Element => <HerouiDivider ref={ref} {...props} />
);

Divider.displayName = "Divider";