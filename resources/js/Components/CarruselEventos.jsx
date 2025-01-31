import { Head, Link } from "@inertiajs/react";
import React, { useState, useEffect } from 'react';

export default function CarruselEventos ({eventos}){
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 630);
    
        useEffect(() => {
            const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 630);
        };
    
        window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, []);
    
        const [currentIndex, setCurrentIndex] = useState(1); // Índice inicial (imagen del medio)

    // Función para manejar el cambio de imagen hacia la izquierda
    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? eventos.length - 1 : prevIndex - 1
        );
    };

    // Función para manejar el cambio de imagen hacia la derecha
    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === eventos.length - 1 ? 0 : prevIndex + 1
        );
    };

    // Obtener las imágenes visibles (3 imágenes: izquierda, centro, derecha)
    const visibleImages = [
        eventos[(currentIndex - 1 + eventos.length) % eventos.length], // Imagen izquierda
        eventos[currentIndex], // Imagen central
        eventos[(currentIndex + 1) % eventos.length], // Imagen derecha
    ];

    return (
        <>
            <div className="flex flex-col items-center">
            <h1 className="text-[3vh] text-center font-bold mb-6">
                Eventos
            </h1>
            <div className="flex items-center gap-4 relative">
                {/* Botón Izquierdo */}
                <button
                    onClick={handlePrev}
                    className="absolute left-0 bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
                >
                    {"<"}
                </button>

                {/* Imágenes visibles */}
                <div className="flex justify-center items-center gap-4">
                    {visibleImages.map((evento, index) => (
                        <div
                            key={index}
                            className={`border border-gray-300 rounded-lg text-center py-5 px-3 flex items-center justify-center h-full transition-all duration-300 ${
                                index === 1 ? "scale-110 z-10" : "scale-90 opacity-70"
                            }`}
                        >
                            <div className="mb-3">
                                <img
                                    src={evento.imagen}
                                    alt={evento.alt}
                                    className="w-full max-w-xs object-cover"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Botón Derecho */}
                <button
                    onClick={handleNext}
                    className="absolute right-0 bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
                >
                    {">"}
                </button>
            </div>
        </div>
        </>
    );
}