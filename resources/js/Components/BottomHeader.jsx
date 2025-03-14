import { usePage } from '@inertiajs/react';
import React, { useState } from 'react';
import { Link } from '@inertiajs/react'

export default () => {
  const { auth } = usePage().props;
  const [menuOpened, setMenuOpened] = useState(false);
  return (
    <div className="flex items-center justify-between w-full p-4 text-sm bg-white border-b md:py-0 md:px-12 d:text-md">
      <div className="mt-1 mr-4">Turismo</div>
      <div className="relative">
        <div
          className="flex items-center cursor-pointer select-none group"
          onClick={() => setMenuOpened(true)}
        >
          <div className="mr-1 text-gray-800 whitespace-nowrap group-hover:text-amber-600 focus:text-amber-600">
            <span>{auth.user.name}</span>
          </div>
         
        </div>
        <div className={menuOpened ? '' : 'hidden'}>
          <div className="absolute top-0 right-0 left-auto z-20 py-2 mt-8 text-sm whitespace-nowrap bg-white rounded shadow-xl">
            <Link
              href="/admin/profile"
              className="block px-6 py-2 hover:bg-amber-600 hover:text-white"
              onClick={() => setMenuOpened(false)}
            >
              Mi perfil
            </Link>
            <Link
              as="button"
              href={route('logout')}
              className="block w-full px-6 py-2 text-left focus:outline-none hover:bg-amber-600 hover:text-white"
              method="post"
            >
              Salir
            </Link>
          </div>
          <div
            onClick={() => {
              setMenuOpened(false);
            }}
            className="fixed inset-0 z-10 bg-black opacity-25"
          ></div>
        </div>
      </div>
    </div>
  );
};
