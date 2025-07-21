import type { JSX } from "react";
import type { ButtonGroupProps } from "@heroui/react";
import { ButtonGroup } from "@heroui/react";
import type { ButtonProps } from "@/button/Button";
import { Button } from "@/button/Button";

export interface ButtonsProps extends ButtonGroupProps {
  buttons: Array<{
    key: string | number;
    label: React.ReactNode;
    buttonProps?: ButtonProps;
  }>;
}

export const Buttons = ({ buttons, ...props }: ButtonsProps): JSX.Element => {
  return (
    <ButtonGroup {...props}>
      {buttons.map(
        ({ key, label, buttonProps }): JSX.Element => (
          <Button key={key} {...buttonProps}>
            {label}
          </Button>
        ),
      )}
    </ButtonGroup>
  );
};
