import React, { useState, useEffect } from 'react';

export default function BannerBienvenida() {
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 780);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal

    const images = [
        '/images/bannerdec/DECALOGO ANTE-PORTADA.png',
        '/images/bannerdec/DECALOGO PORTADA.png',
        '/images/bannerdec/DECALOGO PUNTO 1.png',
        '/images/bannerdec/DECALOGO PUNTO 2.png',
        '/images/bannerdec/DECALOGO PUNTO 3.png',
        '/images/bannerdec/DECALOGO PUNTO 4.png',
        '/images/bannerdec/DECALOGO PUNTO 5.png',
        '/images/bannerdec/DECALOGO PUNTO 6.png',
        '/images/bannerdec/DECALOGO PUNTO 7.png',
        '/images/bannerdec/DECALOGO PUNTO 8.png',
        '/images/bannerdec/DECALOGO PUNTO 9.png',
        '/images/bannerdec/DECALOGO PUNTO 10.png',
        '/images/bannerdec/DECALOGO PORTADA.png',
    ];

    // Detectar cambios en el tamaño de la pantalla
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 780);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Cambio automático de imágenes cada 10 segundos
    useEffect(() => {
        if (images.length > 0) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            }, 10000); // Cambia cada 10 segundos

            return () => clearInterval(interval); // Limpia el intervalo al desmontar
        }
    }, [images]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const openModal = () => {
        setIsModalOpen(true); // Abre el modal
    };

    const closeModal = () => {
        setIsModalOpen(false); // Cierra el modal
    };

    return (
        <>
            {/* BIENVENIDA */}
            <div className={`relative w-full ${isSmallScreen ? 'h-[40vw] mt-[1vw] mb-[6vw]' : 'h-[40vw] mt-[3vw] mb-[4vw]'}  `}>
                <div className="relative overflow-hidden rounded shadow shadow-[#ECC6A1] h-auto min-h-full max-h-full w-9/12 mx-auto">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                                index === currentIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            <img
                                src={image}
                                className="w-full h-full object-cover rounded cursor-pointer"
                                alt={`Slide ${index + 1}`}
                                onClick={openModal} // Abre el modal al hacer clic
                            />
                        </div>
                    ))}
                </div>

                {/* Botón para ir al slide anterior */}
                {images.length > 1 && (
                    <button
                        onClick={prevSlide}
                        className="absolute top-1/2 left-0 z-30 transform -translate-y-1/2 mx-[3vw] bg-white"
                    >
                        <span className="inline-flex items-center justify-center w-[5vw] h-[5vw] rounded shadow shadow-[#ECC6A1] hover:bg-[#9E214D] hover:text-white">
                            <svg
                                className="w-[2vw] h-[2vw]"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 6 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 1 1 5l4 4"
                                />
                            </svg>
                            <span className="sr-only">Previous</span>
                        </span>
                    </button>
                )}

                {/* Botón para ir al slide siguiente */}
                {images.length > 1 && (
                    <button
                        onClick={nextSlide}
                        className="absolute top-1/2 right-0 z-30 transform -translate-y-1/2 mx-[3vw] bg-white"
                    >
                        <span className="inline-flex items-center justify-center w-[5vw] h-[5vw] rounded shadow shadow-[#ECC6A1] hover:bg-[#9E214D] hover:text-white">
                            <svg
                                className="w-[2vw] h-[2vw]"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 6 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 9 4-4-4-4"
                                />
                            </svg>
                            <span className="sr-only">Next</span>
                        </span>
                    </button>
                )}
            </div>

            {/* Modal para mostrar la imagen en pantalla completa */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
                    onClick={closeModal} // Cierra el modal al hacer clic fuera de la imagen
                >
                    <img
                        src={images[currentIndex]}
                        alt={`Slide ${currentIndex + 1}`}
                        className="max-w-full max-h-full rounded-lg"
                    />
                    <button
                        onClick={closeModal}
                        className="absolute top-5 right-5 text-white text-3xl font-bold"
                    >
                        &times;
                    </button>
                </div>
            )}
        </>
    );
}