import { useState, useRef, useEffect } from "react";
const useInterval = (fn, interval, { autoInvoke = false } = {}) => {
  const [active, setActive] = useState(false);
  const intervalRef = useRef(null);
  const fnRef = useRef(fn);
  const start = () => {
    setActive((old) => {
      if (!old && (intervalRef.current === null || intervalRef.current === -1)) {
        intervalRef.current = window.setInterval(fnRef.current, interval);
      }
      return true;
    });
  };
  const stop = () => {
    var _a;
    setActive(false);
    window.clearInterval((_a = intervalRef.current) != null ? _a : -1);
    intervalRef.current = -1;
  };
  const toggle = () => {
    if (active) {
      stop();
    } else {
      start();
    }
  };
  useEffect(() => {
    fnRef.current = fn;
    if (active) {
      start();
    }
    return stop;
  }, [fn, active, interval]);
  useEffect(() => {
    if (autoInvoke) {
      start();
    }
    return () => stop();
  }, []);
  return { start, stop, toggle, active };
};
export {
  useInterval
};
