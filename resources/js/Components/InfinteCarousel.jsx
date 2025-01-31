import React, { useState } from "react";

const InfiniteCarousel = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState(0); // Índice actual
    const [startX, setStartX] = useState(0); // Coordenada inicial del toque

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
        <div className="relative w-full h-[300px] overflow-hidden">
            {/* Contenedor del carrusel */}
            <div
                className="relative flex items-center justify-center h-full"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {items.map((item, index) => {
                    // Calcular la posición relativa de cada imagen
                    const position =
                        (index - currentIndex + items.length) % items.length;

                    return (
                        <div
                            key={index}
                            className={`absolute w-[80%] h-[200px] transition-transform duration-500 ease-in-out`}
                            style={{
                                transform: `translateX(${
                                    position * 20
                                }%) scale(${position === 0 ? 1 : 0.8})`,
                                zIndex: position === 0 ? 10 : 5,
                                opacity: position === 0 ? 1 : 0.5,
                            }}
                        >
                            <img
                                src={item.cover_path}
                                alt={item.title}
                                className="w-full h-full object-cover rounded-lg shadow-lg"
                            />
                        </div>
                    );
                })}
            </div>

            {/* Indicadores */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 ">
                {items.map((_, index) => (
                    <div
                        key={index}
                        className={`w-3 h-3 rounded-full ${
                            index === currentIndex
                                ? "bg-blue-500"
                                : "bg-gray-300"
                        }`}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default InfiniteCarousel;