import { Alert } from "@/alert";
import type { Color } from "@/types";
import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

describe("Composant Alert", (): void => {
  const defaultProps = {
    color: "primary" as Color,
    variant: "solid" as "solid" | "flat" | "faded" | "bordered",
  };

  describe("Snapshots", (): void => {
    it("devrait correspondre au snapshot avec les props par défaut", (): void => {
      const { container } = render(<Alert {...defaultProps} isVisible />);
      expect(container).toMatchSnapshot();
    });

    it("devrait correspondre au snapshot quand isVisible est false", (): void => {
      const { container } = render(
        <Alert {...defaultProps} isVisible={false} />,
      );
      expect(container).toMatchSnapshot();
    });

    it("devrait correspondre au snapshot avec isClosable", (): void => {
      const { container } = render(<Alert {...defaultProps} isClosable />);
      expect(container).toMatchSnapshot();
    });

    it("devrait correspondre au snapshot avec différentes variantes de couleur", (): void => {
      const colors: Color[] = [
        "primary",
        "secondary",
        "success",
        "warning",
        "danger",
      ];
      colors.forEach((color): void => {
        const { container } = render(<Alert {...defaultProps} color={color} />);
        expect(container).toMatchSnapshot();
      });
    });

    it("devrait correspondre au snapshot avec des props minimales", (): void => {
      const { container } = render(<Alert />);
      expect(container).toMatchSnapshot();
    });
  });

  describe("Rendu et comportement", (): void => {
    it("devrait rendre l'alerte quand isVisible est true", (): void => {
      const { getByRole } = render(<Alert {...defaultProps} isVisible />);
      const alert = getByRole("alert");
      expect(alert).toBeTruthy();
    });

    it("ne devrait pas rendre l'alerte quand isVisible est false", (): void => {
      const { container } = render(
        <Alert {...defaultProps} isVisible={false} />,
      );
      expect(container.firstChild).toBeNull();
    });

    it("devrait transmettre les props additionnelles à AlertRoot", (): void => {
      const { container } = render(
        <Alert
          {...defaultProps}
          data-testid="custom-alert"
          aria-label="Test Alert"
        />,
      );

      const alert = container.querySelector('[data-testid="custom-alert"]');
      expect(alert).toBeTruthy();
      expect(alert).toHaveAttribute("aria-label", "Test Alert");
    });

    it("devrait gérer correctement la prop isClosable", (): void => {
      const { container: closableContainer } = render(
        <Alert {...defaultProps} isClosable={true} />,
      );
      const closableAlert = closableContainer.querySelector('[role="alert"]');
      expect(closableAlert).toBeTruthy();

      const { container: nonClosableContainer } = render(
        <Alert {...defaultProps} isClosable={false} />,
      );
      const nonClosableAlert =
        nonClosableContainer.querySelector('[role="alert"]');
      expect(nonClosableAlert).toBeTruthy();
    });

    it("devrait appeler onClose et onVisibleChange quand déclenché", (): void => {
      const onCloseMock = vi.fn();
      const onVisibleChangeMock = vi.fn();

      render(
        <Alert
          {...defaultProps}
          isClosable
          onClose={onCloseMock}
          onVisibleChange={onVisibleChangeMock}
        />,
      );

      expect(onCloseMock).not.toHaveBeenCalled();
      expect(onVisibleChangeMock).not.toHaveBeenCalled();
    });

    it("devrait gérer correctement onVisibleChange", (): void => {
      const onVisibleChangeMock = vi.fn();

      const { rerender } = render(
        <Alert
          {...defaultProps}
          isVisible={true}
          onVisibleChange={onVisibleChangeMock}
        />,
      );

      rerender(
        <Alert
          {...defaultProps}
          isVisible={false}
          onVisibleChange={onVisibleChangeMock}
        />,
      );

      expect(onVisibleChangeMock).not.toHaveBeenCalled();
    });
  });
});
