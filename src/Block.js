import React from 'react';

import classNames from 'classnames';

export default function Block({
  x,
  y,
  colour,
  style,
  onClick,
  className,
  ...props
}) {
  const mergedStyle = Object.assign({}, style, {
    backgroundColor: colour,
  });

  const active = !!(colour && onClick);
  const mergedClassName = classNames('block', className, {
    active: active,
  });

  return (
    <div
      data-x={x}
      data-y={y}
      data-testid={`block-${x}-${y}`}
      className={mergedClassName}
      style={mergedStyle}
      onClick={active ? onClick : null}
      {...props}
    />
  );
}
