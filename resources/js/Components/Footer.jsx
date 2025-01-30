import { FacebookIcon, Globe, InstagramIcon, MailIcon, PhoneCall, PinIcon, TwitterIcon } from "lucide-react";
import React, { useState, useEffect } from 'react';

export default function Fotter(props) {

    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 770);
        
            useEffect(() => {
                const handleResize = () => {
                setIsSmallScreen(window.innerWidth <= 770);
            };
        
            window.addEventListener('resize', handleResize);
                return () => window.removeEventListener('resize', handleResize);
            }, []);

    return (
        <>
            <div className="flex mx-auto justify-center items-center bg-[#FFCB98] md:h-[15vw] py-[2vw]">
                <div className="w-[100%] flex justify-center items-center text-white flex-col ">
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-[1vw] ">
                        <div className="flex justify-center items-center">
                            <img src="/images/logoc.png" className="w-[6vw]" />
                            <img src="/images/logo2.png" className="w-[6vw] mr-[2vw]" />
                            <div className="text-gray-800 ">
                                <div className="text-[1.3vw] font-bold leading-[1.2vw] border-l-[0.2vw] border-l-[#9B234C] pl-[0.5vw] ">
                                    CONTÁCTANOS
                                </div>
                                <div className="text-[1.3vw] font-semibold">
                                    Dirección Municipal de Turismo
                                </div>
                                <ul className="text-gray-950">
                                    <li className="my-[1vw] font-bold flex gap-3">
                                        <a
                                            href="https://www.facebook.com/TurismoMunicipalLaPaz"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center w-[2vw] h-[2vw] bg-[#9B234C] text-white hover:bg-white  hover:text-[#9B234C] rounded-full shadow-md"
                                        >
                                            <FacebookIcon className="inline w-[1.2vw] h-[1.2vw]" />
                                        </a>
                                        <a
                                            href="https://twitter.com/turismolapaz1"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center w-[2vw] h-[2vw] bg-[#9B234C] text-white hover:bg-white hover:text-[#9B234C]  rounded-full shadow-md"
                                        >
                                            <TwitterIcon className="inline w-[1.2vw] h-[1.2vw]" />
                                        </a>
                                        <a
                                            href="https://www.instagram.com/turismolapaz/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center w-[2vw] h-[2vw] bg-[#9B234C] text-white hover:bg-white hover:text-[#9B234C]  rounded-full shadow-md"
                                        >
                                            <InstagramIcon className="inline w-[1.2vw] h-[1.2vw]" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="text-[1.1vw] text-gray-800">
                            <ul>
                                <li className="font-bold">
                                    <a href="tel:+526121222986">
                                        <PhoneCall
                                            className="inline text-[#9B234C] w-[1vw] h-[1vw]"
                                        ></PhoneCall>{" "}
                                        +52 612 122 2986
                                    </a>
                                </li>
                                <li className=" font-bold">
                                    <a href="mailto:turismo@lapaz.gob.mx">
                                        <MailIcon
                                            className="inline text-[#9B234C] w-[1vw] h-[1vw]"
                                        ></MailIcon>{" "}
                                        turismo@lapaz.gob.mx
                                    </a>
                                </li>
                                <li className=" font-bold">
                                    <PinIcon
                                        className="inline text-[#9B234C] w-[1vw] h-[1vw]"
                                    ></PinIcon>{" "}
                                    Gral. Félix Ortega Aguilar núm. 1745 e/
                                    Melchor Ocampo y Santos Degollado, C.P.
                                    23000
                                </li>
                                <li className=" font-bold">
                                    <Globe
                                        className="inline text-[#9B234C] w-[1vw] h-[1vw]"
                                    ></Globe>{" "}
                                    <a
                                        target="_blank"
                                        href="https://lapaz.gob.mx"
                                    >
                                        Ayuntamiento de La Paz
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div> 
            <div className="flex mx-auto justify-center items-center bg-gray-950 py-[1vh] opacity-80">
                <div className="w-9/12 flex justify-between items-center text-white gap-6 text-[1vw]">
                    <div>
                        <a href={route("avisoprivacidad")}>Política de privacidad</a> |{" "}
                        <a href={route("terminos")}>Términos y Condiciones</a>
                    </div>
                    <div>Copyright | Todos los derechos reservados | 2025</div>
                </div>
            </div>
        </>
    );
}
