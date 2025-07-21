import { useEffect } from "react";
const useWindowEvent = (type, listener, options) => {
  useEffect(() => {
    window.addEventListener(type, listener, options);
    return () => window.removeEventListener(type, listener, options);
  }, [type, listener, options]);
};
export {
  useWindowEvent
};
