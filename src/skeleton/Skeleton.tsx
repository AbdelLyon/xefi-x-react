import type { JSX } from "react";
import { forwardRef } from "react";
import type { SkeletonProps } from "@heroui/react";
import { Skeleton as HerouiSkeleton } from "@heroui/react";

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (props, ref): JSX.Element => <HerouiSkeleton ref={ref} {...props} />
);

Skeleton.displayName = "Skeleton";