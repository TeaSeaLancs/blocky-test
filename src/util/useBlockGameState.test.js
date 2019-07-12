import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';

import useBlockGameState from './useBlockGameState';
import removeBlockAndUpdateGrid from './removeBlockAndUpdateGrid';

import createSampleGrid from '../__fixtures__/SampleGrid';
import createUpdatedGrid from '../__fixtures__/UpdatedGrid';
import createTransition from '../__fixtures__/Transition';

// We mock out the removeBlockAndUpdateGrid import here because we don't want to have to test its logic
// while we're testing this component.
jest.mock('./removeBlockAndUpdateGrid');

describe('useBlockGameState', () => {
  let grid;

  beforeEach(() => {
    grid = createSampleGrid();
  });
  it('creates its initial state using a copy of the grid provided', () => {
    const { result } = renderHook(() => useBlockGameState({ grid }));
    const [state] = result.current;

    expect(state).toEqual({
      grid,
      transitions: [],
    });

    expect(state.grid).not.toBe(grid);
  });

  describe('removeBlock', () => {
    let updatedGrid, transition;

    beforeEach(() => {
      updatedGrid = createUpdatedGrid();
      transition = createTransition(updatedGrid[2][3], 'remove');
      removeBlockAndUpdateGrid.mockReturnValue([updatedGrid, [transition]]);
    });

    it('calls removeBlockAndUpdateGrid', () => {
      const { result } = renderHook(() => useBlockGameState({ grid }));
      const [state, { removeBlock }] = result.current;

      expect(removeBlockAndUpdateGrid).not.toHaveBeenCalled();
      act(() => {
        removeBlock(2, 3);
      });
      expect(removeBlockAndUpdateGrid).toHaveBeenCalledWith(state.grid, [2, 3]);
    });

    it('sets the response from removeBlockAndUpdateGrid in the state', () => {
      const { result } = renderHook(() => useBlockGameState({ grid }));
      const [, { removeBlock }] = result.current;

      act(() => {
        removeBlock(2, 3);
      });

      const [state] = result.current;
      expect(state).toEqual({
        grid: updatedGrid,
        transitions: [transition],
      });
    });
  });

  describe('clearTransitions', () => {
    const { result } = renderHook(() => useBlockGameState);
  });
});
