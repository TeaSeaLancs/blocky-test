import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';

import TransitionsGrid from './TransitionsGrid';

import createSampleGrid from './__fixtures__/SampleGrid';
import createUpdateTransitions from './__fixtures__/UpdateTransitions';

describe('TransitionsGrid', () => {
  let grid, transitions;

  beforeEach(() => {
    grid = createSampleGrid();
    transitions = createUpdateTransitions();
  });

  it('renders an animated transition block for each transition passed', () => {
    const { asFragment } = render(
      <TransitionsGrid grid={grid} transitions={transitions} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('calls the onTransitionEnd prop when animations are finished', () => {
    const onTransitionEnd = jest.fn();
    const { getByTestId, debug } = render(
      <TransitionsGrid
        grid={grid}
        transitions={transitions}
        onTransitionEnd={onTransitionEnd}
      />
    );

    const animatedBlock = getByTestId('animated-block--with-listener');

    expect(onTransitionEnd).not.toHaveBeenCalled();
    fireEvent.animationEnd(animatedBlock);
    expect(onTransitionEnd).toHaveBeenCalled();
  });
});
