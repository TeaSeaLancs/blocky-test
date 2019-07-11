import React, { useCallback } from 'react';

import Grid from './Grid';
import Block from './Block';

export default function BlockGrid({ grid = [], onBlockRemove }) {
  const width = grid.length;
  const height = grid[0].length;

  // We de-reference the DOM event here so that we're supplying a pure X,Y coordinate for onBlockClick
  // That way we're keeping all rendering local to this component and not mixing it with business logic.
  //
  // We could make this simpler and not need to use the dataset by having the Block component's onClick
  // function return the X,Y directly, but I prefer to have browser-level event names not be interfered
  // with, plus the Block is such a small component i'd rather keep it that way :)
  const onBlockClick = useCallback(
    event => {
      const { x, y } = event.target.dataset;
      onBlockRemove(+x, +y); // Using +x,+y is a quick way of casting strings to integers, but a bit dirty
    },
    [onBlockRemove]
  );

  const blocks = grid.map((col, x) => {
    const row = col.map((block, y) => {
      return (
        <Block
          key={`${x},${y}`}
          x={x}
          y={y}
          colour={block.colour}
          onClick={onBlockClick}
        />
      );
    });

    return row;
  });

  return (
    <Grid width={width} height={height}>
      {blocks}
    </Grid>
  );
}
