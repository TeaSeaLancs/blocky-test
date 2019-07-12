import { createBlockRepresentation } from './blockUtils';

export const COLOURS = ['red', 'green', 'blue', 'yellow'];

export function createRandomGrid(width, height) {
  const grid = [];

  for (let x = 0; x < width; x++) {
    const col = [];
    for (let y = 0; y < height; y++) {
      const colour = COLOURS[Math.floor(Math.random() * COLOURS.length)];
      col.push(createBlockRepresentation(x, y, colour));
    }

    grid.push(col);
  }

  return grid;
}

function validateSeed(seed) {
  const rowLength = seed[0].length;
  if (!seed.every(col => col.length === rowLength)) {
    throw new Error(
      `Can't create grid from seed: seed isn't a square/rectangle`
    );
  }

  return [seed.length, rowLength];
}

// This is fairly useful for unit testing as it allows us to create
// specific grids for testing the gravity logic :)
export function createPresetGrid(seed) {
  validateSeed(seed);

  const grid = seed.map((col, x) => {
    return col.map((colour, y) => createBlockRepresentation(x, y, colour));
  });

  return grid;
}
