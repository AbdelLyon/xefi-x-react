import { ViewMode } from '../../types/planning.types';
interface ViewModeSelectorProps {
    value: string;
    options: {
        key: string;
        label: string;
        disabled?: boolean;
    }[];
    onChange?: ((mode: ViewMode) => void) | undefined;
    disabled?: boolean;
    className?: string;
}
export declare const ViewModeSelector: React.FC<ViewModeSelectorProps>;
export {};
