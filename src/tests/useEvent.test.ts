import { useEvent } from "@/hooks/useEvent";
import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

describe("useEvent hook", (): void => {
  it("devrait retourner un objet ref", (): void => {
    const listener = vi.fn();
    const { result } = renderHook(
      (): React.RefObject<HTMLDivElement | null> =>
        useEvent<"click", HTMLDivElement>("click", listener),
    );

    expect(result.current).toHaveProperty("current");
    expect(result.current.current).toBe(null);
  });

  it("devrait conserver la même référence entre les rendus", (): void => {
    const listener = vi.fn();
    const { result, rerender } = renderHook(
      (): React.RefObject<HTMLDivElement | null> =>
        useEvent<"click", HTMLDivElement>("click", listener),
    );

    const firstRef = result.current;
    rerender();
    const secondRef = result.current;

    expect(firstRef).toBe(secondRef);
  });

  it("devrait fonctionner avec différents types d'éléments HTML", (): void => {
    const listener = vi.fn();
    const { result: divResult } = renderHook(
      (): React.RefObject<HTMLDivElement | null> =>
        useEvent<"click", HTMLDivElement>("click", listener),
    );
    const { result: buttonResult } = renderHook(
      (): React.RefObject<HTMLButtonElement | null> =>
        useEvent<"click", HTMLButtonElement>("click", listener),
    );

    expect(divResult.current).toHaveProperty("current");
    expect(buttonResult.current).toHaveProperty("current");
  });

  it("devrait fonctionner avec différents types d'événements", (): void => {
    const listener = vi.fn();
    const { result: clickResult } = renderHook(
      (): React.RefObject<HTMLDivElement | null> =>
        useEvent<"click", HTMLDivElement>("click", listener),
    );
    const { result: keydownResult } = renderHook(
      (): React.RefObject<HTMLDivElement | null> =>
        useEvent<"keydown", HTMLDivElement>("keydown", listener),
    );

    expect(clickResult.current).toHaveProperty("current");
    expect(keydownResult.current).toHaveProperty("current");
  });
});
