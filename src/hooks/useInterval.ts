import { useCallback, useEffect, useRef, useState } from "react";

interface UseIntervalOptions {
  autoInvoke?: boolean;
}

export interface UseIntervalReturn {
  start: () => void;
  stop: () => void;
  toggle: () => void;
  active: boolean;
}

export const useInterval = (
  fn: () => void,
  interval: number,
  { autoInvoke = false }: UseIntervalOptions = {},
): UseIntervalReturn => {
  const [active, setActive] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);
  const fnRef = useRef<() => void>(fn);

  const start = useCallback((): void => {
    setActive((old): boolean => {
      if (
        !old &&
        (intervalRef.current === null || intervalRef.current === -1)
      ) {
        intervalRef.current = window.setInterval(fnRef.current, interval);
      }
      return true;
    });
  }, [interval]);

  const stop = (): void => {
    setActive(false);
    window.clearInterval(intervalRef.current ?? -1);
    intervalRef.current = -1;
  };

  const toggle = (): void => {
    if (active) {
      stop();
    } else {
      start();
    }
  };

  useEffect((): (() => void) => {
    fnRef.current = fn;
    if (active) {
      start();
    }
    return stop;
  }, [fn, active, interval, start]);

  useEffect((): (() => void) => {
    if (autoInvoke) {
      start();
    }
    return (): void => stop();
  }, [autoInvoke, start]);

  return { start, stop, toggle, active };
};
