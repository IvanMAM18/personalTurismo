import { Head } from "@inertiajs/react";
import TopBar from "@/Components/TopBar";
import Menu from "@/Components/Menu";
import Footer from "@/Components/Footer";

export default function Terminos({ delegaciones, temperatura, fecha, hora }) {
    return (
        <>
            <Head title="Términos y Condiciones" />
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
                                <span className="font-bold text-xl">Términos y Condiciones</span> <br /><br />
                                Bienvenido(a) a nuestra página web de
                                turismo municipal. Antes de hacer uso de este
                                sitio web, te solicitamos que leas detenidamente
                                estos términos y condiciones, ya que establecen
                                los derechos y responsabilidades tanto de los
                                usuarios como de la administración del sitio.{" "}
                                <br />
                                <br />
                                Aceptación de los términos y condiciones
                                <br /> Al acceder y utilizar nuestra página web,
                                aceptas cumplir con los términos y condiciones
                                aquí establecidos. En caso de no estar de
                                acuerdo con alguno de los términos mencionados,
                                se recomienda no hacer uso de este sitio. <br />
                                Cuando registras tu empresa y creas una cuenta,
                                almacenamos la información que nos proporcionas,
                                como nombre, dirección, correo electrónico y
                                número de teléfono, se solicita el número de
                                licencia comercial con la finalidad de
                                corroborar que la empresa este oficialmente
                                establecida. <br />
                                Para tal efecto y en cumplimiento a lo
                                establecido por los artículos 27 y 28 de la Ley
                                General de Protección de Datos Personales,
                                ponemos a su disposición el aviso de privacidad.
                                <br />
                                <br />
                                Propósito de la página web <br />
                                El propósito de nuestra página web es
                                exclusivamente el de proporcionar los
                                principales atractivos turísticos del municipio
                                de La Paz así como información sobre los lugares
                                de hospedaje, alimentos y bebidas, que estén
                                oficialmente registradas en el ayuntamiento. No
                                ofrecemos servicios de reserva ni recomendamos
                                específicamente ningún establecimiento, por lo
                                que la relación comercial y/o contractual que
                                los usuarios establezcan con los comercios aquí
                                registrados, es responsabilidad exclusiva del
                                usuario y del establecimiento, deslindando a la
                                Dirección Municipal de Turismo del H.
                                Ayuntamiento de La Paz, B.C.S. y al H.
                                Ayuntamiento de La Paz, B.C.S. de cualquier
                                responsabilidad, daño o perjuicio, derivado de
                                la prestación de servicios contratados. <br />
                                El listado de opciones aquí presentado, tiene
                                fines exclusivamente informativos y de promoción
                                del turismo local.
                                <br /> El registro de empresas turísticas tiene
                                como finalidad crear un directorio, que sirva
                                como orientación y en caso de así decidirlo el
                                usuario, pueda ser un enlace promotor de los
                                servicios que ofrecen las empresas registradas
                                para el usuario interesado.
                                <br />
                                Nos esforzamos por proporcionar información
                                precisa y actualizada en nuestra página web. Sin
                                embargo, no podemos garantizar la exactitud,
                                integridad o idoneidad de la información
                                presentada, pues ello es responsabilidad
                                exclusiva de los establecimientos registrados.
                                <br />
                                Los usuarios son responsables de verificar la
                                disponibilidad, precios, ubicación y cualquier
                                otro detalle relevante directamente con los
                                establecimientos comerciales enlistados.
                                <br /> Ofrecer contenido como resultados de
                                búsqueda más relevantes sobre turismo en La Paz.
                                <br />
                                <br />
                                Responsabilidad del usuario. <br />
                                El usuario es responsable de utilizar la
                                información presentada en nuestra página web de
                                manera responsable y respetuosa. No se permite
                                utilizar la información para fines ilegales,
                                difamatorios, obscenos o que puedan causar daño
                                a terceros. Asimismo, el usuario asume toda la
                                responsabilidad derivada del uso de cualquier
                                servicio o producto ofrecido por los
                                establecimientos mencionados en nuestra página
                                web. <br />
                                <br />
                                Propiedad intelectual.
                                <br /> Todos los contenidos y materiales
                                presentados en nuestra página web, incluyendo de
                                manera enunciativa pero no limitativa: textos,
                                imágenes, logotipos, videos y diseño, están
                                protegidos por las leyes de propiedad
                                intelectual. Por lo anterior, está prohibido
                                copiar, modificar, distribuir o utilizar
                                cualquier contenido sin el consentimiento previo
                                y por escrito de los propietarios del sitio,
                                esta información es institucional. <br />
                                <br />
                                Enlaces a sitios de terceros.
                                <br />
                                Nuestra página web puede contener enlaces a
                                sitios web de terceros. Estos enlaces se
                                proporcionan únicamente como una conveniencia
                                para el usuario. No tenemos control sobre el
                                contenido o las políticas de privacidad de
                                dichos sitios y no asumimos ninguna
                                responsabilidad por ellos. Recomendamos que los
                                usuarios revisen los términos y condiciones y
                                las políticas de privacidad de los sitios web de
                                terceros antes de utilizarlos. <br />
                                <br />
                                Modificaciones y suspensión del servicio <br />
                                Nos reservamos el derecho de modificar,
                                actualizar, suspender o descontinuar cualquier
                                aspecto de nuestra página web sin previo aviso.
                                No seremos responsables ante los usuarios o
                                terceros por cualquier modificación, suspensión
                                o interrupción del servicio. <br />
                                <br />
                                Limitación de responsabilidad
                                <br /> En la medida permitida por la ley
                                aplicable, no seremos responsables por cualquier
                                daño directo, indirecto, incidental, especial o
                                consecuencial derivado del uso o la
                                imposibilidad de uso de nuestra página web o de
                                la información presentada en ella, toda vez que
                                la misma fue creada con fines informativos y de
                                promoción turística del Municipio de La Paz,
                                Baja California Sur.
                            </p>
                        </div>
                    </div>

                    <Footer></Footer>
                </div>
            </div>
        </>
    );
}
