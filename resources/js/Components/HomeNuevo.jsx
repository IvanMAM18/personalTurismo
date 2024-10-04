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

const HomeNuevo = () => {

  return (
        <div className="relative w-full h-[90vh]">
            <video 
                className="absolute top-0 left-0 w-full h-full object-cover" 
                src="/images/video-2.mp4" 
                autoPlay 
                loop 
                muted
            />
            <div className="absolute w-full h-full flex flex-col justify-between items-center bg-black bg-opacity-50">
                <Header/>
                <div className="flex flex-col mb-16 justify-end items-center flex-grow text-center">
                    <div className="text-white text-6xl font-bold">¡Bienvenido a La Paz!</div>
                    <div className="text-white text-xl mt-2">Un destino que despierta tus sentidos</div>
                </div>
            </div>
        </div>
  );
};

export default HomeNuevo;