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
            <div className="flex mx-auto justify-center items-center my-[3vw]">
                <div className="w-9/12 flex justify-center items-center text-black flex-col gap-6">
                    {/* Título */}
                    <div className="relative w-full flex">
                        <h1 className="text-[3vh] font-bold before:absolute before:-bottom-[0.5vh] before:h-[.5vh] before:w-[18.5vh] before:border-b before:bg-[#9E214D]">
                            Delegaciones
                        </h1>
                        <div className="ml-auto">
                                {/* Botones de navegación */}
                                {!selectedImage ? (
                                    <>
                                    <button
                                        onClick={handlePrev}
                                        disabled={currentIndex === 0}
                                        className={`bg-gray-500 w-[4.8vh] h-[4.8vh] mr-[2vw] shadow text-gray-700 ${
                                        currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"
                                        }`}
                                    >
                                        ◀
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        disabled={currentIndex >= delegacion.length - 5}
                                        className={`bg-gray-500 w-[4.8vh] h-[4.8vh] shadow text-gray-700 ${
                                        currentIndex >= delegacion.length - 5
                                            ? "opacity-50 cursor-not-allowed"
                                            : "hover:bg-gray-300"
                                        }`}
                                    >
                                        ▶
                                    </button>
                                    </>
                                ) : (
                                    // Botón para cerrar
                                    <button
                                    onClick={handleClose}
                                    className="bg-[#9E214D] opacity-70 text-white w-[4.8vh] h-[4.8vh] shadow hover:opacity-100 transition-all duration-300"
                                    >
                                    X
                                    </button>
                                )}
                        </div>
                    </div>

                    {/* Imagen seleccionada en grande */}
                    {selectedImage && (
                        <div className="relative w-full h-[28vw] flex justify-center items-center transition-all duration-300 mt-[2vw]">
                            <img
                                src={selectedImage.cover_path}
                                alt="Imagen seleccionada"
                                className="w-[38vw] h-full object-coverrounded mr-auto rounded"
                            />
                                {/* Texto encima de la imagen */}
                            <div className="w-[38vw] h-full ml-4 flex flex-col justify-center items-center bg-black rounded bg-opacity-50 gap-4">
                                <h2 className="text-white text-[2.2vw] font-bold">{selectedImage.nombre}</h2>
                                <h1 className="text-white text-[1.8vw]">{selectedImage.leyenda}</h1>
                                <Link href={route(
                                            "delegacion.show",
                                            selectedImage.slug
                                        )}>
                                    <button 
                                        
                                        className="p-[0.6vw] text-[0.9vw] bg-white rounded opacity-70 hover:opacity-100">
                                        CONOCER MÁS
                                    </button>
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Mapeo de imágenes pequeñas */}
                        {!selectedImage && (
                            <div className="top-0 right-0 w-full h-[28vw] flex flex-row items-center justify-center gap-2  mt-[2vw]">
                                {delegacion.slice(currentIndex, currentIndex + 5).map((item, index) => (
                                    <div
                                        key={item.slug}
                                        //href={route("delegacion.show", item.slug)}
                                        className="relative w-[14.7vw] h-full rounded overflow-hidden shadow shadow-[#ECC6A1] group transition-all duration-300 cursor-pointer"
                                        onClick={(e) => {
                                            e.preventDefault(); // Evita la navegación al hacer clic
                                            handleImageClick(item); // Cambia la imagen principal
                                        }}
                                    >
                                        {/* Imagen */}
                                        <img
                                            src={item.cover_path}
                                            alt={`Imagen ${index + 1}`}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 opacity-100"
                                        />

                                        {/* Texto encima de la imagen */}
                                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity duration-300">
                                            <p className="text-white text-[1.4vw] font-bold text-center">{item.nombre || `Imagen ${index + 1}`}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}


                    <InfiniteCarousel items={delegacion}></InfiniteCarousel> 
                </div>
            </div>
        </>
    );
}