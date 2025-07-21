import { useRef, useCallback, useEffect } from "react";
const useTimeout = (callback, delay, { autoInvoke = false } = {}) => {
  const timeoutRef = useRef(null);
  const start = useCallback((...params) => {
    if (timeoutRef.current === void 0) {
      timeoutRef.current = window.setTimeout(() => {
        callback(...params);
        timeoutRef.current = null;
      }, delay);
    }
  }, [callback, delay]);
  const clear = () => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };
  useEffect(() => {
    if (autoInvoke) {
      start();
    }
    return clear;
  }, [autoInvoke, start]);
  return { start, clear };
};
export {
  useTimeout
};
