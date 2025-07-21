import type { ReactiveSet } from "@/hooks/useReactiveSet";
import { useReactiveSet } from "@/hooks/useReactiveSet";
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("useReactiveSet", (): void => {
  it("devrait créer un Set vide si aucune valeur initiale n'est fournie", (): void => {
    const { result } = renderHook((): ReactiveSet<unknown> => useReactiveSet());
    expect(result.current.size).toBe(0);
  });

  it("devrait initialiser avec les valeurs fournies", (): void => {
    const initialValues = [1, 2, 3];
    const { result } = renderHook(
      (): ReactiveSet<unknown> => useReactiveSet(initialValues),
    );

    expect(result.current.size).toBe(3);
    expect(Array.from(result.current)).toEqual(initialValues);
  });

  it("devrait permettre d'ajouter des éléments", (): void => {
    const { result } = renderHook(
      (): ReactiveSet<unknown> => useReactiveSet<number>(),
    );

    act((): void => {
      result.current.add(1);
    });

    expect(result.current.size).toBe(1);
    expect(result.current.has(1)).toBe(true);
  });

  it("devrait permettre de supprimer des éléments", (): void => {
    const { result } = renderHook(
      (): ReactiveSet<unknown> => useReactiveSet([1, 2, 3]),
    );

    act((): void => {
      result.current.delete(2);
    });

    expect(result.current.size).toBe(2);
    expect(result.current.has(2)).toBe(false);
  });

  it("devrait permettre de vider le Set", (): void => {
    const { result } = renderHook(
      (): ReactiveSet<unknown> => useReactiveSet([1, 2, 3]),
    );

    act((): void => {
      result.current.clear();
    });

    expect(result.current.size).toBe(0);
  });

  it("devrait maintenir l'unicité des valeurs", (): void => {
    const { result } = renderHook(
      (): ReactiveSet<unknown> => useReactiveSet<number>(),
    );

    act((): void => {
      result.current.add(1);
      result.current.add(1);
    });

    expect(result.current.size).toBe(1);
  });

  it("devrait fonctionner avec différents types de données", (): void => {
    const { result } = renderHook(
      (): ReactiveSet<unknown> => useReactiveSet<string | number>(),
    );

    act((): void => {
      result.current.add(1);
      result.current.add("test");
    });

    expect(result.current.size).toBe(2);
    expect(result.current.has(1)).toBe(true);
    expect(result.current.has("test")).toBe(true);
  });
});
