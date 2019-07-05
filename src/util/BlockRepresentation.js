export default class BlockRepresentation {
  constructor(x, y, colour) {
    this.x = x;
    this.y = y;
    this.colour = colour;
  }

  clear() {
    return new BlockRepresentation(this.x, this.y, undefined);
  }

  inheritColour(block) {
    return new BlockRepresentation(this.x, this.y, block.colour);
  }
}
