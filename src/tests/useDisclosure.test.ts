import type {
  UseDisclosureProps,
  UseDisclosureReturn,
} from "@/hooks/useDisclosure";
import { useDisclosure } from "@/hooks/useDisclosure";
import { act, renderHook } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

describe("useDisclosure", (): void => {
  beforeEach((): void => {
    vi.spyOn(console, "warn").mockImplementation((): void => {});
  });

  afterEach((): void => {
    vi.clearAllMocks();
  });

  describe("État initial", (): void => {
    it("devrait avoir un état fermé par défaut", (): void => {
      const { result } = renderHook((): UseDisclosureReturn => useDisclosure());
      expect(result.current.isOpen).toBe(false);
    });

    it("devrait respecter defaultOpen", (): void => {
      const { result } = renderHook(
        (): UseDisclosureReturn => useDisclosure({ defaultOpen: true }),
      );
      expect(result.current.isOpen).toBe(true);
    });

    it("devrait respecter isOpen contrôlé", (): void => {
      const { result } = renderHook(
        (): UseDisclosureReturn => useDisclosure({ isOpen: true }),
      );
      expect(result.current.isOpen).toBe(true);
      expect(result.current.isControlled).toBe(true);
    });
  });

  describe("Callbacks", (): void => {
    it("devrait appeler onOpen", (): void => {
      const onOpen = vi.fn();
      const { result } = renderHook(
        (): UseDisclosureReturn => useDisclosure({ onOpen }),
      );

      act((): void => {
        result.current.onOpen();
      });

      expect(onOpen).toHaveBeenCalled();
      expect(result.current.isOpen).toBe(true);
    });

    it("devrait appeler onClose", (): void => {
      const onClose = vi.fn();
      const { result } = renderHook(
        (): UseDisclosureReturn =>
          useDisclosure({ defaultOpen: true, onClose }),
      );

      act((): void => {
        result.current.onClose();
      });

      expect(onClose).toHaveBeenCalled();
      expect(result.current.isOpen).toBe(false);
    });

    it("devrait appeler onChange", (): void => {
      const onChange = vi.fn();
      const { result } = renderHook(
        (): UseDisclosureReturn => useDisclosure({ onChange }),
      );

      act((): void => {
        result.current.onOpen();
      });

      expect(onChange).toHaveBeenCalledWith(true);
    });
  });

  describe("Props du bouton", (): void => {
    it("devrait générer les props corrects pour le bouton", (): void => {
      const { result } = renderHook((): UseDisclosureReturn => useDisclosure());
      const buttonProps = result.current.getButtonProps();

      expect(buttonProps["aria-expanded"]).toBe(false);
      expect(buttonProps["aria-controls"]).toBeDefined();
    });

    it("devrait fusionner les props personnalisés", (): void => {
      const { result } = renderHook((): UseDisclosureReturn => useDisclosure());
      const customProps = { className: "test-class" };
      const buttonProps = result.current.getButtonProps(customProps);

      expect(buttonProps.className).toBe("test-class");
      expect(buttonProps["aria-expanded"]).toBe(false);
    });

    it("devrait gérer les événements onClick", (): void => {
      const customOnClick = vi.fn();
      const { result } = renderHook((): UseDisclosureReturn => useDisclosure());
      const buttonProps = result.current.getButtonProps({
        onClick: customOnClick,
      });

      act((): void => {
        // Créer un mock d'événement plus précis
        const mockEvent = {
          preventDefault: (): void => {},
          currentTarget: document.createElement("button"),
        } as unknown as React.MouseEvent<HTMLButtonElement>;

        buttonProps.onClick?.(mockEvent);
      });

      expect(customOnClick).toHaveBeenCalled();
      expect(result.current.isOpen).toBe(true);
    });
  });
  describe("Props de divulgation", (): void => {
    it("devrait générer les props corrects pour l'élément de divulgation", (): void => {
      const { result } = renderHook((): UseDisclosureReturn => useDisclosure());
      const disclosureProps = result.current.getDisclosureProps();

      expect(disclosureProps.hidden).toBe(true);
      expect(disclosureProps.id).toBeDefined();
    });

    it("devrait fusionner les props personnalisés", (): void => {
      const { result } = renderHook((): UseDisclosureReturn => useDisclosure());
      const customProps = { className: "test-class" };
      const disclosureProps = result.current.getDisclosureProps(customProps);

      expect(disclosureProps.className).toBe("test-class");
      expect(disclosureProps.hidden).toBe(true);
    });
  });

  describe("Contrôle d'état", (): void => {
    it("devrait avertir lors du passage de contrôlé à non contrôlé", (): void => {
      const consoleSpy = vi.spyOn(console, "warn");
      const { rerender } = renderHook(
        (props: UseDisclosureProps): UseDisclosureReturn =>
          useDisclosure(props),
        { initialProps: { isOpen: true } },
      );

      rerender();

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          "A component changed from controlled to uncontrolled",
        ),
      );
    });

    it("devrait avertir lors du passage de non contrôlé à contrôlé", (): void => {
      const consoleSpy = vi.spyOn(console, "warn");
      const { rerender } = renderHook(
        (props): UseDisclosureReturn => useDisclosure(props),
        {
          initialProps: {},
        },
      );
      rerender({ isOpen: true });

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          "A component changed from uncontrolled to controlled",
        ),
      );
    });
  });
});
