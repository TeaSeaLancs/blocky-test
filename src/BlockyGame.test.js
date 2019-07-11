import React from 'react';
import { render } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';

import BlockyGame, { useGridReducer } from './BlockyGame';
import removeBlockAndUpdateGrid from './util/removeBlockAndUpdateGrid';

import createSampleGrid from './__fixtures__/SampleGrid';
import createUpdatedGrid from './__fixtures__/UpdatedGrid';
import createTransition from './__fixtures__/Transition';

// We mock out the removeBlockAndUpdateGrid import here because we don't want to have to test its logic
// while we're testing this component.
jest.mock('./util/removeBlockAndUpdateGrid');

describe('BlockyGame', () => {
  let grid;

  beforeEach(() => {
    grid = createSampleGrid();
  });

  describe('ui component', () => {
    it('renders the game from the grid provided', () => {
      const { asFragment } = render(<BlockyGame initialGrid={grid} />);
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('useGridReducer', () => {
    it('creates its initial state using a copy of the grid provided', () => {
      const { result } = renderHook(() => useGridReducer(grid));
      const [state] = result.current;

      expect(state).toEqual({
        grid,
        transitions: [],
      });

      expect(state.grid).not.toBe(grid);
    });

    describe('remove action', () => {
      let updatedGrid, transition;

      beforeEach(() => {
        updatedGrid = createUpdatedGrid();
        transition = createTransition(updatedGrid[2][3], 'remove');
        removeBlockAndUpdateGrid.mockReturnValue([updatedGrid, [transition]]);
      });

      it('calls removeBlockAndUpdateGrid', () => {
        const { result } = renderHook(() => useGridReducer(grid));
        const [state, dispatch] = result.current;

        expect(removeBlockAndUpdateGrid).not.toHaveBeenCalled();
        act(() => {
          dispatch({ type: 'remove', block: [2, 3] });
        });
        expect(removeBlockAndUpdateGrid).toHaveBeenCalledWith(state.grid, [
          2,
          3,
        ]);
      });

      it('sets the response from removeBlockAndUpdateGrid in the state', () => {
        const { result } = renderHook(() => useGridReducer(grid));
        const [, dispatch] = result.current;

        act(() => {
          dispatch({ type: 'remove', block: [2, 3] });
        });

        const [state] = result.current;
        expect(state).toEqual({
          grid: updatedGrid,
          transitions: [transition],
        });
      });
    });
  });
});
