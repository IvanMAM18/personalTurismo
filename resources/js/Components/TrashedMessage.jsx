import { TrashIcon } from 'lucide-react';
import React from 'react';

export default ({ onRestore, children }) => {
  return (
    <div className="mb-6 p-4 bg-yellow-400 rounded border border-yellow-500 flex items-center justify-between">
      <div className="flex items-center">
        <TrashIcon/>
        <div className="text-yellow-800">{children}</div>
      </div>
      <button
        className="text-yellow-800 focus:outline-none text-sm hover:underline"
        tabIndex="-1"
        type="button" 
        onClick={onRestore}
      >
        Restaurar
      </button>
    </div>
  );
};
