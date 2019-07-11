import { createPresetGrid } from '../util/createGrid';

const seed = [
  ['blue', 'green', 'yellow', 'red', 'green'],
  ['green', 'green', 'green', 'yellow', 'red'],
  ['green', 'red', 'blue', 'green', 'blue'],
  ['yellow', 'yellow', 'blue', 'blue', 'blue'],
  ['green', 'yellow', 'red', 'red', 'blue'],
];

export default function() {
  return createPresetGrid(seed);
}
