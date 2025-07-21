import { useRef } from "react";
import { useRerender } from "../useRerender/index.es.js";
const useReactiveSet = (values) => {
  const setRef = useRef(new Set(values));
  const forceUpdate = useRerender();
  setRef.current.add = (...args) => {
    const res = Set.prototype.add.apply(setRef.current, args);
    forceUpdate();
    return res;
  };
  setRef.current.clear = (...args) => {
    Set.prototype.clear.apply(setRef.current, args);
    forceUpdate();
  };
  setRef.current.delete = (...args) => {
    const res = Set.prototype.delete.apply(setRef.current, args);
    forceUpdate();
    return res;
  };
  return setRef.current;
};
export {
  useReactiveSet
};
