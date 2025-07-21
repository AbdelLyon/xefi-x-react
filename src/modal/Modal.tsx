import type { JSX } from "react";
import { forwardRef, useState, useCallback } from "react";
import type { ButtonProps, ModalProps as ModalPropsRoot } from "@heroui/react";
import {
  Modal as ModalRoot,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
} from "@heroui/react";

import { mergeTailwindClasses } from "@/utils";

type Backdrop = ModalPropsRoot["backdrop"];

interface ModalClassNames {
  wrapper?: string;
  base?: string;
  backdrop?: string;
  header?: string;
  body?: string;
  footer?: string;
  closeButton?: string;
}

interface ModalBaseProps {
  trigger?: React.ReactNode;
  title?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  classNames?: ModalClassNames;
  onOpenChange?: (isOpen: boolean) => void;
  defaultBackdrop?: Backdrop;
}

interface ModalButtonProps {
  onAction?: () => void | Promise<void>;
  buttonCloseLabel?: string;
  buttonActionLabel?: string;
  buttonCloseProps?: ButtonProps;
  buttonActionProps?: ButtonProps;
}

export type ModalProps = Omit<Partial<ModalPropsRoot>, keyof ModalBaseProps> &
  ModalBaseProps &
  ModalButtonProps;

const defaultClassNames = {
  closeButton: "absolute right-4 top-4",
  base: "bg-background border border-border shadow-lg dark:shadow-none rounded-lg",
  header: "flex flex-col gap-1",
  footer: "flex justify-end gap-2",
} as const;

const defaultButtonProps = {
  color: "primary" as const,
  radius: "sm" as const,
} as const;

const isValidButtonLabel = (label: unknown): label is string =>
  typeof label === "string" && label.length > 0;

interface ModalButtonsProps extends ModalButtonProps {
  onClose: () => void;
}

const ModalButtons = ({
  buttonCloseLabel = "Close",
  buttonActionLabel,
  buttonCloseProps,
  buttonActionProps,
  onAction,
  onClose,
}: ModalButtonsProps): JSX.Element => {
  const handleAction = async (): Promise<void> => {
    try {
      await onAction?.();
      onClose();
    } catch (error) {
      console.error("Modal action failed:", error);
    }
  };

  const hasValidCloseLabel = isValidButtonLabel(buttonCloseLabel);
  const hasValidActionButton =
    isValidButtonLabel(buttonActionLabel) && onAction !== undefined;

  return (
    <>
      {hasValidCloseLabel && (
        <Button
          className={mergeTailwindClasses(
            "border-primary/50",
            buttonCloseProps?.className,
          )}
          variant={buttonCloseProps?.variant ?? "bordered"}
          onPress={onClose}
          {...defaultButtonProps}
          {...buttonCloseProps}
        >
          {buttonCloseLabel}
        </Button>
      )}

      {hasValidActionButton && (
        <Button
          onPress={handleAction}
          {...defaultButtonProps}
          {...buttonActionProps}
        >
          {buttonActionLabel}
        </Button>
      )}
    </>
  );
};

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      trigger,
      title,
      footer,
      children,
      onAction,
      buttonCloseLabel,
      buttonActionLabel,
      buttonCloseProps,
      buttonActionProps,
      defaultBackdrop = "opaque",
      onOpenChange,
      classNames,
      ...props
    },
    ref,
  ): JSX.Element => {
    const { isOpen, onOpen, onClose } = useDisclosure({
      onChange: onOpenChange,
    });
    const [backdrop, setBackdrop] = useState<Backdrop>(defaultBackdrop);

    const handleOpen = useCallback(
      (backdropType: Backdrop = defaultBackdrop): void => {
        setBackdrop(backdropType);
        onOpen();
      },
      [defaultBackdrop, onOpen],
    );

    const modalClassNames = {
      closeButton: mergeTailwindClasses(
        defaultClassNames.closeButton,
        classNames?.closeButton,
      ),
      base: mergeTailwindClasses(defaultClassNames.base, classNames?.base),
      header: mergeTailwindClasses(
        defaultClassNames.header,
        classNames?.header,
      ),
      body: mergeTailwindClasses(classNames?.body),
      footer: mergeTailwindClasses(
        defaultClassNames.footer,
        classNames?.footer,
      ),
      backdrop: mergeTailwindClasses(classNames?.backdrop),
    };

    return (
      <>
        {trigger ? (
          <div onClick={(): void => handleOpen()}>{trigger}</div>
        ) : null}

        <ModalRoot
          ref={ref}
          backdrop={backdrop}
          classNames={modalClassNames}
          isOpen={isOpen}
          onClose={onClose}
          {...props}
        >
          <ModalContent>
            {(): JSX.Element => (
              <>
                {title !== undefined && (
                  <ModalHeader className={modalClassNames.header}>
                    {title}
                  </ModalHeader>
                )}
                <ModalBody className={modalClassNames.body}>
                  {children}
                </ModalBody>
                <ModalFooter className={modalClassNames.footer}>
                  {footer !== undefined ? (
                    footer
                  ) : (
                    <ModalButtons
                      buttonCloseLabel={buttonCloseLabel}
                      buttonActionLabel={buttonActionLabel}
                      buttonCloseProps={buttonCloseProps}
                      buttonActionProps={buttonActionProps}
                      onAction={onAction}
                      onClose={onClose}
                    />
                  )}
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </ModalRoot>
      </>
    );
  },
);

Modal.displayName = "Modal";
