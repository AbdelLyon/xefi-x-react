"use client";

import { Modal } from "@xefi/x-react/modal";
import React from "react";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  exportFileName: string;
  onFileNameChange: (value: string) => void;
  onExport: () => void;
  isExporting: boolean;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  exportFileName,
  onFileNameChange,
  onExport,
  isExporting,
}) => {
  return (
    <Modal
      trigger={null}
      isOpen={isOpen}
      onClose={onClose}
      title="Exporter les absences"
      buttonCloseLabel="Annuler"
      buttonActionLabel={isExporting ? "Export..." : "Exporter"}
      onAction={onExport}
      buttonActionProps={{
        isDisabled: isExporting,
      }}
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground-700">
            Nom du fichier (optionnel)
          </label>
          <input
            type="text"
            value={exportFileName}
            onChange={(e) => onFileNameChange(e.target.value)}
            placeholder="export-absences"
            className="w-full rounded-lg border border-border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <p className="text-sm text-foreground-500">
          Le fichier sera exporté au format CSV avec la date du jour.
        </p>
      </div>
    </Modal>
  );
};
