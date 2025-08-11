import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ImportModal } from "../ImportModal";

vi.mock("@xefi/x-react/modal", () => ({
  Modal: vi.fn(
    ({
      isOpen,
      onClose,
      title,
      buttonCloseLabel,
      buttonActionLabel,
      onAction,
      buttonActionProps,
      children,
    }) => {
      if (!isOpen) return null;

      return (
        <div data-testid="modal">
          <div data-testid="modal-title">{title}</div>
          <div data-testid="modal-content">{children}</div>
          <div data-testid="modal-footer">
            <button onClick={onClose}>{buttonCloseLabel}</button>
            <button
              data-testid="modal-action"
              onClick={onAction}
              disabled={buttonActionProps?.isDisabled}
            >
              {buttonActionLabel}
            </button>
          </div>
        </div>
      );
    },
  ),
  IconUpload: vi.fn(({ className }) => (
    <div data-testid="icon-upload" className={className}>
      📁
    </div>
  )),
}));

vi.mock("@xefi/x-react/button", () => ({
  Button: vi.fn(({ size, variant, onClick, className, children }) => (
    <button
      data-testid="mock-button"
      onClick={onClick}
      className={className}
      data-size={size}
      data-variant={variant}
    >
      {children}
    </button>
  )),
}));

const mockFile = new File(["content"], "test.csv", { type: "text/csv" });
const mockExcelFile = new File(["content"], "test.xlsx", {
  type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
});

const defaultProps = {
  isOpen: true,
  onClose: vi.fn(),
  selectedFile: null,
  onFileChange: vi.fn(),
  onDrop: vi.fn(),
  onImport: vi.fn(),
  isImporting: false,
  dragging: false,
  onDragOver: vi.fn(),
  onDragLeave: vi.fn(),
  onRemoveFile: vi.fn(),
};

