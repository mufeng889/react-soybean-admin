import React from 'react';
import SimpleBar from 'simplebar-react';
import ClassNames from 'classnames';
import 'simplebar-react/dist/simplebar.min.css';
const SimpleScrollbar = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={ClassNames('h-full flex-1-hidden', className)}>
      <SimpleBar className="h-full">{children}</SimpleBar>
    </div>
  );
};

export default SimpleScrollbar;
