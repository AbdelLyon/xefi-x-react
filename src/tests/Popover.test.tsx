import { Popover } from "@/popover";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("Composant Popover", (): void => {
  const mockTrigger = <button>Cliquez-moi</button>;
  const mockContent = <div key="popover-content">Contenu du popover</div>;

  describe("Snapshots", (): void => {
    it("devrait correspondre au snapshot avec le déclencheur", (): void => {
      const { container } = render(
        <Popover trigger={mockTrigger}>{[mockContent]}</Popover>,
      );
      expect(container).toMatchSnapshot();
    });

    it("devrait correspondre au snapshot quand ouvert", (): void => {
      const { container } = render(
        <Popover trigger={mockTrigger} isOpen>
          {[mockContent]}
        </Popover>,
      );
      expect(container).toMatchSnapshot();
    });

    it("devrait correspondre au snapshot avec une classe personnalisée pour le contenu", (): void => {
      const { container } = render(
        <Popover trigger={mockTrigger} isOpen contentClassName="custom-class">
          {[mockContent]}
        </Popover>,
      );
      expect(container).toMatchSnapshot();
    });

    it("devrait correspondre au snapshot avec des props de motion personnalisés", (): void => {
      const customMotionProps = {
        variants: {
          enter: { opacity: 1, transition: { duration: 0.2 } },
          exit: { opacity: 0, transition: { duration: 0.1 } },
        },
        initial: "exit",
        animate: "enter",
      };

      const { container } = render(
        <Popover trigger={mockTrigger} isOpen motionProps={customMotionProps}>
          {[mockContent]}
        </Popover>,
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe("Rendu et comportement", (): void => {
    it("devrait rendre l'élément déclencheur", (): void => {
      render(<Popover trigger={mockTrigger}>{[mockContent]}</Popover>);
      expect(screen.getByText("Cliquez-moi")).toBeInTheDocument();
    });

    it("devrait rendre le contenu quand ouvert", (): void => {
      render(
        <Popover trigger={mockTrigger} isOpen>
          {[mockContent]}
        </Popover>,
      );
      expect(screen.getByText("Contenu du popover")).toBeInTheDocument();
    });

    it("devrait appliquer la classe du contenu", (): void => {
      render(
        <Popover trigger={mockTrigger} isOpen contentClassName="custom-class">
          {[mockContent]}
        </Popover>,
      );

      const contentElement = screen
        .getByText("Contenu du popover")
        .closest(".custom-class");
      expect(contentElement).toBeTruthy();
    });

    it("devrait transmettre les props additionnels du popover", (): void => {
      render(
        <Popover trigger={mockTrigger} isOpen>
          {[mockContent]}
        </Popover>,
      );

      const triggerButton = screen.getByText("Cliquez-moi");
      expect(triggerButton).toHaveAttribute("aria-expanded", "true");
    });
  });
});
