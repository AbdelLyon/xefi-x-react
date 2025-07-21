const isNonEmptyString = (value) => {
  return typeof value === "string" && value.length > 0;
};
const isValidReactNode = (value) => {
  return value !== null && value !== void 0 && (typeof value === "string" || typeof value === "number" || typeof value === "boolean" || typeof value === "object");
};
const isFunction = (value) => {
  return typeof value === "function";
};
const isValidNumber = (value) => {
  return typeof value === "number" && !isNaN(value) && isFinite(value);
};
const isPositiveInteger = (value) => {
  return isValidNumber(value) && value > 0 && Number.isInteger(value);
};
const validateComponentProps = (props, validators) => {
  const errors = [];
  Object.entries(validators).forEach(([key, validator]) => {
    const value = props[key];
    if (value !== void 0 && validator && !validator(value)) {
      errors.push(`Invalid value for prop '${key}': ${String(value)}`);
    }
  });
  return {
    valid: errors.length === 0,
    errors
  };
};
export {
  isFunction,
  isNonEmptyString,
  isPositiveInteger,
  isValidNumber,
  isValidReactNode,
  validateComponentProps
};