describe("ImportModal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Modal Rendering", () => {
    it("renders modal when isOpen is true", () => {
      render(<ImportModal {...defaultProps} />);

      expect(screen.getByTestId("modal")).toBeInTheDocument();
      expect(screen.getByTestId("modal-title")).toHaveTextContent(
        "Importer vos congés",
      );
    });

    it("does not render when isOpen is false", () => {
      render(<ImportModal {...defaultProps} isOpen={false} />);

      expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
    });

    it("should display modal title correctly", () => {
      render(<ImportModal {...defaultProps} />);

      expect(screen.getByTestId("modal-title")).toHaveTextContent(
        "Importer vos congés",
      );
    });

    it("should show loading state when importing", () => {
      render(<ImportModal {...defaultProps} isImporting={true} />);

      expect(screen.getByTestId("modal-action")).toHaveTextContent(
        "Importation...",
      );
    });

    it("should show normal state when not importing", () => {
      render(<ImportModal {...defaultProps} isImporting={false} />);

      expect(screen.getByTestId("modal-action")).toHaveTextContent("Importer");
    });
  });

  describe("Content Rendering", () => {
    it("should display instruction text", () => {
      render(<ImportModal {...defaultProps} />);

      expect(
        screen.getByText("Sélectionner un fichier CSV, XLS ou XLSX"),
      ).toBeInTheDocument();
    });

    it("should render upload icon", () => {
      render(<ImportModal {...defaultProps} />);

      const uploadIcon =
        screen.queryByTestId("icon-upload") || screen.getByDisplayValue("");
      const svgIcon = document.querySelector("svg.tabler-icon-upload");

      expect(uploadIcon || svgIcon).toBeTruthy();
    });

    it("renders drag and drop area", () => {
      render(<ImportModal {...defaultProps} />);

      expect(screen.getByText("Importer un fichier")).toBeInTheDocument();
      expect(screen.getByText("Déposez le fichier ici ou")).toBeInTheDocument();
      expect(screen.getByText("parcourez vos fichiers")).toBeInTheDocument();
    });

    it("should have main container with correct styling", () => {
      render(<ImportModal {...defaultProps} />);

      const container = screen
        .getByText("Sélectionner un fichier CSV, XLS ou XLSX")
        .closest(".space-y-4");
      expect(container).toHaveClass("space-y-4");
    });
  });

  describe("Drag and Drop Area", () => {
    it("shows dragging state", () => {
      render(<ImportModal {...defaultProps} dragging={true} />);

      const dropArea = document.querySelector(
        ".rounded-lg.border.border-dashed",
      );
      expect(dropArea).toHaveClass("border-primary/40", "bg-primary/40");
    });

    it("shows normal state when not dragging", () => {
      render(<ImportModal {...defaultProps} dragging={false} />);

      const dropArea = document.querySelector(
        ".rounded-lg.border.border-dashed",
      );
      expect(dropArea).toHaveClass("border-border", "bg-content1-50");
    });

    it("should have correct base classes for drop area", () => {
      render(<ImportModal {...defaultProps} />);

      const dropArea = document.querySelector(
        ".rounded-lg.border.border-dashed",
      );
      expect(dropArea).toHaveClass(
        "block",
        "cursor-pointer",
        "rounded-lg",
        "border",
        "border-dashed",
        "p-6",
        "transition-colors",
      );
    });

    it("handles drag over event", () => {
      const mockOnDragOver = vi.fn();
      render(<ImportModal {...defaultProps} onDragOver={mockOnDragOver} />);

      const dropArea = document.querySelector(
        ".rounded-lg.border.border-dashed",
      );
      fireEvent.dragOver(dropArea!);

      expect(mockOnDragOver).toHaveBeenCalled();
    });

    it("handles drag leave event", () => {
      const mockOnDragLeave = vi.fn();
      render(<ImportModal {...defaultProps} onDragLeave={mockOnDragLeave} />);

      const dropArea = document.querySelector(
        ".rounded-lg.border.border-dashed",
      );
      fireEvent.dragLeave(dropArea!);

      expect(mockOnDragLeave).toHaveBeenCalled();
    });

    it("handles drop event", () => {
      const mockOnDrop = vi.fn();
      render(<ImportModal {...defaultProps} onDrop={mockOnDrop} />);

      const dropArea = document.querySelector(
        ".rounded-lg.border.border-dashed",
      );
      fireEvent.drop(dropArea!);

      expect(mockOnDrop).toHaveBeenCalled();
    });
  });

  describe("File Input", () => {
    it("renders file input with correct attributes", () => {
      render(<ImportModal {...defaultProps} />);

      const fileInput = document.querySelector("#file-upload");
      expect(fileInput).toHaveAttribute("type", "file");
      expect(fileInput).toHaveAttribute("accept", ".csv,.xls,.xlsx");
      expect(fileInput).toHaveAttribute("id", "file-upload");
      expect(fileInput).toHaveClass("hidden");
    });

    it("calls onFileChange when file is selected", () => {
      const mockOnFileChange = vi.fn();
      render(<ImportModal {...defaultProps} onFileChange={mockOnFileChange} />);

      const fileInput = document.querySelector("#file-upload");
      fireEvent.change(fileInput!, { target: { files: [mockFile] } });

      expect(mockOnFileChange).toHaveBeenCalled();
    });

    it("should have proper label styling", () => {
      render(<ImportModal {...defaultProps} />);

      const label = screen.getByText("parcourez vos fichiers");
      expect(label).toHaveClass("text-primary");
    });

    it("should have proper label association", () => {
      render(<ImportModal {...defaultProps} />);

      const dropArea = document.querySelector("label[for='file-upload']");
      const input = document.querySelector("#file-upload");

      expect(dropArea?.tagName).toBe("LABEL");
      expect(dropArea).toHaveAttribute("for", "file-upload");
      expect(input).toHaveAttribute("id", "file-upload");
    });
  });

  describe("Selected File Display", () => {
    it("displays selected file information", () => {
      render(<ImportModal {...defaultProps} selectedFile={mockFile} />);

      expect(screen.getByText("test.csv")).toBeInTheDocument();
    });

    it("displays Excel file information correctly", () => {
      render(<ImportModal {...defaultProps} selectedFile={mockExcelFile} />);

      expect(screen.getByText("test.xlsx")).toBeInTheDocument();
    });

    it("should not display file info when no file selected", () => {
      render(<ImportModal {...defaultProps} selectedFile={null} />);

      expect(screen.queryByText("test.csv")).not.toBeInTheDocument();
    });

    it("should render file container with correct styling", () => {
      render(<ImportModal {...defaultProps} selectedFile={mockFile} />);

      const fileContainer = document.querySelector(
        ".bg-success-50.border.border-border",
      );
      expect(fileContainer).toHaveClass(
        "flex",
        "items-center",
        "justify-between",
        "rounded-lg",
        "border",
        "border-border",
        "bg-success-50",
        "p-3",
      );
    });

    it("should render filename with correct styling", () => {
      render(<ImportModal {...defaultProps} selectedFile={mockFile} />);

      const filename = screen.getByText("test.csv");
      expect(filename).toHaveClass(
        "truncate",
        "text-sm",
        "font-medium",
        "text-foreground-700",
      );
    });

    it("calls onRemoveFile when remove button is clicked", () => {
      const mockOnRemoveFile = vi.fn();
      render(
        <ImportModal
          {...defaultProps}
          selectedFile={mockFile}
          onRemoveFile={mockOnRemoveFile}
        />,
      );

      const removeButton = document.querySelector("button");
      fireEvent.click(removeButton!);

      expect(mockOnRemoveFile).toHaveBeenCalledTimes(1);
    });

    it("should handle files without extension", () => {
      const noExtFile = new File(["content"], "testfile", { type: "text/csv" });
      render(<ImportModal {...defaultProps} selectedFile={noExtFile} />);

      expect(screen.getByText("testfile")).toBeInTheDocument();
    });

    it("should handle files with multiple dots in name", () => {
      const multiDotFile = new File(["content"], "test.backup.2024.csv", {
        type: "text/csv",
      });
      render(<ImportModal {...defaultProps} selectedFile={multiDotFile} />);

      expect(screen.getByText("test.backup.2024.csv")).toBeInTheDocument();
    });
  });

  describe("Import Button State", () => {
    it("disables import button when no file selected", () => {
      render(<ImportModal {...defaultProps} selectedFile={null} />);

      const importButton = screen.getByTestId("modal-action");
      expect(importButton).toBeDisabled();
    });

    it("disables import button when importing", () => {
      render(
        <ImportModal
          {...defaultProps}
          selectedFile={mockFile}
          isImporting={true}
        />,
      );

      const importButton = screen.getByTestId("modal-action");
      expect(importButton).toBeDisabled();
    });

    it("enables import button when file is selected and not importing", () => {
      render(
        <ImportModal
          {...defaultProps}
          selectedFile={mockFile}
          isImporting={false}
        />,
      );

      const importButton = screen.getByTestId("modal-action");
      expect(importButton).not.toBeDisabled();
    });

    it("calls onImport when import button is clicked", () => {
      const mockOnImport = vi.fn();
      render(
        <ImportModal
          {...defaultProps}
          selectedFile={mockFile}
          onImport={mockOnImport}
        />,
      );

      const importButton = screen.getByTestId("modal-action");
      fireEvent.click(importButton);

      expect(mockOnImport).toHaveBeenCalledTimes(1);
    });
  });

  describe("Accessibility", () => {
    it("should have proper form structure", () => {
      render(<ImportModal {...defaultProps} />);

      const dropArea = document.querySelector("label[for='file-upload']");
      const input = document.querySelector("#file-upload");

      expect(dropArea?.tagName).toBe("LABEL");
      expect(input?.tagName).toBe("INPUT");
    });

    it("should have descriptive text for users", () => {
      render(<ImportModal {...defaultProps} />);

      expect(
        screen.getByText("Sélectionner un fichier CSV, XLS ou XLSX"),
      ).toBeInTheDocument();
      expect(screen.getByText("Déposez le fichier ici ou")).toBeInTheDocument();
    });

    it("should provide visual feedback for drag states", () => {
      const { rerender } = render(
        <ImportModal {...defaultProps} dragging={false} />,
      );

      const dropArea = document.querySelector(
        ".rounded-lg.border.border-dashed",
      );
      expect(dropArea).toHaveClass("border-border");

      rerender(<ImportModal {...defaultProps} dragging={true} />);
      expect(dropArea).toHaveClass("border-primary/40");
    });

    it("should have proper button accessibility", () => {
      render(<ImportModal {...defaultProps} selectedFile={mockFile} />);

      const removeButton = document.querySelector("button");
      expect(removeButton?.tagName).toBe("BUTTON");
    });
  });

  describe("Edge Cases", () => {
    it("should handle very large file names", () => {
      const longNameFile = new File(["content"], "a".repeat(100) + ".csv", {
        type: "text/csv",
      });
      render(<ImportModal {...defaultProps} selectedFile={longNameFile} />);

      expect(screen.getByText("a".repeat(100) + ".csv")).toBeInTheDocument();
    });

    it("should handle state changes correctly", () => {
      const { rerender } = render(
        <ImportModal {...defaultProps} isOpen={false} />,
      );

      expect(screen.queryByTestId("modal")).not.toBeInTheDocument();

      rerender(<ImportModal {...defaultProps} isOpen={true} />);
      expect(screen.getByTestId("modal")).toBeInTheDocument();
    });

    it("should handle multiple file types correctly", () => {
      const xlsFile = new File(["content"], "test.xls", {
        type: "application/vnd.ms-excel",
      });
      render(<ImportModal {...defaultProps} selectedFile={xlsFile} />);

      expect(screen.getByText("test.xls")).toBeInTheDocument();
    });

    it("should handle rapid state changes", () => {
      const { rerender } = render(
        <ImportModal {...defaultProps} dragging={false} />,
      );

      for (let i = 0; i < 5; i++) {
        rerender(<ImportModal {...defaultProps} dragging={i % 2 === 0} />);
      }

      expect(screen.getByText("Importer un fichier")).toBeInTheDocument();
    });
  });

  describe("User Interaction Workflows", () => {
    it("should handle complete file selection workflow", async () => {
      const user = userEvent.setup();
      const mockOnFileChange = vi.fn();
      const mockOnImport = vi.fn();

      const { rerender } = render(
        <ImportModal
          {...defaultProps}
          onFileChange={mockOnFileChange}
          onImport={mockOnImport}
          selectedFile={null}
        />,
      );

      expect(screen.getByTestId("modal-action")).toBeDisabled();

      rerender(
        <ImportModal
          {...defaultProps}
          onFileChange={mockOnFileChange}
          onImport={mockOnImport}
          selectedFile={mockFile}
        />,
      );

      const importButton = screen.getByTestId("modal-action");
      expect(importButton).not.toBeDisabled();

      await user.click(importButton);
      expect(mockOnImport).toHaveBeenCalledTimes(1);
    });

    it("should handle file removal workflow", async () => {
      const user = userEvent.setup();
      const mockOnRemoveFile = vi.fn();

      render(
        <ImportModal
          {...defaultProps}
          selectedFile={mockFile}
          onRemoveFile={mockOnRemoveFile}
        />,
      );

      const removeButton = document.querySelector("button");
      await user.click(removeButton!);

      expect(mockOnRemoveFile).toHaveBeenCalledTimes(1);
    });

    it("should handle drag and drop workflow", () => {
      const mockOnDragOver = vi.fn();
      const mockOnDragLeave = vi.fn();
      const mockOnDrop = vi.fn();

      render(
        <ImportModal
          {...defaultProps}
          onDragOver={mockOnDragOver}
          onDragLeave={mockOnDragLeave}
          onDrop={mockOnDrop}
        />,
      );

      const dropArea = document.querySelector(
        ".rounded-lg.border.border-dashed",
      );

      fireEvent.dragOver(dropArea!);
      expect(mockOnDragOver).toHaveBeenCalled();

      fireEvent.dragLeave(dropArea!);
      expect(mockOnDragLeave).toHaveBeenCalled();

      fireEvent.drop(dropArea!);
      expect(mockOnDrop).toHaveBeenCalled();
    });
  });

  describe("Modal Integration", () => {
    it("should handle modal close correctly", async () => {
      const user = userEvent.setup();
      const mockOnClose = vi.fn();

      render(<ImportModal {...defaultProps} onClose={mockOnClose} />);

      const closeButton = screen.getByText("Annuler");
      await user.click(closeButton);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it("should display correct button labels", () => {
      render(<ImportModal {...defaultProps} />);

      expect(screen.getByText("Annuler")).toBeInTheDocument();
      expect(screen.getByText("Importer")).toBeInTheDocument();
    });

    it("should handle modal open/close state", () => {
      const { rerender } = render(
        <ImportModal {...defaultProps} isOpen={true} />,
      );
      expect(screen.getByTestId("modal")).toBeInTheDocument();

      rerender(<ImportModal {...defaultProps} isOpen={false} />);
      expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
    });
  });
});
