import { Head } from "@inertiajs/react";
import TopBar from "@/Components/TopBar";
import Menu from "@/Components/Menu";
import Footer from "@/Components/Footer";

export default function Terminos({ delegaciones, temperatura, fecha, hora }) {
    return (
        <>
            <Head title="Aviso de privacidad" />
            <div className="bg-white selection:bg-red-500 selection:text-white">
                <div className="w-full mx-auto">
                    <div className="max-w-full mx-auto bg-[url('/images/principal.jpg')] bg-cover bg-center">
                        <TopBar
                            temperatura={temperatura}
                            fecha={fecha}
                            hora={hora}
                        ></TopBar>
                        <Menu delegaciones={delegaciones}></Menu>
                        <div className="flex flex-col justify-center items-center text-white"></div>
                    </div>
                    <div className="flex mx-auto bg-center justify-center items-center xl:py-10">
                        <div className="w-9/12 flex flex-col xl:flex-row justify-center items-center text-black my-5">
                            <p>
                                <span className="font-bold text-xl">
                                    Aviso de privacidad simplificado
                                </span>{" "}
                                <br />
                                <br />
                                La Dirección Municipal de Turismo y el H.
                                Ayuntamiento de La Paz, Baja California Sur
                                través de sus diversas Unidades Administrativas,
                                es la responsable del uso, tratamiento y
                                protección de los datos personales recabados a
                                través de los trámites o servicios que usted
                                realice por medios físicos o electrónicos,
                                observando íntegramente para ello lo previsto en
                                la Ley General de Protección de Datos Personales
                                en Posesión de Sujetos Obligados (LGPDPPSO) y
                                demás normativa que resulte aplicable
                                <br />
                                <br />
                                <h1 className="font-bold">¿Qué datos personales se recaban y con qué
                                finalidad?</h1>
                                <br /> Los datos personales que se recaben serán
                                utilizados para las siguientes finalidades:
                                <ul className="list-disc ml-5">
                                    <li>
                                        Verificación de datos comerciales en la
                                        base de datos de comercio municipal.
                                    </li>
                                    <li>
                                        Envío de información de interés y
                                        eventos turísticos del municipio de La
                                        Paz.
                                    </li>
                                </ul>
                                <br />
                                <br />
                                De conformidad con el trámite o servicio que se
                                solicita, se utilizarán de manera enunciativa
                                más no limitativa los siguientes datos
                                personales:
                                <br />
                                <ul className="list-disc ml-5">
                                    <li>
                                        Datos de identificación personal: nombre
                                        completo, denominación o razón social,
                                        domicilio, teléfono (fijo y móvil),
                                        correo electrónico, y número de licencia
                                        comercial.
                                    </li>
                                </ul>
                                <br /> De manera adicional, los datos personales
                                que se recaben, podrán ser utilizados en
                                actividades complementarias necesarias para la
                                realización de las finalidades que se señalan;
                                el tratamiento de datos personales será el que
                                resulte necesario, adecuado y relevante en
                                relación con las finalidades previstas en este
                                Aviso de Privacidad, así como con los fines
                                distintos que resulten compatibles o
                                complementarios relacionados con los trámites o
                                servicios que se proporcionan.
                                <br />  <br />
                                Si no desea que sus datos personales se utilicen
                                para estas finalidades adicionales, al momento
                                de su registro deberá manifestar su voluntad en
                                sentido contrario. Esto no será motivo ni
                                condicionante para resolver sobre el trámite o
                                servicio que se está solicitando.
                                <br />
                                <br />
                                <div className="underline">Se informa que no se solicitarán datos
                                personales sensibles.</div>
                                <br />{" "}
                                <h1 className="font-bold">
                                    Fundamento para el tratamiento de los datos
                                    personales.
                                </h1>
                                La Dirección Municipal de Turismo y el H.
                                Ayuntamiento de La Paz, Baja California Sur
                                darán el trato a los datos personales que se
                                recaben a través de la Página Web de Turismo
                                Municipal fundamento en los artículos 16, 18,
                                21, 22, 25, 26 y 65 de la Ley General de
                                Protección de Datos Personales en Posesión de
                                Sujetos Obligados.
                                <br />
                                <br />
                                <h1 className="font-bold">
                                    Transferencia de datos personales.
                                </h1>
                             Sus datos personales no serán
                                transferidos, difundidos, ni distribuidos, salvo
                                lo señalado en el artículo 22 de la Ley General
                                de Protección de Datos Personales en Posesión de
                                Sujetos Obligados o en el caso que exista
                                consentimiento expreso de su parte por medio
                                escrito o por un medio de autenticación similar.
                                Sólo tendrán acceso a esta información el
                                titular de los datos, sus representantes legales
                                y los servidores públicos facultados para ello.
                                <br />
                                <br />
                                <h1 className="font-bold">
                                    ¿Dónde puedo ejercer mis derechos ARCO?
                                </h1>
                             
                                Usted podrá ejercer los derechos de acceso,
                                rectificación, cancelación u oposición (Derechos
                                ARCO), al tratamiento de sus datos personales,
                                mediante un escrito libre dirigido a la
                                Dirección de Turismo Municipal con domicilio en
                                Gral. Félix Ortega N°. 1745 e/Santos Degollado y
                                Melchor Ocampo Col. Centro, Teléfono (612) 122
                                2986, correo electrónico: turismo@lapaz.gob.mx.
                                <br />
                                <br />
                                <h1 className="font-bold">
                                    ¿Dónde puedo consultar el Aviso de
                                    privacidad integral de datos personales de
                                    la Dirección Municipal de Turismo y el H.
                                    Ayuntamiento de La Paz, Baja California Sur?
                                </h1>
                                Para conocer mayor información sobre los
                                términos y condiciones en que serán tratados sus
                                datos personales, y la forma en que deberá
                                ejercer sus Derechos ARCO, puede consultar el
                                Aviso de Privacidad Integral en la página:{" "}
                                <a href="https://turismo.lapaz.gob.mx">
                                    https://turismo.lapaz.gob.mx
                                </a>
                            </p>
                        </div>
                    </div>

                    <Footer></Footer>
                </div>
            </div>
        </>
    );
}
