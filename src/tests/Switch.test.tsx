import { Switch } from "@/form";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

describe("Switch Component", (): void => {
  it("devrait appliquer la largeur et la hauteur spécifiées au conteneur", (): void => {
    render(<Switch width={100} height={50} />);
    const switchContainer = screen.getByRole("switch").closest("label");
    expect(switchContainer).toHaveStyle({
      width: "100px",
      height: "50px",
    });
  });

  describe("Comportement", (): void => {
    it("devrait changer d'état lorsqu'on clique dessus", async (): Promise<void> => {
      render(<Switch />);
      const switchElement = screen.getByRole("switch");
      expect(switchElement).not.toBeChecked();
      await act(async (): Promise<void> => {
        await fireEvent.click(switchElement);
      });
      expect(switchElement).toBeChecked();
    });

    it("devrait appeler onValueChange lorsque l'état change", async (): Promise<void> => {
      const onValueChange = vi.fn();
      render(<Switch onValueChange={onValueChange} />);
      const switchElement = screen.getByRole("switch");
      await act(async (): Promise<void> => {
        await fireEvent.click(switchElement);
      });
      expect(onValueChange).toHaveBeenCalledWith(true);
    });
  });
});
