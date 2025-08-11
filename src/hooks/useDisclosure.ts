import { useId } from "react";
import { useCallbackRef } from "./useCallbackRef";
import { chainCallbacks } from "@/utils";
import { useControlledState } from "./useControlledState";

export interface UseDisclosureProps {
  isOpen?: boolean;
  defaultOpen?: boolean;
  onClose?(): void;
  onOpen?(): void;
  onChange?(isOpen: boolean): void;
  id?: string;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
}

interface DisclosureProps extends React.HTMLAttributes<HTMLElement> {
  hidden?: boolean;
  id?: string;
}

interface UseDisclosureReturn {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onOpenChange: () => void;
  isControlled: boolean;
  getButtonProps: (props?: ButtonProps) => ButtonProps;
  getDisclosureProps: (props?: DisclosureProps) => DisclosureProps;
}

export const useDisclosure = (
  props: UseDisclosureProps = {},
): UseDisclosureReturn => {
  const {
    id: idProp,
    defaultOpen = false,
    isOpen: isOpenProp,
    onClose: onCloseProp,
    onOpen: onOpenProp,
    onChange,
  } = props;

  const onOpenPropCallbackRef = useCallbackRef(onOpenProp);
  const onClosePropCallbackRef = useCallbackRef(onCloseProp);

  const [isOpen, setIsOpen] = useControlledState(
    isOpenProp,
    defaultOpen,
    onChange ?? ((): void => {}),
  );

  const reactId = useId();
  const id = idProp ?? reactId;
  const isControlled = isOpenProp !== undefined;

  const onClose = (): void => {
    if (!isControlled) {
      setIsOpen(false);
    }
    onClosePropCallbackRef?.();
  };

  const onOpen = (): void => {
    if (!isControlled) {
      setIsOpen(true);
    }
    onOpenPropCallbackRef?.();
  };

  const onOpenChange = (): void => {
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  };

  const getButtonProps = (props: ButtonProps = {}): ButtonProps => ({
    ...props,
    "aria-expanded": isOpen,
    "aria-controls": id,
    onClick: chainCallbacks(props.onClick, onOpenChange),
  });

  const getDisclosureProps = (
    props: DisclosureProps = {},
  ): DisclosureProps => ({
    ...props,
    hidden: !isOpen,
    id,
  });

  return {
    isOpen,
    onOpen,
    onClose,
    onOpenChange,
    isControlled,
    getButtonProps,
    getDisclosureProps,
  };
};

export type { UseDisclosureReturn };
