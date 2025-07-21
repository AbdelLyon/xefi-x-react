import type { JSX, ReactNode } from "react";
import type { TooltipProps as TooltipPropsRoot } from "@heroui/react";
import { Tooltip as TooltipRoot } from "@heroui/react";

interface TooltipProps
  extends Omit<TooltipPropsRoot, "content" | "children" | "trigger"> {
  trigger: ReactNode;
  content: ReactNode;
}

export const Tooltip = ({
  trigger,
  content,
  size = "md",
  color = "default",
  radius = "sm",
  shadow = "sm",
  placement = "top",
  delay = 0,
  closeDelay = 500,
  offset = 7,
  containerPadding = 12,
  crossOffset = 0,
  showArrow = false,
  shouldFlip = true,
  triggerScaleOnOpen = true,
  isKeyboardDismissDisabled = false,
  isDismissable = false,
  shouldCloseOnBlur = true,
  isDisabled = false,
  disableAnimation = false,
  ...props
}: TooltipProps): JSX.Element => {
  return (
    <TooltipRoot
      content={content}
      size={size}
      color={color}
      radius={radius}
      shadow={shadow}
      placement={placement}
      delay={delay}
      closeDelay={closeDelay}
      offset={offset}
      containerPadding={containerPadding}
      crossOffset={crossOffset}
      showArrow={showArrow}
      shouldFlip={shouldFlip}
      triggerScaleOnOpen={triggerScaleOnOpen}
      isKeyboardDismissDisabled={isKeyboardDismissDisabled}
      isDismissable={isDismissable}
      shouldCloseOnBlur={shouldCloseOnBlur}
      isDisabled={isDisabled}
      disableAnimation={disableAnimation}
      {...props}
    >
      {trigger}
    </TooltipRoot>
  );
};
