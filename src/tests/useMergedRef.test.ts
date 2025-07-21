import type { MergedRefCallback } from "@/hooks/useMergedRef";
import { useMergedRef } from "@/hooks/useMergedRef";
import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

describe("useMergedRef", (): void => {
  it("devrait fusionner les refs de type fonction", (): void => {
    const ref1 = vi.fn();
    const ref2 = vi.fn();
    const { result } = renderHook(
      (): MergedRefCallback<unknown> => useMergedRef(ref1, ref2),
    );

    const element = document.createElement("div");
    result.current(element);

    expect(ref1).toHaveBeenCalledWith(element);
    expect(ref2).toHaveBeenCalledWith(element);
  });

  it("devrait fusionner les refs de type objet", (): void => {
    const ref1 = { current: null as HTMLDivElement | null };
    const ref2 = { current: null as HTMLDivElement | null };
    const { result } = renderHook(
      (): MergedRefCallback<HTMLDivElement> => useMergedRef(ref1, ref2),
    );

    const element = document.createElement("div");
    result.current(element);

    expect(ref1.current).toBe(element);
    expect(ref2.current).toBe(element);
  });
  it("devrait gérer les refs mixtes (fonction et objet)", (): void => {
    const ref1 = vi.fn();
    const ref2 = { current: null };
    const { result } = renderHook(
      (): MergedRefCallback<unknown> => useMergedRef(ref1, ref2),
    );

    const element = document.createElement("div");
    result.current(element);

    expect(ref1).toHaveBeenCalledWith(element);
    expect(ref2.current).toBe(element);
  });

  it("devrait gérer les refs undefined", (): void => {
    const ref1 = { current: null as HTMLDivElement | null };
    const ref2 = undefined;
    const { result } = renderHook(
      (): MergedRefCallback<HTMLDivElement> => useMergedRef(ref1, ref2),
    );

    const element = document.createElement("div");
    result.current(element);

    expect(ref1.current).toBe(element);
    expect((): void => result.current(element)).not.toThrow();
  });

  it("devrait gérer les valeurs null", (): void => {
    const ref1 = vi.fn();
    const ref2 = { current: null };
    const { result } = renderHook(
      (): MergedRefCallback<unknown> => useMergedRef(ref1, ref2),
    );

    result.current(null);

    expect(ref1).toHaveBeenCalledWith(null);
    expect(ref2.current).toBe(null);
  });
});
