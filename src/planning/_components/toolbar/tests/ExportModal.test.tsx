import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal } from "@xefi/x-react/modal";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ExportModal } from "../ExportModal";

vi.mock("@xefi/x-react/modal", () => ({
  Modal: vi.fn(
    ({
      trigger,
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
        <div data-testid="mock-modal">
          <div data-testid="modal-header">
            <h2>{title}</h2>
            <button data-testid="close-button" onClick={onClose}>
              {buttonCloseLabel}
            </button>
          </div>
          <div data-testid="modal-content">{children}</div>
          <div data-testid="modal-footer">
            <button
              data-testid="action-button"
              onClick={onAction}
              disabled={buttonActionProps?.isDisabled}
            >
              {buttonActionLabel}
            </button>
          </div>
          <div data-testid="modal-props" style={{ display: "none" }}>
            {JSON.stringify({
              trigger,
              isOpen,
              title,
              buttonCloseLabel,
              buttonActionLabel,
              buttonActionProps,
            })}
          </div>
        </div>
      );
    },
  ),
}));

const mockModal = vi.mocked(Modal);

describe("ExportModal", () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    exportFileName: "test-export",
    onFileNameChange: vi.fn(),
    onExport: vi.fn(),
    isExporting: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Modal Rendering and Props", () => {
    it("should render modal when isOpen is true", () => {
      render(<ExportModal {...defaultProps} isOpen={true} />);

      expect(screen.getByTestId("mock-modal")).toBeInTheDocument();
      expect(screen.getByText("Exporter les absences")).toBeInTheDocument();
    });

    it("should not render modal when isOpen is false", () => {
      render(<ExportModal {...defaultProps} isOpen={false} />);

      expect(screen.queryByTestId("mock-modal")).not.toBeInTheDocument();
    });

    it("should pass correct props to Modal component", () => {
      render(<ExportModal {...defaultProps} />);

      expect(mockModal).toHaveBeenCalled();

      const firstCall = mockModal.mock.calls[0];
      const props = firstCall[0];

      expect(props).toEqual(
        expect.objectContaining({
          trigger: null,
          isOpen: true,
          onClose: defaultProps.onClose,
          title: "Exporter les absences",
          buttonCloseLabel: "Annuler",
          buttonActionLabel: "Exporter",
          onAction: defaultProps.onExport,
          buttonActionProps: {
            isDisabled: false,
          },
        }),
      );
    });

    it('should show "Export..." label when isExporting is true', () => {
      render(<ExportModal {...defaultProps} isExporting={true} />);

      expect(screen.getByTestId("action-button")).toHaveTextContent(
        "Export...",
      );
    });

    it('should show "Exporter" label when isExporting is false', () => {
      render(<ExportModal {...defaultProps} isExporting={false} />);

      expect(screen.getByTestId("action-button")).toHaveTextContent("Exporter");
    });

    it("should disable action button when isExporting is true", () => {
      render(<ExportModal {...defaultProps} isExporting={true} />);

      const actionButton = screen.getByTestId("action-button");
      expect(actionButton).toBeDisabled();
    });

    it("should enable action button when isExporting is false", () => {
      render(<ExportModal {...defaultProps} isExporting={false} />);

      const actionButton = screen.getByTestId("action-button");
      expect(actionButton).not.toBeDisabled();
    });
  });

  describe("Content Rendering", () => {
    it("should display correct title", () => {
      render(<ExportModal {...defaultProps} />);

      expect(screen.getByText("Exporter les absences")).toBeInTheDocument();
    });

    it("should display file name label", () => {
      render(<ExportModal {...defaultProps} />);

      expect(
        screen.getByText("Nom du fichier (optionnel)"),
      ).toBeInTheDocument();
    });

    it("should display input field with correct attributes", () => {
      render(<ExportModal {...defaultProps} />);

      const input = screen.getByRole("textbox");
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("type", "text");
      expect(input).toHaveAttribute("placeholder", "export-absences");
      expect(input).toHaveValue("test-export");
    });

    it("should display information text", () => {
      render(<ExportModal {...defaultProps} />);

      expect(
        screen.getByText(
          "Le fichier sera exporté au format CSV avec la date du jour.",
        ),
      ).toBeInTheDocument();
    });

    it("should have close button with correct label", () => {
      render(<ExportModal {...defaultProps} />);

      expect(screen.getByTestId("close-button")).toHaveTextContent("Annuler");
    });
  });

  describe("Input Interaction", () => {
    it("should call onFileNameChange when input value changes", async () => {
      const user = userEvent.setup();
      render(<ExportModal {...defaultProps} exportFileName="" />);

      const input = screen.getByRole("textbox");
      await user.type(input, "new-filename");

      expect(defaultProps.onFileNameChange).toHaveBeenCalledTimes(12);
      expect(defaultProps.onFileNameChange).toHaveBeenCalledWith("n");
      expect(defaultProps.onFileNameChange).toHaveBeenCalledWith("e");
    });

    it("should handle input change with fireEvent", () => {
      render(<ExportModal {...defaultProps} />);

      const input = screen.getByRole("textbox");
      fireEvent.change(input, { target: { value: "updated-filename" } });

      expect(defaultProps.onFileNameChange).toHaveBeenCalledWith(
        "updated-filename",
      );
    });

    it("should clear input value", async () => {
      const user = userEvent.setup();
      render(<ExportModal {...defaultProps} />);

      const input = screen.getByRole("textbox");
      await user.clear(input);

      expect(defaultProps.onFileNameChange).toHaveBeenCalledWith("");
    });

    it("should handle special characters in filename", async () => {
      const user = userEvent.setup();
      render(<ExportModal {...defaultProps} exportFileName="" />);

      const input = screen.getByRole("textbox");
      await user.type(input, "test-file_2024.csv");

      expect(defaultProps.onFileNameChange).toHaveBeenCalledWith("t");
      expect(defaultProps.onFileNameChange).toHaveBeenCalledWith("-");
      expect(defaultProps.onFileNameChange).toHaveBeenCalledWith("_");
      expect(defaultProps.onFileNameChange).toHaveBeenCalledWith(".");
    });

    it("should display updated filename value", () => {
      const { rerender } = render(
        <ExportModal {...defaultProps} exportFileName="initial" />,
      );

      let input = screen.getByRole("textbox");
      expect(input).toHaveValue("initial");

      rerender(<ExportModal {...defaultProps} exportFileName="updated" />);

      input = screen.getByRole("textbox");
      expect(input).toHaveValue("updated");
    });
  });

  describe("Button Interactions", () => {
    it("should call onClose when close button is clicked", async () => {
      const user = userEvent.setup();
      render(<ExportModal {...defaultProps} />);

      const closeButton = screen.getByTestId("close-button");
      await user.click(closeButton);

      expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    });

    it("should call onExport when action button is clicked", async () => {
      const user = userEvent.setup();
      render(<ExportModal {...defaultProps} />);

      const actionButton = screen.getByTestId("action-button");
      await user.click(actionButton);

      expect(defaultProps.onExport).toHaveBeenCalledTimes(1);
    });

    it("should not call onExport when button is disabled", async () => {
      const user = userEvent.setup();
      render(<ExportModal {...defaultProps} isExporting={true} />);

      const actionButton = screen.getByTestId("action-button");
      await user.click(actionButton);

      expect(defaultProps.onExport).not.toHaveBeenCalled();
    });

    it("should handle multiple clicks on buttons", async () => {
      const user = userEvent.setup();
      render(<ExportModal {...defaultProps} />);

      const closeButton = screen.getByTestId("close-button");
      const actionButton = screen.getByTestId("action-button");

      await user.click(closeButton);
      await user.click(actionButton);
      await user.click(closeButton);

      expect(defaultProps.onClose).toHaveBeenCalledTimes(2);
      expect(defaultProps.onExport).toHaveBeenCalledTimes(1);
    });
  });

  describe("CSS Classes and Styling", () => {
    it("should apply correct classes to main container", () => {
      render(<ExportModal {...defaultProps} />);

      const container = screen.getByRole("textbox").closest(".space-y-4");
      expect(container).toHaveClass("space-y-4");
    });

    it("should apply correct classes to label", () => {
      render(<ExportModal {...defaultProps} />);

      const label = screen.getByText("Nom du fichier (optionnel)");
      expect(label).toHaveClass(
        "mb-2",
        "block",
        "text-sm",
        "font-medium",
        "text-foreground-700",
      );
    });

    it("should apply correct classes to input", () => {
      render(<ExportModal {...defaultProps} />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveClass(
        "w-full",
        "rounded-lg",
        "border",
        "border-border",
        "px-3",
        "py-2",
        "focus:outline-none",
        "focus:ring-2",
        "focus:ring-primary",
      );
    });

    it("should apply correct classes to info text", () => {
      render(<ExportModal {...defaultProps} />);

      const infoText = screen.getByText(
        "Le fichier sera exporté au format CSV avec la date du jour.",
      );
      expect(infoText).toHaveClass("text-sm", "text-foreground-500");
    });
  });

  describe("Accessibility", () => {
    it("should have proper form structure", () => {
      render(<ExportModal {...defaultProps} />);

      const label = screen.getByText("Nom du fichier (optionnel)");
      const input = screen.getByRole("textbox");

      expect(label.tagName).toBe("LABEL");
      expect(input.tagName).toBe("INPUT");
    });

    it("should have proper input attributes for accessibility", () => {
      render(<ExportModal {...defaultProps} />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("type", "text");
      expect(input).toHaveAttribute("placeholder", "export-absences");
    });

    it("should have descriptive button labels", () => {
      render(<ExportModal {...defaultProps} />);

      expect(screen.getByTestId("close-button")).toHaveTextContent("Annuler");
      expect(screen.getByTestId("action-button")).toHaveTextContent("Exporter");
    });

    it("should show loading state in button text", () => {
      render(<ExportModal {...defaultProps} isExporting={true} />);

      expect(screen.getByTestId("action-button")).toHaveTextContent(
        "Export...",
      );
    });

    it("should disable action button during export", () => {
      render(<ExportModal {...defaultProps} isExporting={true} />);

      const actionButton = screen.getByTestId("action-button");
      expect(actionButton).toBeDisabled();
    });
  });

  describe("State Management", () => {
    it("should handle state changes correctly", () => {
      const { rerender } = render(
        <ExportModal {...defaultProps} isOpen={false} />,
      );

      expect(screen.queryByTestId("mock-modal")).not.toBeInTheDocument();

      rerender(<ExportModal {...defaultProps} isOpen={true} />);

      expect(screen.getByTestId("mock-modal")).toBeInTheDocument();
    });

    it("should update export state correctly", () => {
      const { rerender } = render(
        <ExportModal {...defaultProps} isExporting={false} />,
      );

      let actionButton = screen.getByTestId("action-button");
      expect(actionButton).toHaveTextContent("Exporter");
      expect(actionButton).not.toBeDisabled();

      rerender(<ExportModal {...defaultProps} isExporting={true} />);

      actionButton = screen.getByTestId("action-button");
      expect(actionButton).toHaveTextContent("Export...");
      expect(actionButton).toBeDisabled();
    });

    it("should handle filename changes", () => {
      const { rerender } = render(
        <ExportModal {...defaultProps} exportFileName="initial" />,
      );

      let input = screen.getByRole("textbox");
      expect(input).toHaveValue("initial");

      rerender(<ExportModal {...defaultProps} exportFileName="changed" />);

      input = screen.getByRole("textbox");
      expect(input).toHaveValue("changed");
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty filename", () => {
      render(<ExportModal {...defaultProps} exportFileName="" />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveValue("");
      expect(input).toHaveAttribute("placeholder", "export-absences");
    });

    it("should handle very long filename", () => {
      const longFilename =
        "very-long-filename-that-might-cause-issues-with-layout-and-display";
      render(<ExportModal {...defaultProps} exportFileName={longFilename} />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveValue(longFilename);
    });

    it("should handle special characters in filename", () => {
      const specialFilename = "test@file#2024$export%^&*()";
      render(
        <ExportModal {...defaultProps} exportFileName={specialFilename} />,
      );

      const input = screen.getByRole("textbox");
      expect(input).toHaveValue(specialFilename);
    });

    it("should maintain all props when switching export state", () => {
      const { rerender } = render(
        <ExportModal {...defaultProps} isExporting={false} />,
      );

      let props = mockModal.mock.calls[0][0];
      expect(props.buttonActionProps).toEqual({ isDisabled: false });

      rerender(<ExportModal {...defaultProps} isExporting={true} />);

      props = mockModal.mock.calls[mockModal.mock.calls.length - 1][0];
      expect(props.buttonActionProps).toEqual({ isDisabled: true });
      expect(props.buttonActionLabel).toBe("Export...");
    });
  });

  describe("Integration", () => {
    it("should handle complete user workflow", async () => {
      const user = userEvent.setup();
      render(<ExportModal {...defaultProps} exportFileName="" />);

      const input = screen.getByRole("textbox");
      await user.type(input, "my-export");

      expect(defaultProps.onFileNameChange).toHaveBeenCalledWith("m");
      expect(defaultProps.onFileNameChange).toHaveBeenCalledWith("y");
      expect(defaultProps.onFileNameChange).toHaveBeenCalledWith("-");

      const actionButton = screen.getByTestId("action-button");
      await user.click(actionButton);

      expect(defaultProps.onExport).toHaveBeenCalledTimes(1);
    });

    it("should handle cancellation workflow", async () => {
      const user = userEvent.setup();
      render(<ExportModal {...defaultProps} />);

      const closeButton = screen.getByTestId("close-button");
      await user.click(closeButton);

      expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
      expect(defaultProps.onExport).not.toHaveBeenCalled();
    });
  });
});
