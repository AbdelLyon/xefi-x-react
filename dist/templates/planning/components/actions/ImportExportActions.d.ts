interface ImportExportActionsProps {
    formats?: string[];
    onImport?: (file: File) => void | Promise<void>;
    onExport?: (format: string) => void | Promise<void>;
    disabled?: boolean;
    className?: string;
}
export declare const ImportExportActions: React.FC<ImportExportActionsProps>;
export {};
