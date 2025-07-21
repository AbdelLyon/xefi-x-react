import type { Ref } from "react";

type PossibleRef<T> = Ref<T> | undefined;
export type MergedRefCallback<T> = (node: T | null) => void;

const assignRef = <T>(ref: PossibleRef<T>, value: T | null): void => {
  if (typeof ref === "function") {
    ref(value);
  } else if (typeof ref === "object" && ref !== null && "current" in ref) {
    ref.current = value;
  }
};

const mergeRefs = <T>(...refs: PossibleRef<T>[]): MergedRefCallback<T> => {
  return (node: T | null): void => {
    refs.forEach((ref): void => assignRef(ref, node));
  };
};

export const useMergedRef = <T>(
  ...refs: PossibleRef<T>[]
): MergedRefCallback<T> => {
  return mergeRefs(...refs);
};
