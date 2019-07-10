export default function cloneGrid(grid) {
  return grid.map(col => [...col]);
}
