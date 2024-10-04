import React from 'react';

export default ({ onRestore, children }) => (
  <button
    className="text-slate-600 focus:outline-none hover:underline"
    tabIndex="-1"
    type="button"
    onClick={onRestore}
  >
    {children}
  </button>
);
