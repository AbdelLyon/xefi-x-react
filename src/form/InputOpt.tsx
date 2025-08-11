import type { JSX } from "react";
import { forwardRef } from "react";
import type { InputOtpProps } from "@heroui/react";
import { InputOtp as UIInputOtp } from "@heroui/react";
import { mergeTailwindClasses } from "@/utils";

type InputOtpWrapperProps = {
  length?: number;
  label?: string;
  labelClasses?: string;
  containerClasses?: string;
} & Omit<InputOtpProps, "length">;

export const InputOtp = forwardRef<HTMLDivElement, InputOtpWrapperProps>(
  (
    { length = 6, label, labelClasses, containerClasses, ...props },
    ref,
  ): JSX.Element => {
    const defaultLabelClasses = "text-default-500 text-small mb-2";
    const defaultContainerClasses = "flex flex-col";

    return (
      <div
        ref={ref}
        className={mergeTailwindClasses(
          defaultContainerClasses,
          containerClasses,
        )}
      >
        {label !== undefined && (
          <p
            className={mergeTailwindClasses(defaultLabelClasses, labelClasses)}
          >
            {label}
          </p>
        )}
        <UIInputOtp length={length} {...props} />
      </div>
    );
  },
);

InputOtp.displayName = "InputOtp";
