import { Head, Link } from "@inertiajs/react";
import { ChevronRight, PinIcon, CheckIcon, MapPinIcon } from "lucide-react";
import InfiniteCarousel from "./InfinteCarousel";
import React, { useState, useEffect } from 'react';

export default function BannerDelegaciones ({delegacion}){
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

    const [currentIndex, setCurrentIndex] = useState(0); // Índice para el mapeo
  const [selectedImage, setSelectedImage] = useState(null); // Imagen seleccionada para mostrar en grande

  // Función para manejar el botón "Siguiente"
  const handleNext = () => {
    if (currentIndex < delegacion.length - 5) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Función para manejar el botón "Atrás"
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Función para seleccionar una imagen
  const handleImageClick = (imagePath) => {
    setSelectedImage(imagePath); // Establece la imagen seleccionada
  };

  // Función para cerrar la vista de imagen grande
  const handleClose = () => {
    setSelectedImage(null); // Restablece el estado para volver al mapeo normal
  };

    return (
        <>
            <div className="flex mx-auto justify-center items-center my-[3vh]">
                <div className="w-9/12 flex justify-center items-center text-black flex-col gap-6">
                    {/* Título */}
                    <div className="relative w-full flex">
                        <h1 className="text-[3vh] font-bold before:absolute before:-bottom-[0.5vh] before:h-[.5vh] before:w-[18.5vh] before:bg-[#9E214D]">
                            Delegaciones
                        </h1>
                        
                    </div>
                    <div
                        className={`mt-[4vh] grid grid-cols-2 md:grid-cols-3 gap-4 ${
                            isSmallScreen ? "hidden" : "block"
                        }`}
                    >
                        {delegacion.map((item, index) => {
                            return (
                                <Link
                                    href={route("delegacion.show", item.slug)}
                                    key={index}
                                    className="relative w-full h-[18vw] transition-transform duration-500 ease-in-out group"
                                >
                                    {/* Imagen */}
                                    <img
                                        src={item.cover_path}
                                        alt={item.title}
                                        className="w-full h-full object-cover rounded-lg shadow-lg transition duration-300 group-hover:brightness-50"
                                    />

                                    {/* Contenedor de textos */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
                                        {/* Nombre */}
                                        <p className="text-[2.2vw] font-bold">{item.nombre || `Imagen ${index + 1}`}</p>
                                        {/* Leyenda */}
                                        <p className="text-[1.2vw] mt-2">{item.leyenda || "Sin descripción"}</p>
                                    </div>

                                    {/* Div adicional que aparece al hover */}
                                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-center bg-white text-gray-700 text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-lg">
                                        <p className="text-[1vw]">Conocer más</p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    <InfiniteCarousel items={delegacion} ></InfiniteCarousel>
                    
                </div>
            </div>
        </>
    );
}