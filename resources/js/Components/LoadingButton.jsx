import { cn } from '@/lib/utils';
import React from 'react';

export default ({ loading, className, children, ...props }) => {
  const classNames = cn(
    'flex items-center',
    'focus:outline-none',
    {
      'pointer-events-none bg-opacity-75 select-none': loading
    },
    className
  );
  return (
    <button disabled={loading} className={classNames} {...props}>
      {loading && <div className="mr-2 btn-spinner" />}
      {children}
    </button>
  );
};
