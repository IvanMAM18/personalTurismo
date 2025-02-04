import React, { useState, useEffect } from 'react';
import { Head, Link } from "@inertiajs/react";


export default function ButtonMenu  ({delegacion}){
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 630);
    
        useEffect(() => {
            const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 630);
        };
    
        window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, []);
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const toggleOptions = () => {
        setIsOpen(!isOpen);
        console.log(delegacion);
    };

    return (
        <>
            <div 
                className={`border  opacity-95 rounded p-1 cursor-pointer  hover:opacity-80 hover:shadow-[#9B234C] hover:border-[#9B234C] hover:bg-[#9B234C] ${isOpen ? ' border-[#ECC6A1] text-gray-700 font-bold bg-[#ECC6A1]' : 'text-white border-white'}`}
                onClick={toggleOptions}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {
                    isOpen ? (
                        isHovered ? (
                            <svg className={`${isSmallScreen ? 'h-4 w-4' : 'h-6 w-6'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="20" y1="6" x2="13" y2="6" />  <line x1="20" y1="12" x2="11" y2="12" />  <line x1="20" y1="18" x2="13" y2="18" />  <path d="M8 8l-4 4l4 4" />
                            </svg>
                        ) : (
                            <svg className={`${isSmallScreen ? 'h-4 w-4' : 'h-6 w-6'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="20" y1="6" x2="9" y2="6" />  <line x1="20" y1="12" x2="13" y2="12" />  <line x1="20" y1="18" x2="9" y2="18" />  <path d="M4 8l4 4l-4 4" />                        
                            </svg>
                        )
                    ) : (
                        isHovered ? (
                            <svg className={`${isSmallScreen ? 'h-4 w-4' : 'h-6 w-6'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="20" y1="6" x2="9" y2="6" />  <line x1="20" y1="12" x2="13" y2="12" />  <line x1="20" y1="18" x2="9" y2="18" />  <path d="M4 8l4 4l-4 4" />                        
                            </svg>
                        ) : (
                            <svg className={`${isSmallScreen ? 'h-4 w-4' : 'h-6 w-6'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="4" y1="6" x2="20" y2="6" />  <line x1="4" y1="12" x2="20" y2="12" />  <line x1="4" y1="18" x2="20" y2="18" />
                            </svg>
                        )
                    )
                }
            </div>
        
            <div className="relative">

                {/* Div de opciones  #9B234C*/}
                <div 
                    className={`absolute w-[93vw] mt-2 right-0 top-0 text-white  rounded-lg transition-transform duration-300 ${isOpen ? 'block' : 'hidden'}`}
                >
                    <div className='w-[40vh] p-2 rounded-lg ml-auto bg-gray-100  border border-[#ECC6A1]'>
                            
                        <div className="text-[3vh] text-center font-bold text-gray-700">Delegeaciones</div>

                        <ul className="mt-2 mx-2">
                            {delegacion.delegaciones.map((item, index) => {
                                return (
                                    <li
                                        key={index}
                                        className="p-2 border-radius text-[1.6vh] text-gray-700 hover:bg-[#9B234C] hover:opacity-90 hover:cursor-pointer hover:rounded-lg hover:pl-6 hover:text-[2vh] hover:text-white"
                                    >
                                        <Link
                                            href={route("delegacion.show", item.slug)}
                                            className="block"
                                        >
                                            <span className="font-semibold">{item.nombre}</span>
                                            <p className="text-[1.2vh]">{item.leyenda}</p>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>

        </>
    );
}