const dataAttr = (condition) => condition ? "true" : void 0;
const generateUniqueId = (prefix) => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${prefix}-${timestamp}-${random}`;
};
const formatArrayWithZeroLast = (array) => {
  const zeroIndex = array.findIndex((item) => String(item) === "0");
  if (zeroIndex === -1) {
    return array;
  }
  return [...array.slice(0, zeroIndex), ...array.slice(zeroIndex + 1), array[zeroIndex]];
};
export {
  dataAttr,
  formatArrayWithZeroLast,
  generateUniqueId
};
