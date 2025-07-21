import { Input } from "@/form";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

describe("Composant Input", (): void => {
  describe("Snapshots", (): void => {
    it("devrait correspondre au snapshot avec les props par défaut", (): void => {
      const { container } = render(<Input />);
      expect(container).toMatchSnapshot();
    });

    it("devrait correspondre au snapshot pour chaque variante", (): void => {
      const variants = ["bordered", "flat", "faded", "underlined"] as const;
      variants.forEach((variant): void => {
        const { container } = render(<Input variant={variant} />);
        expect(container).toMatchSnapshot();
      });
    });

    it("devrait correspondre au snapshot pour différentes tailles", (): void => {
      const sizes = ["sm", "md", "lg"] as const;
      sizes.forEach((size): void => {
        const { container } = render(<Input size={size} />);
        expect(container).toMatchSnapshot();
      });
    });

    it("devrait correspondre au snapshot pour le type password", (): void => {
      const { container } = render(<Input type="password" />);
      expect(container).toMatchSnapshot();
    });

    it("devrait correspondre au snapshot avec label", (): void => {
      const { container } = render(<Input label="Nom d'utilisateur" />);
      expect(container).toMatchSnapshot();
    });
  });

  describe("Comportement", (): void => {
    it("devrait basculer la visibilité du mot de passe", (): void => {
      const { container } = render(<Input type="password" />);
      const input = container.querySelector(
        'input[type="password"]',
      ) as HTMLInputElement;
      const toggleButton = screen.getByRole("button");

      expect(input.type).toBe("password");
      fireEvent.click(toggleButton);
      expect(input.type).toBe("text");
      fireEvent.click(toggleButton);
      expect(input.type).toBe("password");
    });

    it("devrait appeler la fonction customValidation", (): void => {
      const customValidation = vi.fn().mockReturnValue(true);
      const { container } = render(
        <Input customValidation={customValidation} />,
      );
      const input = container.querySelector("input") as HTMLInputElement;
      fireEvent.change(input, { target: { value: "test" } });
      expect(customValidation).toHaveBeenCalledWith("test");
    });

    it("devrait être désactivé quand isDisabled est true", (): void => {
      const { container } = render(<Input isDisabled />);
      const input = container.querySelector("input") as HTMLInputElement;
      expect(input.disabled).toBe(true);
    });
  });

  describe("Accessibilité", (): void => {
    it("devrait avoir l'attribut required quand isRequired est true", (): void => {
      const { container } = render(<Input isRequired />);
      const input = container.querySelector("input") as HTMLInputElement;
      expect(input.required).toBe(true);
    });

    it("devrait avoir l'attribut readonly quand isReadOnly est true", (): void => {
      const { container } = render(<Input isReadOnly />);
      const input = container.querySelector("input") as HTMLInputElement;
      expect(input.readOnly).toBe(true);
    });
  });
});
