import { createPresetGrid } from '../util/createGrid';

// This grid seed mirrors the updated screenshot in the task description.
// It's transposed from what you would expect to see though because each array entry
// is a column rather than a row. This is so we can do grid[x][y] as an accessor.
const seed = [
  ['blue', 'green', 'green', 'yellow', 'green'],
  ['green', 'green', 'red', 'yellow', 'yellow'],
  [undefined, undefined, 'yellow', 'green', 'red'],
  [undefined, 'red', 'yellow', 'green', 'red'],
  [undefined, undefined, undefined, 'green', 'red'],
];

/*const seed = [
  ['blue', 'green', undefined, undefined, undefined],
  ['green', 'green', undefined, 'red', undefined],
  ['green', 'red', 'yellow', 'yellow', undefined],
  ['yellow', 'yellow', 'green', 'green', 'green'],
  ['green', 'yellow', 'red', 'red', 'red'],
];*/

export default function() {
  return createPresetGrid(seed);
}
