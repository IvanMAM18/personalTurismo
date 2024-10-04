import { Head, useForm } from "@inertiajs/react";
import Footer from "@/Components/Footer";
import { useState } from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { Transition } from "@headlessui/react";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import Checkbox from "@/Components/Checkbox";
import { useEffect } from "react";
import TextArea from "@/Components/TextArea";
import SecondaryButton from "@/Components/SecondaryButton";

export default function Welcome({}) {
    const [seccion, setSeccion] = useState(1);
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            nombre: "",
            nombre_contacto: "",
            puesto_contacto: "",
            direccion: "",
            ciudad: "",
            estado: "",
            pais: "",
            cp: "",
            telefono_contacto: "",
            correo: "",
            sitio_web: "",
            tipo_participante: "expositor",
            giro_empresa: "empresa",
            tipo_exposicion: "Productos/servicios",
            expo_nombre: "",
            expo_correo: "",
            expo_puesto: "",
            expo_materiales: "",
            negocio_descripcion: "",
            negocio_tipo_venta: "Venta directa",
            negocio_tipo_empresa: "",
            negocio_servicios: "",
            negocio_asociacion: "",
        });

    const [materiales, setMateriales] = useState([]);

    const onMaterialesChange = (e) => {
        let _materiales = [...materiales];
        if (e.target.checked) _materiales.push(e.target.value);
        else _materiales.splice(_materiales.indexOf(e.target.value), 1);
        console.log(_materiales);
        setMateriales(_materiales);
    };

    useEffect(() => {
        setData({ ...data, expo_materiales: materiales.join(",") });
    }, [materiales]);

    const [tiposEmpresa, setTiposEmpresa] = useState([]);

    const onTipoEmpresaChange = (e) => {
        let _tiposEmpresa = [...tiposEmpresa];
        if (e.target.checked) _tiposEmpresa.push(e.target.value);
        else _tiposEmpresa.splice(_tiposEmpresa.indexOf(e.target.value), 1);
        console.log(_tiposEmpresa);
        setTiposEmpresa(_tiposEmpresa);
    };

    useEffect(() => {
        setData({ ...data, negocio_tipo_empresa: tiposEmpresa.join(",") });
    }, [tiposEmpresa]);

    const [serviciosEmpresa, setServiciosEmpresa] = useState([]);

    const onServiciosEmpresaChange = (e) => {
        let _serviciosEmpresa = [...serviciosEmpresa];
        if (e.target.checked) _serviciosEmpresa.push(e.target.value);
        else
            _serviciosEmpresa.splice(
                _serviciosEmpresa.indexOf(e.target.value),
                1
            );
        console.log(_serviciosEmpresa);
        setServiciosEmpresa(_serviciosEmpresa);
    };

    useEffect(() => {
        setData({ ...data, negocio_servicios: serviciosEmpresa.join(",") });
    }, [serviciosEmpresa]);

    const submit = (e) => {
        e.preventDefault();
        if (seccion == 1) {
            if (data.tipo_participante == "expositor") setSeccion(2);
            else setSeccion(3);
        } else {
            console.log(data);
            console.log("submit");
            post(route("bazar.store"));
        }
    };

    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value;
        setData({ ...data, [key]: value });
    }

    const tiposEmpresaCatalogo = [
        { name: "Tour Operador", key: "A" },
        { name: "Mayorista", key: "M" },
        { name: "Agente de Viajes", key: "P" },
        { name: "Casa de Incentivos", key: "R" },
        { name: "Organizador de Congresos", key: "R" },
        { name: "Globalizador", key: "R" },
        { name: "Agencia de Viajes LGBT", key: "R" },
        { name: "Turismo de Lujo", key: "R" },
        { name: "Viajeros Individuales-Ocio", key: "R" },
        { name: "Viajeros Individuales-Negocios", key: "R" },
        { name: "Grupos Seniors", key: "R" },
        { name: "Grupos Educativos", key: "R" },
        { name: "Turismo de Aventura", key: "R" },
        { name: "Turismo Religioso", key: "R" },
        { name: "Ecoturismo", key: "R" },
        { name: "Turismo Médico", key: "R" },
        { name: "Turismo Deportivo", key: "R" },
        { name: "Wedding Planner", key: "R" },
        { name: "Grupos grandes >500", key: "R" },
        { name: "Grupos pequeños-medianos <500", key: "R" },
        { name: "Transportación", key: "R" },
    ];

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
                            Salón Galeón
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
                        <div className="w-full md:w-9/12 flex sm:flex-row flex-col justify-center items-center md:items-start text-black p-1 md:p-5 gap-20">
                            <div className="flex flex-col gap-7 w-7/12 mt-20">
                                <h2 className="font-bold text-slate-900 text-3xl text-center">
                                    Bazar Turístico - La Paz, vinculación y 
                                    sustentabilidad 2024 
                                </h2>
                                <h2 className="font-bold text-slate-900 text-2xl">
                                    Objetivo
                                </h2>
                                <p className=" text-justify">
                                    El objetivo es impulsar la promoción y
                                    comercialización de los productos y
                                    servicios turísticos del municipio de La
                                    Paz, mediante el fomento del desarrollo de
                                    cadenas de valor y suministro entre
                                    empresarios, emprendedores, proveedores y
                                    productores locales, en colaboración con el
                                    sector turístico de la zona. El bazar se
                                    posiciona como una plataforma crucial para
                                    la promoción y los negocios locales,
                                    facilitando el acceso a la oferta e
                                    información turística, con el propósito de
                                    estimular la economía local, promover el
                                    desarrollo sustentable y potenciar el
                                    turismo como motor de crecimiento para la
                                    región.
                                </p>
                                <h2 className="font-bold text-slate-900 text-2xl">
                                Modalidades de participación
                                </h2>
                                <p className=" text-justify">
                                    1. Expositores/stands<br></br>
                                    2. Citas de negocios/vinculación
                                </p>
                                <p className=" text-justify">
                                En caso de participar en ambas 
                                modalidades, se requiere que se registren como expositor y como negocio.
                                </p>
                                <div className="flex ">
                                    <div className="m-2 md:w-44 w-full">
                                        <a href="/images/bazar/Guia para participar.pdf" target="_blank" className="flex w-full rounded-lg p-2 bg-orange-c-600 font-bold text-white items-center justify-center">
                                            Guía para <br></br>registrarse
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-7 w-full p-5 md:p-0 md:w-5/12">
                                <div>
                                <h2 className="font-bold p-1 text-center text-xl">
                                                Registro no disponible.
                                            </h2>
                                    {/* <form
                                        className="mt-6 space-y-2"
                                        onSubmit={submit}
                                    >
                                        <div
                                            className={`${
                                                seccion != 1 ? "hidden" : ""
                                            }`}
                                        >
                                            <h2 className="font-bold text-white bg-yellow-c-500 rounded-lg p-1 text-center text-3xl">
                                                Datos generales
                                            </h2>
                                            <div>
                                                <InputLabel
                                                    htmlFor="nombre"
                                                    value="Nombre de la empresa / organización"
                                                />

                                                <TextInput
                                                    id="nombre"
                                                    type="text"
                                                    className=" block w-full"
                                                    value={data.nombre}
                                                    onChange={(e) =>
                                                        setData(
                                                            "nombre",
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                    isFocused
                                                    autoComplete="nombre"
                                                />

                                                <InputError
                                                    className="mt-2"
                                                    message={errors.nombre}
                                                />
                                            </div>

                                            <div>
                                                <InputLabel
                                                    htmlFor="nombre_contacto"
                                                    value="Nombre del contacto"
                                                />

                                                <TextInput
                                                    id="nombre_contacto"
                                                    type="text"
                                                    className=" block w-full"
                                                    value={data.nombre_contacto}
                                                    onChange={(e) =>
                                                        setData(
                                                            "nombre_contacto",
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />

                                                <InputError
                                                    className="mt-2"
                                                    message={
                                                        errors.nombre_contacto
                                                    }
                                                />
                                            </div>

                                            <div>
                                                <InputLabel
                                                    htmlFor="puesto_contacto"
                                                    value="Puesto del contacto"
                                                />

                                                <TextInput
                                                    id="puesto_contacto"
                                                    type="text"
                                                    className=" block w-full"
                                                    value={data.puesto_contacto}
                                                    onChange={(e) =>
                                                        setData(
                                                            "puesto_contacto",
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />

                                                <InputError
                                                    className="mt-2"
                                                    message={
                                                        errors.puesto_contacto
                                                    }
                                                />
                                            </div>

                                            <div>
                                                <InputLabel
                                                    htmlFor="direccion"
                                                    value="Dirección"
                                                />

                                                <TextInput
                                                    id="direccion"
                                                    type="text"
                                                    className=" block w-full"
                                                    value={data.direccion}
                                                    onChange={(e) =>
                                                        setData(
                                                            "direccion",
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />

                                                <InputError
                                                    className="mt-2"
                                                    message={errors.direccion}
                                                />
                                            </div>

                                            <div>
                                                <InputLabel
                                                    htmlFor="ciudad"
                                                    value="Ciudad"
                                                />

                                                <TextInput
                                                    id="ciudad"
                                                    type="text"
                                                    className=" block w-full"
                                                    value={data.ciudad}
                                                    onChange={(e) =>
                                                        setData(
                                                            "ciudad",
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />

                                                <InputError
                                                    className="mt-2"
                                                    message={errors.ciudad}
                                                />
                                            </div>

                                            <div>
                                                <InputLabel
                                                    htmlFor="estado"
                                                    value="Estado"
                                                />

                                                <TextInput
                                                    id="estado"
                                                    type="text"
                                                    className=" block w-full"
                                                    value={data.estado}
                                                    onChange={(e) =>
                                                        setData(
                                                            "estado",
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />

                                                <InputError
                                                    className="mt-2"
                                                    message={errors.estado}
                                                />
                                            </div>

                                            <div>
                                                <InputLabel
                                                    htmlFor="pais"
                                                    value="Pais"
                                                />

                                                <TextInput
                                                    id="pais"
                                                    type="text"
                                                    className=" block w-full"
                                                    value={data.pais}
                                                    onChange={(e) =>
                                                        setData(
                                                            "pais",
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />

                                                <InputError
                                                    className="mt-2"
                                                    message={errors.pais}
                                                />
                                            </div>

                                            <div>
                                                <InputLabel
                                                    htmlFor="cp"
                                                    value="CP"
                                                />

                                                <TextInput
                                                    id="cp"
                                                    type="number"
                                                    className=" block w-full"
                                                    value={data.cp}
                                                    onChange={(e) =>
                                                        setData(
                                                            "cp",
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />

                                                <InputError
                                                    className="mt-2"
                                                    message={errors.cp}
                                                />
                                            </div>

                                            <div>
                                                <InputLabel
                                                    htmlFor="telefono_contacto"
                                                    value="Teléfono de contacto"
                                                />

                                                <TextInput
                                                    id="telefono_contacto"
                                                    type="text"
                                                    className=" block w-full"
                                                    value={
                                                        data.telefono_contacto
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "telefono_contacto",
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />

                                                <InputError
                                                    className="mt-2"
                                                    message={
                                                        errors.telefono_contacto
                                                    }
                                                />
                                            </div>

                                            <div>
                                                <InputLabel
                                                    htmlFor="correo"
                                                    value="Correo electrónico"
                                                />

                                                <TextInput
                                                    id="correo"
                                                    type="email"
                                                    className=" block w-full"
                                                    value={data.correo}
                                                    onChange={(e) =>
                                                        setData(
                                                            "correo",
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />

                                                <InputError
                                                    className="mt-2"
                                                    message={errors.correo}
                                                />
                                            </div>

                                            <div>
                                                <InputLabel
                                                    htmlFor="sitio_web"
                                                    value="Sitio web o redes sociales"
                                                />

                                                <TextInput
                                                    id="sitio_web"
                                                    type="text"
                                                    className=" block w-full"
                                                    value={data.sitio_web}
                                                    onChange={(e) =>
                                                        setData(
                                                            "sitio_web",
                                                            e.target.value
                                                        )
                                                    }
                                                />

                                                <InputError
                                                    className="mt-2"
                                                    message={errors.sitio_web}
                                                />
                                            </div>

                                            <div>
                                                <InputLabel
                                                    htmlFor="tipo_participante"
                                                    value="Tipo de participante"
                                                />

                                                <SelectInput
                                                    className={
                                                        "mb-4 border-gray-300 focus:border-amber-500 focus:ring-amber-500 rounded-md shadow-sm "
                                                    }
                                                    name="tipo_participante"
                                                    value={
                                                        data.tipo_participante
                                                    }
                                                    onChange={handleChange}
                                                >
                                                    <option value="expositor">
                                                        Expositor
                                                    </option>
                                                    <option value="negocio">
                                                        Negocio
                                                    </option>
                                                </SelectInput>

                                                <InputError
                                                    className="mt-2"
                                                    message={errors.email}
                                                />
                                            </div>

                                            <div className="flex items-center justify-center gap-4">
                                                <PrimaryButton className="bg-amber-c-600">
                                                    Siguiente
                                                </PrimaryButton>
                                            </div>
                                        </div>
                                        <div
                                            className={`flex flex-col gap-2 ${
                                                seccion != 2 ? "hidden" : ""
                                            }`}
                                        >
                                            <h2 className="font-bold text-white bg-red-c-700 rounded-lg p-1 text-center text-3xl">
                                                Expositores
                                            </h2>
                                            <div>
                                                <InputLabel
                                                    htmlFor="giro_empresa"
                                                    value="Tipo de organización"
                                                />

                                                <SelectInput
                                                    className={
                                                        "mb-4 border-gray-300 focus:border-amber-500 focus:ring-amber-500 rounded-md shadow-sm "
                                                    }
                                                    name="giro_empresa"
                                                    value={data.giro_empresa}
                                                    onChange={handleChange}
                                                >
                                                    <option value="empresa">
                                                        Empresa
                                                    </option>
                                                    <option value="Organización Sociedad Civil">
                                                    Organización Sociedad Civil
                                                    </option>
                                                    <option value="gobierno">
                                                        Gobierno
                                                    </option>
                                                    <option value="institucióneducativa">
                                                        Institución educativa
                                                    </option>
                                                </SelectInput>

                                                <InputError
                                                    className="mt-2"
                                                    message={
                                                        errors.giro_empresa
                                                    }
                                                />
                                            </div>

                                            <div>
                                                <InputLabel
                                                    htmlFor="tipo_exposicion"
                                                    value="Subsector turístico"
                                                />

                                                <SelectInput
                                                    className={
                                                        "mb-4 border-gray-300 focus:border-amber-500 focus:ring-amber-500 rounded-md shadow-sm "
                                                    }
                                                    name="tipo_exposicion"
                                                    value={data.tipo_exposicion}
                                                    onChange={handleChange}
                                                >
                                                    <option value="Destinos turísticos">
                                                        Destinos turísticos
                                                    </option>
                                                    <option value="Hospedaje">
                                                    Hospedaje
                                                    </option>
                                                    <option value="Alimentos y bebidas">
                                                    Alimentos y bebidas
                                                    </option>
                                                    <option value="Entretenimiento">
                                                    Entretenimiento
                                                    </option>
                                                    <option value="Guía de turismo">
                                                    Guía de turismo
                                                    </option>
                                                    <option value="Touroperadores">
                                                    Touroperadores
                                                    </option>
                                                    <option value="Agencia de viajes">
                                                    Agencia de viajes
                                                    </option>
                                                    <option value="Transportadoras">
                                                    Transportadoras
                                                    </option>
                                                    <option value="Artesanías">
                                                    Artesanías
                                                    </option>
                                                    <option value="Empresas de gestión de destino">
                                                    Empresas de gestión de destino 
                                                    </option>
                                                </SelectInput>
                                                <InputError
                                                    className="mt-2"
                                                    message={
                                                        errors.tipo_exposicion
                                                    }
                                                />
                                            </div>

                                            <h2 className="font-bold text-white bg-red-c-700  rounded-lg p-1 text-center ">
                                                Datos de la(s) persona(s) que
                                                asiste(n) al foro
                                            </h2>
                                            <div>
                                                <InputLabel
                                                    htmlFor="expo_nombre"
                                                    value="Nombre"
                                                />

                                                <TextInput
                                                    id="expo_nombre"
                                                    name="expo_nombre"
                                                    type="text"
                                                    className=" block w-full"
                                                    value={data.expo_nombre}
                                                    onChange={(e) =>
                                                        setData(
                                                            "expo_nombre",
                                                            e.target.value
                                                        )
                                                    }
                                                    required={seccion == 2}
                                                />

                                                <InputError
                                                    className="mt-2"
                                                    message={errors.expo_nombre}
                                                />
                                            </div>

                                            <div>
                                                <InputLabel
                                                    htmlFor="expo_correo"
                                                    value="Correo electrónico"
                                                />

                                                <TextInput
                                                    id="expo_correo"
                                                    name="expo_correo"
                                                    type="email"
                                                    className=" block w-full"
                                                    value={data.expo_correo}
                                                    onChange={(e) =>
                                                        setData(
                                                            "expo_correo",
                                                            e.target.value
                                                        )
                                                    }
                                                    required={seccion == 2}
                                                />

                                                <InputError
                                                    className="mt-2"
                                                    message={errors.expo_correo}
                                                />
                                            </div>

                                            <div>
                                                <InputLabel
                                                    htmlFor="expo_puesto"
                                                    value="Puesto"
                                                />

                                                <TextInput
                                                    id="expo_puesto"
                                                    name="expo_puesto"
                                                    type="text"
                                                    className=" block w-full"
                                                    value={data.expo_puesto}
                                                    onChange={(e) =>
                                                        setData(
                                                            "expo_puesto",
                                                            e.target.value
                                                        )
                                                    }
                                                    required={seccion == 2}
                                                />

                                                <InputError
                                                    className="mt-2"
                                                    message={errors.expo_puesto}
                                                />
                                            </div>
                                            <h2 className="font-bold text-white bg-red-c-700  rounded-lg p-1 text-center ">
                                                Tipos de materiales a exponer
                                            </h2>
                                            <div>
                                                <InputLabel htmlFor="expo_materiales1">
                                                    <Checkbox
                                                        id="expo_materiales1"
                                                        name="expo_materiales"
                                                        onChange={
                                                            onMaterialesChange
                                                        }
                                                        checked={materiales.includes(
                                                            "Productos gastronomicos"
                                                        )}
                                                        value="Productos gastronomicos"
                                                    />
                                                    <span className="ml-2 text-sm text-gray-600">
                                                        Productos gastronómicos
                                                    </span>
                                                </InputLabel>

                                                <InputLabel htmlFor="expo_materiales2">
                                                    <Checkbox
                                                        id="expo_materiales2"
                                                        name="expo_materiales"
                                                        onChange={
                                                            onMaterialesChange
                                                        }
                                                        checked={materiales.includes(
                                                            "Materiales audiovisuales"
                                                        )}
                                                        value="Materiales audiovisuales"
                                                    />
                                                    <span className="ml-2 text-sm text-gray-600">
                                                        Materiales audiovisuales
                                                    </span>
                                                </InputLabel>

                                                <InputLabel htmlFor="expo_materiales3">
                                                    <Checkbox
                                                        id="expo_materiales3"
                                                        name="expo_materiales"
                                                        onChange={
                                                            onMaterialesChange
                                                        }
                                                        checked={materiales.includes(
                                                            "Material impreso"
                                                        )}
                                                        value="Material impreso"
                                                    />
                                                    <span className="ml-2 text-sm text-gray-600">
                                                        Material impreso
                                                    </span>
                                                </InputLabel>

                                                <InputLabel htmlFor="expo_materiales4">
                                                    <Checkbox
                                                        id="expo_materiales4"
                                                        name="expo_materiales"
                                                        onChange={
                                                            onMaterialesChange
                                                        }
                                                        checked={materiales.includes(
                                                            "Artesanias"
                                                        )}
                                                        value="Artesanias"
                                                    />
                                                    <span className="ml-2 text-sm text-gray-600">
                                                    Artesanías
                                                    </span>
                                                </InputLabel>

                                                <InputLabel htmlFor="expo_materiales5">
                                                    <Checkbox
                                                        id="expo_materiales5"
                                                        name="expo_materiales"
                                                        onChange={
                                                            onMaterialesChange
                                                        }
                                                        checked={materiales.includes(
                                                            "Productos turisticos físicos (equipo)"
                                                        )}
                                                        value="Productos turisticos físicos (equipo)"
                                                    />
                                                    <span className="ml-2 text-sm text-gray-600">
                                                        Productos turísticos
                                                        físicos (equipo)
                                                    </span>
                                                </InputLabel>

                                                <InputError
                                                    className="mt-2"
                                                    message={
                                                        errors.expo_materiales
                                                    }
                                                />
                                            </div>

                                            <div className="flex items-center justify-center gap-4">
                                                <SecondaryButton
                                                    type="button"
                                                    onClick={(e) => {
                                                        setSeccion(1);
                                                    }}
                                                >
                                                    Atras
                                                </SecondaryButton>

                                                <PrimaryButton className="bg-amber-c-600">
                                                    Enviar
                                                </PrimaryButton>
                                            </div>
                                        </div>

                                        <div
                                            className={`flex flex-col gap-2 ${
                                                seccion != 3 ? "hidden" : ""
                                            }`}
                                        >
                                            <h2 className="font-bold text-white bg-sky-c-500 rounded-lg p-1 text-center text-3xl">
                                                Negocios
                                            </h2>
                                            <div>
                                                <InputLabel
                                                    htmlFor="negocio_descripcion"
                                                    value="Breve descripción de la empresa"
                                                />

                                                <TextArea
                                                    id="negocio_descripcion"
                                                    type="text"
                                                    className=" block w-full"
                                                    value={
                                                        data.negocio_descripcion
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "negocio_descripcion",
                                                            e.target.value
                                                        )
                                                    }
                                                    required={seccion == 3}
                                                />

                                                <InputError
                                                    className="mt-2"
                                                    message={
                                                        errors.negocio_descripcion
                                                    }
                                                />
                                            </div>

                                            <div>
                                                <InputLabel
                                                    htmlFor="negocio_tipo_venta"
                                                    value="Tipo de venta"
                                                />

                                                <SelectInput
                                                    className={
                                                        " border-gray-300 focus:border-amber-500 focus:ring-amber-500 rounded-md shadow-sm "
                                                    }
                                                    name="negocio_tipo_venta"
                                                    value={
                                                        data.negocio_tipo_venta
                                                    }
                                                    onChange={handleChange}
                                                >
                                                    <option value="Venta directa a cliente final">
                                                    Venta directa a cliente final
                                                    </option>
                                                    <option value="Venta a otras empresas">
                                                    Venta a otras empresas 
                                                    </option>
                                                    <option value="Venta a agencias de viajes">
                                                    Venta a agencias de viajes
                                                    </option>
                                                </SelectInput>

                                                <InputError
                                                    className="mt-2"
                                                    message={
                                                        errors.negocio_tipo_venta
                                                    }
                                                />
                                            </div>

                                            <div>
                                                <InputLabel value="Indique su tipo de empresa / segmento de mercado al que pertenece" />

                                                {tiposEmpresaCatalogo.map(
                                                    (tipo, index) => {
                                                        return (
                                                            <div
                                                                className="flex align-items-center"
                                                                key={`negocio_tipo_empresa${index}`}
                                                            >
                                                                <InputLabel
                                                                    htmlFor={`negocio_tipo_empresa${index}`}
                                                                >
                                                                    <Checkbox
                                                                        id={`negocio_tipo_empresa${index}`}
                                                                        name="negocio_tipo_empresa"
                                                                        onChange={
                                                                            onTipoEmpresaChange
                                                                        }
                                                                        checked={tiposEmpresa.includes(
                                                                            tipo.name
                                                                        )}
                                                                        value={
                                                                            tipo.name
                                                                        }
                                                                    />
                                                                    <span className="ml-2 text-sm text-gray-600">
                                                                        {
                                                                            tipo.name
                                                                        }
                                                                    </span>
                                                                </InputLabel>
                                                            </div>
                                                        );
                                                    }
                                                )}

                                                <InputError
                                                    className="mt-2"
                                                    message={
                                                        errors.negocio_tipo_empresa
                                                    }
                                                />
                                            </div>

                                            <div>
                                                <InputLabel value="Señale los servicios/ productos de interés para su empresa" />

                                                {tiposEmpresaCatalogo.map(
                                                    (tipo, index) => {
                                                        return (
                                                            <div
                                                                className="flex align-items-center"
                                                                key={`negocio_servicios${index}`}
                                                            >
                                                                <InputLabel
                                                                    htmlFor={`negocio_servicios${index}`}
                                                                >
                                                                    <Checkbox
                                                                        id={`negocio_servicios${index}`}
                                                                        name="negocio_servicios"
                                                                        onChange={
                                                                            onServiciosEmpresaChange
                                                                        }
                                                                        checked={serviciosEmpresa.includes(
                                                                            tipo.name
                                                                        )}
                                                                        value={
                                                                            tipo.name
                                                                        }
                                                                    />
                                                                    <span className="ml-2 text-sm text-gray-600">
                                                                        {
                                                                            tipo.name
                                                                        }
                                                                    </span>
                                                                </InputLabel>
                                                            </div>
                                                        );
                                                    }
                                                )}

                                                <InputError
                                                    className="mt-2"
                                                    message={
                                                        errors.negocio_tipo_empresa
                                                    }
                                                />
                                            </div>

                                            <div>
                                                <InputLabel
                                                    htmlFor="negocio_asociacion"
                                                    value="En caso de pertenecer a mas de una asociación, indique a cuales otras pertenecen (máximo 80 palabras)"
                                                />

                                                <TextArea
                                                    id="negocio_asociacion"
                                                    type="text"
                                                    className=" block w-full"
                                                    value={
                                                        data.negocio_asociacion
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "negocio_asociacion",
                                                            e.target.value
                                                        )
                                                    }
                                                />

                                                <InputError
                                                    className="mt-2"
                                                    message={
                                                        errors.negocio_asociacion
                                                    }
                                                />
                                            </div>

                                            <div className="flex items-center justify-center gap-4">
                                                <SecondaryButton
                                                    type="button"
                                                    onClick={(e) => {
                                                        setSeccion(1);
                                                    }}
                                                >
                                                    Atras
                                                </SecondaryButton>
                                                <PrimaryButton className="bg-amber-c-600">
                                                    Enviar
                                                </PrimaryButton>
                                            </div>
                                        </div>
                                    </form> */}
                                </div>
                            </div>
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
