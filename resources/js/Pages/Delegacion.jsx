import { Head, Link } from "@inertiajs/react";
import {
    IconCheck,
    IconChevronRight,
    IconMail,
    IconPhoneCall,
    IconPin,
} from "@tabler/icons-react";
import TopBar from "@/Components/TopBar";
import Menu from "@/Components/Menu";
import Footer from "@/Components/Footer";
import Suscribir from "@/Components/Suscribir";

export default function Delegacion({
    delegacion,
    delegaciones,
    temperatura,
    fecha,
    hora,
}) {
    return (
        <>
            <Head title={delegacion.data.nombre} />
            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-center bg-white  selection:bg-red-500 selection:text-white">
                <div className="w-full mx-auto">
                    <div
                        className="max-w-full mx-auto bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${delegacion.data.cover})`,
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
                                {delegacion.data.nombre}
                            </h1>
                            <h2 className="md:mt-6 mt-3 sm:text-2xl">
                                {delegacion.data.leyenda}
                            </h2>
                        </div>
                    </div>
                    <div className="flex mx-auto bg-[url('/images/3.png')] bg-cover bg-center justify-center items-center py-5">
                        <div className="w-9/12 flex flex-col md:flex-row justify-center items-center text-black">
                            <div className="md:m-0 m-5">
                                <img
                                    src={delegacion.data.principal}
                                    className="lg:max-w-md max-w-sm"
                                />
                            </div>
                            <div className="md:p-20 flex flex-col">
                                <h3 className="text-xl font-bold text-amber-700">
                                    Bienvenidas/os a
                                </h3>
                                <h1 className="text-5xl font-extrabold italic">
                                    {delegacion.data.nombre}
                                </h1>
                                <h2 className="text-3xl font-bold italic">
                                    Baja California Sur
                                </h2>
                                <h3 className="italic font-light text-slate-900 mt-5 text-justify">
                                    {delegacion.data.descripcion}
                                </h3>
                            </div>
                        </div>
                    </div>

                    {/* {secciones} */}
                    <div className="flex mx-auto justify-center items-center my-1 bg-cover bg-center py-10">
                        <div className="w-9/12 flex justify-center items-center text-black flex-col gap-6">
                            <div className="w-full bg-white flex text-center items-center flex-col md:flex-row">
                                <div className="w-full md:grid flex flex-col lg:grid-rows-3 lg:grid-cols-3 lg:grid-flow-col lg:gap-4 gap-1 text-2xl font-extrabold">
                                    <Link
                                        href={route(
                                            "delegacion.showAtractivos",
                                            delegacion.data.slug
                                        )}
                                        className="row-span-2 col-span-2 md:p-52 p-28
                                         bg-cover bg-center relative text-white hover:text-amber-600 group
                                         scale-100 motion-safe:hover:scale-[1.01] transition-all duration-250"
                                        style={{
                                            backgroundImage:
                                                "linear-gradient(rgba(0, 0, 0, 50%), rgba(0, 0, 0, 50%)), url('/images/delegacion/atractivos.jpg')",
                                        }}
                                    >
                                        <span
                                            className="absolute bottom-0 left-0 p-5 
                                        before:absolute before:bottom-4 before:w-[70px] before:border-b-2 group-hover:before:border-b-amber-600"
                                        >
                                            Atractivos
                                        </span>
                                    </Link>
                                    <Link
                                        href={route(
                                            "delegacion.showExperiencias",
                                            delegacion.data.slug
                                        )}
                                        className="col-span-1 p-28
                                        bg-cover bg-center relative text-white hover:text-amber-600 group
                                        scale-100 motion-safe:hover:scale-[1.01] transition-all duration-250"
                                        style={{
                                            backgroundImage:
                                                "linear-gradient(rgba(0, 0, 0, 50%), rgba(0, 0, 0, 50%)), url('/images/delegacion/experiencias.webp')",
                                        }}
                                    >
                                        {" "}
                                        <span
                                            className="absolute bottom-0 left-0 p-5
                                        before:absolute before:bottom-4 before:w-[70px] before:border-b-2
                                        group-hover:before:border-b-amber-600"
                                        >
                                            Experiencias
                                        </span>
                                    </Link>
                                    <Link
                                        href={route(
                                            "delegacion.showIdentidadCulturals",
                                            delegacion.data.slug
                                        )}
                                        className="col-span-1 p-28 
                                        bg-cover bg-center relative text-white hover:text-amber-600 group
                                        scale-100 motion-safe:hover:scale-[1.01] transition-all duration-250"
                                        style={{
                                            backgroundImage:
                                                "linear-gradient(rgba(0, 0, 0, 50%), rgba(0, 0, 0, 50%)), url('/images/delegacion/artesanias.jpg')",
                                        }}
                                    >
                                        <span
                                            className="absolute bottom-0 left-0 p-5
                                        before:absolute before:bottom-4 before:w-[70px] before:border-b-2
                                        group-hover:before:border-b-amber-600"
                                        >
                                            Identidad Cultural
                                        </span>
                                    </Link>
                                    <Link
                                        href={route(
                                            "delegacion.showRestaurantes",
                                            delegacion.data.slug
                                        )}
                                        className="col-span-1 p-28
                                        bg-cover bg-center relative text-white hover:text-amber-600 group
                                        scale-100 motion-safe:hover:scale-[1.01] transition-all duration-250"
                                        style={{
                                            backgroundImage:
                                                "linear-gradient(rgba(0, 0, 0, 50%), rgba(0, 0, 0, 50%)), url('/images/delegacion/restaurantes.jpg')",
                                        }}
                                    >
                                        <span
                                            className="absolute bottom-0 left-0 p-5 
                                        before:absolute before:bottom-4 before:w-[70px] before:border-b-2
                                        group-hover:before:border-b-amber-600"
                                        >
                                            Restaurantes
                                        </span>
                                    </Link>
                                    <Link
                                        href={route(
                                            "delegacion.showHoteles",
                                            delegacion.data.slug
                                        )}
                                        className="col-span-1 p-28
                                        bg-cover bg-center relative text-white hover:text-amber-600 group
                                        scale-100 motion-safe:hover:scale-[1.01] transition-all duration-250"
                                        style={{
                                            backgroundImage:
                                                "linear-gradient(rgba(0, 0, 0, 50%), rgba(0, 0, 0, 50%)), url('/images/delegacion/5.jpg')",
                                        }}
                                    >
                                        <span
                                            className="absolute bottom-0 left-0 p-5 
                                        before:absolute before:bottom-4 before:w-[70px] before:border-b-2
                                        group-hover:before:border-b-amber-600"
                                        >
                                            Hoteles
                                        </span>
                                    </Link>
                                    <span
                                        href="#"
                                        className="col-span-1 p-28
                                        bg-cover bg-center relative text-white"
                                        style={{
                                            backgroundImage:
                                                "linear-gradient(rgba(0, 0, 0, 50%), rgba(0, 0, 0, 50%)), url('/images/delegacion/7.webp')",
                                        }}
                                    ></span>
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
