import { useState, useEffect } from "react";

export default function BannerEventos({ eventos }) {
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 780);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 780);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % eventos.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + eventos.length) % eventos.length);
    };

    const openModal = () => {
        setIsModalOpen(true); // Abre el modal
    };

    const closeModal = () => {
        setIsModalOpen(false); // Cierra el modal
    };

    return (
        <>
            {/* Carrusel */}
            <div className={`relative w-full ${isSmallScreen ? "h-[120vw]" : "h-[80vh]"} mt-6 mb-[5vh]`}>
                <div className="relative overflow-hidden rounded-lg h-auto min-h-full max-h-full mx-auto w-9/12">
                    {(eventos || []).map((evento, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-700 ease-in-out flex justify-center items-center hover:bg-gray-700 ${
                                index === currentIndex ? "opacity-100" : "opacity-0"
                            }`}
                        >
                            <img
                                src={evento.imagen}
                                alt={evento.alt}
                                className="h-full object-cover rounded-lg border border-[#ECC6A1] cursor-pointer "
                                onClick={openModal} // Abre el modal al hacer clic
                            />
                        </div>
                    ))}
                </div>

                {/* Botón para ir al slide anterior */}
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

                {/* Botón para ir al slide siguiente */}
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
            </div>

            {/* Modal para mostrar la imagen en pantalla completa */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 hover:bg-gray-700"
                    onClick={closeModal} // Cierra el modal al hacer clic fuera de la imagen
                >
                    <img
                        src={eventos[currentIndex].imagen}
                        alt={eventos[currentIndex].alt}
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