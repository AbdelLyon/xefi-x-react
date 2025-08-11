const clampNumber = (value, min, max) => {
  if (min === void 0 && max === void 0) {
    return value;
  }
  if (min !== void 0 && max === void 0) {
    return Math.max(value, min);
  }
  if (min === void 0 && max !== void 0) {
    return Math.min(value, max);
  }
  if (min !== void 0 && max !== void 0) {
    return Math.min(Math.max(value, min), max);
  }
  return value;
};
const isNumeric = (value) => value !== void 0 && value !== null && parseInt(value.toString(), 10) > 0;
export {
  clampNumber,
  isNumeric
};
