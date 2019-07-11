import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Block from './Block';

describe('Block', () => {
  it('should render an active block when a colour and onClick function is provided', () => {
    const { container } = render(
      <Block x={1} y={2} colour="red" onClick={jest.fn()} />
    );
    const block = container.firstChild;
    expect(block).toHaveClass('block active');
  });

  it('should render an inactive block when an onClick function is not provided', () => {
    const { container } = render(<Block x={1} y={2} colour="red" />);
    const block = container.firstChild;
    expect(block).toHaveClass('block');
    expect(block).not.toHaveClass('active');
  });

  it('should render an inactive block when a colour is not provided', () => {
    const { container } = render(<Block x={1} y={2} onClick={jest.fn()} />);
    const block = container.firstChild;
    expect(block).toHaveClass('block');
    expect(block).not.toHaveClass('active');
  });

  it('calls onClick when clicked on', () => {
    const onClick = jest.fn();
    const { container } = render(
      <Block x={1} y={2} colour="red" onClick={onClick} />
    );
    const block = container.firstChild;

    expect(onClick).not.toHaveBeenCalled();
    fireEvent.click(block);
    expect(onClick).toHaveBeenCalled();
  });

  it('does not call onClick if the block is not active', () => {
    const onClick = jest.fn();
    const { container } = render(<Block x={1} y={2} onClick={onClick} />);
    const block = container.firstChild;

    expect(onClick).not.toHaveBeenCalled();
    fireEvent.click(block);
    expect(onClick).not.toHaveBeenCalled();
  });
});
