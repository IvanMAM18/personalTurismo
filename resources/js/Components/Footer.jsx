import { FacebookIcon, Globe, InstagramIcon, MailIcon, PhoneCall, PinIcon, TwitterIcon } from "lucide-react";
import React, { useState, useEffect } from 'react';

export default function Fotter(props) {

    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 890);
        
            useEffect(() => {
                const handleResize = () => {
                setIsSmallScreen(window.innerWidth <= 890);
            };
        
            window.addEventListener('resize', handleResize);
                return () => window.removeEventListener('resize', handleResize);
            }, []);

    return (
        <>
            <div className={`flex mx-auto justify-center items-center bg-[#FFCB98]  ${isSmallScreen ? 'py-[2.5vw]' : 'py-[2vw]'}`}>
                <div className="w-[100%] flex justify-center items-center text-white flex-col ">
                    <div className={` ${isSmallScreen ? '' : 'grid grid-cols-2 md:grid-cols-2 gap-[1vw]'}`}>
                        <div className="flex justify-center">
                            <div className="flex">
                                <img src="/images/logoc.png" className={`${isSmallScreen ? 'w-[13vw]' : 'w-[6vw]'}`} />
                                <img src="/images/logo2.png" className={`${isSmallScreen ? 'w-[13vw]' : 'w-[6vw]'}`} />
                            </div>
                            <div className="text-gray-800 mt-3">
                                <div className={` font-bold leading-[1vw] border-l-[0.2vw] border-l-[#9B234C] pl-[0.4vw] ${isSmallScreen?'text-[2.6vw]':'text-[1.2vw] ml-[1vw]'}`}>
                                    CONTÁCTANOS
                                </div>
                                <div className={` font-semibold ${isSmallScreen?'text-[2.6vw]':'text-[1.2vw] ml-[1vw]'}`}>
                                    Dirección Municipal de Turismo
                                </div>
                                <ul className="text-gray-950 ml-[1vw]">
                                    <li className="my-[1vw] font-bold flex gap-2">
                                        <a
                                            href="https://www.facebook.com/TurismoMunicipalLaPaz"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`flex items-center justify-center  bg-[#9B234C] text-white hover:bg-white  hover:text-[#9B234C] rounded-full shadow-md ${isSmallScreen?'w-[4vw] h-[4vw]':'w-[2vw] h-[2vw]'}`}
                                        >
                                            <FacebookIcon className={`inline ${isSmallScreen?'w-[2vw] h-[2vw]':'w-[1vw] h-[1vw]'}`}/>
                                        </a>
                                        <a
                                            href="https://twitter.com/turismolapaz1"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`flex items-center justify-center  bg-[#9B234C] text-white hover:bg-white  hover:text-[#9B234C] rounded-full shadow-md ${isSmallScreen?'w-[4vw] h-[4vw]':'w-[2vw] h-[2vw]'}`}
                                        >
                                            <TwitterIcon className={`inline ${isSmallScreen?'w-[2vw] h-[2vw]':'w-[1vw] h-[1vw]'}`}/>
                                        </a>
                                        <a
                                            href="https://www.instagram.com/turismolapaz/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`flex items-center justify-center  bg-[#9B234C] text-white hover:bg-white  hover:text-[#9B234C] rounded-full shadow-md ${isSmallScreen?'w-[4vw] h-[4vw]':'w-[2vw] h-[2vw]'}`}
                                        >
                                            <InstagramIcon className={`inline ${isSmallScreen?'w-[2vw] h-[2vw]':'w-[1vw] h-[1vw]'}`}/>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={`text-gray-800 ${isSmallScreen ? 'text-[2vw] text-center pt-[2vw]' : 'text-[1vw]'}`}>
                            <ul>
                                <li className="font-bold">
                                    <a href="tel:+526121222986">
                                        <PhoneCall
                                            className={`inline text-[#9B234C]  ${isSmallScreen?'w-[2vw] h-[2vw]':'w-[1.2vw] h-[1.2vw]'}`}
                                        ></PhoneCall>{" "}
                                        +52 612 122 2986
                                    </a>
                                </li>
                                <li className=" font-bold">
                                    <a href="mailto:turismo@lapaz.gob.mx">
                                        <MailIcon
                                            className={`inline text-[#9B234C]  ${isSmallScreen?'w-[2vw] h-[2vw]':'w-[1.2vw] h-[1.2vw]'}`}
                                        ></MailIcon>{" "}
                                        turismo@lapaz.gob.mx
                                    </a>
                                </li>
                                <li className=" font-bold">
                                    <PinIcon
                                        className={`inline text-[#9B234C]  ${isSmallScreen?'w-[2vw] h-[2vw]':'w-[1.2vw] h-[1.2vw]'}`}
                                    ></PinIcon>{" "}
                                    Gral. Félix Ortega Aguilar núm. 1745 e/
                                    Melchor Ocampo y Santos Degollado, C.P.
                                    23000
                                </li>
                                <li className=" font-bold">
                                    <Globe
                                        className={`inline text-[#9B234C]  ${isSmallScreen?'w-[2vw] h-[2vw]':'w-[1.2vw] h-[1.2vw]'}`}
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
                <div className="w-9/12 flex justify-between items-center text-white gap-6 text-[1.2vw]">
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
