import { useEffect, useRef, useState } from "react";

export interface UseFocusDetectionOptions {
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
}

const containsRelatedTarget = (event: FocusEvent): boolean => {
  if (
    event.currentTarget instanceof HTMLElement &&
    event.relatedTarget instanceof HTMLElement
  ) {
    return event.currentTarget.contains(event.relatedTarget);
  }
  return false;
};

export const useFocusDetection = <T extends HTMLElement>({
  onBlur,
  onFocus,
}: UseFocusDetectionOptions = {}): {
  ref: React.RefObject<T>;
  focused: boolean;
} => {
  const ref = useRef<T>(null);
  const [focused, setFocused] = useState(false);
  const focusedRef = useRef(false);

  const _setFocused = (value: boolean): void => {
    setFocused(value);
    focusedRef.current = value;
  };

  useEffect((): (() => void) | undefined => {
    const handleFocusIn = (event: FocusEvent): void => {
      if (!focusedRef.current) {
        _setFocused(true);
        onFocus?.(event);
      }
    };

    const handleFocusOut = (event: FocusEvent): void => {
      if (focusedRef.current && !containsRelatedTarget(event)) {
        _setFocused(false);
        onBlur?.(event);
      }
    };

    if (ref.current) {
      const element = ref.current;
      element.addEventListener("focusin", handleFocusIn);
      element.addEventListener("focusout", handleFocusOut);

      return (): void => {
        element.removeEventListener("focusin", handleFocusIn);
        element.removeEventListener("focusout", handleFocusOut);
      };
    }
  }, [onFocus, onBlur]);

  return { ref: ref as React.RefObject<T>, focused };
};
