import { Head, Link } from "@inertiajs/react";
import Footer from "@/Components/Footer";

export default function Welcome({}) {
    return (
        <>
            <Head title="Inicio" />
            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-center bg-white  selection:bg-red-500 selection:text-white">
                <div className="w-full mx-auto">
                    <div className="relative max-w-7xl mx-auto bg-[url('/images/bazar/balandra.png')] bg-cover bg-center">
                        <div className="relative z-[3] flex flex-col justify-end h-full items-end text-white md:pt-[400px] md:pb-10 sm:p-10 p-20">
                            <h1 className="md:mt-6 sm:text-5xl text-3xl font-extrabold text-center underline">
                                30 de agosto
                            </h1>
                            <h2 className="md:mt-6 mt-3 sm:text-2xl">
                                Salon Galeon
                            </h2>
                            <h2 className="sm:text-2xl">
                                Hotel Marine Waterfront
                            </h2>
                        </div>
                        {/* <div className="absolute inset-0 bg-gray-950/75 w-full h-full z-[2]"></div> */}
                    </div>
                    <div className="">
                        <img src="/images/bazar/x.png" className="w-full" />
                    </div>
                    <div className="flex mx-auto bg-[url('/images/bazar/curvas.png')] bg-cover bg-center justify-center items-center xl:py-10">
                        <div className="w-9/12 flex flex-col justify-center items-center text-black p-5 gap-20 min-h-[500px]">
                            <p>Registro realizado con éxito.</p>
                            <Link
                                className="flex w-full max-w-md rounded-lg p-2 bg-orange-c-600 font-bold text-white items-center justify-center"
                                href={route("bazar-index")}
                            >
                                Ir a pagina principal
                            </Link>
                        </div>
                    </div>
                    <div className="">
                        <img src="/images/bazar/x.png" className="w-full" />
                    </div>
                    <Footer></Footer>
                </div>
            </div>
        </>
    );
}
