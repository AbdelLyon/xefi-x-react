import { useRef, useState } from "react";

export const useIntersection = <T extends HTMLElement = HTMLElement>(
  options?: ConstructorParameters<typeof IntersectionObserver>[1],
): {
  ref: (element: T | null) => void;
  entry: IntersectionObserverEntry | null;
} => {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  const observer = useRef<IntersectionObserver | null>(null);

  const ref = (element: T | null): void => {
    if (observer.current) {
      observer.current.disconnect();
      observer.current = null;
    }

    if (element === null) {
      setEntry(null);
      return;
    }

    observer.current = new IntersectionObserver(([_entry]): void => {
      setEntry(_entry);
    }, options);

    observer.current.observe(element);
  };

  return { ref, entry };
};
