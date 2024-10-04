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

export default function IdentidadCultural({
    identidad_cultural,
    delegaciones,
    temperatura,
    fecha,
    hora,
    relacionados,
}) {
    console.log(identidad_cultural,relacionados);
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
            <Head title={identidad_cultural.data.nombre} />
            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-center bg-white  selection:bg-red-500 selection:text-white">
                <div className="w-full mx-auto">
                    <div
                        className={`max-w-full mx-auto bg-cover bg-center`}
                        style={{
                            backgroundImage: `url(${identidad_cultural.data.cover})`,
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
                                {identidad_cultural.data.nombre}
                            </h1>
                            <h2 className="md:mt-6 mt-3 sm:text-2xl">
                                {identidad_cultural.data.subtitulo}
                            </h2>
                        </div>
                    </div>

                    {/* {ImagenPrincipal} */}
                    <div className="flex mx-auto justify-center items-center my-10">
                        <div className="w-9/12 flex justify-center items-center text-black flex-col gap-6">
                            {/* <img
                                src={`${identidad_cultural.data.principal}`}
                                alt=""
                                className="w-full 2xl:max-w-5xl"
                            /> */}
                            <Carousel
                                value={identidad_cultural.data.fotos || []}
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
                                    {identidad_cultural.data.nombre}
                                </h1>
                                {identidad_cultural.data.descripcion
                                    .split("\n")
                                    .map((item) => (
                                        <p className="md:mt-6 text-2xl text-slate-800 text-justify">
                                            {item}
                                        </p>
                                    ))}
                            </div>

                            <div className="flex gap-5 lg:flex-row flex-col flex-wrap">
                                {identidad_cultural.data.historia && (
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
                                            {identidad_cultural.data.historia
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
                                {identidad_cultural.data.leyenda && (
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
                                            {identidad_cultural.data.leyenda
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
                                {identidad_cultural.data.recomendaciones && (
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
                                            {identidad_cultural.data.recomendaciones
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
                            {relacionados && relacionados.length>0 && (
                                <div className="mt-10">
                                    <h2 className="mt-6 text-3xl font-bold  text-slate-800 md:leading-4">
                                        Identidad Cultural Similares
                                    </h2>
                                    <div className="my-10">
                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 my-5">
                                            {relacionados &&
                                                relacionados.data.map(
                                                    (item) => (
                                                        <a
                                                            href={route(
                                                                "identidad-cultural.show",
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
                                                                        {
                                                                            item.nombre
                                                                        }
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
                                                    )
                                                )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <Footer></Footer>
                </div>
            </div>
        </>
    );
}
