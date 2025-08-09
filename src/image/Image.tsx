import type { JSX } from "react";
import { forwardRef } from "react";
import type { ImageProps } from "@heroui/react";
import { Image as HerouiImage } from "@heroui/react";

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  (props, ref): JSX.Element => <HerouiImage ref={ref} {...props} />
);

Image.displayName = "Image";