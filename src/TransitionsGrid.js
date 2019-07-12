import React, { useCallback } from 'react';

import Grid from './Grid';
import Block from './Block';

function getBlockAnimationProps({ action, length }) {
  const className = `animate animate--${action}`;
  const style = {};

  if (action === 'drop') {
    // Fun fact: You can use CSS variables in animations! This allows us to have one drop animation
    // defined in CSS and then set the distance to drop on a per-element basis.
    style['--drop-length'] = `${length * 100}%`;
  }

  return { className, style };
}

function AnimatedBlock({ transition, onAnimationEnd, ...props }) {
  const {
    block: { x, y, colour },
  } = transition;

  /* The animated blocks have a little backing area which is grey so that the animations display
   * on top of the already changed grid, rather than messing with the display of the basic grid.
   * This means we could take out the TransitionsGrid component entirely and everything would still
   * function fine, just no animations :)
   *
   * The downside to this, though, is that every drop animation needs to take the same time, regardless
   * of distance, which isn't really that accurate on gravity, but it does look better for game purposes!
   */
  const style = {
    backgroundColor: 'grey',
    gridColumn: x + 1, // CSS Grid references are 1-based
    gridRow: y + 1,
  };

  // We set a specific data-testid on blocks which have an animation end event so we can find them in tests
  const testid = onAnimationEnd ? 'animated-block--with-listener' : undefined;

  return (
    <div style={style}>
      <Block
        x={x}
        y={y}
        colour={colour}
        data-testid={testid}
        {...getBlockAnimationProps(transition)}
        onAnimationEnd={onAnimationEnd}
        {...props}
      />
    </div>
  );
}

// This is totally extra to the requirements of the exercise, but the animations made it easier for me
// (and the user) to visualise that the changes to the grid after clicking on a block that were happening were correct.
export default function TransitionsGrid({
  grid = [],
  transitions,
  onTransitionEnd,
}) {
  const width = grid.length;
  const height = grid[0].length;

  const onAnimationEnd = useCallback(onTransitionEnd);

  // This is a bit cheeky, we're assuming that the last transition will be the longest, so we
  // listen out for that last animation finishing to fire the onTransitionEnd event.
  const blocks = transitions.map((transition, i) => {
    // It seems like more work to have the key for the animated block be the X,Y of the grid when i would
    // suffice, but by doing this we ensure that if the user rapidly clicks, React doesn't re-use the same blocks
    // which could cause weird animation errors, which it would do if it used i.
    const {
      block: { x, y },
    } = transition;
    return (
      <AnimatedBlock
        key={`${x},${y}`}
        transition={transition}
        onAnimationEnd={i === transitions.length - 1 ? onAnimationEnd : null}
      />
    );
  });

  return (
    <Grid width={width} height={height} className="floating">
      {blocks}
    </Grid>
  );
}
