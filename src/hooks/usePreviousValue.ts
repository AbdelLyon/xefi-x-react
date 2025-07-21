import { useEffect, useRef } from "react";

export const usePreviousValue = <T>(value: T): T | undefined => {
  const ref = useRef<T>(undefined);

  useEffect((): void => {
    ref.current = value;
  }, [value]);

  return ref.current;
};
