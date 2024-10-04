import React from "react";
import { Link, useForm } from "@inertiajs/react";
import LoadingButton from "@/Components/LoadingButton";
import Layout from "@/Layouts/AuthenticatedLayout";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { Transition } from "@headlessui/react";
import FileInput from "@/Components/FileInput";
import { useEffect } from "react";
import { useState } from "react";
import { Dropdown } from "primereact/dropdown";

const CreateDelegacion = ({delegaciones}) => {
    const { data, setData, errors, post, processing, recentlySuccessful } =
        useForm({
            nombre: "",
            leyenda: "",
            descripcion: "",
            cover: "",
            principal: "",
            id_delegacion_padre:null
        });
        const [selectedDelegacion, setSelectedDelegacion] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();
        post(route("delegaciones.store"));
    }
    useEffect(() => {
        if (!selectedDelegacion) return
        setData("id_delegacion_padre", selectedDelegacion.id);
    }, [selectedDelegacion]);

    return (
        <div className="max-w-xl">
            <h1 className="mb-8 text-3xl font-bold">
                <Link
                    href={route("delegaciones")}
                    className="text-amber-600 hover:text-amber-700"
                >
                    Delegaciones
                </Link>
                <span className="font-medium text-amber-600"> /</span> Nuevo
            </h1>

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <header>
                        <h2 className="text-lg font-medium text-gray-900">
                            Registrar delegacion
                        </h2>

                        <p className="mt-1 text-sm text-gray-600">
                            Capture la informacion necesaria
                        </p>
                    </header>
                    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                    <div>
                            <InputLabel htmlFor="nombre" value="Titulo" />

                            <TextInput
                                id="nombre"
                                className="mt-1 block w-full"
                                value={data.nombre}
                                onChange={(e) => setData("nombre", e.target.value)}
                                required
                                isFocused
                                autoComplete="nombre"
                            />

                            <InputError className="mt-2" message={errors.nombre} />
                        </div>
                        <div>
                            <InputLabel htmlFor="leyenda" value="Leyenda" />

                            <TextInput
                                id="leyenda"
                                className="mt-1 block w-full"
                                value={data.leyenda}
                                onChange={(e) =>
                                    setData("leyenda", e.target.value)
                                }
                            />

                            <InputError
                                className="mt-2"
                                message={errors.leyenda}
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="descripcion" value="Descripcion" />

                            <TextInput
                                id="descripcion"
                                className="mt-1 block w-full"
                                value={data.descripcion}
                                onChange={(e) =>
                                    setData("descripcion", e.target.value)
                                }
                            />

                            <InputError
                                className="mt-2"
                                message={errors.descripcion}
                            />
                        </div>
                        <div>
                            <InputLabel
                                htmlFor="id_delegacion_padre"
                                value="Delegacion"
                            />

                            <Dropdown
                                name="id_delegacion_padre"
                                id="id_delegacion_padre"
                                value={selectedDelegacion}
                                onChange={(e) => setSelectedDelegacion(e.value)}
                                options={delegaciones}
                                optionLabel="nombre"
                                placeholder="Seleccionar una delegacion"
                                className="w-full md:w-14rem"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.id_delegacion_padre}
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="cover" value="Cover" />

                            <FileInput
                                className="mt-1 block w-full "
                                label="Icono"
                                name="cover"
                                id="cover"
                                accept="image/*"
                                errors={errors.cover}
                                value={data.cover}
                                onChange={(photo) => setData("cover", photo)}
                                required
                            />

                            <InputError
                                className="mt-2"
                                message={errors.cover}
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="principal" value="Principal" />

                            <FileInput
                                className="mt-1 block w-full "
                                label="Icono"
                                name="principal"
                                id="principal"
                                accept="image/*"
                                errors={errors.principal}
                                value={data.principal}
                                onChange={(photo) => setData("principal", photo)}
                                required
                            />

                            <InputError
                                className="mt-2"
                                message={errors.principal}
                            />
                        </div>
                        <div className="flex items-center gap-4">
                            <PrimaryButton disabled={processing}>
                                Guardar
                            </PrimaryButton>

                            <Transition
                                show={recentlySuccessful}
                                enterFrom="opacity-0"
                                leaveTo="opacity-0"
                                className="transition ease-in-out"
                            >
                                <p className="text-sm text-gray-600">
                                    Guardado.
                                </p>
                            </Transition>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

CreateDelegacion.layout = (page) => (
    <Layout title="Registrar delegacion" children={page} />
);

export default CreateDelegacion;
