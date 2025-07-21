var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
import { useState, useRef, useEffect, useCallback } from "react";
const useAsyncState = (asyncFn, executeOnMount = false) => {
  const [state, setState] = useState({
    data: null,
    loading: false,
    error: null,
    finished: false
  });
  const isMountedRef = useRef(true);
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  const execute = useCallback(() => __async(null, null, function* () {
    setState((prev) => __spreadProps(__spreadValues({}, prev), {
      loading: true,
      error: null,
      finished: false
    }));
    try {
      const result = yield asyncFn();
      if (isMountedRef.current) {
        setState({
          data: result,
          loading: false,
          error: null,
          finished: true
        });
      }
      return result;
    } catch (error) {
      if (isMountedRef.current) {
        setState({
          data: null,
          loading: false,
          error,
          finished: true
        });
      }
      throw error;
    }
  }), [asyncFn]);
  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
      finished: false
    });
  }, []);
  const setData = useCallback((data) => {
    setState((prev) => __spreadProps(__spreadValues({}, prev), {
      data,
      error: null
    }));
  }, []);
  const setError = useCallback((error) => {
    setState((prev) => __spreadProps(__spreadValues({}, prev), {
      error,
      data: null
    }));
  }, []);
  useEffect(() => {
    if (executeOnMount) {
      execute().catch(() => {
      });
    }
  }, [executeOnMount, execute]);
  return __spreadProps(__spreadValues({}, state), {
    execute,
    reset,
    setData,
    setError
  });
};
export {
  useAsyncState
};
