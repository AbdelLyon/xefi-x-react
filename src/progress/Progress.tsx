import type { JSX, ReactNode } from "react";
import { forwardRef } from "react";
import type { ProgressProps as ProgressRootProps } from "@heroui/react";
import { Progress as ProgressRoor } from "@heroui/react";

type AdditionalProgressProps = {
  label?: ReactNode;
  labelPosition?: "top" | "bottom" | "none";
  containerClassName?: string;
  labelClassName?: string;
};

type ProgressProps = {
  classNames?: ProgressRootProps["classNames"];
} & Omit<ProgressRootProps, "classNames"> &
  AdditionalProgressProps;

const defaultProps = {
  size: "md",
  color: "primary",
  radius: "full",
  minValue: 0,
  maxValue: 100,
  formatOptions: { style: "percent" } as const,
  showValueLabel: true,
} as const;

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      label,
      labelPosition = "top",
      containerClassName,
      labelClassName,
      value = 0,
      maxValue = 100,
      formatOptions = defaultProps.formatOptions,
      valueLabel,
      showValueLabel = defaultProps.showValueLabel,
      classNames,
      ...props
    },
    ref,
  ): JSX.Element => {
    const getValueLabel = (): string => {
      const formattedValue = new Intl.NumberFormat(
        undefined,
        formatOptions,
      ).format(value / maxValue);

      if (typeof valueLabel === "string" && valueLabel.trim() !== "") {
        return valueLabel;
      }
      return formattedValue;
    };

    const labelComponent =
      labelPosition === "none" ? undefined : (
        <div
          className={`
      flex items-center justify-between
      text-small font-medium text-default-500
      ${labelClassName ?? ""}
      ${labelPosition === "top" ? "order-first" : "order-last"}
    `}
        >
          {label !== undefined && <span>{label}</span>}
          {showValueLabel && <span>{getValueLabel()}</span>}
        </div>
      );

    const progressProps = {
      value,
      maxValue,
      formatOptions,
      showValueLabel,
      ...props,
      classNames: {
        ...classNames,
        base: `w-full ${typeof classNames?.base === "string" && classNames.base}`,
      },
    };

    return (
      <div
        ref={ref}
        className={`flex w-full max-w-md flex-col gap-2 ${containerClassName}`}
      >
        {labelComponent}
        <ProgressRoor {...defaultProps} {...progressProps} />
      </div>
    );
  },
);

Progress.displayName = "Progress";
