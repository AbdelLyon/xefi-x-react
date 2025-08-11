import { useState, useRef, useEffect } from "react";
function useControlledState(value, defaultValue, onChange) {
  const [stateValue, setStateValue] = useState(value != null ? value : defaultValue);
  const isControlledRef = useRef(value !== void 0);
  const valueRef = useRef(value);
  const isControlled = value !== void 0;
  useEffect(() => {
    const wasControlled = isControlledRef.current;
    if (wasControlled !== isControlled) {
      console.warn(
        `WARN: A component changed from ${wasControlled ? "controlled" : "uncontrolled"} to ${isControlled ? "controlled" : "uncontrolled"}.`
      );
    }
    isControlledRef.current = isControlled;
  }, [isControlled]);
  const currentValue = isControlled ? value : stateValue;
  const onChangeCaller = (newValue, ...onChangeArgs) => {
    if (onChange && !Object.is(currentValue, newValue)) {
      onChange(newValue, ...onChangeArgs);
    }
  };
  const setValue = (newValue, ...args) => {
    if (typeof newValue === "function") {
      console.warn(
        "We can not support a function callback. See Github Issues for details"
      );
      const updateFunction = (oldValue) => {
        const valueUpdateFn = newValue;
        const interceptedValue = valueUpdateFn(
          isControlled ? currentValue : oldValue
        );
        onChangeCaller(interceptedValue, ...args);
        if (!isControlled) {
          return interceptedValue;
        }
        return oldValue;
      };
      setStateValue(updateFunction);
    } else {
      if (!isControlled) {
        setStateValue(newValue);
      }
      onChangeCaller(newValue, ...args);
    }
  };
  useEffect(() => {
    valueRef.current = value;
  }, [value]);
  return [currentValue, setValue];
}
export {
  useControlledState
};
