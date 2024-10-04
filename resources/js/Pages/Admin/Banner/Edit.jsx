import DeleteButton from "@/Components/DeleteButton";
import LoadingButton from "@/Components/LoadingButton";
import TrashedMessage from "@/Components/TrashedMessage";
import Layout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import React from "react";
import { router } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import PrimaryButton from "@/Components/PrimaryButton";
import RestoreButton from "@/Components/RestoreButton";
import FileInput from "@/Components/FileInput";

const EditBanner = () => {
    const { banner } = usePage().props;
console.log(banner);
    const { data, setData, errors, post, processing, recentlySuccessful } =
        useForm({
            alt: banner.data.alt || "",
            enlace: banner.data.enlace || "",
            imagen: null,
            _method: "put",
        });

    function handleSubmit(e) {
        e.preventDefault();
        post(route("banners.update", banner.data.id));
    }

    function destroy() {
        if (confirm("Estas seguro que deseas eliminar este registro?")) {
            router.delete(route("banners.destroy", banner.data.id));
        }
    }

    function restore() {
        if (confirm("Estas seguro que deseas restaurar este registro ?")) {
            router.put(route("banners.restore", banner.data.id));
        }
    }

    return (
        <div className="max-w-xl">
            <Head title={banner.data.alt} />
            <h1 className="mb-8 text-3xl font-bold">
                <Link
                    href={route("banners")}
                    className="text-amber-600 hover:text-amber-700"
                >
                    Banners
                </Link>
                <span className="mx-2 font-medium text-amber-600">/</span>
                {banner.data.alt}
            </h1>

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <header>
                        <h2 className="text-lg font-medium text-gray-900">
                            Editar banner
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
                            {banner.data.imagen && (
                                <img
                                    className="block w-[300px] h-[200px]"
                                    src={banner.data.imagen}
                                />
                            )}
                            <FileInput
                                className="mt-1 block w-full "
                                label="Icono"
                                name="imagen"
                                 accept="image/*"
                                errors={errors.imagen}
                                value={data.imagen}
                                onChange={(photo) => setData("imagen", photo)}
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

                            {!banner.data.deleted_at && (
                                <DeleteButton onDelete={destroy}>
                                    Eliminar
                                </DeleteButton>
                            )}
                            {banner.data.deleted_at && (
                                <RestoreButton onRestore={restore}>
                                    Restaurar
                                </RestoreButton>
                            )}

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

EditBanner.layout = (page) => <Layout children={page} />;

export default EditBanner;
