import { useEffect, useRef, useState } from "react";

// Types
type SetValueFunction<T> = (
  value: T | ((prev: T) => T),
  ...args: unknown[]
) => void;
type OnChangeCallback<T> = (value: T, ...args: unknown[]) => void;
type ValueUpdateFunction<T> = (prev: T, ...args: unknown[]) => T;

// Function overloads
export function useControlledState<T, C = T>(
  value: Exclude<T, undefined>,
  defaultValue: Exclude<T, undefined> | undefined,
  onChange?: OnChangeCallback<C>,
): [T, SetValueFunction<T>];

export function useControlledState<T, C = T>(
  value: Exclude<T, undefined> | undefined,
  defaultValue: Exclude<T, undefined>,
  onChange?: OnChangeCallback<C>,
): [T, SetValueFunction<T>];

export function useControlledState<T, C = T>(
  value: T,
  defaultValue: T,
  onChange?: OnChangeCallback<C>,
): [T, SetValueFunction<T>] {
  const [stateValue, setStateValue] = useState<T>(value ?? defaultValue);
  const isControlledRef = useRef<boolean>(value !== undefined);
  const valueRef = useRef<T>(value);

  const isControlled = value !== undefined;

  useEffect((): void => {
    const wasControlled = isControlledRef.current;
    if (wasControlled !== isControlled) {
      console.warn(
        `WARN: A component changed from ${
          wasControlled ? "controlled" : "uncontrolled"
        } to ${isControlled ? "controlled" : "uncontrolled"}.`,
      );
    }
    isControlledRef.current = isControlled;
  }, [isControlled]);

  const currentValue = isControlled ? value : stateValue;

  const onChangeCaller = (newValue: T, ...onChangeArgs: unknown[]): void => {
    if (onChange && !Object.is(currentValue, newValue)) {
      onChange(newValue as unknown as C, ...onChangeArgs);
    }
  };

  const setValue: SetValueFunction<T> = (newValue, ...args): void => {
    if (typeof newValue === "function") {
      console.warn(
        "We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320",
      );

      const updateFunction = (oldValue: T): T => {
        const valueUpdateFn = newValue as ValueUpdateFunction<T>;
        const interceptedValue = valueUpdateFn(
          isControlled ? currentValue : oldValue,
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

  useEffect((): void => {
    valueRef.current = value;
  }, [value]);

  return [currentValue, setValue];
}
