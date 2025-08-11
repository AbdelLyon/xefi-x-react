import { default as React } from 'react';
interface ImportModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedFile: File | null;
    onImport: () => void;
    isImporting: boolean;
    files: File[];
    setFiles: (files: File[]) => void;
    handleRemoveFile: (file: File) => void;
}
export declare const ImportModal: React.FC<ImportModalProps>;
export {};
