import { useState, useRef, useEffect } from "react";
const useDebouncedValue = (value, wait, options = { leading: false }) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const mountedRef = useRef(false);
  const timeoutRef = useRef(null);
  const cooldownRef = useRef(false);
  const cancel = () => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }
  };
  useEffect(() => {
    if (mountedRef.current) {
      if (!cooldownRef.current && options.leading) {
        cooldownRef.current = true;
        setDebouncedValue(value);
      } else {
        cancel();
        timeoutRef.current = window.setTimeout(() => {
          cooldownRef.current = false;
          setDebouncedValue(value);
        }, wait);
      }
    }
  }, [value, options.leading, wait]);
  useEffect(() => {
    mountedRef.current = true;
    return cancel;
  }, []);
  return { debouncedValue, cancel };
};
export {
  useDebouncedValue
};
