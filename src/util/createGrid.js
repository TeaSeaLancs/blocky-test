import COLOURS from './colours';
import BlockRepresentation from './BlockRepresentation';

export function createRandomGrid(width, height) {
  const grid = [];

  for (let x = 0; x < width; x++) {
    const col = [];
    for (let y = 0; y < height; y++) {
      const colour = COLOURS[Math.floor(Math.random() * COLOURS.length)];
      col.push(new BlockRepresentation(x, y, colour));
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

export function createPresetGrid(seed) {
  const [width, height] = validateSeed(seed);

  const grid = seed.map((col, x) => {
    return col.map((colour, y) => new BlockRepresentation(x, y, colour));
  });

  return {
    width,
    height,
    grid,
  };
}
