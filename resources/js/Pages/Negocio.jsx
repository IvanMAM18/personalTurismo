import { Head } from "@inertiajs/react";
import Menu from "@/Components/Menu";
import TopBar from "@/Components/TopBar";
import Footer from "@/Components/Footer";
import GoogleMapReact from "google-map-react";
import { ChevronRight, Facebook, Instagram, MapPinIcon, NetworkIcon, Trash, Twitter, Youtube } from "lucide-react";
import { Carousel } from "primereact/carousel";
import { Image } from "primereact/image";

export default function Atractivo({
    negocio,
    delegaciones,
    temperatura,
    fecha,
    hora,
}) {
    console.log(negocio);
    const Marker = () => (
        <MapPinIcon
            style={{
                transform: "translate(-50%, -100%)",
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
            <Head title={negocio.data.nombre} />
            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-center bg-white  selection:bg-red-500 selection:text-white">
                <div className="w-full mx-auto">
                    <div
                        className={`max-w-full mx-auto bg-cover bg-center`}
                        style={{
                            backgroundImage: `url(${negocio.data.cover})`,
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
                                {negocio.data.nombre}
                            </h1>
                            <h2 className="md:mt-6 mt-3 sm:text-2xl">
                                {negocio.data.subtitulo}
                            </h2>
                        </div>
                    </div>

                    {/* {ImagenPrincipal} */}
                    <div className="flex mx-auto justify-center items-center my-5">
                        <div className="w-9/12 flex justify-center items-center text-black flex-col gap-6">
                            {/* <img
                                src={`${negocio.data.principal}`}
                                alt=""
                                className="w-full 2xl:max-w-5xl"
                            /> */}
                            <Carousel
                                value={negocio.data.fotos || []}
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
                    <div className="flex mx-auto justify-center items-center">
                        <div className="w-9/12 flex text-black flex-col divide-y-2">
                            <div>
                                <h1 className="md:mt-6 text-5xl font-bold ">
                                    {negocio.data.nombre}
                                </h1>
                                {negocio.data.descripcion
                                    .split("\n")
                                    .map((item) => (
                                        <p className="md:mt-6 text-2xl text-slate-800 text-justify">
                                            {item}
                                        </p>
                                    ))}
                                {negocio.data.redes_sociales && (
                                    <p className="text-xl text-slate-800 text-justify flex flex-col">
                                        <span className="font-semibold">
                                            Redes sociales:
                                        </span>{" "}
                                        {negocio.data.redes_sociales
                                            .split(",")
                                            .map((value, i) => {
                                                let icon = <NetworkIcon></NetworkIcon>;
                                                if (value.includes("facebook.com")) icon = <Facebook className="inline"></Facebook>;
                                                else if (value.includes("instagram.com")) icon = <Instagram className="inline"></Instagram>;
                                                else if (value.includes("twitter.com")) icon = <Twitter className="inline"></Twitter>;
                                                else if (value.includes("x.com")) icon = <Twitter className="inline"></Twitter>;
                                                else if (value.includes("youtube.com")) icon = <Youtube className="inline"></Youtube>;
                                                return (
                                                    <a
                                                        target="_blank"
                                                        href={`${value.replace(/\s+/g,'')}`}
                                                    >
                                                      {icon} {value}
                                                    </a>
                                                );
                                            })}
                                    </p>
                                )}
                                {negocio.data.paginaweb && (
                                    <p className="text-xl text-slate-800 text-justify">
                                        <span className="font-semibold">
                                            Pagina web:
                                        </span>{" "}
                                        {negocio.data.paginaweb
                                            .split(",")
                                            .map((value, i) => (
                                                <a
                                                    target="_blank"
                                                    href={`${value}`}
                                                >
                                                    {value}
                                                </a>
                                            ))}
                                    </p>
                                )}
                            </div>

                            <div className="my-10">
                                <h2 className="mt-6 text-3xl font-bold  text-slate-800 md:leading-4">
                                    ¿Dónde se encuentra?
                                </h2>
                                <h3 className="mt-6 text-2xl text-slate-800">
                                    {negocio.data.direccion}
                                </h3>
                                <div className="mt-10">
                                    <div
                                        style={{
                                            height: "40vh",
                                            width: "100%",
                                        }}
                                    >
                                        {negocio.data && (
                                            <GoogleMapReact
                                                bootstrapURLKeys={{
                                                    key: "AIzaSyDDsXWAnmhPpTP9St_pt27H16RD771s7dI",
                                                }}
                                                defaultCenter={{
                                                    lat: 24.1481589,
                                                    lng: -110.3181937,
                                                }}
                                                center={{
                                                    lat: +negocio.data.latitud,
                                                    lng: +negocio.data.longitud,
                                                }}
                                                defaultZoom={15}
                                                options={createMapOptions}
                                            >
                                                <Marker
                                                    lat={negocio.data.latitud}
                                                    lng={negocio.data.longitud}
                                                    text={negocio.data.nombre}
                                                />
                                            </GoogleMapReact>
                                        )}
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
