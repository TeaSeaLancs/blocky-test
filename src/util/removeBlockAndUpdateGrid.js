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

function sortLastFirst(b1, b2) {
  if (b1.x === b2.x) {
    return b2.y - b1.y;
  }

  return b2.x - b1.x;
}

function getShapeAt(grid, x, y) {
  const block = grid[x][y];

  const shape = new Set([block]);

  shape.forEach(function(block) {
    const neighbours = getMatchingNeighbours(grid, block);
    neighbours.forEach(n => shape.add(n));
  });

  return [...shape].sort(sortLastFirst);
}

function cloneGrid(grid) {
  return grid.map(col => [...col]);
}

function findVerticalNeighbour(grid, block) {
  for (let x = block.x - 1; x >= 0; x--) {
    const neighbour = grid[x][block.y];
    if (neighbour.colour) {
      return neighbour;
    }
  }
}

function runGravityOnBlock(grid, block) {
  if (!block.colour) {
    const neighbour = findVerticalNeighbour(grid, block);
    if (neighbour) {
      grid[block.x][block.y] = block.inheritColour(neighbour);
      grid[neighbour.x][neighbour.y] = neighbour.clear();
    }
  }
}

function runGravity(grid) {
  return grid.reduceRight((grid, row) => {
    row.reduceRight((row, block) => {
      runGravityOnBlock(grid, block);
      return row;
    }, row);
    return grid;
  }, grid);
}

export default function removeBlockAndUpdateGrid(oldGrid, { x, y }) {
  const grid = cloneGrid(oldGrid);
  // We first go through and establish the full shape that we're removing here
  const shape = getShapeAt(grid, x, y);

  // Then go through the shape and mark everything in them as grey.
  shape.forEach(block => {
    grid[block.x][block.y] = block.clear();
  });

  // Now go through the entire grid and simulate gravity effects by having grey blocks pull down their nearest vertical neighbour's
  // colour.
  runGravity(grid);

  return grid;
}
