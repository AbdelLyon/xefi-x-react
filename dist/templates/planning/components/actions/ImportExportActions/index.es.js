var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { IconFile, IconUpload, IconDownload, IconFileText, IconTable } from "@tabler/icons-react";
import { useState, useRef, useCallback } from "react";
import { Button } from "../../../../../button/Button/index.es.js";
import { Modal } from "../../../../../modal/Modal/index.es.js";
import { Dropdown } from "../../../../../dropdown/Dropdown/index.es.js";
const formatIcons = {
  excel: /* @__PURE__ */ jsx(IconTable, { className: "size-4" }),
  csv: /* @__PURE__ */ jsx(IconFileText, { className: "size-4" }),
  pdf: /* @__PURE__ */ jsx(IconFile, { className: "size-4" }),
  json: /* @__PURE__ */ jsx(IconFile, { className: "size-4" })
};
const formatLabels = {
  excel: "Excel (.xlsx)",
  csv: "CSV (.csv)",
  pdf: "PDF (.pdf)",
  json: "JSON (.json)"
};
const ImportExportActions = ({
  formats = ["excel", "csv", "pdf"],
  onImport,
  onExport,
  disabled = false,
  className = ""
}) => {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const handleImport = useCallback(
    (file) => __async(null, null, function* () {
      if (!onImport) {
        return;
      }
      try {
        yield onImport(file);
        setIsImportModalOpen(false);
      } catch (error) {
        console.error("Import error:", error);
      }
    }),
    [onImport]
  );
  const handleFileSelect = useCallback(
    (event) => {
      var _a;
      const file = (_a = event.target.files) == null ? void 0 : _a[0];
      if (file) {
        void handleImport(file);
      }
    },
    [handleImport]
  );
  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();
      setIsDragging(false);
      const file = event.dataTransfer.files[0];
      if (file) {
        void handleImport(file);
      }
    },
    [handleImport]
  );
  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    setIsDragging(true);
  }, []);
  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);
  const handleExport = useCallback(
    (format) => __async(null, null, function* () {
      if (!onExport) {
        return;
      }
      try {
        yield onExport(format);
      } catch (error) {
        console.error("Export error:", error);
      }
    }),
    [onExport]
  );
  const exportDropdownItems = formats.map((format) => ({
    key: format,
    label: formatLabels[format] || format.toUpperCase(),
    startContent: formatIcons[format] || /* @__PURE__ */ jsx(IconFile, { className: "size-4" }),
    onClick: () => handleExport(format)
  }));
  return /* @__PURE__ */ jsxs("div", { className: `flex items-center gap-2 ${className}`, children: [
    onImport && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "light",
          size: "sm",
          leftIcon: /* @__PURE__ */ jsx(IconUpload, { className: "size-4" }),
          onClick: () => setIsImportModalOpen(true),
          isDisabled: disabled,
          className: "hover:bg-default-100",
          children: "Importer"
        }
      ),
      /* @__PURE__ */ jsx(
        Modal,
        {
          isOpen: isImportModalOpen,
          onClose: () => setIsImportModalOpen(false),
          title: "Importer des données",
          size: "md",
          children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: `rounded-lg border-2 border-dashed p-8 text-center transition-colors ${isDragging ? "border-primary bg-primary/5" : "border-default-300 hover:border-primary/50"}`,
                onDrop: handleDrop,
                onDragOver: handleDragOver,
                onDragLeave: handleDragLeave,
                children: [
                  /* @__PURE__ */ jsx(IconUpload, { className: "mx-auto mb-4 size-12 text-default-400" }),
                  /* @__PURE__ */ jsx("p", { className: "mb-2 text-sm font-medium", children: "Glissez-déposez votre fichier ici" }),
                  /* @__PURE__ */ jsx("p", { className: "mb-4 text-xs text-default-500", children: "ou cliquez pour parcourir" }),
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      variant: "bordered",
                      size: "sm",
                      onClick: () => {
                        var _a;
                        return (_a = fileInputRef.current) == null ? void 0 : _a.click();
                      },
                      children: "Parcourir les fichiers"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      ref: fileInputRef,
                      type: "file",
                      onChange: handleFileSelect,
                      accept: formats.map((f) => `.${f}`).join(","),
                      className: "hidden"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxs("p", { className: "mt-4 text-xs text-default-500", children: [
              "Formats supportés:",
              " ",
              formats.map((f) => formatLabels[f] || f.toUpperCase()).join(", ")
            ] })
          ] })
        }
      )
    ] }),
    onExport && formats.length > 0 && /* @__PURE__ */ jsx(
      Dropdown,
      {
        trigger: /* @__PURE__ */ jsx(
          Button,
          {
            variant: "light",
            size: "sm",
            leftIcon: /* @__PURE__ */ jsx(IconDownload, { className: "size-4" }),
            isDisabled: disabled,
            className: "hover:bg-default-100",
            children: "Exporter"
          }
        ),
        sections: [
          {
            key: "export",
            label: "Exporter",
            items: exportDropdownItems
          }
        ]
      }
    )
  ] });
};
export {
  ImportExportActions
};
