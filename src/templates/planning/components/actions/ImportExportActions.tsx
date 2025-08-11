"use client"

import { Button } from "@/button"
import type { DropdownItemConfig } from "@/dropdown"
import { Dropdown } from "@/dropdown"
import {
  IconDownload,
  IconUpload,
  IconFile,
  IconFileText,
  IconTable,
} from "@tabler/icons-react"
import { Modal } from "@/modal"
import { useCallback, useRef, useState } from "react"

interface ImportExportActionsProps {
  formats?: string[]
  onImport?: (file: File) => void | Promise<void>
  onExport?: (format: string) => void | Promise<void>
  disabled?: boolean
  className?: string
}

const formatIcons: Record<string, React.ReactNode> = {
  excel: <IconTable className="size-4" />,
  csv: <IconFileText className="size-4" />,
  pdf: <IconFile className="size-4" />,
  json: <IconFile className="size-4" />,
}

const formatLabels: Record<string, string> = {
  excel: "Excel (.xlsx)",
  csv: "CSV (.csv)",
  pdf: "PDF (.pdf)",
  json: "JSON (.json)",
}

export const ImportExportActions: React.FC<ImportExportActionsProps> = ({
  formats = ["excel", "csv", "pdf"],
  onImport,
  onExport,
  disabled = false,
  className = "",
}) => {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImport = useCallback(
    async (file: File) => {
      if (!onImport) {
        return
      }

      try {
        await onImport(file)
        setIsImportModalOpen(false)
      } catch (error) {
        console.error("Import error:", error)
      }
    },
    [onImport]
  )

  const handleFileSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file) {
        void handleImport(file)
      }
    },
    [handleImport]
  )

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()
      setIsDragging(false)

      const file = event.dataTransfer.files[0]
      if (file) {
        void handleImport(file)
      }
    },
    [handleImport]
  )

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleExport = useCallback(
    async (format: string) => {
      if (!onExport) {
        return
      }

      try {
        await onExport(format)
      } catch (error) {
        console.error("Export error:", error)
      }
    },
    [onExport]
  )

  const exportDropdownItems: DropdownItemConfig[] = formats.map((format) => ({
    key: format,
    label: formatLabels[format] || format.toUpperCase(),
    startContent: formatIcons[format] || <IconFile className="size-4" />,
    onClick: () => handleExport(format),
  }))

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Import button */}
      {onImport && (
        <>
          <Button
            variant="light"
            size="sm"
            leftIcon={<IconUpload className="size-4" />}
            onClick={() => setIsImportModalOpen(true)}
            isDisabled={disabled}
            className="hover:bg-default-100"
          >
            Importer
          </Button>

          {/* Import Modal */}
          <Modal
            isOpen={isImportModalOpen}
            onClose={() => setIsImportModalOpen(false)}
            title="Importer des données"
            size="md"
          >
            <div className="p-6">
              <div
                className={`rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
                  isDragging
                    ? "border-primary bg-primary/5"
                    : "border-default-300 hover:border-primary/50"
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <IconUpload className="mx-auto mb-4 size-12 text-default-400" />
                <p className="mb-2 text-sm font-medium">
                  Glissez-déposez votre fichier ici
                </p>
                <p className="mb-4 text-xs text-default-500">
                  ou cliquez pour parcourir
                </p>
                <Button
                  variant="bordered"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Parcourir les fichiers
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileSelect}
                  accept={formats.map((f) => `.${f}`).join(",")}
                  className="hidden"
                />
              </div>
              <p className="mt-4 text-xs text-default-500">
                Formats supportés:{" "}
                {formats
                  .map((f) => formatLabels[f] || f.toUpperCase())
                  .join(", ")}
              </p>
            </div>
          </Modal>
        </>
      )}

      {/* Export dropdown */}
      {onExport && formats.length > 0 && (
        <Dropdown
          trigger={
            <Button
              variant="light"
              size="sm"
              leftIcon={<IconDownload className="size-4" />}
              isDisabled={disabled}
              className="hover:bg-default-100"
            >
              Exporter
            </Button>
          }
          sections={[
            {
              key: "export",
              label: "Exporter",

              items: exportDropdownItems,
            },
          ]}
        />
      )}
    </div>
  )
}
