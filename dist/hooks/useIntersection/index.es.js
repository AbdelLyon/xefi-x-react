import { useState, useRef } from "react";
const useIntersection = (options) => {
  const [entry, setEntry] = useState(null);
  const observer = useRef(null);
  const ref = (element) => {
    if (observer.current) {
      observer.current.disconnect();
      observer.current = null;
    }
    if (element === null) {
      setEntry(null);
      return;
    }
    observer.current = new IntersectionObserver(([_entry]) => {
      setEntry(_entry);
    }, options);
    observer.current.observe(element);
  };
  return { ref, entry };
};
export {
  useIntersection
};
