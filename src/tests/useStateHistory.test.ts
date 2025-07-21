import type { UseStateHistoryReturn } from "@/hooks/useStateHistory";
import { useStateHistory } from "@/hooks/useStateHistory";
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("useStateHistory", (): void => {
  it("devrait initialiser avec la valeur fournie", (): void => {
    const { result } = renderHook(
      (): UseStateHistoryReturn<string> => useStateHistory("initial"),
    );

    expect(result.current.value).toBe("initial");
    expect(result.current.state.history).toEqual(["initial"]);
    expect(result.current.state.current).toBe(0);
  });

  it("devrait permettre d'ajouter de nouvelles valeurs", (): void => {
    const { result } = renderHook(
      (): UseStateHistoryReturn<string> => useStateHistory("initial"),
    );

    act((): void => {
      result.current.handlers.set("nouvelle valeur");
    });

    expect(result.current.value).toBe("nouvelle valeur");
    expect(result.current.state.history).toEqual([
      "initial",
      "nouvelle valeur",
    ]);
    expect(result.current.state.current).toBe(1);
  });

  it("devrait permettre de naviguer en arrière", (): void => {
    const { result } = renderHook(
      (): UseStateHistoryReturn<string> => useStateHistory("initial"),
    );

    act((): void => {
      result.current.handlers.set("valeur 1");
      result.current.handlers.set("valeur 2");
    });

    act((): void => {
      result.current.handlers.back();
    });

    expect(result.current.value).toBe("valeur 1");
    expect(result.current.state.current).toBe(1);
  });

  it("devrait permettre de naviguer en avant", (): void => {
    const { result } = renderHook(
      (): UseStateHistoryReturn<string> => useStateHistory("initial"),
    );

    act((): void => {
      result.current.handlers.set("valeur 1");
      result.current.handlers.set("valeur 2");
      result.current.handlers.back(2);
      result.current.handlers.forward();
    });

    expect(result.current.value).toBe("valeur 1");
    expect(result.current.state.current).toBe(1);
  });

  it("devrait permettre de réinitialiser l'historique", (): void => {
    const { result } = renderHook(
      (): UseStateHistoryReturn<string> => useStateHistory("initial"),
    );

    act((): void => {
      result.current.handlers.set("valeur 1");
      result.current.handlers.set("valeur 2");
      result.current.handlers.reset();
    });

    expect(result.current.value).toBe("initial");
    expect(result.current.state.history).toEqual(["initial"]);
    expect(result.current.state.current).toBe(0);
  });

  it("devrait gérer les limites de navigation", (): void => {
    const { result } = renderHook(
      (): UseStateHistoryReturn<string> => useStateHistory("initial"),
    );

    act((): void => {
      result.current.handlers.back(10);
    });

    expect(result.current.value).toBe("initial");
    expect(result.current.state.current).toBe(0);

    act((): void => {
      result.current.handlers.forward(10);
    });

    expect(result.current.value).toBe("initial");
    expect(result.current.state.current).toBe(0);
  });

  it("devrait tronquer l'historique futur lors d'un nouvel ajout", (): void => {
    const { result } = renderHook(
      (): UseStateHistoryReturn<string> => useStateHistory("initial"),
    );

    act((): void => {
      result.current.handlers.set("valeur 1");
      result.current.handlers.set("valeur 2");
      result.current.handlers.back(1);
      result.current.handlers.set("nouvelle valeur");
    });

    expect(result.current.state.history).toEqual([
      "initial",
      "valeur 1",
      "nouvelle valeur",
    ]);
    expect(result.current.value).toBe("nouvelle valeur");
  });
});
