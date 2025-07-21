import { useLocalStorage } from "@/hooks/useLocalStorage";
import { renderHook } from "@testing-library/react";
import { describe, it, expect } from "vitest";

type Storage = readonly [
  string,
  (value: string | ((val: string) => string)) => void,
  () => void,
];
describe("useLocalStorage", (): void => {
  it("devrait retourner la valeur par défaut", (): void => {
    const { result } = renderHook(
      (): Storage =>
        useLocalStorage({
          key: "test",
          defaultValue: "default",
        }),
    );

    expect(result.current[0]).toBe("default");
    expect(Array.isArray(result.current)).toBe(true);
    expect(result.current.length).toBe(3);
  });
});
