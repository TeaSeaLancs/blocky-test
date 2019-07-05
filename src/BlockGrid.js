import React, { useCallback } from 'react';

import Block from './Block';

export default function BlockGrid({ width, height, grid = [], onBlockRemove }) {
  // We de-reference the DOM event here so that we're supplying a pure X,Y coordinate for onBlockClick
  // That way we're keeping all rendering local to this component and not mixing it with business logic.
  const onBlockClick = useCallback(
    event => {
      const { x, y } = event.target.dataset;
      onBlockRemove(x, y);
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
          color={block.colour}
          onClick={onBlockClick}
        />
      );
    });

    return row;
  });

  const style = {
    '--grid-width': width,
    '--grid-height': height,
  };

  return (
    <div id="grid" style={style}>
      {blocks}
    </div>
  );
}
