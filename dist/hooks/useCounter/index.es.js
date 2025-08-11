var __defProp = Object.defineProperty;
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
import { useState, useCallback } from "react";
import { clampNumber } from "../../utils/number/index.es.js";
const DEFAULT_OPTIONS = {
  min: -Infinity,
  max: Infinity,
  step: 1
};
const useCounter = (initialValue = 0, options = {}) => {
  const { min, max, step } = __spreadValues(__spreadValues({}, DEFAULT_OPTIONS), options);
  const [count, setCount] = useState(() => clampNumber(initialValue, min, max));
  const set = useCallback((value) => {
    setCount((current) => {
      const newValue = typeof value === "function" ? value(current) : value;
      return clampNumber(newValue, min, max);
    });
  }, [min, max]);
  const increment = useCallback(() => {
    set((current) => current + step);
  }, [set, step]);
  const decrement = useCallback(() => {
    set((current) => current - step);
  }, [set, step]);
  const incrementBy = useCallback((amount) => {
    set((current) => current + amount);
  }, [set]);
  const decrementBy = useCallback((amount) => {
    set((current) => current - amount);
  }, [set]);
  const reset = useCallback(() => {
    set(initialValue);
  }, [set, initialValue]);
  const isAtMin = count <= min;
  const isAtMax = count >= max;
  const canIncrement = count + step <= max;
  const canDecrement = count - step >= min;
  return {
    count,
    increment,
    decrement,
    set,
    reset,
    incrementBy,
    decrementBy,
    isAtMin,
    isAtMax,
    canIncrement,
    canDecrement
  };
};
export {
  useCounter
};
