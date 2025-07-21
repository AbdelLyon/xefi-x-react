import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

describe("useDebouncedCallback", (): void => {
  beforeEach((): void => {
    vi.useFakeTimers();
  });

  it("devrait appeler la fonction après le délai", (): void => {
    const callback = vi.fn();
    const { result } = renderHook((): ((...args: unknown[]) => void) =>
      useDebouncedCallback(callback, 100),
    );

    act((): void => {
      result.current("test");
    });

    expect(callback).not.toHaveBeenCalled();

    act((): void => {
      vi.advanceTimersByTime(100);
    });

    expect(callback).toHaveBeenCalledWith("test");
  });

  it("devrait annuler les appels précédents", (): void => {
    const callback = vi.fn();
    const { result } = renderHook((): ((...args: unknown[]) => void) =>
      useDebouncedCallback(callback, 100),
    );

    act((): void => {
      result.current("test1");
      result.current("test2");
      result.current("test3");
    });

    expect(callback).not.toHaveBeenCalled();

    act((): void => {
      vi.advanceTimersByTime(100);
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("test3");
  });

  it("devrait nettoyer le timer au démontage", (): void => {
    const callback = vi.fn();
    const clearTimeoutSpy = vi.spyOn(window, "clearTimeout");
    const { result, unmount } = renderHook((): ((...args: unknown[]) => void) =>
      useDebouncedCallback(callback, 100),
    );

    act((): void => {
      result.current("test");
    });

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
    expect(callback).not.toHaveBeenCalled();
  });
});
