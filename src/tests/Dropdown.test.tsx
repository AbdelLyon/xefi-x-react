import type { DropdownSectionConfig } from "@/dropdown";
import { Dropdown } from "@/dropdown";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

describe("Composant Dropdown", (): void => {
  const mockSections: DropdownSectionConfig[] = [
    {
      key: "section1",
      label: "Première Section",
      items: [
        {
          key: "item1",
          label: "Item 1",
          href: "/item1",
          onClick: vi.fn(),
        },
        {
          key: "item2",
          label: "Item 2",
          isReadOnly: true,
          onClick: vi.fn(),
        },
      ],
    },
    {
      key: "section2",
      label: "Deuxième Section",
      showDivider: true,
      items: [
        {
          key: "item3",
          label: "Item 3",
          onClick: vi.fn(),
        },
      ],
    },
  ];

  const mockTrigger = <button>Ouvrir Dropdown</button>;

  describe("Snapshots", (): void => {
    it("devrait correspondre au snapshot avec les props par défaut", (): void => {
      const { container } = render(
        <Dropdown trigger={mockTrigger} sections={mockSections} />,
      );
      expect(container).toMatchSnapshot();
    });

    it("devrait correspondre au snapshot avec des props minimales", (): void => {
      const minimalSections: DropdownSectionConfig[] = [
        {
          key: "section1",
          items: [
            {
              key: "item1",
              label: "Item Minimal",
              onClick: vi.fn(),
            },
          ],
        },
      ];
      const { container } = render(
        <Dropdown trigger={mockTrigger} sections={minimalSections} />,
      );
      expect(container).toMatchSnapshot();
    });

    it("devrait correspondre au snapshot avec des sections ayant des séparateurs", (): void => {
      const { container } = render(
        <Dropdown trigger={mockTrigger} sections={mockSections} />,
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe("Rendu", (): void => {
    it("devrait rendre le déclencheur du dropdown", (): void => {
      render(<Dropdown trigger={mockTrigger} sections={mockSections} />);
      const triggerButton = screen.getByText("Ouvrir Dropdown");
      expect(triggerButton).toBeTruthy();
    });
  });
});
