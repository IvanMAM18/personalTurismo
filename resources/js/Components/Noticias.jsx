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



const Noticias = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 680);

    useEffect(() => {
        const handleResize = () => {
        setIsSmallScreen(window.innerWidth <= 800);
    };

    window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
      <div className={`px-[3.8vw]`}>
        <div className="w-full">
            <div className={`${isSmallScreen ? 'text-[3.5vw] pt-2':'text-[3vw]'} font-semibold`}>Noticias</div>
            <div className="border-b-2 border-orange-700 "></div>
            <div className={`grid ${isSmallScreen ? 'grid-cols-2':'grid-cols-3'} gap-1 mt-4`}>
              <div className={`bg-blue-500 text-white w-full ${isSmallScreen ? 'h-[50vw]' : 'h-[32.5vw]'} flex flex-col relative`}>
                <img src="/images/d4.jpg" alt="" className="w-full h-full object-cover" />
                <div className="absolute bottom-[7vw] left-0 right-0 pl-2">
                  <div className={`grid ${isSmallScreen ? 'text-[5.8vw]':'text-[4vw]'} font-semibold`}>LA PAZ</div>
                  <div className={`grid ${isSmallScreen ? 'text-[2.5vw]':'text-[1.5vw]'} text-white/50`}>Vive un paraíso entre el desierto y el mar</div>
                </div>
              </div>
              <div className={`bg-blue-500 text-white w-full ${isSmallScreen ? 'h-[50vw]' : 'h-[32.5vw]'} flex flex-col relative`}>
                <img src="/images/d4.jpg" alt="" className="w-full h-full object-cover" />
                <div className="absolute bottom-[7vw] left-0 right-0 pl-2">
                  <div className={`grid ${isSmallScreen ? 'text-[5.8vw]':'text-[4vw]'} font-semibold`}>TODOS SANTOS</div>
                  <div className={`grid ${isSmallScreen ? 'text-[2.5vw]':'text-[1.5vw]'} text-white/50`}>Pueblo Mágico</div>
                </div>
              </div>
              <div className={`bg-blue-500 text-white w-full ${isSmallScreen ? 'h-[50vw]' : 'h-[32.5vw]'} flex flex-col relative`}>
                <img src="/images/d4.jpg" alt="" className="w-full h-full object-cover" />
                <div className="absolute bottom-[7vw] left-0 right-0 pl-2">
                  <div className={`grid ${isSmallScreen ? 'text-[5.8vw]':'text-[4vw]'} font-semibold`}>SAN ANTONIO,  El Triunfo</div>
                  <div className={`grid ${isSmallScreen ? 'text-[2.5vw]':'text-[1.5vw]'} text-white/50`}>Joya Histórica de Baja California Sur</div>
                </div>
              </div>
              <div className={`bg-blue-500 text-white w-full ${isSmallScreen ? 'h-[50vw]' : 'h-[32.5vw]'} flex flex-col relative`}>
                <img src="/images/d4.jpg" alt="" className="w-full h-full object-cover" />
                <div className="absolute bottom-[7vw] left-0 right-0 pl-2">
                  <div className={`grid ${isSmallScreen ? 'text-[5.8vw]':'text-[4vw]'} font-semibold`}>EL SARGENTO, La Ventana</div>
                  <div className={`grid ${isSmallScreen ? 'text-[2.5vw]':'text-[1.5vw]'} text-white/50`}>La Capital del Kite Surf</div>
                </div>
              </div>
              <div className={`bg-blue-500 text-white w-full ${isSmallScreen ? 'h-[50vw]' : 'h-[32.5vw]'} flex flex-col relative`}>
                <img src="/images/d4.jpg" alt="" className="w-full h-full object-cover" />
                <div className="absolute bottom-[7vw] left-0 right-0 pl-2">
                  <div className={`grid ${isSmallScreen ? 'text-[5.8vw]':'text-[4vw]'} font-semibold`}>LOS BARRILES</div>
                  <div className={`grid ${isSmallScreen ? 'text-[2.5vw]':'text-[1.5vw]'} text-white/50`}>Capital de la pesca deportiva</div>
                </div>
              </div>
              <div className={`bg-blue-500 text-white w-full ${isSmallScreen ? 'h-[50vw]' : 'h-[32.5vw]'} flex flex-col relative`}>
                <img src="/images/d4.jpg" alt="" className="w-full h-full object-cover" />
                <div className="absolute bottom-[7vw] left-0 right-0 pl-2">
                  <div className={`grid ${isSmallScreen ? 'text-[5.8vw]':'text-[4vw]'} font-semibold`}>LOS DOLORES, Puerto Chale</div>
                  <div className={`grid ${isSmallScreen ? 'text-[2.5vw]':'text-[1.5vw]'} text-white/50`}>Hogar de la Ballena Gris</div>
                </div>
              </div>
              <div className={`bg-blue-500 text-white w-full ${isSmallScreen ? 'h-[50vw]' : 'h-[32.5vw]'} flex flex-col relative`}>
                <img src="/images/d4.jpg" alt="" className="w-full h-full object-cover" />
                <div className="absolute bottom-[7vw] left-0 right-0 pl-2">
                  <div className={`grid ${isSmallScreen ? 'text-[5.8vw]':'text-[4vw]'} font-semibold`}>LOS PLANES</div>
                  <div className={`grid ${isSmallScreen ? 'text-[2.5vw]':'text-[1.5vw]'} text-white/50`}>Playas, naturaleza, y hermosos paisajes</div>
                </div>
              </div>
              <div className={`bg-blue-500 text-white w-full ${isSmallScreen ? 'h-[50vw]' : 'h-[32.5vw]'} flex flex-col relative`}>
                <img src="/images/d4.jpg" alt="" className="w-full h-full object-cover" />
                <div className="absolute bottom-[7vw] left-0 right-0 pl-2">
                  <div className={`grid ${isSmallScreen ? 'text-[5.8vw]':'text-[4vw]'} font-semibold`}>EL CARRIZAL, San Blas</div>
                  <div className={`grid ${isSmallScreen ? 'text-[2.5vw]':'text-[1.5vw]'} text-white/50`}>Tierra de cultivos y caminos infinitos</div>
                </div>
              </div>
            </div>
        </div>
      </div>
    );
  };
  
  export default Noticias;