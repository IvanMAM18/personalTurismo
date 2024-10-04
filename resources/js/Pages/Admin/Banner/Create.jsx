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

const CreateBanner = () => {
    const { data, setData, errors, post, processing, recentlySuccessful } =
        useForm({
            alt: "",
            enlace: "",
            imagen: "",
        });

    function handleSubmit(e) {
        e.preventDefault();
        post(route("banners.store"));
    }

    return (
        <div className="max-w-xl">
            <h1 className="mb-8 text-3xl font-bold">
                <Link
                    href={route("banners")}
                    className="text-amber-600 hover:text-amber-700"
                >
                    Eventos
                </Link>
                <span className="font-medium text-amber-600"> /</span> Nuevo
            </h1>

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <header>
                        <h2 className="text-lg font-medium text-gray-900">
                            Registrar banner
                        </h2>

                        <p className="mt-1 text-sm text-gray-600">
                            Capture la informacion necesaria
                        </p>
                    </header>
                    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                    <div>
                            <InputLabel htmlFor="alt" value="Titulo" />

                            <TextInput
                                id="alt"
                                className="mt-1 block w-full"
                                value={data.alt}
                                onChange={(e) =>
                                    setData("alt", e.target.value)
                                }
                                required
                                isFocused
                                autoComplete="alt"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.alt}
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="enlace" value="Enlace" />

                            <TextInput
                                id="enlace"
                                className="mt-1 block w-full"
                                value={data.enlace}
                                onChange={(e) =>
                                    setData("enlace", e.target.value)
                                }
                            />

                            <InputError
                                className="mt-2"
                                message={errors.enlace}
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="imagen" value="Imagen" />

                            <FileInput
                                className="mt-1 block w-full "
                                label="Icono"
                                name="imagen"
                                accept="image/*"
                                errors={errors.imagen}
                                value={data.imagen}
                                onChange={(photo) => setData("imagen", photo)}
                                required
                            />

                            <InputError
                                className="mt-2"
                                message={errors.imagen}
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

CreateBanner.layout = (page) => <Layout title="Registrar banner" children={page} />;

export default CreateBanner;
