import { Head, Link } from "@inertiajs/react";
import TopBar from "@/Components/TopBar";
import Menu from "@/Components/Menu";
import Footer from "@/Components/Footer";
import Suscribir from "@/Components/Suscribir";
import Public from "@/Layouts/PublicLayout";
import { useState } from "react";
import { useEffect } from "react";
import { Carousel } from "primereact/carousel";
import { Image } from "primereact/image";
import { Dialog } from "primereact/dialog";
import { ChevronRight, PinIcon, CheckIcon, MapPinIcon } from "lucide-react";
import GoogleMapReact from "google-map-react";
import Header from "@/Components/Header";



const BienVenido = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 680);

    useEffect(() => {
        const handleResize = () => {
        setIsSmallScreen(window.innerWidth <= 800);
    };

    window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
      <div className={`flex relative w-full ${isSmallScreen ? 'h-[179vw]' : 'h-[65vw]'}`}>
        <div className="">
            <img src="/images/3.png" alt="" className={`w-screen ${isSmallScreen ? 'h-[70vw]' : 'h-[60vw]'} text-center`}/>
        </div>
        <div className="absolute h-full">
            <div className={` ${isSmallScreen ? '' : 'w-11/12 h-[32vw] flex '} mx-[4vw] mt-8`}>
                <img className={` ${isSmallScreen ? 'w-11/12 h-[45vw] mx-auto rounded-tr-[22vw]' : 'w-1/2'} rounded-l-[22vw] `} src="/images/paraiso.jpg" alt="Imagen de bienvenida" />
                <div className={`${isSmallScreen ? 'mx-auto':'ml-[2vw]'} text-justify text-black`}>
                    <div className={`${isSmallScreen ? 'text-[2.5vw] mt-1':'text-[2vw]'} font-semibold text-orange-700`}> Bienvenidos a La Paz, Baja California Sur</div>
                    <div className= {`${isSmallScreen ? 'text-[7vw]':'text-[3.26vw]'} font-bold`} >¡Un paraíso entre dos mares!</div>
                    <div className={`${isSmallScreen ? 'text-[2.6vw]':'text-[1.35vw]'} font-semibold`}>
                        Descubre la belleza natural y la rica cultura que hacen de La Paz un destino turístico 
                        incomparable. Ubicado estratégicamente en la hermosa península de Baja California Sur, 
                        este encantador municipio te ofrece una combinación única de maravillas naturales y una 
                        vibrante escena cultural.
                    </div>
                    <div className={`${isSmallScreen ? 'text-[2.6vw]':'text-[1.35vw]'} font-semibold`}>
                        Conocida por sus impresionantes playas de arena blanca y aguas cristalinas, La Paz es un 
                        verdadero paraíso para los amantes de los deportes acuáticos y los entusiastas de la naturaleza. 
                        Sumérgete en las profundidades del Mar de Cortés, conocido como "el acuario del mundo", y 
                        descubre una rica diversidad marina que incluye leones marinos, tortugas, delfines y, si 
                        tienes suerte, incluso podrías nadar junto a majestuosas ballenas.
                    </div>
                </div>
            </div>
            <div className={`${isSmallScreen ? 'text-[2.44vw]':'text-[1.5vw]'} absolute w-11/12 ml-[4vw] text-black text-justify pt-1 font-semibold`}>
                Además de sus impresionantes paisajes costeros, La Paz ofrece una gran variedad de actividades terrestres. 
                Explora el desierto y las montañas circundantes en emocionantes paseos en vehículos todo terreno, realiza 
                caminatas en hermosos senderos naturales o disfruta de un relajante paseo en bicicleta por las tranquilas 
                calles de la ciudad. Pero La Paz no solo se trata de aventuras al aire libre. Sumérgete en la rica historia y cultura de la región 
                explorando los fascinantes museos, galerías de arte y sitios históricos que se encuentran en la ciudad. 
                Admira la arquitectura colonial, descubre las tradiciones locales y déjate cautivar por la amabilidad y 
                hospitalidad de su gente. Y, por supuesto, no podemos olvidar mencionar la deliciosa gastronomía de La Paz. Saborea los sabores frescos 
                y auténticos de los mariscos y pescados capturados en las aguas cercanas. Desde ceviches y tacos de mariscos 
                hasta platillos gourmet en restaurantes de renombre, la oferta culinaria de La Paz te dejará con un gusto 
                exquisito en el paladar. <br />
                En resumen, La Paz, Baja California Sur, es un destino turístico que ofrece una experiencia completa para 
                todos los visitantes. Ya sea que busques aventuras emocionantes, momentos de relajación en la playa, una 
                inmersión cultural o una combinación de todas estas cosas, La Paz te brindará recuerdos inolvidables y una 
                conexión auténtica con la naturaleza y la cultura de México. <br />
                <div className={`${isSmallScreen ? 'text-[2.44vw]':'text-[1.5vw]'} font-semibold text-orange-700`}>
                    ¡Te esperamos con los brazos abiertos en La Paz!
                </div>
            </div>  
        </div>  
      </div>
    );
  };
  
  export default BienVenido;