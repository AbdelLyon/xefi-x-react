import type { JSX } from "react";
import { forwardRef, useState } from "react";
import type { InputProps as InputRootProps } from "@heroui/react";
import { Input as InputRoot } from "@heroui/react";
import { mergeTailwindClasses } from "@/utils";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

type ValidationError = string | string[];

type InputProps = InputRootProps & {
  containerClasses?: string;
  customValidation?: (value: string) => boolean | string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = "bordered",
      color = "default",
      size = "md",
      radius = "md",
      labelPlacement = "inside",
      fullWidth = true,
      customValidation,
      validate,
      type,
      ...props
    },
    ref,
  ): JSX.Element => {
    const [inputType, setInputType] = useState(type);

    const combinedValidate = (
      value: string,
    ): ValidationError | true | null | undefined => {
      if (customValidation) {
        const customResult = customValidation(value);
        if (typeof customResult === "string") {
          return customResult;
        }
        if (customResult) {
          return "Validation failed";
        }
      }
      return validate?.(value) ?? true;
    };

    const endContent =
      type === "password" ? (
        <button
          className="opacity-40 focus:outline-none"
          type="button"
          onClick={(): void =>
            setInputType(inputType === "password" ? "text" : "password")
          }
        >
          {inputType === "password" ? (
            <IconEye className="pointer-events-none" />
          ) : (
            <IconEyeOff className="pointer-events-none" />
          )}
        </button>
      ) : undefined;

    const { classNames: propClassNames, ...restProps } = props;

    const getVariantStyles = (): string => {
      switch (variant) {
        case "bordered":
          return [
            "border-1",
            "bg-white",
            "dark:bg-background",
            "border-border",
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
            "h-12",

            "after:bg-outline",
            "data-[hover=true]:after:scale-x-100",
            "data-[hover=true]:after:bg-outline",
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
      <InputRoot
        ref={ref}
        variant={variant}
        color={color}
        size={size}
        radius={radius}
        labelPlacement={labelPlacement}
        fullWidth={fullWidth}
        validate={combinedValidate}
        classNames={{
          ...propClassNames,
          inputWrapper: mergeTailwindClasses(
            getVariantStyles(),
            propClassNames?.inputWrapper,
          ),
        }}
        endContent={endContent}
        type={inputType}
        {...restProps}
      />
    );
  },
);

Input.displayName = "Input";
