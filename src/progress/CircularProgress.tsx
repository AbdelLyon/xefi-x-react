import type { JSX, ReactNode } from "react";
import { forwardRef, useEffect, useState } from "react";
import type { CircularProgressProps as CircularProgressRootProps } from "@heroui/react";
import { CircularProgress as CircularProgressRoot } from "@heroui/react";

type AdditionalCircularProgressProps = {
  autoIncrement?: boolean;
  incrementInterval?: number;
  incrementStep?: number;
  onValueChange?: (value: number) => void;
};

type CircularProgressProps = Omit<CircularProgressRootProps, "classNames"> &
  AdditionalCircularProgressProps & {
    classNames?: CircularProgressRootProps["classNames"];
  };

const defaultProps = {
  color: "primary",
  size: "md",
  strokeWidth: 3,
  showValueLabel: false,
  formatOptions: { style: "percent" } as const,
  value: 0,
  minValue: 0,
  maxValue: 100,
} as const;

const defaultIncrementProps = {
  autoIncrement: false,
  incrementInterval: 500,
  incrementStep: 10,
} as const;

export const CircularProgress = forwardRef<
  HTMLDivElement,
  CircularProgressProps
>(
  (
    {
      autoIncrement = defaultIncrementProps.autoIncrement,
      incrementInterval = defaultIncrementProps.incrementInterval,
      incrementStep = defaultIncrementProps.incrementStep,
      onValueChange,

      value = defaultProps.value,
      minValue = defaultProps.minValue,
      maxValue = defaultProps.maxValue,
      formatOptions = defaultProps.formatOptions,
      valueLabel,
      classNames,
      showValueLabel,
      color,
      size,
      ...props
    },
    ref,
  ): JSX.Element => {
    const [currentValue, setCurrentValue] = useState(value);

    useEffect((): (() => void) | undefined => {
      if (!autoIncrement) {
        setCurrentValue(value);
        return;
      }

      const interval = setInterval((): void => {
        setCurrentValue((v): number => {
          const newValue = v >= maxValue ? minValue : v + incrementStep;
          onValueChange?.(newValue);
          return newValue;
        });
      }, incrementInterval);

      return (): void => clearInterval(interval);
    }, [
      autoIncrement,
      value,
      incrementInterval,
      incrementStep,
      maxValue,
      minValue,
      onValueChange,
    ]);

    const getValueLabel = (): ReactNode => {
      if (valueLabel !== undefined) {
        return valueLabel;
      }

      const percentage = (currentValue - minValue) / (maxValue - minValue);
      return new Intl.NumberFormat(undefined, formatOptions).format(percentage);
    };

    const circularProgressProps = {
      ...defaultProps,
      ...props,
      ref,
      value: currentValue,
      minValue,
      maxValue,
      formatOptions,
      valueLabel: getValueLabel(),
      showValueLabel,
      color,
      size,
      classNames,
    };

    return <CircularProgressRoot {...circularProgressProps} />;
  },
);

CircularProgress.displayName = "CircularProgress";
