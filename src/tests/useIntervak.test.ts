import type { UseIntervalReturn } from "@/hooks/useInterval";
import { useInterval } from "@/hooks/useInterval";
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

describe("useInterval", (): void => {
  beforeEach((): void => {
    vi.useFakeTimers();
    vi.clearAllTimers();
  });

  it("devrait retourner les méthodes et l'état attendus", (): void => {
    const { result } = renderHook(
      (): UseIntervalReturn => useInterval((): void => {}, 1000),
    );

    expect(result.current.active).toBe(false);
    expect(typeof result.current.start).toBe("function");
    expect(typeof result.current.stop).toBe("function");
    expect(typeof result.current.toggle).toBe("function");
  });

  it("devrait démarrer avec autoInvoke", (): void => {
    const callback = vi.fn();
    renderHook(
      (): UseIntervalReturn =>
        useInterval(callback, 1000, { autoInvoke: true }),
    );

    expect(callback).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
    vi.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it("devrait pouvoir démarrer et arrêter manuellement", (): void => {
    const callback = vi.fn();
    const { result } = renderHook(
      (): UseIntervalReturn => useInterval(callback, 1000),
    );

    act((): void => {
      result.current.start();
    });

    vi.advanceTimersByTime(2500);
    expect(callback).toHaveBeenCalledTimes(2);

    act((): void => {
      result.current.stop();
    });

    vi.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it("devrait basculer correctement", (): void => {
    const callback = vi.fn();
    const { result } = renderHook(
      (): UseIntervalReturn => useInterval(callback, 1000),
    );

    act((): void => {
      result.current.toggle();
    });

    vi.advanceTimersByTime(1500);
    expect(callback).toHaveBeenCalledTimes(1);

    act((): void => {
      result.current.toggle(); // stop
    });

    vi.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("devrait gérer les changements d'intervalle", (): void => {
    const callback = vi.fn();
    const { rerender } = renderHook(
      ({ interval }): UseIntervalReturn =>
        useInterval(callback, interval, { autoInvoke: true }),
      { initialProps: { interval: 1000 } },
    );

    vi.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);

    rerender({ interval: 500 });

    vi.advanceTimersByTime(500);
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it("devrait nettoyer l'intervalle au démontage", (): void => {
    const callback = vi.fn();
    const { unmount } = renderHook(
      (): UseIntervalReturn =>
        useInterval(callback, 1000, { autoInvoke: true }),
    );

    vi.advanceTimersByTime(500);
    unmount();
    vi.advanceTimersByTime(1000);

    expect(callback).not.toHaveBeenCalled();
  });
});
