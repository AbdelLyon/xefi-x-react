import type { JSX } from "react";
import { forwardRef } from "react";
import type { TextAreaProps as TextAreaRootProps } from "@heroui/react";
import { Textarea as TextareaRoot } from "@heroui/react";
import { mergeTailwindClasses } from "@/utils";

type ValidationError = string | string[];

type TextareaProps = TextAreaRootProps & {
  containerClasses?: string;
  width?: string | number;
  height?: string | number;
  customValidation?: (value: string) => boolean | string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      variant = "bordered",
      color = "default",
      size = "md",
      radius = "md",
      labelPlacement = "inside",
      fullWidth = true,
      isRequired = false,
      isReadOnly = false,
      isDisabled = false,
      containerClasses,
      width,
      height,
      style,
      customValidation,
      validate,
      ...props
    },
    ref,
  ): JSX.Element => {
    const combinedStyle = {
      width: typeof width === "number" ? `${width}px` : width,
      height: typeof height === "number" ? `${height}px` : height,
      ...style,
    };

    const combinedValidate = (
      value: string,
    ): ValidationError | true | null | undefined => {
      if (customValidation) {
        const customResult = customValidation(value);
        if (typeof customResult === "string") {
          return customResult;
        }
        if (customResult === false) {
          return "Validation failed";
        }
      }
      return validate?.(value) ?? true;
    };

    const { classNames: propClassNames, ...restProps } = props;

    const getVariantStyles = (): string => {
      switch (variant) {
        case "bordered":
          return [
            "border-1",
            "bg-white",
            "dark:bg-background",
            "data-[hover=true]:border-outline",
            "group-data-[focus=true]:border-outline",
            "group-data-[focus=true]:bg-content1",
            "h-12",
          ].join(" ");

        case "flat":
          return [
            "border-none",
            "bg-default-100",
            "dark:bg-default-50",
            "data-[hover=true]:bg-content1-300-200",
            "group-data-[focus=true]:bg-default-100",
            "h-12",
          ].join(" ");

        case "faded":
          return [
            "border-1",
            "border-transparent",
            "bg-default-100",
            "dark:bg-default-50",
            "data-[hover=true]:bg-content1-300-200",
            "group-data-[focus=true]:border-outline",
            "h-12",
          ].join(" ");

        case "underlined":
          return [
            "relative",
            "border-b-1",
            "rounded-none",
            "bg-transparent",
            "border-border",
            // Underline effect
            "after:bg-outline",
            // Hover
            "data-[hover=true]:after:scale-x-100",
            "data-[hover=true]:after:bg-outline",
            // Focus
            "group-data-[focus=true]:after:scale-x-100",
            "group-data-[focus=true]:after:bg-outline",
          ].join(" ");

        default:
          return [
            "border-1",
            "bg-white",
            "dark:bg-background",
            "data-[hover=true]:border-outline",
            "group-data-[focus=true]:border-outline",
            "h-12",
          ].join(" ");
      }
    };

    return (
      <div className={mergeTailwindClasses("w-full", containerClasses)}>
        <TextareaRoot
          ref={ref}
          variant={variant}
          color={color}
          size={size}
          radius={radius}
          labelPlacement={labelPlacement}
          fullWidth={fullWidth}
          isRequired={isRequired}
          isReadOnly={isReadOnly}
          isDisabled={isDisabled}
          validate={combinedValidate}
          style={combinedStyle}
          classNames={{
            ...propClassNames,
            inputWrapper: mergeTailwindClasses(
              getVariantStyles(),
              propClassNames?.inputWrapper,
            ),
            input: mergeTailwindClasses("text-base", propClassNames?.input),
          }}
          {...restProps}
        />
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
