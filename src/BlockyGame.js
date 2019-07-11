import React, { useReducer, useCallback } from 'react';
import BlockGrid from './BlockGrid';
import TransitionsGrid from './TransitionsGrid';

import removeBlockAndUpdateGrid from './util/removeBlockAndUpdateGrid';
import cloneGrid from './util/cloneGrid';

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

function initGrid(initialGrid) {
  return {
    grid: cloneGrid(initialGrid), // We need to clone the grid to avoid mutating the parent component data
    transitions: [],
  };
}

// We use a reducer rather than a state variable here because the grid & transitions variables are interlinked.
// This is exported as a custom hook so we can test the reducer directly.
export function useGridReducer(initialGrid) {
  return useReducer(gridReducer, initialGrid, initGrid);
}

export default function BlockyGame({ initialGrid }) {
  // It seems a bit odd at first glance to have an initial value which we copy into internal component state
  // but the benefit to this is that we can encapsulate all the game logic into this component and have the
  // component just reset itself when it gets a different grid passed in.
  const [{ grid, transitions }, dispatch] = useGridReducer(initialGrid);

  const onBlockRemove = useCallback(
    (x, y) =>
      dispatch({
        type: 'remove',
        block: [x, y],
      }),
    [dispatch]
  );

  const onTransitionEnd = useCallback(() => {
    dispatch({ type: 'clear-transitions' });
  }, [dispatch]);

  // The BlockGrid and TransitionsGrid are separate so that we always have a component rendering the
  // grid as it's meant to be, and then a separate component can handle the niceties of displaying animations :)
  return (
    <div id="game">
      <BlockGrid grid={grid} onBlockRemove={onBlockRemove} />
      <TransitionsGrid
        grid={grid}
        transitions={transitions}
        onTransitionEnd={onTransitionEnd}
      />
    </div>
  );
}
