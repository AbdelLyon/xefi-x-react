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
    if (timeoutRef.current === undefined) {
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
  }, [delay]);

  return { start, clear };
};
