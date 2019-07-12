import React from 'react';
import { render } from '@testing-library/react';

import BlockyGame from './BlockyGame';

import createSampleGrid from './__fixtures__/SampleGrid';

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
