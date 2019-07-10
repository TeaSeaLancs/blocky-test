import React, { useMemo } from 'react';
import BlockyGame from './BlockyGame';

import { createRandomGrid } from './util/createGrid';

/* So I know the original stubs were framework-agnostic, but my feeling was using React for the exercise
 * would, while being a bit more work to implement, leave me with a cleaner design than using raw JS.
 * While the stubs provided did a good job of separating the data model from the rendered view, the imperative
 * nature of raw JS would mean that either you would have your data logic & game logic wrapped up in one
 * update method (ie: The user has clicked on this block, so set the DOM element's colour based on a neighbour above) or
 * you would have to build some kind of reconciler (ie: The user has clicked on this block, change the grid, then
 * figure out what DOM changes you have to make to render that), and at that point you might as well just bring in
 * React as it's got a far better reconciler.
 */

export default function App({ width = 10, height = 10 }) {
  // Ideally we would want to avoid having React components creating randomised data inside them
  // because a React app should be as close to view = f(data), but in this case we want to create
  // a randomised grid every time we load the page, so we do this by memoising the value based on the width
  // and height. We could also just use a state variable instead, but this way has the benefit that
  // we could change the width & height passed into App and have it automatically update.
  const grid = useMemo(() => createRandomGrid(width, height), [width, height]);

  // We _could_ just collapse the BlockyGrid element into here as well because otherwise this isn't
  // really doing much, but I like having the distinction because it means that we could add other bits
  // around resetting the game or adding "well done!" screens here later.
  return <BlockyGame initialGrid={grid} />;
}
