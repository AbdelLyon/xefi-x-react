import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

describe("useDebouncedValue", (): void => {
  beforeEach((): void => {
    vi.useFakeTimers();
  });

  it("devrait initialiser avec la valeur fournie", (): void => {
    const { result } = renderHook(
      (): ReturnType<typeof useDebouncedValue> =>
        useDebouncedValue("initial", 100),
    );
    expect(result.current.debouncedValue).toBe("initial");
  });

  it("devrait mettre à jour la valeur après le délai", (): void => {
    const { result, rerender } = renderHook(
      ({ value }): ReturnType<typeof useDebouncedValue> =>
        useDebouncedValue(value, 100),
      { initialProps: { value: "initial" } },
    );

    rerender({ value: "nouvelle valeur" });
    expect(result.current.debouncedValue).toBe("initial");

    act((): void => {
      vi.advanceTimersByTime(100);
    });

    expect(result.current.debouncedValue).toBe("nouvelle valeur");
  });

  it("devrait annuler les mises à jour précédentes", (): void => {
    const { result, rerender } = renderHook(
      ({ value }): ReturnType<typeof useDebouncedValue> =>
        useDebouncedValue(value, 100),
      { initialProps: { value: "initial" } },
    );

    rerender({ value: "valeur1" });
    rerender({ value: "valeur2" });
    rerender({ value: "valeur3" });

    expect(result.current.debouncedValue).toBe("initial");

    act((): void => {
      vi.advanceTimersByTime(100);
    });

    expect(result.current.debouncedValue).toBe("valeur3");
  });

  it("devrait mettre à jour immédiatement avec l'option leading", (): void => {
    const { result, rerender } = renderHook(
      ({ value }): ReturnType<typeof useDebouncedValue> =>
        useDebouncedValue(value, 100, { leading: true }),
      { initialProps: { value: "initial" } },
    );

    rerender({ value: "nouvelle valeur" });
    expect(result.current.debouncedValue).toBe("nouvelle valeur");
  });

  it("devrait permettre d'annuler une mise à jour en attente", (): void => {
    const { result, rerender } = renderHook(
      ({ value }): ReturnType<typeof useDebouncedValue> =>
        useDebouncedValue(value, 100),
      { initialProps: { value: "initial" } },
    );

    rerender({ value: "nouvelle valeur" });

    act((): void => {
      result.current.cancel();
    });

    act((): void => {
      vi.advanceTimersByTime(100);
    });

    expect(result.current.debouncedValue).toBe("initial");
  });

  it("devrait nettoyer le timer au démontage", (): void => {
    const clearTimeoutSpy = vi.spyOn(window, "clearTimeout");
    const { rerender, unmount } = renderHook(
      ({ value }): ReturnType<typeof useDebouncedValue> =>
        useDebouncedValue(value, 100),
      { initialProps: { value: "initial" } },
    );

    rerender({ value: "nouvelle valeur" });
    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
  });
});
