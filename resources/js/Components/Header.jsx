import React, { useState } from 'react';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenTwo, setIsDropdownOpenTwo] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsDropdownOpenTwo(!isDropdownOpenTwo);
  };

  return (
    <header className='w-full h-32'>
        <nav className="flex items-center justify-between bg-transparent h-24">
            <div className="flex-none w-20 h-20 ml-6 flex items-center justify-center">
                <a href="/">
                    <img src="/images/logof.png" className="w-10/12 h-auto m-auto"alt="Logo Izquierdo"/>
                </a>
            </div>
            <div className="flex-none text-center w-20 h-20 mr-6 flex items-center justify-center">
                <img src="/images/logob.png" className="w-full m-auto" alt="Logo Derecho"/>
            </div>
        </nav>
        <nav className="relative items-center justify-between bg-transparent w-full  h-24">
            <div className='flex w-full items-center justify-center'>
                <a href="/" className='dark:text-white hover:bg-gray-500 hover:bg-opacity-50 hover:font-semibold rounded-lg px-2 transition-colors duration-200'>
                    Inicio
                </a>                
                <div className="relative">
                    <button
                        onMouseEnter={() => setIsDropdownOpen(true)}
                        onMouseLeave={() => setIsDropdownOpen(false)}
                        className="flex items-center text-gray-800 dark:text-white hover:bg-gray-500 hover:bg-opacity-50 hover:font-semibold transition-colors duration-200 rounded-lg px-2 mx-2"
                    >
                        Delegaciones
                        <svg class="h-4 w-4 font-semibold text-white stroke-current fill-none stroke-2" viewBox="0 0 24 24">  
                            <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="6 9 12 15 18 9" />                        
                        </svg>
                    </button>
                    {isDropdownOpen && (
                        <div
                            className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg"
                            onMouseEnter={() => setIsDropdownOpen(true)}
                            onMouseLeave={() => setIsDropdownOpen(false)}
                        >
                            <div className="absolute left-1/2 transform -translate-x-1/2 -top-2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white"></div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-4">
                                <a href="#" className="block rounded-lg px-2 py-1 hover:bg-gray-500 hover:bg-opacity-50">
                                    <div className='font-bold text-black'>LA PAZ</div>
                                    <div className='text-sm text-xs text-gray-500'>Vive un paraiso entre el desierto y el mar</div> 
                                </a>
                                <a href="#" className="block rounded-lg px-2 py-1 hover:bg-gray-500 hover:bg-opacity-50">
                                    <div className='font-bold text-black'>TODOS SANTOS</div>
                                    <div className='text-sm text-xs text-gray-500'>Pueblo Magico</div> 
                                </a>
                                <a href="#" className="block rounded-lg px-2 py-1 hover:bg-gray-500 hover:bg-opacity-50">
                                    <div className='font-bold text-black'>SAN ANTONIO, El Triunfo</div>
                                    <div className='text-sm text-xs text-gray-500'>Joya historica de Baja California Sur</div> 
                                </a>
                                <a href="#" className="block rounded-lg px-2 py-1 hover:bg-gray-500 hover:bg-opacity-50">
                                    <div className='font-bold text-black'>EL SARGENTO, La Ventana</div>
                                    <div className='text-sm text-xs text-gray-500'>La Capital del Surf</div> 
                                </a>
                                <a href="#" className="block rounded-lg px-2 py-1 hover:bg-gray-500 hover:bg-opacity-50">
                                    <div className='font-bold text-black'>LOS BARRILES</div>
                                    <div className='text-sm text-xs text-gray-500'>Capital de la pesca deportiva</div> 
                                </a>
                                <a href="#" className="block rounded-lg px-2 py-1 hover:bg-gray-500 hover:bg-opacity-50">
                                    <div className='font-bold text-black'>LOS DOLORES, Puerto Chale</div>
                                    <div className='text-sm text-xs text-gray-500'>Hogar de la Ballena Gris</div> 
                                </a>
                                <a href="#" className="block rounded-lg px-2 py-1 hover:bg-gray-500 hover:bg-opacity-50">
                                    <div className='font-bold text-black'>LOS PLANES</div>
                                    <div className='text-sm text-xs text-gray-500'>Payas, naturales y hermosos paisajes</div> 
                                </a>
                                <a href="#" className="block rounded-lg px-2 py-1 hover:bg-gray-500 hover:bg-opacity-50">
                                    <div className='font-bold text-black'>EL CARRIZAL, San Blas</div>
                                    <div className='text-sm text-xs text-gray-500'>Tierra de cultivos y caminos infinitos</div> 
                                </a>
                            </div>
                        </div>
                    )}
                </div>
                <div className="relative">
                    <button
                        onMouseEnter={() => setIsDropdownOpenTwo(true)}
                        onMouseLeave={() => setIsDropdownOpenTwo(false)}
                        className="flex items-center text-white hover:bg-gray-500 hover:bg-opacity-50 hover:font-semibold rounded-lg px-2"
                    >
                        Idioma
                        <svg class="h-4 w-4 font-semibold text-white stroke-current fill-none stroke-2" viewBox="0 0 24 24">  
                            <path d="M5 7h7m-2 -2v2a5 8 0 0 1 -5 8m1 -4a7 4 0 0 0 6.7 4" />  <path d="M11 19l4 -9l4 9m-.9 -2h-6.2" />                        
                        </svg>
                    </button>
                    {isDropdownOpenTwo && (
                        <div
                            className="absolute left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 "
                            onMouseEnter={() => setIsDropdownOpenTwo(true)}
                            onMouseLeave={() => setIsDropdownOpenTwo(false)}
                        >
                            <div className="absolute left-1/2 transform -translate-x-1/2 -top-2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white"></div>
                            <a href="#" className="block rounded-lg pl-2 py-2 font-bold text-black hover:bg-gray-500 hover:bg-opacity-50">
                                Español
                            </a>
                            <a href="#" className="block rounded-lg pl-2 py-2 font-bold text-black hover:bg-gray-500 hover:bg-opacity-50">
                                Ingles
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    </header>
  );
};

export default Header;