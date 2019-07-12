import cloneGrid from './cloneGrid';
import { clearBlock, copyBlockColour } from './blockUtils';

function getBlock(grid, x, y) {
  if (!grid[x] || !grid[x][y]) {
    return null;
  }

  return grid[x][y];
}

function getMatchingNeighbours(grid, { x, y, colour }) {
  const allNeighbours = [
    getBlock(grid, x + 1, y),
    getBlock(grid, x - 1, y),
    getBlock(grid, x, y + 1),
    getBlock(grid, x, y - 1),
  ];

  return allNeighbours.filter(block => {
    return !!block && block.colour === colour;
  });
}

function getShapeAt(grid, x, y) {
  const block = grid[x][y];

  // Sets give us block deduplication for free
  const shape = new Set([block]);

  // This is a bit cheeky, we're abusing the fact that Set.forEach will continue to process new entries added
  // to add neighbouring blocks of the same shape and also have them evaluated without having to do extra checking.
  shape.forEach(function(block) {
    const neighbours = getMatchingNeighbours(grid, block);
    neighbours.forEach(n => shape.add(n));
  });

  return shape;
}

function findVerticalNeighbour(grid, block) {
  for (let y = block.y - 1; y >= 0; y--) {
    const neighbour = grid[block.x][y];
    if (neighbour.colour) {
      return neighbour;
    }
  }
}

function runGravity(grid, block) {
  if (block.colour) {
    return null;
  }

  const neighbour = findVerticalNeighbour(grid, block);
  if (!neighbour) {
    return null;
  }

  grid[block.x][block.y] = copyBlockColour(neighbour, block);
  grid[neighbour.x][neighbour.y] = clearBlock(neighbour);

  return {
    block: neighbour,
    action: 'drop',
    length: block.y - neighbour.y,
  };
}

function reduceGrid(grid, fn, acc) {
  return grid.reduceRight((acc, row) => {
    row.reduceRight((acc, block) => {
      fn(acc, block, grid);
      return acc;
    }, acc);
    return acc;
  }, acc);
}

export default function removeBlockAndUpdateGrid(oldGrid, [x, y]) {
  const grid = cloneGrid(oldGrid);
  // We first go through and establish the full shape that we're removing here.
  const shape = getShapeAt(grid, x, y);

  const transitions = [];

  /* Then go through the shape and mark everything in them as grey.
   * We also add them as remove transitions for the nice animations.
   */
  shape.forEach(block => {
    grid[block.x][block.y] = clearBlock(block);
    transitions.push({ block, action: 'remove' });
  });

  /* Now go through the entire grid and simulate gravity effects by having grey blocks
   * pull down their nearest vertical neighbour's colour. We also collect the blocks which
   * have been affected by this.
   *
   * Admittedly, we don't actually have to run gravity on every block in the grid, an alternate
   * implementation would be to only run gravity on the blocks in the shape and then any blocks pulled
   * down and this would work more efficiently, however it does assume that gravity will ever fall on
   * blocks after a user click. If we wanted to do things like having extra blocks fall from the top later
   * we would have to change this, so while the way as implemented is (slightly) less efficient, it's more
   * flexible in the long run.
   */
  reduceGrid(
    grid,
    (transitions, block) => {
      const transition = runGravity(grid, block);
      if (transition) {
        transitions.push(transition);
      }
      return transitions;
    },
    transitions
  );

  return [grid, transitions];
}
