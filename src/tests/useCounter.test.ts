import { useCounter } from "@/hooks/useCounter";
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("useCounter hook", (): void => {
  it("devrait initialiser avec la valeur par défaut", (): void => {
    const { result } = renderHook(
      (): ReturnType<typeof useCounter> => useCounter(),
    );
    expect(result.current.count).toBe(0);
  });

  it("devrait initialiser avec une valeur personnalisée", (): void => {
    const { result } = renderHook(
      (): ReturnType<typeof useCounter> => useCounter(5),
    );
    expect(result.current.count).toBe(5);
  });

  it("devrait incrémenter correctement", (): void => {
    const { result } = renderHook(
      (): ReturnType<typeof useCounter> => useCounter(0),
    );

    act((): void => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  it("devrait décrémenter correctement", (): void => {
    const { result } = renderHook(
      (): ReturnType<typeof useCounter> => useCounter(0),
    );

    act((): void => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(-1);
  });

  it("devrait respecter la valeur maximale", (): void => {
    const { result } = renderHook(
      (): ReturnType<typeof useCounter> => useCounter(5, { max: 5 }),
    );

    act((): void => {
      result.current.increment();
    });

    expect(result.current.count).toBe(5);
  });

  it("devrait respecter la valeur minimale", (): void => {
    const { result } = renderHook(
      (): ReturnType<typeof useCounter> => useCounter(-5, { min: -5 }),
    );

    act((): void => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(-5);
  });

  it("devrait permettre de définir une valeur", (): void => {
    const { result } = renderHook(
      (): ReturnType<typeof useCounter> => useCounter(0),
    );

    act((): void => {
      result.current.set(10);
    });

    expect(result.current.count).toBe(10);
  });

  it("devrait réinitialiser à la valeur initiale", (): void => {
    const { result } = renderHook(
      (): ReturnType<typeof useCounter> => useCounter(5),
    );

    act((): void => {
      result.current.increment();
      result.current.reset();
    });

    expect(result.current.count).toBe(5);
  });
});
