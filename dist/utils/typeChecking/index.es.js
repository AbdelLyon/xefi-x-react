function isArray(value) {
  return Array.isArray(value);
}
function isObject(value) {
  const type = typeof value;
  return value !== null && (type === "object" || type === "function") && !isArray(value);
}
export {
  isArray,
  isObject
};
