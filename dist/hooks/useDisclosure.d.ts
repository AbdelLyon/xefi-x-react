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
export declare const useDisclosure: (props?: UseDisclosureProps) => UseDisclosureReturn;
export type { UseDisclosureReturn };
