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

const Create = () => {
    const { data, setData, errors, post, processing, recentlySuccessful } =
        useForm({
            nombre: "",
            icono: "",
        });

    function handleSubmit(e) {
        e.preventDefault();
        post(route("actividades.store"));
    }

    return (
        <div className="max-w-xl">
            <h1 className="mb-8 text-3xl font-bold">
                <Link
                    href={route("actividades")}
                    className="text-amber-600 hover:text-amber-700"
                >
                    Actividades
                </Link>
                <span className="font-medium text-amber-600"> /</span> Nuevo
            </h1>

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <header>
                        <h2 className="text-lg font-medium text-gray-900">
                            Registrar actividad
                        </h2>

                        <p className="mt-1 text-sm text-gray-600">
                            Capture la informacion necesaria
                        </p>
                    </header>
                    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                        <div>
                            <InputLabel htmlFor="nombre" value="Nombre" />

                            <TextInput
                                id="nombre"
                                className="mt-1 block w-full"
                                value={data.nombre}
                                onChange={(e) =>
                                    setData("nombre", e.target.value)
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
                            <InputLabel htmlFor="icono" value="Icono" />

                            <FileInput
                                className="mt-1 block w-full "
                                label="Icono"
                                name="icono"
                                accept="image/*"
                                errors={errors.icono}
                                value={data.icono}
                                onChange={(photo) => setData("icono", photo)}
                            />

                            <InputError
                                className="mt-2"
                                message={errors.icono}
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

Create.layout = (page) => <Layout title="Registrar actividad" children={page} />;

export default Create;
