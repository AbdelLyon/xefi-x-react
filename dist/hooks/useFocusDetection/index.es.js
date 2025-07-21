import { useRef, useState, useEffect } from "react";
const containsRelatedTarget = (event) => {
  if (event.currentTarget instanceof HTMLElement && event.relatedTarget instanceof HTMLElement) {
    return event.currentTarget.contains(event.relatedTarget);
  }
  return false;
};
const useFocusDetection = ({
  onBlur,
  onFocus
} = {}) => {
  const ref = useRef(null);
  const [focused, setFocused] = useState(false);
  const focusedRef = useRef(false);
  const _setFocused = (value) => {
    setFocused(value);
    focusedRef.current = value;
  };
  useEffect(() => {
    const handleFocusIn = (event) => {
      if (!focusedRef.current) {
        _setFocused(true);
        onFocus == null ? void 0 : onFocus(event);
      }
    };
    const handleFocusOut = (event) => {
      if (focusedRef.current && !containsRelatedTarget(event)) {
        _setFocused(false);
        onBlur == null ? void 0 : onBlur(event);
      }
    };
    if (ref.current) {
      const element = ref.current;
      element.addEventListener("focusin", handleFocusIn);
      element.addEventListener("focusout", handleFocusOut);
      return () => {
        element.removeEventListener("focusin", handleFocusIn);
        element.removeEventListener("focusout", handleFocusOut);
      };
    }
  }, [onFocus, onBlur]);
  return { ref, focused };
};
export {
  useFocusDetection
};
