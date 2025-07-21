import { useState, useCallback } from "react";
const useToggle = (options = {}) => {
  const {
    values = [false, true],
    initialValue
  } = options;
  const validInitialValue = initialValue !== void 0 && values.includes(initialValue) ? initialValue : values[0];
  const [currentValue, setCurrentValue] = useState(validInitialValue);
  const currentIndex = values.indexOf(currentValue);
  const setValue = useCallback((action) => {
    setCurrentValue((prevValue) => {
      const newValue = typeof action === "function" ? action(prevValue) : action;
      return values.includes(newValue) ? newValue : prevValue;
    });
  }, [values]);
  const toggle = useCallback((action) => {
    if (action !== void 0) {
      setValue(action);
      return;
    }
    setCurrentValue((prevValue) => {
      const currentIdx = values.indexOf(prevValue);
      const nextIdx = (currentIdx + 1) % values.length;
      return values[nextIdx];
    });
  }, [values, setValue]);
  const reset = useCallback(() => {
    setCurrentValue(validInitialValue);
  }, [validInitialValue]);
  const getNextValue = useCallback(() => {
    const nextIdx = (currentIndex + 1) % values.length;
    return values[nextIdx];
  }, [currentIndex, values]);
  const is = useCallback((value) => {
    return currentValue === value;
  }, [currentValue]);
  return {
    value: currentValue,
    toggle,
    setValue,
    reset,
    getNextValue,
    is,
    index: currentIndex,
    values
  };
};
const useBooleanToggle = (initialValue = false) => {
  const { value, toggle, setValue, reset } = useToggle({
    values: [false, true],
    initialValue
  });
  return [value, toggle, setValue, reset];
};
export {
  useBooleanToggle,
  useToggle
};
