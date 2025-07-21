import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Button } from "@/button";
import { Buttons } from "@/buttons";
import userEvent from "@testing-library/user-event";
import type { JSX } from "react";
import { forwardRef } from "react";

export const MockLink = forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(
  ({ children, ...props }, ref): JSX.Element => (
    <a ref={ref} {...props}>
      {children}
    </a>
  ),
);

MockLink.displayName = "MockLink";

describe("Composant Button", (): void => {
  describe("Snapshots", (): void => {
    it("devrait correspondre au snapshot avec contenu de base", (): void => {
      const { container } = render(<Button>Test</Button>);
      expect(container).toMatchSnapshot();
    });

    it("devrait correspondre au snapshot avec props fullWidth", (): void => {
      const { container } = render(<Button fullWidth>Test</Button>);
      expect(container).toMatchSnapshot();
    });

    it("devrait correspondre au snapshot en état de chargement", (): void => {
      const { container } = render(<Button isLoading>Test</Button>);
      expect(container).toMatchSnapshot();
    });

    it("devrait correspondre au snapshot avec contenu additionnel", (): void => {
      const { container } = render(
        <Button startContent={<span>Start</span>} endContent={<span>End</span>}>
          Test
        </Button>,
      );
      expect(container).toMatchSnapshot();
    });

    it("devrait correspondre au snapshot en tant que lien", (): void => {
      const { container } = render(
        <Button href="/test" LinkComponent={MockLink}>
          Test Link
        </Button>,
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe("Comportements", (): void => {
    it("devrait appeler onClick quand cliqué", async (): Promise<void> => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      const { getByRole } = render(<Button onClick={handleClick}>Test</Button>);
      const button = getByRole("button");

      await user.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("ne devrait pas déclencher onClick si isLoading est true", async (): Promise<void> => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      const { getByRole } = render(
        <Button onClick={handleClick} isLoading>
          Test
        </Button>,
      );
      const button = getByRole("button");

      await user.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });
});

describe("Composant Buttons", (): void => {
  const mockButtons = [
    { key: "1", label: "Bouton 1", buttonProps: { onClick: vi.fn() } },
    { key: "2", label: "Bouton 2", buttonProps: { isDisabled: true } },
  ];

  describe("Snapshots", (): void => {
    it("devrait correspondre au snapshot avec plusieurs boutons", (): void => {
      const { container } = render(<Buttons buttons={mockButtons} />);
      expect(container).toMatchSnapshot();
    });

    it("devrait correspondre au snapshot avec groupe de boutons personnalisé", (): void => {
      const { container } = render(
        <Buttons
          buttons={mockButtons}
          className="w-full"
          aria-label="Groupe de boutons"
        />,
      );
      expect(container).toMatchSnapshot();
    });

    it("devrait correspondre au snapshot avec contenu React complexe", (): void => {
      const buttonsWithReactContent = [
        {
          key: "1",
          label: <span data-testid="custom-content">Label complexe</span>,
        },
      ];

      const { container } = render(
        <Buttons buttons={buttonsWithReactContent} />,
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe("Comportements", (): void => {
    it("devrait appeler onClick du bouton", async (): Promise<void> => {
      const user = userEvent.setup();

      render(<Buttons buttons={mockButtons} />);
      const button = screen.getByText("Bouton 1");

      await user.click(button);
      expect(mockButtons[0].buttonProps?.onClick).toHaveBeenCalledTimes(1);
    });

    it("devrait gérer un groupe de boutons vide", (): void => {
      const { container } = render(<Buttons buttons={[]} />);
      expect(container.querySelectorAll("button")).toHaveLength(0);
    });
  });

  describe("Accessibilité", (): void => {
    it("devrait inclure les attributs ARIA", (): void => {
      render(<Buttons buttons={mockButtons} aria-label="Groupe de boutons" />);
      const group = screen.getByRole("group");
      expect(group).toHaveAttribute("aria-label", "Groupe de boutons");
    });
  });
});
