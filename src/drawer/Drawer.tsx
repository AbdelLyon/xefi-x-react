import type { JSX, ReactNode } from "react";
import {
  Drawer as DrawerRoot,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  type DrawerProps as DrawerRootProps,
} from "@heroui/react";
import { mergeTailwindClasses } from "@/utils";
import { Button, type ButtonProps } from "@/button";
import { useDisclosure } from "@/hooks";

interface DrawerClassNames {
  wrapper?: string;
  base?: string;
  backdrop?: string;
  closeButton?: string;
  header?: string;
  body?: string;
  footer?: string;
}

interface AdditionalDrawerProps {
  trigger?: ReactNode;
  title?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  buttonCloseLabel?: string;
  buttonActionLabel?: string;
  onAction?: () => void | Promise<void>;
  buttonCloseProps?: ButtonProps;
  buttonActionProps?: ButtonProps;
  classNames?: DrawerClassNames;
}

export type DrawerProps = Omit<DrawerRootProps, keyof AdditionalDrawerProps> &
  AdditionalDrawerProps;

const isValidButtonLabel = (label: unknown): label is string =>
  typeof label === "string" && label.length > 0;

export const Drawer = ({
  trigger,
  title,
  children,
  footer,
  buttonCloseLabel = "Close",
  buttonActionLabel,
  onAction,
  buttonCloseProps,
  buttonActionProps,
  classNames = {},
  ...props
}: DrawerProps): JSX.Element => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  const handleAction = async (): Promise<void> => {
    try {
      await onAction?.();
      onClose();
    } catch (error) {
      console.error("Action failed:", error);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpen();
    }
  };

  const renderButtons = (): ReactNode => {
    const hasValidCloseLabel = isValidButtonLabel(buttonCloseLabel);
    const hasValidActionButton =
      isValidButtonLabel(buttonActionLabel) && onAction !== undefined;

    const defaultButtonProps = {
      color: "primary" as const,
      radius: "sm" as const,
    };

    return (
      <div className="flex justify-end gap-2">
        {hasValidCloseLabel && (
          <Button
            {...defaultButtonProps}
            variant="bordered"
            onClick={onClose}
            className={mergeTailwindClasses(
              "border-primary/50",
              buttonCloseProps?.className,
            )}
            {...buttonCloseProps}
          >
            {buttonCloseLabel}
          </Button>
        )}

        {hasValidActionButton && (
          <Button
            {...defaultButtonProps}
            onClick={handleAction}
            {...buttonActionProps}
          >
            {buttonActionLabel}
          </Button>
        )}
      </div>
    );
  };

  const drawerClassNames = {
    wrapper: mergeTailwindClasses(classNames.wrapper),
    base: mergeTailwindClasses("bg-background rounded-none", classNames.base),
    backdrop: mergeTailwindClasses(classNames.backdrop),
    closeButton: mergeTailwindClasses(
      "absolute right-4 top-4",
      classNames.closeButton,
    ),
    header: mergeTailwindClasses(classNames.header),
    body: mergeTailwindClasses(classNames.body),
    footer: mergeTailwindClasses(classNames.footer),
  };

  return (
    <>
      {trigger ? (
        <div
          role="button"
          tabIndex={0}
          onClick={onOpen}
          onKeyDown={handleKeyDown}
          className="inline-block"
        >
          {trigger}
        </div>
      ) : null}

      <DrawerRoot
        isOpen={isOpen}
        onClose={onClose}
        classNames={drawerClassNames}
        {...props}
      >
        <DrawerContent>
          {(): JSX.Element => (
            <>
              {title !== undefined && (
                <DrawerHeader className={drawerClassNames.header}>
                  {title}
                </DrawerHeader>
              )}

              <DrawerBody className={drawerClassNames.body}>
                {children}
              </DrawerBody>

              <DrawerFooter className={drawerClassNames.footer}>
                {footer !== undefined ? footer : renderButtons()}
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </DrawerRoot>
    </>
  );
};
