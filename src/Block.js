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

  const mergedClassName = classNames('block', className, {
    active: !!(colour && onClick),
  });

  return (
    <div
      data-x={x}
      data-y={y}
      className={mergedClassName}
      style={mergedStyle}
      onClick={onClick}
      {...props}
    />
  );
}
