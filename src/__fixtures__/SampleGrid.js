import { createPresetGrid } from '../util/createGrid';

// This grid seed mirrors the initial screenshot in the task description.
// It's transposed from what you would expect to see though because each array entry
// is a column rather than a row. This is so we can do grid[x][y] as an accessor.
const seed = [
  ['blue', 'green', 'green', 'yellow', 'green'],
  ['green', 'green', 'red', 'yellow', 'yellow'],
  ['yellow', 'green', 'blue', 'blue', 'red'],
  ['red', 'yellow', 'green', 'blue', 'red'],
  ['green', 'red', 'blue', 'blue', 'blue'],
];

export default function() {
  return createPresetGrid(seed);
}
