import { createPresetGrid } from '../util/createGrid';

const seed = [
  ['blue', 'green', undefined, undefined, undefined],
  ['green', 'green', undefined, 'red', undefined],
  ['green', 'red', 'yellow', 'yellow', undefined],
  ['yellow', 'yellow', 'green', 'green', 'green'],
  ['green', 'yellow', 'red', 'red', 'red'],
];

export default function() {
  return createPresetGrid(seed);
}
