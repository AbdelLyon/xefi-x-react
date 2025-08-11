import { isArray, isObject } from "../typeChecking/index.es.js";
function isEmptyArray(value) {
  return isArray(value) && value.length === 0;
}
function isEmptyObject(value) {
  return isObject(value) && Object.keys(value).length === 0;
}
function isEmpty(value) {
  if (isArray(value)) {
    return isEmptyArray(value);
  }
  if (isObject(value)) {
    return isEmptyObject(value);
  }
  return value === null || value === "";
}
export {
  isEmpty,
  isEmptyArray,
  isEmptyObject
};
