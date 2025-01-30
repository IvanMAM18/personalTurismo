import { Head, Link } from "@inertiajs/react";
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
            <div className="flex mx-auto justify-center items-center my-14">
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
                                        className={`bg-gray-500 w-[5vh] h-[5vh] mr-[2vw] shadow ${
                                        currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"
                                        }`}
                                    >
                                        ◀
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        disabled={currentIndex >= delegacion.length - 5}
                                        className={`bg-gray-500 w-[5vh] h-[5vh] shadow ${
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
                                    className="bg-red-500 text-white w-[5vh] h-[5vh] shadow hover:bg-red-600"
                                    >
                                    X
                                    </button>
                                )}
                        </div>
                    </div>

                    {/* Imagen seleccionada en grande */}
                    {selectedImage && (
                        <div className="relative w-full h-[25vw] flex justify-center items-center">
                            <img
                                src={selectedImage}
                                alt="Imagen seleccionada"
                                className="w-[38vw] h-full object-coverrounded mr-auto rounded"
                            />
                                {/* Texto encima de la imagen */}
                            <div className="w-[38vw] h-full ml-4 flex flex-col justify-center items-center bg-black rounded bg-opacity-50 gap-4">
                                <h2 className="text-white text-[4vh] font-bold">La Paz</h2>
                                <h1 className="text-white text-[2.5vh]">Vive un paraíso entre el desierto y el mar</h1>
                                <button className="p-4 bg-white rounded hover:bg-gray-200">
                                    CONOCER MÁS
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Mapeo de imágenes pequeñas */}
                    {!selectedImage && (
                        <div className="top-0 right-0 w-full h-[25vw] flex flex-row items-center justify-center gap-2">
                            {delegacion.slice(currentIndex, currentIndex + 5).map((item, index) => (
                                <Link
                                    key={item.slug}
                                    href={route("delegacion.show", item.slug)}
                                    className="w-[14.7vw] h-full rounded overflow-hidden shadow shadow-[#ECC6A1]"
                                    onClick={(e) => {
                                        e.preventDefault(); // Evita la navegación al hacer clic
                                        handleImageClick(item.cover_path); // Cambia la imagen principal
                                    }}
                                >
                                    <img
                                        src={item.cover_path}
                                        alt={`Imagen ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}