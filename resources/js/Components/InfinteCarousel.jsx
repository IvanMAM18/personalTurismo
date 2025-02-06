import { Head, Link } from "@inertiajs/react";
import React, { useState, useEffect } from "react";

const InfiniteCarousel = ({ items }) => {
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 630);
    const [currentIndex, setCurrentIndex] = useState(0); // Índice actual
    const [startX, setStartX] = useState(0); // Coordenada inicial del toque

    // Detectar cambios en el tamaño de la pantalla
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 630);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Cambio automático de imágenes cada 8 segundos
    useEffect(() => {
        if (items.length > 0) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
            }, 8000); // Cambia cada 8 segundos

            return () => clearInterval(interval); // Limpia el intervalo al desmontar
        }
    }, [items]);

    const handleTouchStart = (e) => {
        setStartX(e.touches[0].clientX); // Guarda la posición inicial del toque
    };

    const handleTouchEnd = (e) => {
        const endX = e.changedTouches[0].clientX; // Obtén la posición final del toque
        if (startX - endX > 50) {
            // Desplazamiento hacia la izquierda
            setCurrentIndex((prevIndex) =>
                prevIndex === items.length - 1 ? 0 : prevIndex + 1
            );
        } else if (endX - startX > 50) {
            // Desplazamiento hacia la derecha
            setCurrentIndex((prevIndex) =>
                prevIndex === 0 ? items.length - 1 : prevIndex - 1
            );
        }
    };

    return (
        <div className={`relative w-full h-[45vh] overflow-hidden ${isSmallScreen ? "block" : "hidden"}`}>
            {/* Contenedor del carrusel */}
            <div
                className="relative flex items-center justify-center h-full"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {items.map((item, index) => {
                    // Calcular la posición relativa de cada imagen
                    const position = (index - currentIndex + items.length) % items.length;
                    return (
                        <Link
                            key={index}
                            href={route("delegacion.show", item.slug)}
                            className={`absolute w-full h-[35vh] transition-transform duration-500 ease-in-out`}
                            style={{
                                transform: `translateX(${position * 20}%) scale(${position === 0 ? 1 : 0.8})`,
                                zIndex: position === 0 ? 10 : 5,
                                opacity: position === 0 ? 1 : 0.5,
                            }}
                        >
                            <img
                                src={item.cover_path}
                                alt={item.title}
                                className="w-full h-full object-cover rounded-lg shadow-lg mt-[-2vh]"
                            />
                            {/* Contenedor de textos */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
                                <p className="text-[6vw] font-bold">{item.nombre || `Imagen ${index + 1}`}</p>
                                <p className="text-[2vh] mt-2">{item.leyenda || "Sin descripción"}</p>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Indicadores */}
            <div className="absolute bottom-[3vh] left-1/2 transform -translate-x-1/2 flex space-x-2">
                {items.map((_, index) => (
                    <div
                        key={index}
                        className={`w-3 h-3 rounded-full ${
                            index === currentIndex ? "bg-[#9E214D]" : "bg-gray-300"
                        }`}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default InfiniteCarousel;