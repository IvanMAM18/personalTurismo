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
import HomeNuevo from "@/Components/HomeNuevo";

export default function Welcome({ delegaciones, temperatura, fecha, hora }) {
    const [videoVisible, setVideoVisible] = useState(true);

    const [isActive, setIsActive] = useState(false);
    const [banners, setBanners] = useState([]);
    const [eventos, setEventos] = useState([]);
    const [pos, setPos] = useState({ lat: 24.142247, lng: -110.313131 });
    const Marker = () => (
        <MapPinIcon
            style={{
                transform: "translate(-7%, -100%)",
                fontSize: 30,
                color: "red",
            }}
        />
    );

    const otrosData = [
        {
            id: '92',
            imagen: "/images/bannerdec/DECALOGO ANTE-PORTADA.png",
        },
        {
            id: '93',
            imagen: "/images/bannerdec/DECALOGO PORTADA.png",
        },
        {
            id: '1',
            imagen: "/images/bannerdec/DECALOGO PUNTO 1.png",
        },
        {
            id: '2',
            imagen: "/images/bannerdec/DECALOGO PUNTO 2.png",
        },
        {
            id: '3',
            imagen: "/images/bannerdec/DECALOGO PUNTO 3.png",
        },
        {
            id: '4',
            imagen: "/images/bannerdec/DECALOGO PUNTO 4.png",
        },
        {
            id: '5',
            imagen: "/images/bannerdec/DECALOGO PUNTO 5.png",
        },
        {
            id: '6',
            imagen: "/images/bannerdec/DECALOGO PUNTO 6.png",
        },
        {
            id: '7',
            imagen: "/images/bannerdec/DECALOGO PUNTO 7.png",
        },
        {
            id: '8',
            imagen: "/images/bannerdec/DECALOGO PUNTO 8.png",
        },
        {
            id: '9',
            imagen: "/images/bannerdec/DECALOGO PUNTO 9.png",
        },
        {
            id: '91',
            imagen: "/images/bannerdec/DECALOGO PUNTO 10.png",
        },
        {
            id: '92',
            imagen: "/images/bannerdec/DECALOGO PORTADA.png",
        },
    ];

    async function fetchTodo() {
        const [bannersResponse, eventosResponse] = await Promise.all([
            fetch("/banners"),
            fetch("/eventos"),
        ]);

        const banners = await bannersResponse.json();
        const eventos = await eventosResponse.json();

        return [banners, eventos];
    }

    useEffect(() => {
        fetchTodo().then(([banners, eventos]) => {
            setBanners(banners);
            setEventos(eventos);
        });
    }, []);

    const responsiveOptions = [
        {
            breakpoint: "1199px",
            numVisible: 3,
            numScroll: 1,
        },
        {
            breakpoint: "991px",
            numVisible: 3,
            numScroll: 1,
        },
        {
            breakpoint: "767px",
            numVisible: 1,
            numScroll: 1,
        },
    ];

    const toggleDescripcion = () => {
        setIsActive(!isActive);
    };
    const bannersTemplate = (banner) => {
        return (
            <div className="border-1 surface-border border-round m-2 text-center py-5 px-3 w-full flex items-center justify-center">
                <div className="mb-3">
                    <Image
                        src={banner.imagen}
                        alt={banner.alt}
                        className="w-full xl:max-w-7xl"
                        preview
                    />
                </div>
            </div>
        );
    };

    const bannersTemplate2 = (banner) => {
        return (
            <div className="border-1 surface-border border-round m-2 text-center py-5 px-3 w-full flex items-center justify-center">
                <div className="mb-3">
                    <Image
                        src={banner.imagen}
                        alt={banner.alt}
                        className="w-full xl:max-w-7xl"
                        preview
                    />
                </div>
            </div>
        );
    };

    const eventosTemplate = (evento) => {
        return (
            <div className="border-1 surface-border border-round m-2 text-center py-5 px-3 flex items-center justify-center align-middle h-full">
                <div className="mb-3">
                    <Image
                        src={evento.imagen}
                        alt={evento.alt}
                        className="w-full max-w-xs"
                        preview
                    />
                </div>
            </div>
        );
    };
    const createMapOptions = (maps) => {
        // next props are exposed at maps
        // "Animation", "ControlPosition", "MapTypeControlStyle", "MapTypeId",
        // "NavigationControlStyle", "ScaleControlStyle", "StrokePosition", "SymbolPath", "ZoomControlStyle",
        // "DirectionsStatus", "DirectionsTravelMode", "DirectionsUnitSystem", "DistanceMatrixStatus",
        // "DistanceMatrixElementStatus", "ElevationStatus", "GeocoderLocationType", "GeocoderStatus", "KmlLayerStatus",
        // "MaxZoomStatus", "StreetViewStatus", "TransitMode", "TransitRoutePreference", "TravelMode", "UnitSystem"
        return {
            zoomControlOptions: {
                position: maps.ControlPosition.RIGHT_CENTER,
                style: maps.ZoomControlStyle.SMALL,
            },
            mapTypeControlOptions: {
                position: maps.ControlPosition.TOP_RIGHT,
            },
            mapTypeControl: true,
        };
    };

    return (
        <>
            <Head title="Inicio" />
            <HomeNuevo></HomeNuevo>
            <Footer></Footer>
        </>
    );
}
