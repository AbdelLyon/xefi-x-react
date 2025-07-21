import { ButtonProps, AlertProps } from '@heroui/react';
interface Props extends AlertProps {
    closeButtonProps?: ButtonProps;
    onVisibleChange?: (isVisible: boolean) => void;
    onClose?: () => void;
}
export declare const Alert: import('react').ForwardRefExoticComponent<Omit<Props, "ref"> & import('react').RefAttributes<HTMLDivElement>>;
export {};
