import React, { useState, useRef } from 'react';

const Button = ({ text, onClick }) => (
  <button
    type="button"
    className="px-4 py-1 text-xs font-medium text-white bg-gray-600 rounded-sm focus:outline-none hover:bg-gray-700"
    onClick={onClick}
  >
    {text}
  </button>
);

function filesize(size) {
  const i = Math.floor(Math.log(size) / Math.log(1024));
  return (
    (size / Math.pow(1024, i)).toFixed(2) * 1 +
    ' ' +
    ['B', 'kB', 'MB', 'GB', 'TB'][i]
  );
}


export default ({ className, name, label, accept, errors = [], onChange, required = false }) => {
  const fileInput = useRef();
  const [file, setFile] = useState(null);

  function browse() {
    fileInput.current.click();
  }

  function remove() {
    setFile(null);
    onChange(null);
    fileInput.current.value = null;
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    setFile(file);
    onChange(file);
  }

  return (
    <div className={className}>
      <div className={`border border-gray-300 focus:border-amber-500 focus:ring-amber-500 rounded-md ${errors.length && 'error'}`}>
        <input
          id={name}
          ref={fileInput}
          accept={accept}
          required={required}
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
        {!file && (
          <div className="p-2">
            <Button text="Seleccionar" onClick={browse} />
          </div>
        )}
        {file && (
          <div className="flex items-center justify-between p-2">
            <div className="flex-1 pr-1">
              {file.name}
              <span className="ml-1 text-xs text-gray-600">
                ({filesize(file.size)})
              </span>
            </div>
            <Button text="Quitar" onClick={remove} />
          </div>
        )}
      </div>
    </div>
  );
};
