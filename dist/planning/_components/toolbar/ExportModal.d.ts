import { default as React } from 'react';
interface ExportModalProps {
    isOpen: boolean;
    onClose: () => void;
    exportFileName: string;
    onFileNameChange: (value: string) => void;
    onExport: () => void;
    isExporting: boolean;
}
export declare const ExportModal: React.FC<ExportModalProps>;
export {};
