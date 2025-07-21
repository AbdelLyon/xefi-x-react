import { InputOtp } from "@/form";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("Composant InputOtp", (): void => {
  describe("Snapshots", (): void => {
    it("devrait correspondre au snapshot avec les props par défaut", (): void => {
      const { container } = render(<InputOtp />);
      expect(container).toMatchSnapshot();
    });

    it("devrait correspondre au snapshot avec une longueur personnalisée", (): void => {
      const { container } = render(<InputOtp length={4} />);
      expect(container).toMatchSnapshot();
    });

    it("devrait correspondre au snapshot avec un label", (): void => {
      const { container } = render(<InputOtp label="Code OTP" />);
      expect(container).toMatchSnapshot();
    });

    it("devrait correspondre au snapshot avec des classes personnalisées", (): void => {
      const { container } = render(
        <InputOtp
          labelClasses="custom-label"
          containerClasses="custom-container"
        />,
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe("Rendu", (): void => {
    it("devrait rendre le nombre correct de champs de saisie", (): void => {
      render(<InputOtp length={4} />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("maxlength", "4");
    });

    it("devrait rendre le label quand il est fourni", (): void => {
      render(<InputOtp label="Code OTP" />);
      expect(screen.getByText("Code OTP")).toBeInTheDocument();
    });
  });

  describe("Comportement", (): void => {
    it("devrait mettre à jour la valeur lors de la saisie", (): void => {
      render(<InputOtp />);
      const input = screen.getByRole("textbox");
      fireEvent.change(input, { target: { value: "1" } });
      expect(input).toHaveValue("1");
    });

    it("devrait limiter la saisie à la longueur spécifiée", (): void => {
      render(<InputOtp length={4} />);
      const input = screen.getByRole("textbox");
      fireEvent.change(input, { target: { value: "12345" } });
      expect(input).toHaveValue("1234");
    });
  });

  describe("Accessibilité", (): void => {
    it("devrait avoir des attributs aria appropriés", (): void => {
      render(<InputOtp />);
      const container = screen.getByRole("base");
      expect(container).toHaveAttribute(
        "aria-label",
        "One-time password input",
      );
    });

    it("devrait avoir un input de type numérique", (): void => {
      render(<InputOtp />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("inputmode", "numeric");
    });
  });
});
