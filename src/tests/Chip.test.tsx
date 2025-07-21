import { Chip } from "@/chip";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

describe("Composant Chip", (): void => {
  describe("Snapshots", (): void => {
    it("devrait correspondre au snapshot avec les props par défaut", (): void => {
      const { container } = render(<Chip>Chip par défaut</Chip>);
      expect(container).toMatchSnapshot();
    });

    it("devrait correspondre au snapshot avec différentes variantes", (): void => {
      const variants = [
        "solid",
        "bordered",
        "light",
        "flat",
        "faded",
        "shadow",
      ] as const;
      variants.forEach((variant): void => {
        const { container } = render(
          <Chip variant={variant}>Chip {variant}</Chip>,
        );
        expect(container).toMatchSnapshot();
      });
    });

    it("devrait correspondre au snapshot avec différentes couleurs", (): void => {
      const colors = [
        "default",
        "primary",
        "secondary",
        "success",
        "warning",
        "danger",
      ] as const;
      colors.forEach((color): void => {
        const { container } = render(<Chip color={color}>Chip {color}</Chip>);
        expect(container).toMatchSnapshot();
      });
    });

    it("devrait correspondre au snapshot avec différentes tailles", (): void => {
      const sizes = ["sm", "md", "lg"] as const;
      sizes.forEach((size): void => {
        const { container } = render(<Chip size={size}>Chip {size}</Chip>);
        expect(container).toMatchSnapshot();
      });
    });

    it("devrait correspondre au snapshot avec contenu de début et de fin", (): void => {
      const { container } = render(
        <Chip startContent={<span>Début</span>} endContent={<span>Fin</span>}>
          Contenu
        </Chip>,
      );
      expect(container).toMatchSnapshot();
    });

    it("devrait correspondre au snapshot quand désactivé", (): void => {
      const { container } = render(<Chip isDisabled>Chip désactivé</Chip>);
      expect(container).toMatchSnapshot();
    });
  });

  describe("Comportement", (): void => {
    it("devrait rendre correctement avec une fonction onClose", (): void => {
      const onCloseMock = vi.fn();
      const { container } = render(<Chip onClose={onCloseMock}>Chip fermable</Chip>);

      // Vérifier que le composant se rend correctement
      expect(container.firstChild).toBeTruthy();
      expect(screen.getByText("Chip fermable")).toBeTruthy();
    });

    it("devrait transmettre les props supplémentaires au composant racine", (): void => {
      const { container } = render(
        <Chip data-testid="test-chip">Chip de test</Chip>,
      );
      expect(container.firstChild).toHaveAttribute("data-testid", "test-chip");
    });
  });

  describe("Accessibilité", (): void => {
    it("ne devrait pas avoir d'attribut role par défaut", (): void => {
      render(<Chip>Chip accessible</Chip>);
      const chip = screen.getByText("Chip accessible");
      expect(chip).not.toHaveAttribute("role");
    });

    it("ne devrait pas avoir d'attribut tabindex par défaut", (): void => {
      render(<Chip>Chip focusable</Chip>);
      const chip = screen.getByText("Chip focusable");
      expect(chip).not.toHaveAttribute("tabindex");
    });

    it("ne devrait pas être focusable quand il est désactivé", (): void => {
      render(<Chip isDisabled>Chip désactivé</Chip>);
      const chip = screen.getByText("Chip désactivé");
      expect(chip).not.toHaveAttribute("tabindex");
    });
  });
});
