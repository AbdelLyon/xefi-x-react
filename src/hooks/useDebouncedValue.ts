import { useEffect, useRef, useState } from "react";

export const useDebouncedValue = <T>(
  value: T,
  wait: number,
  options = { leading: false },
): { debouncedValue: T; cancel: () => void } => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const mountedRef = useRef(false);
  const timeoutRef = useRef<number | null>(null);
  const cooldownRef = useRef(false);

  const cancel = (): void => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }
  };

  useEffect((): void => {
    if (mountedRef.current) {
      if (!cooldownRef.current && options.leading) {
        cooldownRef.current = true;
        setDebouncedValue(value);
      } else {
        cancel();
        timeoutRef.current = window.setTimeout((): void => {
          cooldownRef.current = false;
          setDebouncedValue(value);
        }, wait);
      }
    }
  }, [value, options.leading, wait]);

  useEffect((): (() => void) => {
    mountedRef.current = true;
    return cancel;
  }, []);

  return { debouncedValue, cancel };
};
