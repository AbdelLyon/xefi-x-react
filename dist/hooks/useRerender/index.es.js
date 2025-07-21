import { useReducer } from "react";
const reducer = (value) => (value + 1) % 1e6;
const useRerender = () => {
  const [, update] = useReducer(reducer, 0);
  return update;
};
export {
  useRerender
};
