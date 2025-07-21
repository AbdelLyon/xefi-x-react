import { useEffect, useRef } from "react";

interface UseTimeoutOptions {
  autoInvoke?: boolean;
}

interface UseTimeoutReturn {
  start: (...params: unknown[]) => void;
  clear: () => void;
}

export const useTimeout = (
  callback: (...params: unknown[]) => void,
  delay: number,
  { autoInvoke = false }: UseTimeoutOptions = {},
): UseTimeoutReturn => {
  const timeoutRef = useRef<number | null>(null);

  const start = (...params: unknown[]): void => {
    // Correction ici : vérifier null au lieu de undefined
    if (timeoutRef.current === null) {
      timeoutRef.current = window.setTimeout((): void => {
        callback(...params);
        timeoutRef.current = null;
      }, delay);
    }
  };

  const clear = (): void => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect((): (() => void) => {
    if (autoInvoke) {
      start();
    }
    return clear;
  }, [delay, autoInvoke]); // Ajout de autoInvoke dans les dépendances

  return { start, clear };
};

// Les tests restent les mêmes
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

describe("useTimeout", (): void => {
  beforeEach((): void => {
    vi.useFakeTimers();
    vi.clearAllTimers();
  });

  it("devrait retourner les méthodes start et clear", (): void => {
    const { result } = renderHook(
      (): UseTimeoutReturn => useTimeout((): void => {}, 1000),
    );

    expect(typeof result.current.start).toBe("function");
    expect(typeof result.current.clear).toBe("function");
  });

  it("devrait exécuter le callback après le délai", (): void => {
    const callback = vi.fn();
    const { result } = renderHook(
      (): UseTimeoutReturn => useTimeout(callback, 1000),
    );

    act((): void => {
      result.current.start();
    });

    expect(callback).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("devrait démarrer automatiquement avec autoInvoke", (): void => {
    const callback = vi.fn();
    renderHook(
      (): UseTimeoutReturn => useTimeout(callback, 1000, { autoInvoke: true }),
    );

    expect(callback).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("devrait pouvoir être annulé", (): void => {
    const callback = vi.fn();
    const { result } = renderHook(
      (): UseTimeoutReturn => useTimeout(callback, 1000),
    );

    act((): void => {
      result.current.start();
      result.current.clear();
    });

    vi.advanceTimersByTime(1000);
    expect(callback).not.toHaveBeenCalled();
  });

  it("devrait passer les paramètres au callback", (): void => {
    const callback = vi.fn();
    const { result } = renderHook(
      (): UseTimeoutReturn => useTimeout(callback, 1000),
    );

    act((): void => {
      result.current.start("test", 123);
    });

    vi.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledWith("test", 123);
  });

  it("devrait nettoyer le timeout au démontage", (): void => {
    const callback = vi.fn();
    const { unmount } = renderHook(
      (): UseTimeoutReturn => useTimeout(callback, 1000, { autoInvoke: true }),
    );

    unmount();
    vi.advanceTimersByTime(1000);
    expect(callback).not.toHaveBeenCalled();
  });

  it("ne devrait pas démarrer plusieurs timeouts simultanément", (): void => {
    const callback = vi.fn();
    const { result } = renderHook(
      (): UseTimeoutReturn => useTimeout(callback, 1000),
    );

    act((): void => {
      result.current.start();
      result.current.start();
      result.current.start();
    });

    vi.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
