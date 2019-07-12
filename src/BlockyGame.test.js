import React from 'react';
import { render } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';

import BlockyGame from './BlockyGame';

import createSampleGrid from './__fixtures__/SampleGrid';

// We mock out the removeBlockAndUpdateGrid import here because we don't want to have to test its logic
// while we're testing this component.
jest.mock('./util/removeBlockAndUpdateGrid');

describe('BlockyGame', () => {
  let grid;

  beforeEach(() => {
    grid = createSampleGrid();
  });

  it('renders the game from the grid provided', () => {
    const { asFragment } = render(<BlockyGame initialGrid={grid} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
