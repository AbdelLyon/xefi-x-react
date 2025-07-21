import type { JSX, ReactNode } from "react";
import { forwardRef, useState } from "react";
import type { SliderProps } from "@heroui/react";
import { Slider as SliderRoot } from "@heroui/react";

interface FormatConfig {
  formatOptions?: Intl.NumberFormatOptions;
  formatValue?: (value: number[]) => string;
  renderLabel?: (value: number[]) => ReactNode;
}

interface StyleProps {
  containerClassName?: string;
  labelClassName?: string;
}

interface RangeSliderProps extends FormatConfig, StyleProps {
  sliderProps?: Omit<SliderProps, "value" | "onChange">;
  initialValue?: number[];
  label?: string;
  labelPosition?: "top" | "bottom" | "none";
  onChange?: (value: number[]) => void;
}

interface LabelProps {
  position: "top" | "bottom" | "none";
  content: ReactNode;
  className?: string;
}

const defaultFormatValue = (
  value: number[],
  formatOptions?: Intl.NumberFormatOptions,
): string => {
  return value
    .map((v): string | number =>
      formatOptions
        ? new Intl.NumberFormat(undefined, formatOptions).format(v)
        : v,
    )
    .join(" – ");
};

const LabelComponent = ({
  position,
  content,
  className,
}: LabelProps): ReactNode => {
  if (position === "none") {
    return null;
  }

  return (
    <p
      className={`text-small font-medium text-default-500 ${className} ${position === "top" ? "order-first" : "order-last"}`}
    >
      {content}
    </p>
  );
};

export const RangeSlider = forwardRef<HTMLDivElement, RangeSliderProps>(
  (
    {
      sliderProps,
      initialValue = [0, 100],
      formatOptions,
      label,
      labelPosition = "bottom",
      formatValue,
      renderLabel,
      onChange,
      containerClassName,
      labelClassName,
    },
    ref,
  ): JSX.Element => {
    const [value, setValue] = useState<number[]>(initialValue);

    const handleChange = (newValue: number | number[]): void => {
      const typedValue = Array.isArray(newValue) ? newValue : [newValue];
      setValue(typedValue);
      onChange?.(typedValue);
    };

    const formattedValue = formatValue
      ? formatValue(value)
      : defaultFormatValue(value, formatOptions);
    const labelContent = renderLabel
      ? renderLabel(value)
      : `${label}: ${formattedValue}`;

    return (
      <div
        ref={ref}
        className={`flex h-max w-full max-w-md flex-col items-start justify-center gap-2 ${containerClassName}`}
      >
        <LabelComponent
          position={labelPosition}
          content={labelContent}
          className={labelClassName}
        />
        <SliderRoot
          value={value}
          onChange={handleChange}
          label={label}
          className="max-w-md"
          formatOptions={formatOptions}
          {...sliderProps}
        />
      </div>
    );
  },
);

RangeSlider.displayName = "RangeSlider";
