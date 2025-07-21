const assignRef = (ref, value) => {
  if (typeof ref === "function") {
    ref(value);
  } else if (typeof ref === "object" && ref !== null && "current" in ref) {
    ref.current = value;
  }
};
const mergeRefs = (...refs) => {
  return (node) => {
    refs.forEach((ref) => assignRef(ref, node));
  };
};
const useMergedRef = (...refs) => {
  return mergeRefs(...refs);
};
export {
  useMergedRef
};
