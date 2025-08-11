import { default as React } from 'react';
import { ViewMode } from '../../../store/usePlanningStore';
interface ViewModeSelectorProps {
    viewMode: ViewMode;
    onViewModeChange: (mode: ViewMode) => void;
}
export declare const ViewModeSelector: React.FC<ViewModeSelectorProps>;
export {};
