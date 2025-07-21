import { Card } from "@/card";
import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

describe("Composant Card", (): void => {
  const defaultProps = {
    children: "Contenu de la Card",
    header: "En-tête de la Card",
    footer: "Pied de la Card",
  };

  describe("Snapshots", (): void => {
    it("devrait correspondre au snapshot avec les props par défaut", (): void => {
      const { container } = render(<Card {...defaultProps} />);
      expect(container).toMatchSnapshot();
    });

    it("devrait correspondre au snapshot avec des classNames personnalisés", (): void => {
      const customClassNames = {
        header: "custom-header",
        body: "custom-body",
        footer: "custom-footer",
      };
      const { container } = render(
        <Card {...defaultProps} classNames={customClassNames} />,
      );
      expect(container).toMatchSnapshot();
    });

    it("devrait correspondre au snapshot sans en-tête ni pied", (): void => {
      const { container } = render(<Card>Contenu de la Card uniquement</Card>);
      expect(container).toMatchSnapshot();
    });

    it("devrait correspondre au snapshot avec des props visuelles", (): void => {
      const { container } = render(
        <Card
          shadow="lg"
          radius="sm"
          fullWidth
          isHoverable
          isBlurred
          isFooterBlurred
          isDisabled
        >
          Contenu de la Card
        </Card>,
      );
      expect(container).toMatchSnapshot();
    });

    it("devrait correspondre au snapshot avec des props d'interaction", (): void => {
      const { container } = render(
        <Card
          isPressable
          disableAnimation
          disableRipple
          allowTextSelectionOnPress
        >
          Card Interactive
        </Card>,
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe("Comportement", (): void => {
    it("devrait gérer les événements de pression", (): void => {
      const onPress = vi.fn();
      const { getByText } = render(
        <Card {...defaultProps} isPressable onPress={onPress} />,
      );

      const cardElement = getByText("Contenu de la Card").parentElement;
      if (cardElement) {
        fireEvent.click(cardElement);
        expect(onPress).toHaveBeenCalled();
      } else {
        throw new Error("Élément Card non trouvé");
      }
    });

    it("devrait transmettre correctement la ref", (): void => {
      const ref = { current: null };
      render(<Card ref={ref}>Contenu de la Card</Card>);
      expect(ref.current).toBeTruthy();
    });
  });
});
