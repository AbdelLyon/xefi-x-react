import { useLocalStorage, type UseLocalStorageReturn } from "@/hooks/useLocalStorage";
import { renderHook } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("useLocalStorage", (): void => {
  it("devrait retourner la valeur par défaut", (): void => {
    const { result } = renderHook(
      (): UseLocalStorageReturn<string> =>
        useLocalStorage("test", "default"),
    );

    expect(result.current.value).toBe("default");
    expect(result.current.hasValue).toBe(false);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(typeof result.current.setValue).toBe("function");
    expect(typeof result.current.removeValue).toBe("function");
  });
});
