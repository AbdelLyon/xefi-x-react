import { useState } from "react";
const useStateHistory = (initialValue) => {
  const [state, setState] = useState({
    history: [initialValue],
    current: 0
  });
  const handlers = {
    set: (value) => {
      setState((currentState) => {
        const nextState = [
          ...currentState.history.slice(0, currentState.current + 1),
          value
        ];
        return {
          history: nextState,
          current: nextState.length - 1
        };
      });
    },
    back: (steps = 1) => {
      setState(
        (currentState) => ({
          history: currentState.history,
          current: Math.max(0, currentState.current - steps)
        })
      );
    },
    forward: (steps = 1) => {
      setState(
        (currentState) => ({
          history: currentState.history,
          current: Math.min(
            currentState.history.length - 1,
            currentState.current + steps
          )
        })
      );
    },
    reset: () => {
      setState({
        history: [initialValue],
        current: 0
      });
    }
  };
  return {
    value: state.history[state.current],
    handlers,
    state
  };
};
export {
  useStateHistory
};
