/* As much as I am a fan of the class-based Block which was provided in the stubs, I think
 * it's preferable to keep the data stored within React as plain objects as much as possible so
 * I decided to use a plain object with some modifier functions instead.
 */

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
