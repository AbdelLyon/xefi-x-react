import type { ToggleReturn } from "@/hooks/useToggle";
import { useToggle } from "@/hooks/useToggle";
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("useToggle", (): void => {
  it("devrait initialiser avec la première valeur des options par défaut", (): void => {
    const { result } = renderHook((): ToggleReturn<boolean> => useToggle());
    expect(result.current.current).toBe(false);
  });

  it("devrait basculer entre true et false par défaut", (): void => {
    const { result } = renderHook((): ToggleReturn<boolean> => useToggle());

    act((): void => {
      result.current.toggle();
    });
    expect(result.current.current).toBe(true);

    act((): void => {
      result.current.toggle();
    });
    expect(result.current.current).toBe(false);
  });

  it("devrait accepter des options personnalisées", (): void => {
    const options = [1, 2, 3] as const;
    const { result } = renderHook(
      (): ToggleReturn<2 | 3 | 1> => useToggle(options),
    );

    expect(result.current.current).toBe(1);

    act((): void => {
      result.current.toggle();
    });
    expect(result.current.current).toBe(2);

    act((): void => {
      result.current.toggle();
    });
    expect(result.current.current).toBe(3);

    act((): void => {
      result.current.toggle();
    });
    expect(result.current.current).toBe(1);
  });

  it("devrait permettre de basculer vers une valeur spécifique", (): void => {
    const options = [1, 2, 3] as const;
    const { result } = renderHook(
      (): ToggleReturn<2 | 1 | 3> => useToggle(options),
    );

    act((): void => {
      result.current.toggle(3);
    });
    expect(result.current.current).toBe(3);

    act((): void => {
      result.current.toggle(1);
    });
    expect(result.current.current).toBe(1);
  });

  it("devrait gérer les fonctions de mise à jour", (): void => {
    const { result } = renderHook((): ToggleReturn<boolean> => useToggle());

    act((): void => {
      result.current.toggle((prev: boolean): boolean => !prev);
    });
    expect(result.current.current).toBe(true);

    act((): void => {
      result.current.toggle((prev: boolean): boolean => !prev);
    });
    expect(result.current.current).toBe(false);
  });
});
