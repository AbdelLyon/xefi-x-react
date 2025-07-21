import { useEffect, useRef } from "react";
import { useCallbackRef } from "./useCallbackRef";

export const useDebouncedCallback = <T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  const handleCallback = useCallbackRef(callback);
  const debounceTimerRef = useRef(0);
  useEffect(
    (): (() => void) => (): void =>
      window.clearTimeout(debounceTimerRef.current),
    [],
  );

  return (...args: Parameters<T>): void => {
    window.clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = window.setTimeout(
      (): unknown => handleCallback(...args),
      delay,
    );
  };
};
