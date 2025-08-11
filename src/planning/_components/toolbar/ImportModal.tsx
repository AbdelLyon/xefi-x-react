"use client";

import { Modal } from "@xefi/x-react/modal";
import { Formik } from "formik";
import React from "react";

import { FileUploader } from "@/components/FileUploader";

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

export const ImportModal: React.FC<ImportModalProps> = ({
  isOpen,
  onClose,
  selectedFile,
  onImport,
  isImporting,
  files,
  setFiles,
  handleRemoveFile,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Importer vos congés"
      buttonCloseLabel="Annuler"
      buttonActionLabel={isImporting ? "Importation..." : "Importer"}
      onAction={onImport}
      buttonActionProps={{
        isDisabled: !selectedFile || isImporting,
      }}
    >
      <div className="space-y-4">
        <p className="text-sm text-foreground-600">
          Sélectionner un fichier CSV, XLS ou XLSX
        </p>

        <Formik
          initialValues={{ files: [] }}
          onSubmit={() => {}}
        >
          <FileUploader
            name="files"
            authorizedFiles={{
              "text/csv": [".csv"],
              "application/vnd.ms-excel": [".xls"],
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
            }}
            maxSizeMessage="Formats acceptés: CSV, XLS, XLSX"
            isMultiple={false}
            files={files}
            setFiles={setFiles}
            handleRemoveFile={handleRemoveFile}
          />
        </Formik>
      </div>
    </Modal>
  );
};
