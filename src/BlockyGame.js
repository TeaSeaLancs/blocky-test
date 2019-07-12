import React from 'react';
import BlockGrid from './BlockGrid';
import TransitionsGrid from './TransitionsGrid';

import useBlockGameState from './util/useBlockGameState';

// It seems a bit odd at first glance to have an initial value which we copy into internal component state
// but the benefit to this is that we can encapsulate all the game logic into this component and have the
// component just reset itself when it gets a different grid passed in.
export default function BlockyGame({ initialGrid }) {
  // A custom hook makes it easy to isolate all the game logic and have it hookable into a UI component
  // I mean realistically, it's only being used in one component so it's a bit overkill but it does
  // allow you to have nice, small components :)
  const [
    { grid, transitions },
    { removeBlock, clearTransitions },
  ] = useBlockGameState({ grid: initialGrid });

  // The BlockGrid and TransitionsGrid are separate so that we always have a component rendering the
  // grid as it's meant to be, and then a separate component can handle the niceties of displaying animations :)
  return (
    <div id="game">
      <BlockGrid grid={grid} onBlockRemove={removeBlock} />
      <TransitionsGrid
        grid={grid}
        transitions={transitions}
        onTransitionEnd={clearTransitions}
      />
    </div>
  );
}
