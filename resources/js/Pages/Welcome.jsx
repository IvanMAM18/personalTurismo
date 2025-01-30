import { Head, Link } from "@inertiajs/react";
import TopBar from "@/Components/TopBar";
import Menu from "@/Components/Menu";
import Footer from "@/Components/Footer";
import ButtonMenu from "@/Components/ButtonMenu";
import BannerDelegaciones from "@/Components/BannerDelegaciones";
import Suscribir from "@/Components/Suscribir";
import Public from "@/Layouts/PublicLayout";
import { useState } from "react";
import { useEffect } from "react";
import { Carousel } from "primereact/carousel";
import { Image } from "primereact/image";
import { Dialog } from "primereact/dialog";
import { ChevronRight, PinIcon, CheckIcon, MapPinIcon } from "lucide-react";
import GoogleMapReact from "google-map-react";

export default function Welcome({ delegaciones, temperatura, fecha, hora }) {
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 790);

    useEffect(() => {
        const handleResize = () => {
        setIsSmallScreen(window.innerWidth <= 790);
    };

    window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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

    const images = [
        '/images/bannerdec/DECALOGO ANTE-PORTADA.png',
        '/images/bannerdec/DECALOGO PORTADA.png',
        '/images/bannerdec/DECALOGO PUNTO 1.png',
        '/images/bannerdec/DECALOGO PUNTO 2.png',
        '/images/bannerdec/DECALOGO PUNTO 3.png',
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

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

    //const [currentIndex, setCurrentIndex] = useState(0); // Índice para las imágenes pequeñas
    const [selectedImage, setSelectedImage] = useState(null); // Imagen seleccionada para mostrar en grande

    // Función para manejar el botón "Siguiente"
    const handleNext = () => {
      if (currentIndex < delegaciones.length - 5) {
        setCurrentIndex(currentIndex + 1);
      }
    };
  
    // Función para manejar el botón "Atrás"
    const handlePrev = () => {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    };
  
    // Función para seleccionar una imagen
    const handleImageClick = (imagePath) => {
      setSelectedImage(imagePath); // Establece la imagen seleccionada
    };
  
    // Función para cerrar la vista de imagen grande
    const handleClose = () => {
      setSelectedImage(null); // Restablece el estado para volver al mapeo normal
    };

    return (
        <>
            <Head title="Inicio" />
            {/* <Dialog
                visible={videoVisible}
                onHide={() => setVideoVisible(false)}
                dismissableMask={true}
                draggable={false}
                resizable={false}
                className="h-5/6 w-full lg:w-8/12 xl:w-7/12 xl:h-full"
            >
                <div className="flex flex-col justify-center items-center h-full p-5 pt-10">
                    <img src="/images/DECALOGO 21 FEB.jpg" className="h-full" />
                    <a
                        href="/images/DECALOGO 21 FEB.jpg"
                        download="/images/DECALOGO 21 FEB.jpg"
                        className="flex w-full rounded-lg my-5 p-4 bg-gradient-to-r from-orange-500 to-orange-700 font-bold text-white items-center justify-center"
                    >
                        Descargar
                    </a>
                </div>
            </Dialog> */}
            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-center bg-white  selection:bg-red-500 selection:text-white">
                <img
                    src="/images/3.png"
                    alt="Imagen fija"
                    className="fixed top-0 left-0 w-full h-auto object-cover z-0"
                />
                <div className="w-full mx-auto relative">
                    <div className={`relative max-w-full ${isSmallScreen ? ' h-[55.8vw] ' : ' h-[40vw] '}  mx-auto bg-[url('/images/principal.jpg')] bg-cover bg-center`}>
                        <TopBar
                            temperatura={temperatura}
                            fecha={fecha}
                            hora={hora}
                        ></TopBar>
                        <Menu delegaciones={delegaciones}></Menu>
                        {/* <ButtonMenu></ButtonMenu> */}

                        {/* <div className="relative z-[3] flex flex-col justify-end h-full items-center text-white md:pt-72 md:pb-10 sm:p-10 p-7 ">
                             <h1 className="md:mt-6 sm:text-5xl text-3xl font-extrabold text-center">
                                ¡ Bienvenidos a La Paz !
                            </h1>
                            <h2 className="md:mt-6 mt-3 sm:text-2xl">
                                Un destino que despierta tus sentidos
                            </h2> 
                        </div> */}
                        {/* <div className="absolute inset-0 bg-gray-950/75 w-full h-full z-[2]"></div> */}
                        <video
                            autoPlay
                            muted
                            loop
                            preload="true"
                            playsInline
                            className={`absolute object-cover inset-0 z-[1] min-w-full max-w-none w-full ${isSmallScreen ? ' ' : ' h-auto min-h-full max-h-full'} `}
                        >
                            <source
                                src="/images/video-2.mp4"
                                type="video/mp4"
                                preload={"auto"}
                            />
                            Sin video
                        </video> 
                    </div>
                    
                    {/* BIENVENIDA */}
                    <div className="flex mx-auto bg-center justify-center items-center xl:py-10">
                        <div className="w-9/12 flex flex-col xl:flex-row justify-center items-center text-black">
                            <div className="xl:m-0 my-4">
                                <img
                                    src="/images/paraiso.jpg"
                                    className="min-w-full max-w-none w-full rounded"
                                />
                            </div> 
                            <div className="xl:p-20 flex flex-col gap-7">
                                <h3 className="text-xl font-bold text-[#9E214D]">
                                    Bienvenidos a La Paz, Baja California Sur
                                </h3>
                                <h2 className="italic font-bold text-slate-900 text-5xl">
                                    ¡ Un paraíso entre dos mares !
                                </h2>
                                <p className="italic font-light text-slate-900 text-justify">
                                    Descubre la belleza natural y la rica
                                    cultura que hacen de La Paz un destino
                                    turístico incomparable. Ubicado
                                    estratégicamente en la hermosa península de
                                    Baja California Sur, este encantador
                                    municipio te ofrece una combinación única de
                                    maravillas naturales y una vibrante escena
                                    cultural.
                                </p>
                                <p className="italic font-light text-slate-900 text-justify">
                                    Conocida por sus impresionantes playas de
                                    arena blanca y aguas cristalinas, La Paz es
                                    un verdadero paraíso para los amantes de los
                                    deportes acuáticos y los entusiastas de la
                                    naturaleza. Sumérgete en las profundidades
                                    del Mar de Cortés, conocido como "el acuario
                                    del mundo", y descubre una rica diversidad
                                    marina que incluye leones marinos, tortugas,
                                    delfines y, si tienes suerte, incluso
                                    podrías nadar junto a majestuosas ballenas.
                                </p>
                                <p
                                    className={`italic font-light text-slate-900 text-justify animate fade-in-5 transition duration-300 ${
                                        isActive ? "" : "hidden"
                                    }`}
                                >
                                    Además de sus impresionantes paisajes
                                    costeros, La Paz ofrece una gran variedad de
                                    actividades terrestres. Explora el desierto
                                    y las montañas circundantes en emocionantes
                                    paseos en vehículos todo terreno, realiza
                                    caminatas en hermosos senderos naturales o
                                    disfruta de un relajante paseo en bicicleta
                                    por las tranquilas calles de la ciudad.
                                </p>
                                <p
                                    className={`italic font-light text-slate-900 text-justify transition duration-300 ${
                                        isActive ? "" : "hidden"
                                    }`}
                                >
                                    Pero La Paz no solo se trata de aventuras al
                                    aire libre. Sumérgete en la rica historia y
                                    cultura de la región explorando los
                                    fascinantes museos, galerías de arte y
                                    sitios históricos que se encuentran en la
                                    ciudad. Admira la arquitectura colonial,
                                    descubre las tradiciones locales y déjate
                                    cautivar por la amabilidad y hospitalidad de
                                    su gente.
                                </p>
                                <p
                                    className={`italic font-light text-slate-900 text-justify ${
                                        isActive ? "" : "hidden"
                                    }`}
                                >
                                    Y, por supuesto, no podemos olvidar
                                    mencionar la deliciosa gastronomía de La
                                    Paz. Saborea los sabores frescos y
                                    auténticos de los mariscos y pescados
                                    capturados en las aguas cercanas. Desde
                                    ceviches y tacos de mariscos hasta platillos
                                    gourmet en restaurantes de renombre, la
                                    oferta culinaria de La Paz te dejará con un
                                    gusto exquisito en el paladar.
                                </p>
                                <p
                                    className={`italic font-light text-slate-900 text-justify ${
                                        isActive ? "" : "hidden"
                                    }`}
                                >
                                    En resumen, La Paz, Baja California Sur, es
                                    un destino turístico que ofrece una
                                    experiencia completa para todos los
                                    visitantes. Ya sea que busques aventuras
                                    emocionantes, momentos de relajación en la
                                    playa, una inmersión cultural o una
                                    combinación de todas estas cosas, La Paz te
                                    brindará recuerdos inolvidables y una
                                    conexión auténtica con la naturaleza y la
                                    cultura de México.
                                </p>
                                <p
                                    className={`italic font-light text-slate-900 text-justify ${
                                        isActive ? "" : "hidden"
                                    }`}
                                >
                                    ¡Te esperamos con los brazos abiertos en La
                                    Paz!
                                </p>

                                <div className="m-2 w-full md:w-44">
                                    <button
                                        className="flex w-full rounded-lg p-4 bg-gradient-to-r from-[#9E214D] to-[#6A1036] font-bold text-white items-center justify-center"
                                        onClick={toggleDescripcion}
                                    >
                                        Leer más{" "}
                                        <ChevronRight
                                            className="inline text-white"
                                            size={20}
                                        ></ChevronRight>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* {vision} */}
                    <div className="flex mx-auto justify-center items-center my-1">
                        <div className="w-9/12 flex justify-center items-center text-black flex-col gap-6">
                            <div className="relative w-full">
                                <h1 className="text-[3vh] font-bold before:absolute before:-bottom-[0.5vh] before:h-[.5vh] before:w-[16.5vh] before:border-b before:bg-[#9E214D]">
                                    Visión 2040
                                </h1>
                            </div>
                            <p className="italic font-light text-slate-900 text-justify">
                                Ser un destino turístico único, diversificado,
                                seguro, competitivo, incluyente y sustentable;
                                ordenado y comprometido con la regeneración de
                                los recursos naturales. Consciente y respetuoso
                                con el ambiente, la sociedad, la identidad
                                sudcaliforniana y la capacidad de carga de los
                                ecosistemas. Reconocido nacional e
                                internacionalmente por su servicio y estructuras
                                turísticas de calidad, que permita una estadía
                                más prolongada y placentera; y caracterizado por
                                una economía circular que aporte beneficios
                                colectivos a todo el municipio.
                            </p>

                        </div>
                    </div>


                    {/* {Destinos} */}
                    <BannerDelegaciones delegacion={delegaciones}></BannerDelegaciones>
                    {/* <div className="flex mx-auto justify-center items-center my-4">
                        <div className="w-9/12 flex justify-center items-center text-black flex-col gap-6">
                            <div className="relative w-full flex">
                                <h1 className="text-[3vh] font-bold before:absolute before:-bottom-[0.5vh] before:h-[.5vh] before:w-[18.5vh] before:border-b before:bg-[#9E214D]">
                                    Delegaciones
                                </h1>
                            </div>
                            <div className="grid grid-cols-1 xl:grid-cols-4 4xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-2 gap-6 lg:gap-8 my-5">
                                {delegaciones.map((item) => (
                                    <Link
                                        key={item.slug} // Agrega una key única aquí
                                        href={route(
                                            "delegacion.show",
                                            item.slug
                                        )}
                                        className="scale-100 bg-white rounded-lg shadow-[10px_10px_10px_5px_rgba(0,0,0,0.25)] flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-amber-700"
                                    >
                                        <div className="flex w-full flex-col ">
                                            <div className=" shadow shadow-[#ECC6A1] rounded-lg">
                                                <img
                                                    src={item.cover_path}
                                                    className="w-full rounded-t-lg h-[200px]"
                                                />
                                            </div>
                                            <div className="p-2 rounded-b-lg">
                                                <h2 className="text-xl font-semibold text-gray-800">
                                                    {item.nombre}
                                                </h2>
                                                <h3 className="text-gray-800 text-sm">
                                                    {item.leyenda}
                                                </h3>
                                                <div className="my-5">
                                                    <span
                                                        role="button"
                                                        className="rounded-full py-2 px-4 sm:px-1 sm:py-1 border-2 border-gray-500 font-bold text-gray-700 text-xs"
                                                    >
                                                        CONOCER MÁS{" "}
                                                        <ChevronRight className="inline" size={13}></ChevronRight>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div> */}

                    {/* <div className="flex mx-auto justify-center items-center my-20">
                        <div className="w-9/12 flex justify-center items-center text-black flex-col gap-6">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d174135.26607186568!2d-110.30133531899874!3d24.14304232504423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2smx!4v1685553285379!5m2!1sen!2smx"
                                width="100%"
                                height="450"
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>

                       
                    </div> */}
                    

                    {/* {eventos} */}
                    <div className="flex mx-auto justify-center items-center my-10">
                        <div className="w-9/12 flex justify-center items-center text-black flex-col gap-6">
                            <div className="relative w-full">
                                <h1 className="text-[3vh] text-center font-bold before:absolute before:-bottom-[0.5vh] before:h-[.5vh] before:w-[11vh] before:border-b before:bg-[#9E214D]">
                                    Eventos
                                </h1>
                            </div>
                            <Carousel
                                value={eventos.data || []}
                                numVisible={4}
                                numScroll={1}
                                itemTemplate={eventosTemplate}
                                responsiveOptions={responsiveOptions}
                                pt={{
                                    indicatorButton: {
                                        className: "!rounded-md !w-[0.5rem]",
                                    },
                                }}
                            />
                        </div>
                    </div>
                    {/* <Suscribir></Suscribir> */}

                    {/* {banners} */}
                    <div className="flex mx-auto justify-center items-center">
                        <div className="w-11/12 flex justify-center items-center text-black flex-col gap-6">
                            <Carousel
                                value={banners.data || []}
                                numVisible={1}
                                numScroll={1}
                                itemTemplate={bannersTemplate}
                                circular
                                showIndicators={false}
                                autoplayInterval={10000}
                            />
                        </div>
                    </div>
                    
                    

                    {/* {otro} */}
                    {/* <div className="flex mx-auto justify-center items-center bg-red-200">
                        <div className="w-11/12 flex justify-center items-center text-black flex-col gap-6 bg-red-300">
                            <Carousel
                                value={otrosData}
                                numVisible={1}
                                numScroll={1}
                                itemTemplate={bannersTemplate2}
                                circular
                                showIndicators={false}
                                autoplayInterval={8000}
                            />
                        </div>
                    </div> */}
                    <div className={`relative w-full ${isSmallScreen ? 'h-[40vw]' : 'h-[40vw] '} mt-8 mb-[5vh]`}>
                        <div className="relative overflow-hidden rounded-lg h-auto min-h-full max-h-full w-9/12 mx-auto">
                            {images.map((image, index) => (
                                <div
                                    key={index}
                                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                                >
                                    <img src={image} className="w-full h-full object-cover rounded-lg border border-[#ECC6A1]" alt={`Slide ${index + 1}`} />
                                </div>
                            ))}
                        </div>

                        {/* Botón para ir al slide anterior nuevo */}
                        <button
                            onClick={prevSlide}
                            className="absolute top-1/2 left-0 z-30 transform -translate-y-1/2 mx-[3vw] bg-white"
                        >
                            <span className="inline-flex items-center justify-center w-[5vw] h-[5vw] rounded-full shadow shadow-[#ECC6A1] hover:bg-[#9E214D] hover:text-white">
                                <svg className="w-[2vw] h-[2vw]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                                </svg>
                                <span className="sr-only">Previous</span>
                            </span>
                        </button>

                        {/* Botón para ir al slide siguiente */}
                        <button
                            onClick={nextSlide}
                            className="absolute top-1/2 right-0 z-30 transform -translate-y-1/2 mx-[3vw] bg-white"
                        >
                            <span className="inline-flex items-center justify-center w-[5vw] h-[5vw] rounded-full shadow shadow-[#ECC6A1] hover:bg-[#9E214D] hover:text-white">
                                <svg className="w-[2vw] h-[2vw]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                </svg>
                                <span className="sr-only">Next</span>
                            </span>
                        </button>
                    </div>

                    {/* Ubicacion */}
                    <div className="flex mx-auto justify-center items-center mb-[5vh]">
                        <div className="w-9/12 flex justify-center items-center text-black flex-col gap-6">
                            <div className="relative w-full">
                                <h1 className="text-[3vh] font-bold before:absolute before:-bottom-[0.5vh] before:h-[.5vh] before:w-[14vh] before:border-b before:bg-[#9E214D]">
                                    Ubicación
                                </h1>
                            </div>
                            <div
                                style={{
                                    height: "35vh",
                                    width: "100%",
                                }}
                            >
                                <GoogleMapReact
                                    bootstrapURLKeys={{
                                        key: "AIzaSyDDsXWAnmhPpTP9St_pt27H16RD771s7dI",
                                    }}
                                    defaultCenter={{
                                        lat: 24.1481589,
                                        lng: -110.3181937,
                                    }}
                                    defaultZoom={13}
                                    options={createMapOptions}
                                >
                                    <Marker
                                        lat={pos.lat}
                                        lng={pos.lng}
                                        text="La Paz"
                                    />
                                </GoogleMapReact>
                            </div>
                        </div>
                    </div>

                    <Footer></Footer> 
                </div>
            </div>
        </>
    );
}
