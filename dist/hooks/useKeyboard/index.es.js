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
import { useRef, useCallback, useEffect } from "react";
const normalizeKeys = (keys) => {
  return keys.toLowerCase().split("+").map((key) => key.trim()).sort().join("+");
};
const matchesKeys = (event, keys) => {
  const eventKeys = [];
  if (event.ctrlKey || event.metaKey) {
    eventKeys.push(event.metaKey ? "cmd" : "ctrl");
  }
  if (event.altKey) {
    eventKeys.push("alt");
  }
  if (event.shiftKey) {
    eventKeys.push("shift");
  }
  const key = event.key.toLowerCase();
  if (!["control", "alt", "shift", "meta"].includes(key)) {
    eventKeys.push(key);
  }
  const eventKeyString = eventKeys.sort().join("+");
  const targetKeyString = normalizeKeys(keys);
  return eventKeyString === targetKeyString;
};
const useKeyboard = (options = {}) => {
  const {
    target = typeof document !== "undefined" ? document : null,
    eventType = "keydown",
    enabled = true
  } = options;
  const shortcutsRef = useRef(/* @__PURE__ */ new Map());
  const handleKeyEvent = useCallback((event) => {
    if (!enabled) {
      return;
    }
    for (const [keys, shortcut] of shortcutsRef.current.entries()) {
      if (shortcut.enabled === false) {
        continue;
      }
      if (matchesKeys(event, keys)) {
        if (shortcut.preventDefault) {
          event.preventDefault();
        }
        if (shortcut.stopPropagation) {
          event.stopPropagation();
        }
        shortcut.handler(event);
        break;
      }
    }
  }, [enabled]);
  useEffect(() => {
    if (!target || !enabled) {
      return;
    }
    const element = target;
    element.addEventListener(eventType, handleKeyEvent);
    return () => {
      element.removeEventListener(eventType, handleKeyEvent);
    };
  }, [target, eventType, enabled, handleKeyEvent]);
  const addShortcut = useCallback((shortcut) => {
    var _a;
    const normalizedKeys = normalizeKeys(shortcut.keys);
    shortcutsRef.current.set(normalizedKeys, __spreadProps(__spreadValues({}, shortcut), {
      enabled: (_a = shortcut.enabled) != null ? _a : true
    }));
    return () => {
      shortcutsRef.current.delete(normalizedKeys);
    };
  }, []);
  const removeShortcut = useCallback((keys) => {
    const normalizedKeys = normalizeKeys(keys);
    shortcutsRef.current.delete(normalizedKeys);
  }, []);
  const getShortcuts = useCallback(() => {
    return Array.from(shortcutsRef.current.values());
  }, []);
  const clearShortcuts = useCallback(() => {
    shortcutsRef.current.clear();
  }, []);
  return {
    addShortcut,
    removeShortcut,
    getShortcuts,
    clearShortcuts
  };
};
export {
  useKeyboard
};
