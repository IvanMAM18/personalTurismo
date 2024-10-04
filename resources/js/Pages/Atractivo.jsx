import { Head } from "@inertiajs/react";
import Menu from "@/Components/Menu";
import TopBar from "@/Components/TopBar";
import Footer from "@/Components/Footer";
import GoogleMapReact from "google-map-react";
import { ChevronRight, MapPinIcon, Trash } from "lucide-react";
import { Button } from "primereact/button";
import { Carousel } from "primereact/carousel";
import { Image } from "primereact/image";
import { useState } from "react";

export default function Atractivo({
    atractivo,
    delegaciones,
    temperatura,
    fecha,
    hora,
    relacionados,
}) {
    console.log(atractivo, relacionados);
    const [isExpandedHistoria, setIsExpandedHistoria] = useState(false);
    const [isExpandedRecomendaciones, setIsExpandedRecomendaciones] =
        useState(false);
    const [isExpandedLeyenda, setIsExpandedLeyenda] = useState(false);
    const toggleExpandedHistoria = () => {
        setIsExpandedHistoria(!isExpandedHistoria);
    };
    const toggleExpandedRecomendaciones = () => {
        setIsExpandedRecomendaciones(!isExpandedRecomendaciones);
    };
    const toggleExpandedLeyenda = () => {
        setIsExpandedLeyenda(!isExpandedLeyenda);
    };

    const Marker = () => (
        <MapPinIcon
            style={{
                transform: "translate(-7%, -100%)",
                fontSize: 30,
                color: "red",
            }}
        />
    );

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
    const fotosTemplate = (foto) => {
        return (
            <div className="m-2 text-center py-5 px-3 w-full flex items-center justify-center">
                <div className="mb-3">
                    <Image
                        src={foto.foto}
                        alt={foto.id}
                        className="w-full"
                        preview
                    />
                </div>
            </div>
        );
    };

    return (
        <>
            <Head title={atractivo.data.nombre} />
            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-center bg-white  selection:bg-red-500 selection:text-white">
                <div className="w-full mx-auto">
                    <div
                        className={`max-w-full mx-auto bg-cover bg-center`}
                        style={{
                            backgroundImage: `url(${atractivo.data.cover})`,
                        }}
                    >
                        <TopBar
                            temperatura={temperatura}
                            fecha={fecha}
                            hora={hora}
                        ></TopBar>
                        <Menu delegaciones={delegaciones}></Menu>

                        <div className="flex flex-col justify-center items-center text-white md:pt-24 md:pb-72 p-10 ">
                            <h1 className="md:mt-6 sm:text-5xl text-3xl font-extrabold text-center">
                                {atractivo.data.nombre}
                            </h1>
                            <h2 className="md:mt-6 mt-3 sm:text-2xl">
                                {atractivo.data.subtitulo}
                            </h2>
                        </div>
                    </div>

                    {/* {ImagenPrincipal} */}
                    <div className="flex mx-auto justify-center items-center my-10">
                        <div className="w-9/12 flex justify-center items-center text-black flex-col gap-6">
                            {/* <img
                                src={`${atractivo.data.principal}`}
                                alt=""
                                className="w-full 2xl:max-w-5xl"
                            /> */}
                            <Carousel
                                value={atractivo.data.fotos || []}
                                itemTemplate={fotosTemplate}
                                numVisible={1}
                                numScroll={1}
                                circular
                                autoplayInterval={5000}
                                pt={{
                                    indicatorButton: {
                                        className: "!rounded-md !w-[0.5rem]",
                                    },
                                }}
                            />
                        </div>
                    </div>

                    {/* {Informacion} */}
                    <div className="flex mx-auto justify-center items-center my-10">
                        <div className="w-9/12 flex text-black flex-col divide-y-2">
                            <div>
                                <h1 className="md:mt-6 text-5xl font-bold ">
                                    {atractivo.data.nombre}
                                </h1>
                                <h2 className="md:mt-6 text-2xl text-slate-800">
                                    {atractivo.data.direccion}
                                </h2>
                                {/* <div className="my-2 flex gap-2 flex-col lg:flex-row">
                                    <a className="flex flex-col gap-2 lg:flex-row items-center rounded-full py-2 px-4 shadow-[5px_5px_5px_1px_rgba(0,0,0,0.25)] font-bold text-gray-900 ">
                                        <IconMap2
                                            className="inline"
                                            size={20}
                                        ></IconMap2>{" "}
                                        Ubicacion
                                    </a>
                                    <a className="flex flex-col gap-2 lg:flex-row items-center rounded-full py-2 px-4 shadow-[5px_5px_5px_1px_rgba(0,0,0,0.25)] font-bold text-gray-900 ">
                                        <IconPhoneCalling
                                            className="inline"
                                            size={20}
                                        ></IconPhoneCalling>{" "}
                                        Llamar
                                    </a>
                                    <a className="flex flex-col gap-2 lg:flex-row items-center rounded-full py-2 px-4 shadow-[5px_5px_5px_1px_rgba(0,0,0,0.25)] font-bold text-gray-900">
                                        <IconWorldWww
                                            className="inline"
                                            size={20}
                                        ></IconWorldWww>{" "}
                                        Abrir
                                    </a>
                                    <a className="flex flex-col gap-2 lg:flex-row items-center rounded-full py-2 px-4 shadow-[5px_5px_5px_1px_rgba(0,0,0,0.25)] font-bold text-gray-900">
                                        <IconShare2
                                            className="inline"
                                            size={20}
                                        ></IconShare2>{" "}
                                        Compartir
                                    </a>
                                </div> */}
                                {atractivo.data.descripcion
                                    .split("\n")
                                    .map((item) => (
                                        <p className="md:mt-6 text-2xl text-slate-800 text-justify">
                                            {item}
                                        </p>
                                    ))}
                                {atractivo.data.horarios && (
                                    <p className="mt-6 text-xl text-slate-800 text-justify">
                                        <span className="font-semibold">
                                            Horario:
                                        </span>{" "}
                                        {atractivo.data.horarios}
                                    </p>
                                )}
                                {atractivo.data.tipo_acceso && (
                                    <p className="text-xl text-slate-800 text-justify">
                                        <span className="font-semibold">
                                            Tipo de acceso:
                                        </span>{" "}
                                        {atractivo.data.tipo_acceso}
                                    </p>
                                )}
                            </div>
                            {atractivo.data.serviciosFull &&
                                atractivo.data.serviciosFull.length > 0 && (
                                    <div className="my-10">
                                        <h2 className="mt-6 text-3xl font-bold  text-slate-800">
                                            ¿Qué puedo encontrar?
                                        </h2>
                                        <div className="sm:grid lg:grid-cols-4 sm:grid-cols-2 mt-5 sm:gap-5 flex flex-col items-center justify-center">
                                            {atractivo.data.serviciosFull.map(
                                                (item) => (
                                                    <div className="w-full p-5 flex items-center text-center justify-start">
                                                        <img
                                                            src={`${item.icono}`}
                                                            alt=""
                                                            className="h-12 w-12"
                                                        />
                                                        <h2 className="inline text-lg font-bold text-slate-800 mx-5">
                                                            {item.nombre}
                                                        </h2>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}
                            {atractivo.data.actividadesFull &&
                                atractivo.data.actividadesFull.length > 0 && (
                                    <div className="my-10">
                                        <h2 className="mt-6 text-3xl font-bold  text-slate-800">
                                            ¿Qué puedo hacer?
                                        </h2>
                                        <div className="sm:grid lg:grid-cols-4 sm:grid-cols-2 mt-5 sm:gap-5 flex flex-col items-center justify-center">
                                            {atractivo.data.actividadesFull.map(
                                                (item) => (
                                                    <div className="w-full p-5 flex items-center text-center justify-start">
                                                        <img
                                                            src={`${item.icono}`}
                                                            alt=""
                                                            className="h-12 w-12"
                                                        />
                                                        <h2 className="inline text-lg font-bold text-slate-800 mx-5">
                                                            {item.nombre}
                                                        </h2>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}
                            <div className="flex gap-5 lg:flex-row flex-col flex-wrap">
                                {atractivo.data.historia && (
                                    <div className="lg:w-[48%] text-2xl">
                                        <h2 className="mt-6 text-3xl font-bold  text-slate-800">
                                            Historia
                                        </h2>
                                        <div
                                            className={`p-2 text-justify ${
                                                isExpandedHistoria
                                                    ? ""
                                                    : "line-clamp-[10]"
                                            }`}
                                        >
                                            {atractivo.data.historia
                                                .split("\n")
                                                .map((item) => (
                                                    <>
                                                        {item} <br />
                                                    </>
                                                ))}
                                        </div>
                                        <div className="m-2 w-full md:w-44">
                                            <button
                                                className="flex w-full rounded-lg p-1 bg-gradient-to-r from-orange-500 to-orange-700 font-bold text-white items-center justify-center text-base"
                                                onClick={toggleExpandedHistoria}
                                            >
                                                Leer más{" "}
                                                <ChevronRight
                                                    className="inline text-white"
                                                    size={20}
                                                ></ChevronRight>
                                            </button>
                                        </div>
                                    </div>
                                )}
                                {atractivo.data.leyenda && (
                                    <div className="lg:w-[48%] text-2xl">
                                        <h2 className="mt-6 text-3xl font-bold  text-slate-800">
                                            Leyenda
                                        </h2>
                                        <div
                                            className={`p-2 text-justify ${
                                                isExpandedLeyenda
                                                    ? ""
                                                    : "line-clamp-[10]"
                                            }`}
                                        >
                                            {atractivo.data.leyenda
                                                .split("\n")
                                                .map((item) => (
                                                    <>
                                                        {item} <br />
                                                    </>
                                                ))}
                                        </div>
                                        <div className="m-2 w-full md:w-44">
                                            <button
                                                className="flex w-full rounded-lg p-1 bg-gradient-to-r from-orange-500 to-orange-700 font-bold text-white items-center justify-center text-base"
                                                onClick={toggleExpandedLeyenda}
                                            >
                                                Leer más{" "}
                                                <ChevronRight
                                                    className="inline text-white"
                                                    size={20}
                                                ></ChevronRight>
                                            </button>
                                        </div>
                                    </div>
                                )}
                                {atractivo.data.recomendaciones && (
                                    <div className="lg:w-[48%] text-2xl">
                                        <h2 className="mt-6 text-3xl font-bold  text-slate-800">
                                            Recomendaciones
                                        </h2>
                                        <div
                                            className={`p-2 text-justify ${
                                                isExpandedRecomendaciones
                                                    ? ""
                                                    : "line-clamp-[10]"
                                            }`}
                                        >
                                            {atractivo.data.recomendaciones
                                                .split("\n")
                                                .map((item) => (
                                                    <>
                                                        {item} <br />
                                                    </>
                                                ))}
                                        </div>
                                        <div className="m-2 w-full md:w-44">
                                            <button
                                                className="flex w-full rounded-lg p-1 bg-gradient-to-r from-orange-500 to-orange-700 font-bold text-white items-center justify-center text-base"
                                                onClick={
                                                    toggleExpandedRecomendaciones
                                                }
                                            >
                                                Leer más{" "}
                                                <ChevronRight
                                                    className="inline text-white"
                                                    size={20}
                                                ></ChevronRight>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="my-10">
                                <h2 className="mt-6 text-3xl font-bold  text-slate-800 md:leading-4">
                                    ¿Dónde se encuentra?
                                </h2>
                                <h3 className="mt-6 text-2xl text-slate-800">
                                    {atractivo.data.direccion}
                                </h3>
                                <div className="mt-10">
                                    <div
                                        style={{
                                            height: "60vh",
                                            width: "100%",
                                        }}
                                    >
                                        {atractivo.data && (
                                            <GoogleMapReact
                                                bootstrapURLKeys={{
                                                    key: "AIzaSyAp2zsijKSTOl9BLx6CDcyNIN9KhINXTzM",
                                                }}
                                                defaultCenter={{
                                                    lat: 24.1481589,
                                                    lng: -110.3181937,
                                                }}
                                                center={{
                                                    lat: +atractivo.data
                                                        .latitud,
                                                    lng: +atractivo.data
                                                        .longitud,
                                                }}
                                                defaultZoom={13}
                                                options={createMapOptions}
                                            >
                                                <Marker
                                                    lat={atractivo.data.latitud}
                                                    lng={
                                                        atractivo.data.longitud
                                                    }
                                                    text={atractivo.data.nombre}
                                                />
                                            </GoogleMapReact>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10">
                                <h2 className="mt-6 text-3xl font-bold  text-slate-800 md:leading-4">
                                    Atractivos similares
                                </h2>
                                <div className="my-10">
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 my-5">
                                        {relacionados &&
                                            relacionados.data.map((item) => (
                                                <a
                                                    href={route(
                                                        "atractivos.show",
                                                        item.slug
                                                    )}
                                                    className="scale-100 bg-white flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-amber-700"
                                                >
                                                    <div>
                                                        <div className="flex items-center justify-center w-full relative text-center">
                                                            <img
                                                                src={
                                                                    item.principal
                                                                }
                                                                className="w-full rounded-lg h-40"
                                                            />
                                                        </div>
                                                        <div className="p-2 flex flex-col items-center text-center">
                                                            <h2 className="text-2xl font-bold text-gray-900 leading-7">
                                                                {item.nombre}
                                                            </h2>
                                                            <h3 className="text-xl font-semibold text-gray-700">
                                                                {
                                                                    item
                                                                        .delegacion
                                                                        .nombre
                                                                }
                                                            </h3>
                                                        </div>
                                                    </div>
                                                </a>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Footer></Footer>
                </div>
            </div>
        </>
    );
}
