import React from 'react';

import classNames from 'classnames';

export default function Grid({ width, height, className, children }) {
  const style = {
    '--grid-width': width,
    '--grid-height': height,
  };

  const mergedClassName = classNames('grid', className);

  return (
    <div className={mergedClassName} style={style}>
      {children}
    </div>
  );
}
