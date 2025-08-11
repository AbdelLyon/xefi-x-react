interface ViewModeSelectorProps {
    value: string;
    options: Array<{
        key: string;
        label: string;
        disabled?: boolean;
    }>;
    onChange?: (mode: string) => void;
    disabled?: boolean;
    className?: string;
}
export declare const ViewModeSelector: React.FC<ViewModeSelectorProps>;
export {};
