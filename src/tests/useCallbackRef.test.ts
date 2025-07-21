import { useCallbackRef } from "@/hooks/useCallbackRef";
import { renderHook } from "@testing-library/react";
import type { Mock } from "vitest";
import { describe, it, expect, vi } from "vitest";

type CallbackFunction = (...args: unknown[]) => void;
type MockCallback = Mock<CallbackFunction>;

describe("useCallbackRef", (): void => {
  it("devrait retourner une fonction qui appelle le callback", (): void => {
    const callback: MockCallback = vi.fn();
    const { result } = renderHook(
      (): CallbackFunction => useCallbackRef(callback),
    );

    result.current("test");
    expect(callback).toHaveBeenCalledWith("test");
  });

  it("devrait mettre à jour la référence quand le callback change", (): void => {
    const firstCallback: MockCallback = vi.fn();
    const secondCallback: MockCallback = vi.fn();

    const { result, rerender } = renderHook(
      (cb: CallbackFunction): CallbackFunction => useCallbackRef(cb),
      {
        initialProps: firstCallback,
      },
    );

    result.current("test1");
    expect(firstCallback).toHaveBeenCalledWith("test1");

    rerender(secondCallback);

    result.current("test2");
    expect(secondCallback).toHaveBeenCalledWith("test2");
  });

  it("devrait gérer un callback undefined", (): void => {
    const { result } = renderHook(
      (): CallbackFunction => useCallbackRef(undefined),
    );

    expect((): void => result.current()).not.toThrow();
  });
});
