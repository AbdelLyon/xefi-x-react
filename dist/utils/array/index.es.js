var __defProp = Object.defineProperty;
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
function filterUnique(arr, criteria) {
  const iteratee = typeof criteria === "function" ? criteria : (item) => item[criteria];
  const seen = /* @__PURE__ */ new Map();
  return arr.filter((item) => {
    const key = iteratee(item);
    if (seen.has(key)) {
      return false;
    }
    seen.set(key, true);
    return true;
  });
}
function findIntersection(arrays, criteria) {
  if (!arrays.length) {
    return [];
  }
  if (arrays.length === 1) {
    return arrays[0];
  }
  const iteratee = typeof criteria === "function" ? criteria : (item) => item[criteria];
  const [first, ...rest] = arrays;
  const transformedRest = rest.map(
    (arr) => new Set(arr.map(iteratee))
  );
  return first.filter((item) => {
    const transformed = iteratee(item);
    return transformedRest.every((set) => set.has(transformed));
  });
}
function arrayToObject(arr) {
  if (!(arr == null ? void 0 : arr.length)) {
    return {};
  }
  return arr.reduce(
    (acc, item) => __spreadValues(__spreadValues({}, acc), item),
    {}
  );
}
export {
  arrayToObject,
  filterUnique,
  findIntersection
};
