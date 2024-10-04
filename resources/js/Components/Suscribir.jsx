export default function Suscribir(props) {
    return (
        <div
            className="flex mx-auto justify-center items-center my-20 bg-cover bg-center py-10"
            style={{
                backgroundImage: "url('/images/fondo.jpg')",
            }}
        >
            <div className="w-9/12 flex justify-center items-center text-black flex-col gap-6">
                <div className="w-full bg-white rounded-lg shadow-[10px_10px_10px_5px_rgba(0,0,0,0.25)] flex  text-center items-center flex-col lg:flex-row">
                    <div className="lg:w-6/12 w-full">
                        <img
                            src="/images/suscribir.jpg"
                            className="rounded-l-lg"
                        ></img>
                    </div>
                    <div className="lg:w-6/12 md:p-20 p-0 w-full">
                        <h1 className="text-3xl font-extrabold">
                            Recibe alertas de eventos noticias, y promociones.
                        </h1>
                        <h2 className="text-gray-500 md:w-40 mx-auto text-xs my-2">
                            Regístrate con tu correo electrónico, es muy fácil y
                            rápido!
                        </h2>
                        <div className="lg:w-96 w-fit mx-auto my-5 ">
                            <div className="rounded-full border border-gray-800 h-12 flex justify-between p-1">
                                <input
                                    className="border-0 h-full ml-5"
                                    type="text"
                                    name=""
                                    id=""
                                    placeholder="Correo electrónico"
                                />
                                <a
                                    className="rounded-full py-3 px-4 h-[2.4rem] text-xs bg-gradient-to-r from-orange-500 to-orange-700 font-bold text-white mr-2 "
                                    href="#"
                                >
                                    Registrate
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
