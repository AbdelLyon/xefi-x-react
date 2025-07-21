import { useEffect, useRef } from "react";

const DEFAULT_EVENTS = ["mousedown", "touchstart"];

export const useClickOutside = <T extends HTMLElement>(
  handler: () => void,
  events?: string[] | null,
  nodes?: (HTMLElement | null)[],
): React.RefObject<T | null> => {
  const ref = useRef<T>(null);

  useEffect((): (() => void) => {
    const listener = (event: Event): void => {
      const { target } = event ?? {};
      if (Array.isArray(nodes)) {
        const shouldIgnore =
          (target as HTMLElement)?.hasAttribute("data-ignore-outside-clicks") ||
          (!document.body.contains(target as Node) &&
            (target as HTMLElement).tagName !== "HTML");
        const shouldTrigger = nodes.every(
          (node): boolean => !!node && !event.composedPath().includes(node),
        );
        if (shouldTrigger && !shouldIgnore) {
          handler();
        }
      } else if (ref.current && !ref.current.contains(target as Node)) {
        handler();
      }
    };

    (events || DEFAULT_EVENTS).forEach((fn): void =>
      document.addEventListener(fn, listener),
    );

    return (): void => {
      (events || DEFAULT_EVENTS).forEach((fn): void =>
        document.removeEventListener(fn, listener),
      );
    };
  }, [ref, handler, nodes, events]);

  return ref;
};
