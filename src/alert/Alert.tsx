import type { JSX } from "react";
import { forwardRef } from "react";
import type { ButtonProps, AlertProps } from "@heroui/react";
import { Alert as AlertRoot } from "@heroui/react";

interface Props extends AlertProps {
  closeButtonProps?: ButtonProps;
  onVisibleChange?: (isVisible: boolean) => void;
  onClose?: () => void;
}

export const Alert = forwardRef<HTMLDivElement, Props>(
  (
    {
      onVisibleChange,
      onClose,
      isVisible = true,
      isClosable = false,
      ...otherProps
    },
    ref,
  ): JSX.Element | null => {
    const handleVisibilityChange = (visible: boolean): void => {
      onVisibleChange?.(visible);
    };

    const handleClose = (): void => {
      onClose?.();
      handleVisibilityChange(false);
    };

    if (!isVisible) {
      return null;
    }

    return (
      <AlertRoot
        {...otherProps}
        ref={ref}
        isClosable={isClosable}
        onVisibleChange={handleVisibilityChange}
        onClose={handleClose}
      />
    );
  },
);

Alert.displayName = "Alert";
