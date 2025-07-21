import { useState, useRef, useEffect, useCallback } from "react";
const defaultSerializer = {
  read: (value) => {
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  },
  write: (value) => {
    try {
      return JSON.stringify(value);
    } catch (e) {
      return String(value);
    }
  }
};
const useLocalStorage = (key, defaultValue, options = {}) => {
  const {
    serializer = defaultSerializer,
    onError,
    syncAcrossTabs = true
  } = options;
  const [value, setValue] = useState(defaultValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasValue, setHasValue] = useState(false);
  const keyRef = useRef(key);
  const defaultValueRef = useRef(defaultValue);
  const serializerRef = useRef(serializer);
  useEffect(() => {
    keyRef.current = key;
    defaultValueRef.current = defaultValue;
    serializerRef.current = serializer;
  }, [key, defaultValue, serializer]);
  const readFromStorage = useCallback(() => {
    if (typeof window === "undefined") {
      return defaultValueRef.current;
    }
    try {
      const item = window.localStorage.getItem(keyRef.current);
      if (item === null) {
        setHasValue(false);
        return defaultValueRef.current;
      }
      setHasValue(true);
      return serializerRef.current.read(item);
    } catch (err) {
      const error2 = err instanceof Error ? err : new Error("Failed to read from localStorage");
      setError(error2);
      onError == null ? void 0 : onError(error2, "read");
      setHasValue(false);
      return defaultValueRef.current;
    }
  }, [onError]);
  const writeToStorage = useCallback((newValue) => {
    if (typeof window === "undefined") {
      return;
    }
    try {
      const serializedValue = serializerRef.current.write(newValue);
      window.localStorage.setItem(keyRef.current, serializedValue);
      setHasValue(true);
      setError(null);
    } catch (err) {
      const error2 = err instanceof Error ? err : new Error("Failed to write to localStorage");
      setError(error2);
      onError == null ? void 0 : onError(error2, "write");
    }
  }, [onError]);
  useEffect(() => {
    const storedValue = readFromStorage();
    setValue(storedValue);
    setLoading(false);
  }, [readFromStorage]);
  const setStoredValue = useCallback((newValue) => {
    setValue((currentValue) => {
      const valueToStore = typeof newValue === "function" ? newValue(currentValue) : newValue;
      writeToStorage(valueToStore);
      return valueToStore;
    });
  }, [writeToStorage]);
  const removeValue = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }
    try {
      window.localStorage.removeItem(keyRef.current);
      setValue(defaultValueRef.current);
      setHasValue(false);
      setError(null);
    } catch (err) {
      const error2 = err instanceof Error ? err : new Error("Failed to remove from localStorage");
      setError(error2);
      onError == null ? void 0 : onError(error2, "remove");
    }
  }, [onError]);
  useEffect(() => {
    if (!syncAcrossTabs || typeof window === "undefined") {
      return;
    }
    const handleStorageChange = (event) => {
      if (event.key === keyRef.current) {
        if (event.newValue === null) {
          setValue(defaultValueRef.current);
          setHasValue(false);
        } else {
          try {
            const newValue = serializerRef.current.read(event.newValue);
            setValue(newValue);
            setHasValue(true);
            setError(null);
          } catch (err) {
            const error2 = err instanceof Error ? err : new Error("Failed to parse storage event");
            setError(error2);
            onError == null ? void 0 : onError(error2, "read");
          }
        }
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [onError, syncAcrossTabs]);
  return {
    value,
    setValue: setStoredValue,
    removeValue,
    hasValue,
    loading,
    error
  };
};
export {
  useLocalStorage
};
