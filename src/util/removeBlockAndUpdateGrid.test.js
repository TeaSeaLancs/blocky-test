import removeBlockAndUpdateGrid from './removeBlockAndUpdateGrid';

import createSampleGrid from '../__fixtures__/SampleGrid';
import createUpdatedGrid from '../__fixtures__/UpdatedGrid';
import createUpdateTransitions from '../__fixtures__/UpdateTransitions';

describe('removeBlockAndUpdateGrid', () => {
  // This test mirrors the screenshots given in the task description, always good to double
  // check that the logic performs exactly as is required.
  it('removes a given block, all neighbouring blocks of the same shape, then runs gravity', () => {
    const grid = createSampleGrid();
    const expectedGrid = createUpdatedGrid();

    const [updatedGrid] = removeBlockAndUpdateGrid(grid, [2, 2]);
    expect(updatedGrid).toEqual(expectedGrid);
  });

  it('returns a list of transitions which can be used to animate from the initial grid to the updated grid', () => {
    const grid = createSampleGrid();

    const [, transitions] = removeBlockAndUpdateGrid(grid, [2, 2]);

    const expectedTransitions = createUpdateTransitions();
    expect(transitions).toEqual(expectedTransitions);
  });
});
