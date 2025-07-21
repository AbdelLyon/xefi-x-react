import type { SetStateAction } from "react";
import { useEffect, useRef, useState } from "react";

export const useDebouncedState = <T>(
  defaultValue: T,
  wait: number,
  options = { leading: false },
): readonly [T, (newValue: SetStateAction<T>) => void] => {
  const [value, setValue] = useState(defaultValue);
  const timeoutRef = useRef<number | null>(null);
  const leadingRef = useRef(true);

  const clearTimeout = (): void => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }
  };
  useEffect((): (() => void) => clearTimeout, []);

  const debouncedSetValue = (newValue: SetStateAction<T>): void => {
    clearTimeout();
    if (leadingRef.current && options.leading) {
      setValue(newValue);
    } else {
      timeoutRef.current = window.setTimeout((): void => {
        leadingRef.current = true;
        setValue(newValue);
      }, wait);
    }
    leadingRef.current = false;
  };

  return [value, debouncedSetValue] as const;
};
