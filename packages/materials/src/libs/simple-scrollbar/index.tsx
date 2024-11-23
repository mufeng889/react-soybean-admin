import ClassNames from 'classnames';
import React from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

const SimpleScrollbar = ({
  children,
  className
}: {
  readonly children: React.ReactNode;
  readonly className?: string;
}) => {
  return (
    <div className={ClassNames('h-full flex-1-hidden', className)}>
      <SimpleBar className="h-full">{children}</SimpleBar>
    </div>
  );
};

export default SimpleScrollbar;
