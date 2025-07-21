import { useEffect, useRef, useState, useCallback } from "react";

export type UseMediaQueryOptions = {
  getInitialValueInEffect?: boolean;
  initialValue?: boolean;
};

function attachMediaListener(
  query: MediaQueryList,
  callback: (event: MediaQueryListEvent) => void,
): () => void {
  query.addEventListener("change", callback);
  return (): void => query.removeEventListener("change", callback);
}

function getInitialValue(query: string, initialValue?: boolean): boolean {
  if (typeof initialValue === "boolean") {
    return initialValue;
  }

  if (typeof window !== "undefined" && "matchMedia" in window) {
    try {
      return window.matchMedia(query).matches;
    } catch (e) {
      console.warn("Error while matching media query:", e);
      return false;
    }
  }

  return false;
}
export function useMediaQuery(
  query: string,
  options: UseMediaQueryOptions = {},
): boolean {
  const { getInitialValueInEffect = false, initialValue } = options;

  // Par défaut, on suppose un écran desktop si on est côté serveur
  const [matches, setMatches] = useState<boolean>((): boolean => {
    // Si on est côté serveur, on présume desktop (ou la valeur spécifiée)
    if (typeof window === "undefined") {
      return initialValue ?? true; // Présume desktop par défaut
    }

    // Sinon, on utilise la vraie valeur
    return getInitialValueInEffect
      ? (initialValue ?? false)
      : getInitialValue(query, initialValue);
  });

  // Le reste du code reste inchangé
  const queryRef = useRef<MediaQueryList | null>(null);
  const handleChange = useCallback((event: MediaQueryListEvent): void => {
    setMatches(event.matches);
  }, []);

  useEffect((): (() => void) | undefined => {
    if (typeof window === "undefined" || !("matchMedia" in window)) {
      return undefined;
    }

    try {
      queryRef.current = window.matchMedia(query);
      if (getInitialValueInEffect) {
        setMatches(queryRef.current.matches);
      }

      return attachMediaListener(queryRef.current, handleChange);
    } catch (e) {
      console.error("Error setting up media query:", e);
      return undefined;
    }
  }, [query, getInitialValueInEffect, handleChange]);

  return matches;
}
