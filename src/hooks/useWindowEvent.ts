import { useEffect } from "react";

export const useWindowEvent = <K extends string>(
  type: K,
  listener: K extends keyof WindowEventMap
    ? (this: Window, ev: WindowEventMap[K]) => void
    : (this: Window, ev: CustomEvent) => void,
  options?: boolean | AddEventListenerOptions,
): void => {
  useEffect((): (() => void) => {
    window.addEventListener(type, listener as EventListener, options);
    return (): void =>
      window.removeEventListener(type, listener as EventListener, options);
  }, [type, listener, options]);
};
