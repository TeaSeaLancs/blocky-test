export function createBlockRepresentation(x, y, colour) {
  return {
    x,
    y,
    colour,
  };
}

export function clearBlock(block) {
  return {
    ...block,
    colour: undefined,
  };
}

export function copyBlockColour(from, to) {
  return {
    ...to,
    colour: from.colour,
  };
}
