import { FacebookIcon, Globe, InstagramIcon, MailIcon, PhoneCall, PinIcon, TwitterIcon } from "lucide-react";

export default function Fotter(props) {
    return (
        <>
            <div className="flex mx-auto justify-center items-center bg-[#383838] md:h-[400px] mt-10">
                <div className="w-9/12 flex justify-center items-center text-white flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 my-5">
                        <div>
                            <h2 className="text-lg font-bold text-white leading-4 border-l-2 border-l-orange-400 pl-3 mb-5">
                                VISIÓN 2040
                            </h2>
                            <p className="italic text-sm text-gray-300 font-bold">
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
                        <div>
                            <h2 className="text-lg font-bold text-white leading-4 border-l-2 border-l-orange-400 pl-3 mb-5">
                                CONTÁCTANOS
                            </h2>
                            <h3 className="text-lg font-semibold text-white">
                                Dirección Municipal de Turismo
                            </h3>
                            <ul className="mt-5">
                                <li className="py-1 font-bold">
                                    <a href="tel:+526121222986">
                                        <PhoneCall
                                            className="inline text-amber-800"
                                            size={20}
                                        ></PhoneCall>{" "}
                                        +52 612 122 2986
                                    </a>
                                </li>
                                <li className="py-1 font-bold">
                                    <a href="mailto:turismo@lapaz.gob.mx">
                                        <MailIcon
                                            className="inline text-amber-800"
                                            size={20}
                                        ></MailIcon>{" "}
                                        turismo@lapaz.gob.mx
                                    </a>
                                </li>
                                <li className="py-1 font-bold">
                                    <PinIcon
                                        className="inline text-amber-800"
                                        size={20}
                                    ></PinIcon>{" "}
                                    Gral. Félix Ortega Aguilar núm. 1745 e/
                                    Melchor Ocampo y Santos Degollado, C.P.
                                    23000
                                </li>
                                <li className="py-1 font-bold">
                                    <Globe
                                        className="inline text-amber-800"
                                        size={20}
                                    ></Globe>{" "}
                                    <a
                                        target="_blank"
                                        href="https://lapaz.gob.mx"
                                    >
                                        Ayuntamiento de La Paz
                                    </a>
                                </li>
                                <li className="my-5 font-bold flex gap-5">
                                    <a
                                        href="https://www.facebook.com/TurismoMunicipalLaPaz"
                                        target="_blank"
                                    >
                                        <FacebookIcon
                                            className="inline"
                                            size={20}
                                        ></FacebookIcon>
                                    </a>{" "}
                                    <a
                                        href="https://twitter.com/turismolapaz1"
                                        target="_blank"
                                    >
                                        <TwitterIcon
                                            className="inline"
                                            size={20}
                                        ></TwitterIcon>
                                    </a>{" "}
                                    <a
                                        href="https://www.instagram.com/turismolapaz/"
                                        target="_blank"
                                    >
                                        <InstagramIcon
                                            className="inline"
                                            size={20}
                                        ></InstagramIcon>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex mx-auto justify-center items-center bg-[#404040] py-3">
                <div className="w-9/12 flex justify-between items-center text-white gap-6">
                    <div>
                        <a href={route("avisoprivacidad")}>Política de privacidad</a> |{" "}
                        <a href={route("terminos")}>Términos y Condiciones</a>
                    </div>
                    <div>
                        <img src="/images/logoc.png" className="w-[100px]" />
                    </div>
                    <div>Copyright | Todos los derechos reservados | 2023</div>
                </div>
            </div>
        </>
    );
}
