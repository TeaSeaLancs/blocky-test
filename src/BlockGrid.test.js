import React from 'react';

import { render, fireEvent } from '@testing-library/react';
import BlockGrid from './BlockGrid';

import createSampleGrid from './__fixtures__/SampleGrid';

describe('BlockGrid', () => {
  let grid;

  beforeEach(() => {
    grid = createSampleGrid();
  });

  // This snapshot test handles the heavy lifting of testing the rendering of the component
  // meaning we don't have to bother writing tedious "check that the colour is blue" tests
  it('renders a grid of blocks as passed', () => {
    const { asFragment } = render(<BlockGrid grid={grid} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("calls onBlockRemove with a block's x&y coordinates when a block is clicked on", () => {
    const onBlockRemove = jest.fn();

    const { getByTestId } = render(
      <BlockGrid grid={grid} onBlockRemove={onBlockRemove} />
    );
    const block = getByTestId('block-3-4');

    expect(onBlockRemove).not.toHaveBeenCalled();
    fireEvent.click(block);
    expect(onBlockRemove).toHaveBeenCalledWith(3, 4);
  });
});
