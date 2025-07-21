import { useReducer } from "react";
const useToggle = (options = [false, true]) => {
  const reducer = (state, action) => {
    const value = action instanceof Function ? action(state[0]) : action;
    const index = Math.abs(state.indexOf(value));
    return [...state.slice(index), ...state.slice(0, index)];
  };
  const [[currentOption], toggle] = useReducer(reducer, [...options]);
  return {
    current: currentOption,
    toggle
  };
};
export {
  useToggle
};
