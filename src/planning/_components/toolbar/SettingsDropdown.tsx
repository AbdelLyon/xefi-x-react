"use client";

import { Dropdown, DropdownSectionConfig } from "@xefi/x-react/dropdown";
import {
  IconDotsVertical,
  IconDownload,
  IconFileExport,
  IconUpload,
} from "@xefi/x-react/icons";
import React from "react";

interface SettingsDropdownProps {
  onDownloadModel: () => void;
  onOpenImportModal: () => void;
  onOpenExportModal: () => void;
}

export const SettingsDropdown: React.FC<SettingsDropdownProps> = ({
  onDownloadModel,
  onOpenImportModal,
  onOpenExportModal,
}) => {
  const dropdownSections: DropdownSectionConfig[] = [
    {
      key: "actions",
      showDivider: false,
      items: [
        {
          key: "downloadModel",
          label: "Télécharger un modèle",
          startContent: <IconDownload size={20} />,
          onClick: onDownloadModel,
        },
        {
          key: "import",
          label: "Importer",
          startContent: <IconUpload size={20} />,
          onClick: onOpenImportModal,
        },
        {
          key: "export",
          label: "Exporter",
          startContent: <IconFileExport size={20} />,
          onClick: onOpenExportModal,
        },
      ],
    },
  ];

  return (
    <Dropdown
      sections={dropdownSections}
      trigger={<IconDotsVertical className="cursor-pointer" />}
    />
  );
};
