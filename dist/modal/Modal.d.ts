import { ButtonProps, ModalProps as ModalPropsRoot } from '@heroui/react';
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
export type ModalProps = Omit<Partial<ModalPropsRoot>, keyof ModalBaseProps> & ModalBaseProps & ModalButtonProps;
export declare const Modal: import('react').ForwardRefExoticComponent<Omit<ModalProps, "ref"> & import('react').RefAttributes<HTMLDivElement>>;
export {};
