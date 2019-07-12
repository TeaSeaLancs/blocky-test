import { useReducer, useCallback } from 'react';

import removeBlockAndUpdateGrid from './removeBlockAndUpdateGrid';
import cloneGrid from './cloneGrid';

function gridReducer(state, action) {
  switch (action.type) {
    case 'remove': {
      const [grid, transitions] = removeBlockAndUpdateGrid(
        state.grid,
        action.block
      );
      return {
        ...state,
        grid,
        transitions,
      };
    }
    case 'clear-transitions':
      return {
        ...state,
        transitions: [],
      };
    default:
      return state;
  }
}

function initGrid({ grid = [], transitions = [] }) {
  return {
    grid: cloneGrid(grid), // We need to clone the grid to avoid mutating the parent component data
    transitions,
  };
}

/* We use a reducer rather than a state variable here because the grid & transitions variables are interlinked.
 * We can also encapsulate all of the relevant actions here in a custom reducer to make it easy to hook a UI
 * into the game logic.
 */
export default function useBlockGameState(initialState) {
  const [state, dispatch] = useReducer(gridReducer, initialState, initGrid);

  const removeBlock = useCallback(
    (x, y) =>
      dispatch({
        type: 'remove',
        block: [x, y],
      }),
    [dispatch]
  );

  const clearTransitions = useCallback(() => {
    dispatch({ type: 'clear-transitions' });
  }, [dispatch]);

  return [state, { removeBlock, clearTransitions }];
}
