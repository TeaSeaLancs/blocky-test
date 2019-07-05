import React, { useReducer, useCallback } from 'react';
import BlockGrid from './BlockGrid';

import { createPresetGrid, createRandomGrid } from './util/createGrid';
import removeBlockAndUpdateGrid from './util/removeBlockAndUpdateGrid';

function gridReducer(state, action) {
  switch (action.type) {
    case 'remove':
      return {
        ...state,
        grid: removeBlockAndUpdateGrid(state.grid, action),
      };
    default:
      return state;
  }
}

// Toggle the comments to initialise a deterministic, seeded grid
//const seed = undefined;

const seed = [
  ['blue', 'green', 'yellow', 'red', 'green'],
  ['green', 'green', 'green', 'yellow', 'red'],
  ['green', 'red', 'blue', 'green', 'blue'],
  ['yellow', 'yellow', 'blue', 'blue', 'blue'],
  ['green', 'yellow', 'red', 'red', 'blue'],
];

function initRandomGrid() {
  // Change the width & height in order to change the size of the grid
  const width = 10;
  const height = 10;

  return {
    width,
    height,
    grid: createRandomGrid(width, height),
  };
}

function initSeededGrid() {
  const { width, height, grid } = createPresetGrid(seed);
  return {
    width,
    height,
    grid,
  };
}

function initGrid() {
  return seed ? initSeededGrid(seed) : initRandomGrid();
}

export default function App() {
  const [{ width, height, grid }, dispatch] = useReducer(
    gridReducer,
    [],
    initGrid
  );

  const onBlockRemove = useCallback(
    (x, y) => {
      dispatch({
        type: 'remove',
        x,
        y,
      });
    },
    [dispatch]
  );

  return (
    <BlockGrid
      width={width}
      height={height}
      grid={grid}
      onBlockRemove={onBlockRemove}
    />
  );
}
