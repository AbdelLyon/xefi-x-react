import { useRerender } from "@/hooks/useRerender";
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("useRerender", (): void => {
  it("devrait retourner une fonction de mise à jour", (): void => {
    const { result } = renderHook((): (() => void) => useRerender());
    expect(typeof result.current).toBe("function");
  });

  it("devrait déclencher un nouveau rendu quand appelé", (): void => {
    let renderCount = 0;
    const { result } = renderHook((): (() => void) => {
      renderCount++;
      return useRerender();
    });

    expect(renderCount).toBe(1);

    act((): void => {
      result.current();
    });

    expect(renderCount).toBe(2);
  });

  it("devrait permettre des rendus multiples", (): void => {
    let renderCount = 0;
    const { result } = renderHook((): (() => void) => {
      renderCount++;
      return useRerender();
    });

    act((): void => {
      result.current();
    });

    act((): void => {
      result.current();
    });

    expect(renderCount).toBe(3); // 1 initial + 2 rerenders
  });
});
