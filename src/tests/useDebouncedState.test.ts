import { useDebouncedState } from "@/hooks/useDebouncedState";
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

describe("useDebouncedState", (): void => {
  beforeEach((): void => {
    vi.useFakeTimers();
  });

  it("devrait initialiser avec la valeur par défaut", (): void => {
    const { result } = renderHook(
      (): readonly [string, (newValue: React.SetStateAction<string>) => void] =>
        useDebouncedState("initial", 100),
    );
    expect(result.current[0]).toBe("initial");
  });

  it("devrait mettre à jour la valeur après le délai", (): void => {
    const { result } = renderHook(
      (): readonly [string, (newValue: React.SetStateAction<string>) => void] =>
        useDebouncedState("initial", 100),
    );

    act((): void => {
      result.current[1]("nouvelle valeur");
    });

    expect(result.current[0]).toBe("initial");

    act((): void => {
      vi.advanceTimersByTime(100);
    });

    expect(result.current[0]).toBe("nouvelle valeur");
  });

  it("devrait annuler les mises à jour précédentes", (): void => {
    const { result } = renderHook(
      (): readonly [string, (newValue: React.SetStateAction<string>) => void] =>
        useDebouncedState("initial", 100),
    );

    act((): void => {
      result.current[1]("valeur1");
      result.current[1]("valeur2");
      result.current[1]("valeur3");
    });

    expect(result.current[0]).toBe("initial");

    act((): void => {
      vi.advanceTimersByTime(100);
    });

    expect(result.current[0]).toBe("valeur3");
  });

  it("devrait mettre à jour immédiatement avec l'option leading", (): void => {
    const { result } = renderHook(
      (): readonly [string, (newValue: React.SetStateAction<string>) => void] =>
        useDebouncedState("initial", 100, { leading: true }),
    );

    act((): void => {
      result.current[1]("nouvelle valeur");
    });

    expect(result.current[0]).toBe("nouvelle valeur");
  });

  it("devrait nettoyer le timer au démontage", (): void => {
    const clearTimeoutSpy = vi.spyOn(window, "clearTimeout");
    const { result, unmount } = renderHook(
      (): readonly [string, (newValue: React.SetStateAction<string>) => void] =>
        useDebouncedState("initial", 100),
    );

    act((): void => {
      result.current[1]("nouvelle valeur");
    });

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
  });
});
