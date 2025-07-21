import { clampNumber } from "@/utils/utils";
import { useState } from "react";

const DEFAULT_OPTIONS = {
  min: -Infinity,
  max: Infinity,
};

export const useCounter = (
  initialValue = 0,
  options?: Partial<{ min: number; max: number }>,
): {
  count: number;
  increment: () => void;
  decrement: () => void;
  set: (value: number) => void;
  reset: () => void;
} => {
  const { min, max } = { ...DEFAULT_OPTIONS, ...options };
  const [count, setCount] = useState(clampNumber(initialValue, min, max));

  const increment = (): void =>
    setCount((current): number => clampNumber(current + 1, min, max));
  const decrement = (): void =>
    setCount((current): number => clampNumber(current - 1, min, max));
  const set = (value: number): void => setCount(clampNumber(value, min, max));
  const reset = (): void => setCount(clampNumber(initialValue, min, max));

  return {
    count,
    increment,
    decrement,
    set,
    reset,
  };
};
