import { useReducer } from "react";

const reducer = (value: number): number => (value + 1) % 1000000;

export const useRerender = (): (() => void) => {
  const [, update] = useReducer(reducer, 0);
  return update;
};
