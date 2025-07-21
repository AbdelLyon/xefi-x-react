import { Accordion } from "@/accordion";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("Composant Accordion", (): void => {
  const defaultItems = [
    {
      key: "1",
      title: "Premier élément",
      content: "Contenu du premier élément",
    },
    {
      key: "2",
      title: "Deuxième élément",
      content: "Contenu du deuxième élément",
    },
  ];

  describe("Snapshots", (): void => {
    it("devrait correspondre au snapshot avec les éléments par défaut", (): void => {
      const { container } = render(<Accordion items={defaultItems} />);
      expect(container).toMatchSnapshot();
    });

    it("devrait correspondre au snapshot avec la variante 'splitted'", (): void => {
      const { container } = render(
        <Accordion items={defaultItems} variant="splitted" />,
      );
      expect(container).toMatchSnapshot();
    });

    it("devrait correspondre au snapshot avec des classes personnalisées", (): void => {
      const { container } = render(
        <Accordion
          items={defaultItems}
          itemClasses={{
            base: "custom-base-class",
            title: "custom-title-class",
          }}
        />,
      );
      expect(container).toMatchSnapshot();
    });

    it("devrait correspondre au snapshot avec le mode de sélection multiple", (): void => {
      const { container } = render(
        <Accordion
          items={defaultItems}
          selectionMode="multiple"
          data-selection-mode="multiple"
        />,
      );
      expect(container).toMatchSnapshot();
    });

    it("devrait correspondre au snapshot avec un tableau d'éléments vide", (): void => {
      const { container } = render(<Accordion items={[]} />);
      expect(container).toMatchSnapshot();
    });
  });

  describe("Rendu et comportement", (): void => {
    it("devrait rendre tous les éléments de l'accordéon", (): void => {
      const { getAllByRole } = render(<Accordion items={defaultItems} />);
      const accordionButtons = getAllByRole("button");
      expect(accordionButtons).toHaveLength(defaultItems.length);
    });

    it("devrait afficher les titres corrects", (): void => {
      const { getByText } = render(<Accordion items={defaultItems} />);
      defaultItems.forEach((item): void => {
        expect(getByText(item.title)).toBeTruthy();
      });
    });

    it("devrait appliquer les classes par défaut", (): void => {
      const { container } = render(<Accordion items={defaultItems} />);
      const accordionItems = container.querySelectorAll('[data-slot="base"]');
      expect(accordionItems.length).toBeGreaterThan(0);
    });

    it("devrait gérer la variante 'splitted'", (): void => {
      const { container } = render(
        <Accordion items={defaultItems} variant="splitted" />,
      );
      const splittedItems = container.querySelectorAll(
        '[class*="border-1"][class*="rounded-md"]',
      );
      expect(splittedItems.length).toBeGreaterThan(0);
    });

    it("devrait transmettre les props de l'accordéon", (): void => {
      const { container } = render(
        <Accordion
          items={defaultItems}
          selectionMode="multiple"
          data-selection-mode="multiple"
        />,
      );
      const accordionRoot = container.firstChild;
      expect(accordionRoot).toHaveAttribute("data-selection-mode", "multiple");
    });
  });
});
