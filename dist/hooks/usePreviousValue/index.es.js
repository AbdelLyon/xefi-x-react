import { useRef, useEffect } from "react";
const usePreviousValue = (value) => {
  const ref = useRef(void 0);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};
export {
  usePreviousValue
};
