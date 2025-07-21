import { useWindowEvent } from "@/hooks/useWindowEvent";
import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

describe("useWindowEvent", (): void => {
  it("devrait ajouter un event listener à window", (): void => {
    const addEventListenerSpy = vi.spyOn(window, "addEventListener");
    const listener = vi.fn();

    renderHook((): void => useWindowEvent("click", listener));

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "click",
      listener,
      undefined,
    );
  });

  it("devrait supprimer l'event listener au démontage", (): void => {
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");
    const listener = vi.fn();

    const { unmount } = renderHook((): void =>
      useWindowEvent("click", listener),
    );
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "click",
      listener,
      undefined,
    );
  });

  it("devrait prendre en compte les options", (): void => {
    const addEventListenerSpy = vi.spyOn(window, "addEventListener");
    const listener = vi.fn();
    const options = { capture: true };

    renderHook((): void => useWindowEvent("click", listener, options));

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "click",
      listener,
      options,
    );
  });

  it("devrait mettre à jour l'event listener si le type change", (): void => {
    const addEventListenerSpy = vi.spyOn(window, "addEventListener");
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");
    const listener = vi.fn();

    const { rerender } = renderHook(
      ({ type }): void => useWindowEvent(type, listener),
      { initialProps: { type: "click" } },
    );

    rerender({ type: "keydown" });

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "click",
      listener,
      undefined,
    );
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "keydown",
      listener,
      undefined,
    );
  });
});
