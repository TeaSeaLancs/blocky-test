import React from 'react';

import classNames from 'classnames';

export default function Block({ x, y, color, onClick }) {
  const style = {
    backgroundColor: color,
  };

  const className = classNames('block', {
    active: !!color,
  });

  return (
    <div
      className={className}
      data-x={x}
      data-y={y}
      style={style}
      onClick={onClick}
    />
  );
}
