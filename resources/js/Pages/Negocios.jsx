import { Link, Head } from "@inertiajs/react";
import {
    IconChevronRight,
} from "@tabler/icons-react";
import TopBar from "@/Components/TopBar";
import Menu from "@/Components/Menu";
import Footer from "@/Components/Footer";

export default function Delegacion({
    negocios,
    delegaciones,
    delegacion,
    temperatura,
    fecha,
    hora,
    titulo,
}) {
    console.log(negocios, delegacion);

    if (Object.prototype.toString.call(negocios) === "[object Array]") {
        let b = negocios;
        negocios = { "": b };
    }
    console.log(negocios);
    return (
        <>
            <Head title="Inicio" />
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
                            <h1 className="md:mt-6 text-5xl font-bold">
                                {delegacion.data.nombre}
                            </h1>
                            <h2 className="mt-6 text-xl">
                                {delegacion.data.leyenda}
                            </h2>
                        </div>
                    </div>

                    <div
                        className="flex mx-auto justify-center items-center my-10 bg-cover bg-center py-10 flex-col"
                        style={{
                            backgroundImage: "url('/images/3.png')",
                        }}
                    >
                        <div className="relative mb-5">
                            <h1 className="text-2xl font-bold before:absolute before:-bottom-2 before:h-[3px] before:w-[100%] before:border-b before:bg-amber-600">
                                {titulo}
                            </h1>
                        </div>
                        {negocios &&
                            Object.entries(negocios).map(
                                ([key, val] = entry) => {
                                    return (
                                        <div className="w-9/12 flex justify-center items-center text-black flex-col gap-6 mb-10">
                                            <div className="relative">
                                                <h1 className="text-lg font-bold before:absolute before:-bottom-1 before:h-[2px] before:w-[100%] before:border-b before:bg-amber-500">
                                                    {key}
                                                </h1>
                                            </div>

                                            <div className="flex flex-col items-center justify-center flex-wrap sm:flex-row gap-6 lg:gap-8 my-5">
                                                {val.map((item) => (
                                                    <Link
                                                        href={route(
                                                            "negocios.show",
                                                            item.slug
                                                        )}
                                                        className="w-[260px] h-[360px] scale-100 bg-white rounded-lg shadow-[10px_10px_10px_5px_rgba(0,0,0,0.25)] flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-amber-700"
                                                    >
                                                        <div className="w-full">
                                                            <div className="flex items-center justify-center w-full relative ">
                                                                <img
                                                                    src={
                                                                        item.cover_path
                                                                    }
                                                                    className="w-full rounded-t-lg h-32"
                                                                />
                                                            </div>
                                                            <div className="p-2 flex flex-col justify-start h-[226px] gap-1">
                                                                <h2 className="text-lg font-bold text-gray-900 leading-4">
                                                                    {
                                                                        item.nombre
                                                                    }
                                                                </h2>
                                                                <h3 className="text-gray-900 text-sm line-clamp-5">
                                                                    {
                                                                        item.descripcion
                                                                    }
                                                                </h3>

                                                                <div className="flex-1 flex items-end justify-end">
                                                                    <a className="rounded-full py-2 px-4 border-2 border-gray-500 font-bold text-gray-900 text-xs">
                                                                        CONOCER
                                                                        MAS{" "}
                                                                        <IconChevronRight
                                                                            className="inline"
                                                                            size={
                                                                                13
                                                                            }
                                                                            stroke={
                                                                                3
                                                                            }
                                                                        ></IconChevronRight>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                }
                            )}
                    </div>
                    <Footer></Footer>
                </div>
            </div>
        </>
    );
}
