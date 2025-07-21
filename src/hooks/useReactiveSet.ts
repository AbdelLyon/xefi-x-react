import { useRef } from "react";
import { useRerender } from "./useRerender";

export type ReactiveSet<T> = Set<T>;

export const useReactiveSet = <T>(values?: T[]): ReactiveSet<T> => {
  const setRef = useRef<ReactiveSet<T>>(new Set(values));
  const forceUpdate = useRerender();

  setRef.current.add = (...args: Parameters<Set<T>["add"]>): ReactiveSet<T> => {
    const res = Set.prototype.add.apply(setRef.current, args);
    forceUpdate();
    return res;
  };

  setRef.current.clear = (...args: Parameters<Set<T>["clear"]>): void => {
    Set.prototype.clear.apply(setRef.current, args);
    forceUpdate();
  };

  setRef.current.delete = (...args: Parameters<Set<T>["delete"]>): boolean => {
    const res = Set.prototype.delete.apply(setRef.current, args);
    forceUpdate();
    return res;
  };

  return setRef.current;
};
