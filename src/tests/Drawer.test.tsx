import { Drawer } from "@/drawer";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

describe("Composant Drawer", (): void => {
  const defaultProps = {
    trigger: <button>Ouvrir</button>,
    children: <div>Contenu du drawer</div>,
  };

  describe("Snapshots", (): void => {
    it("devrait correspondre au snapshot avec les props par défaut", (): void => {
      const { container } = render(<Drawer {...defaultProps} />);
      expect(container).toMatchSnapshot();
    });

    it("devrait correspondre au snapshot avec un titre", (): void => {
      const { container } = render(
        <Drawer {...defaultProps} title="Titre du drawer" />,
      );
      expect(container).toMatchSnapshot();
    });

    it("devrait correspondre au snapshot avec un footer personnalisé", (): void => {
      const { container } = render(
        <Drawer {...defaultProps} footer={<div>Footer personnalisé</div>} />,
      );
      expect(container).toMatchSnapshot();
    });

    it("devrait correspondre au snapshot avec des boutons personnalisés", (): void => {
      const { container } = render(
        <Drawer
          {...defaultProps}
          buttonCloseLabel="Fermer"
          buttonActionLabel="Valider"
          onAction={(): void => {}}
        />,
      );
      expect(container).toMatchSnapshot();
    });

    it("devrait correspondre au snapshot quand le drawer est ouvert", async (): Promise<void> => {
      const { container } = render(<Drawer {...defaultProps} />);
      await act(async (): Promise<void> => {
        await fireEvent.click(screen.getByText("Ouvrir"));
      });
      expect(container).toMatchSnapshot();
    });
  });

  describe("Comportement", (): void => {
    it("devrait appeler onAction quand le bouton d'action est cliqué", async (): Promise<void> => {
      const onActionMock = vi.fn();
      render(
        <Drawer
          {...defaultProps}
          buttonActionLabel="Valider"
          onAction={onActionMock}
        />,
      );
      await act(async (): Promise<void> => {
        await fireEvent.click(screen.getByText("Ouvrir"));
      });
      await act(async (): Promise<void> => {
        await fireEvent.click(screen.getByText("Valider"));
      });
      expect(onActionMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("Accessibilité", (): void => {
    it("devrait avoir un rôle de bouton pour le déclencheur", (): void => {
      render(<Drawer {...defaultProps} />);
      const trigger = screen.getByText("Ouvrir").closest("div");
      expect(trigger).toHaveAttribute("role", "button");
    });

    it("devrait pouvoir être ouvert avec la touche Entrée", async (): Promise<void> => {
      render(<Drawer {...defaultProps} />);
      const trigger = screen.getByText("Ouvrir").closest("div");
      if (trigger) {
        await act(async (): Promise<void> => {
          await fireEvent.keyDown(trigger, { key: "Enter" });
        });
        expect(screen.getByText("Contenu du drawer")).toBeInTheDocument();
      }
    });
  });
});
