import { usePreviousValue } from "@/hooks/usePreviousValue";
import { renderHook } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("usePreviousValue hook", (): void => {
  it("devrait retourner undefined lors du premier rendu", (): void => {
    const { result } = renderHook((): "test" | undefined =>
      usePreviousValue("test"),
    );
    expect(result.current).toBeUndefined();
  });

  it("devrait retourner la valeur précédente après un changement", (): void => {
    const { result, rerender } = renderHook(
      ({ value }): number | undefined => usePreviousValue(value),
      {
        initialProps: { value: 1 },
      },
    );

    expect(result.current).toBeUndefined();

    rerender({ value: 2 });
    expect(result.current).toBe(1);

    rerender({ value: 3 });
    expect(result.current).toBe(2);
  });

  it("devrait fonctionner avec différents types de données", (): void => {
    const { result, rerender } = renderHook(
      ({
        value,
      }):
        | {
            test: number;
          }
        | undefined => usePreviousValue(value),
      {
        initialProps: { value: { test: 1 } },
      },
    );

    expect(result.current).toBeUndefined();

    const newValue = { test: 2 };
    rerender({ value: newValue });
    expect(result.current).toEqual({ test: 1 });
  });
});
