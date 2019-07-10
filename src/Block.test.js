import Block, { COLOURS } from './Block';

describe('Block', () => {
  it('should be created with correct coordinates and one of the valid colours', () => {
    const testCoords = [[1, 2], [4, 9], [0, 0]];

    testCoords.forEach(testCoord => {
      const block = new Block(...testCoord);
      expect(block.x).toBe(testCoord[0]);
      expect(block.y).toBe(testCoord[1]);
      expect(COLOURS).toContain(block.colour);
    });
  });
});

// Toggle the comments to initialise a deterministic, seeded grid
//const seed = undefined;

const seed = [
  ['blue', 'green', 'yellow', 'red', 'green'],
  ['green', 'green', 'green', 'yellow', 'red'],
  ['green', 'red', 'blue', 'green', 'blue'],
  ['yellow', 'yellow', 'blue', 'blue', 'blue'],
  ['green', 'yellow', 'red', 'red', 'blue'],
];